import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle, Mail, Phone, Book } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account?",
          answer: "You can create an account by clicking the 'Sign Up' button and using your SRM student credentials. You'll need your student ID and institutional email address to verify your account."
        },
        {
          question: "Who can use SRM BrokeBuy?",
          answer: "SRM BrokeBuy is exclusively for verified SRM students. You need a valid SRM student ID and institutional email address to join the platform."
        },
        {
          question: "Is there a fee to use the platform?",
          answer: "Basic registration and browsing are free. We charge a small transaction fee on successful sales to maintain the platform and ensure security."
        }
      ]
    },
    {
      category: "Buying Items",
      questions: [
        {
          question: "How do I search for items?",
          answer: "Use the search bar on the marketplace page or browse by categories. You can filter results by price, condition, location, and other criteria to find exactly what you need."
        },
        {
          question: "How do I contact a seller?",
          answer: "Click on any listing to view details, then use the 'Message Seller' button to start a conversation through our secure messaging system."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We use an integrated wallet system for secure payments. You can add funds to your wallet using various payment methods including UPI, net banking, and cards."
        }
      ]
    },
    {
      category: "Selling Items",
      questions: [
        {
          question: "How do I list an item for sale?",
          answer: "Go to the 'Sell' page, upload clear photos of your item, provide a detailed description, set your price, and publish your listing."
        },
        {
          question: "What can I sell on the platform?",
          answer: "You can sell books, electronics, clothing, furniture, sports equipment, and other legal second-hand items. Prohibited items include food, medicines, and dangerous goods."
        },
        {
          question: "How do I manage my listings?",
          answer: "Visit 'My Listings' to view, edit, or delete your active listings. You can also mark items as sold when they're purchased."
        }
      ]
    },
    {
      category: "Payments & Wallet",
      questions: [
        {
          question: "How does the wallet system work?",
          answer: "Your wallet stores funds securely on the platform. Add money to buy items or receive payments from sales. You can withdraw funds to your bank account anytime."
        },
        {
          question: "What if I have a payment issue?",
          answer: "Contact our support team immediately if you experience any payment problems. We'll investigate and resolve issues promptly."
        },
        {
          question: "How long do transactions take?",
          answer: "Payments are processed instantly through the wallet system. Bank withdrawals typically take 1-3 business days to complete."
        }
      ]
    },
    {
      category: "Safety & Security",
      questions: [
        {
          question: "How do I report a suspicious user?",
          answer: "Use the 'Report' button on user profiles or listings. You can also contact our support team with details about suspicious behavior."
        },
        {
          question: "What if an item isn't as described?",
          answer: "Contact the seller first to resolve the issue. If unsuccessful, report the problem to our support team with evidence (photos, messages)."
        },
        {
          question: "Is my personal information safe?",
          answer: "Yes, we use industry-standard encryption and security measures to protect your data. We never share personal information with third parties."
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Help Center</Badge>
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for help topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3 mb-12">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Live Chat</CardTitle>
              <CardDescription>Get instant help from our support team</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Email Support</CardTitle>
              <CardDescription>Send us a detailed message</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Book className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">User Guide</CardTitle>
              <CardDescription>Comprehensive documentation</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          
          {filteredFaqs.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredFaqs.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>Our support team is here to assist you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@srmbrokeboy.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+91-XXXX-XXXXXX</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Our support team is available Monday to Friday, 9:00 AM to 6:00 PM IST.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;