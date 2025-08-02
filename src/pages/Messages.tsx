import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import axios from '@/lib/axios';
import { 
  MessageSquare, 
  Send, 
  Search, 
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Loader2
} from 'lucide-react';

interface Message {
  id?: string;
  message: string;
  timestamp: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string;
}

interface Conversation {
  listing_id: string;
  listing_title: string;
  listing_image?: string;
  other_user: {
    id: string;
    name: string;
    avatar?: string;
    reg_no: string;
  };
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

const Messages: React.FC = () => {
  const location = useLocation();
  const { listing_id, receiver_id } = useParams<{ listing_id?: string; receiver_id?: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const currentUserId = user?.id;
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeChatPartner, setActiveChatPartner] = useState(null);

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      setLoadingConversations(true);
      const response = await axios.get('/messages/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    } finally {
      setLoadingConversations(false);
    }
  };

  // Fetch messages for a specific conversation
  const fetchMessages = async (listingId: string, receiverId: string) => {
    try {
      setLoadingMessages(true);
      // The API now returns an object with 'messages' and 'other_user'
      const response = await axios.get(`/messages/chat/${listingId}/${receiverId}`);
      setMessages(response.data.messages);
      setActiveChatPartner(response.data.other_user); // Set the chat partner state
    } catch (error) {
      // ... error handling
    } finally {
      setLoadingMessages(false);
    }
  };


  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !currentUserId) return;

    const selectedConv = conversations.find(c => 
      `${c.listing_id}-${c.other_user.id}` === selectedConversation
    );

    if (!selectedConv) return;

    try {
      setSendingMessage(true);

      await axios.post('/messages/send', {
        receiver_id: selectedConv.other_user.id,
        listing_id: selectedConv.listing_id,
        message: newMessage
      });

      const newMsg: Message = {
        id: `temp-${Date.now()}`, // This is still good UX for local updates
        message: newMessage,
        timestamp: new Date().toISOString(),
        sender_id: currentUserId,
        receiver_id: selectedConv.other_user.id,
        listing_id: selectedConv.listing_id
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      fetchConversations(); // Keep this to update sidebar
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setSendingMessage(false);
    }
  };


  // Initial load
  useEffect(() => {
    if (currentUserId) {
      fetchConversations();
    }
  }, [currentUserId]);

  // Handle URL params for direct conversation access
  useEffect(() => {
    if (listing_id && receiver_id) {
      const conversationKey = `${listing_id}-${receiver_id}`;
      setSelectedConversation(conversationKey); // Set the ID for highlighting
      fetchMessages(listing_id, receiver_id); // Fetch chat data directly
    }
  }, [listing_id, receiver_id]);

  // Handle location state for navigation from marketplace
  useEffect(() => {
    const targetUserId = location.state?.targetUserId;
    if (targetUserId && conversations.length > 0) {
      const targetConversation = conversations.find(conv => 
        conv.other_user.id === targetUserId
      );
      if (targetConversation) {
        const conversationKey = `${targetConversation.listing_id}-${targetConversation.other_user.id}`;
        setSelectedConversation(conversationKey);
        fetchMessages(targetConversation.listing_id, targetConversation.other_user.id);
      }
    }
  }, [location.state, conversations]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (days === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
      });
    }
  };

  const selectedConv = conversations.find(c => 
    `${c.listing_id}-${c.other_user.id}` === selectedConversation
  );
  
  const filteredConversations = conversations.filter(conv =>
    conv.other_user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationSelect = (conv: Conversation) => {
    const conversationKey = `${conv.listing_id}-${conv.other_user.id}`;
    setSelectedConversation(conversationKey);
    fetchMessages(conv.listing_id, conv.other_user.id);
  };

return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Messages</h1>
        <p className="text-muted-foreground">Chat with buyers and sellers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        {/* Conversations List (No changes needed here) */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversations
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[550px]">
              {loadingConversations ? (
                <div className="p-6 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3" />
                  <p className="text-muted-foreground">Loading conversations...</p>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No conversations found</p>
                </div>
              ) : (
                filteredConversations.map((conversation, index) => {
                  const conversationKey = `${conversation.listing_id}-${conversation.other_user.id}`;
                  return (
                    <div key={conversationKey}>
                      <div
                        className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedConversation === conversationKey ? 'bg-muted' : ''
                        }`}
                        onClick={() => handleConversationSelect(conversation)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.other_user.avatar} />
                            <AvatarFallback>
                              {conversation.other_user.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">
                                {conversation.other_user.name}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(conversation.last_message_time)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground truncate">
                                {conversation.last_message}
                              </p>
                              {conversation.unread_count > 0 && (
                                <Badge variant="default" className="text-xs">
                                  {conversation.unread_count}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < filteredConversations.length - 1 && <Separator />}
                    </div>
                  );
                })
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* --- REFACTORED CHAT AREA --- */}
        <Card className="lg:col-span-2">
          {/* 1. Main condition now checks for loading state or the active chat partner */}
          {loadingMessages ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : activeChatPartner ? (
            <div className="flex flex-col h-full">
              {/* 2. Chat header now uses `activeChatPartner` for its data */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activeChatPartner.avatar} />
                      <AvatarFallback>
                        {activeChatPartner.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {activeChatPartner.name}
                      </CardTitle>
                      <CardDescription>
                        {activeChatPartner.reg_no}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardHeader>
              
              <Separator />

              {/* Messages section remains the same, as it already uses `messages` state */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[450px] p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={message.id || index}
                        className={`flex ${
                          message.sender_id === currentUserId ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.sender_id === currentUserId
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p
                            className={`text-xs mt-1 text-right ${
                              message.sender_id === currentUserId
                                ? 'text-primary-foreground/70'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input section also remains the same */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sendingMessage}
                    className="btn-primary"
                  >
                    {sendingMessage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // This is the default placeholder when no chat is active
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a chat from the left to start messaging.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
export default Messages;
