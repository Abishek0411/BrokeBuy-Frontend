import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Search, 
  MoreVertical,
  Phone,
  Video,
  Paperclip
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender_id: string;
  is_read: boolean;
}

interface Conversation {
  id: string;
  other_user: {
    id: string;
    name: string;
    avatar?: string;
    reg_no: string;
  };
  last_message: string;
  last_message_time: string;
  unread_count: number;
  messages: Message[];
}

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      other_user: {
        id: '2',
        name: 'Priya Sharma',
        avatar: '',
        reg_no: 'RA2111003010123'
      },
      last_message: 'Is the phone still available?',
      last_message_time: '2024-01-25T10:30:00Z',
      unread_count: 2,
      messages: [
        {
          id: '1',
          content: 'Hi! I\'m interested in your iPhone 12.',
          timestamp: '2024-01-25T10:00:00Z',
          sender_id: '2',
          is_read: true
        },
        {
          id: '2',
          content: 'Hello! Yes, it\'s still available. Would you like to see it?',
          timestamp: '2024-01-25T10:15:00Z',
          sender_id: '1',
          is_read: true
        },
        {
          id: '3',
          content: 'Is the phone still available?',
          timestamp: '2024-01-25T10:30:00Z',
          sender_id: '2',
          is_read: false
        }
      ]
    },
    {
      id: '2',
      other_user: {
        id: '3',
        name: 'Rahul Kumar',
        avatar: '',
        reg_no: 'RA2111003010456'
      },
      last_message: 'Thanks for the quick delivery!',
      last_message_time: '2024-01-24T15:45:00Z',
      unread_count: 0,
      messages: [
        {
          id: '4',
          content: 'When can I pick up the textbook?',
          timestamp: '2024-01-24T14:00:00Z',
          sender_id: '3',
          is_read: true
        },
        {
          id: '5',
          content: 'You can pick it up anytime after 3 PM today.',
          timestamp: '2024-01-24T14:30:00Z',
          sender_id: '1',
          is_read: true
        },
        {
          id: '6',
          content: 'Thanks for the quick delivery!',
          timestamp: '2024-01-24T15:45:00Z',
          sender_id: '3',
          is_read: true
        }
      ]
    }
  ];

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

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const filteredConversations = conversations.filter(conv =>
    conv.other_user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // Handle sending message here
    setNewMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Messages</h1>
        <p className="text-muted-foreground">Chat with buyers and sellers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        {/* Conversations List */}
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
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No conversations found</p>
                </div>
              ) : (
                filteredConversations.map((conversation, index) => (
                  <div key={conversation.id}>
                    <div
                      className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedConversation === conversation.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.other_user.avatar} />
                          <AvatarFallback>
                            {conversation.other_user.name.charAt(0)}
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
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedConv ? (
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConv.other_user.avatar} />
                      <AvatarFallback>
                        {selectedConv.other_user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {selectedConv.other_user.name}
                      </CardTitle>
                      <CardDescription>
                        {selectedConv.other_user.reg_no}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <Separator />

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[450px] p-4">
                  <div className="space-y-4">
                    {selectedConv.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender_id === '1' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.sender_id === '1'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender_id === '1'
                                ? 'text-primary-foreground/70'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="btn-primary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
                <p className="text-muted-foreground">
                  Choose a conversation to start messaging
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;