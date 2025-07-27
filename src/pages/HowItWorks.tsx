import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Users, Shield, Wallet } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Sign Up",
      description: "Create your account using your SRM student credentials",
      details: "Join our secure platform exclusively for SRM students"
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      title: "Browse & Buy",
      description: "Find great deals on second-hand items from fellow students",
      details: "Use filters to find exactly what you need"
    },
    {
      icon: <Wallet className="h-8 w-8 text-primary" />,
      title: "Secure Payments",
      description: "Pay safely using our integrated wallet system",
      details: "All transactions are protected and verified"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Safe Exchange",
      description: "Meet safely on campus or arrange secure delivery",
      details: "Follow our safety guidelines for all transactions"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">How It Works</Badge>
          <h1 className="text-4xl font-bold mb-4">Simple Steps to Start Trading</h1>
          <p className="text-xl text-muted-foreground">
            SRM BrokeBuy makes it easy and safe to buy and sell second-hand items on campus
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-2">{step.description}</CardDescription>
                <p className="text-sm text-muted-foreground">{step.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>For Sellers</CardTitle>
              <CardDescription>Turn your unused items into cash</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">📷 Take Great Photos</h4>
                  <p className="text-sm text-muted-foreground">Clear, well-lit photos help your items sell faster</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💰 Set Fair Prices</h4>
                  <p className="text-sm text-muted-foreground">Research similar items to price competitively</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📝 Write Detailed Descriptions</h4>
                  <p className="text-sm text-muted-foreground">Include condition, brand, and any relevant details</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🚀 Respond Quickly</h4>
                  <p className="text-sm text-muted-foreground">Fast responses lead to more successful sales</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Buyers</CardTitle>
              <CardDescription>Find exactly what you need at great prices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">🔍 Use Search Filters</h4>
                  <p className="text-sm text-muted-foreground">Filter by category, price, and condition to find items quickly</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">❓ Ask Questions</h4>
                  <p className="text-sm text-muted-foreground">Don't hesitate to message sellers for more details</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🤝 Negotiate Respectfully</h4>
                  <p className="text-sm text-muted-foreground">Most sellers are open to reasonable offers</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">✅ Check Before Buying</h4>
                  <p className="text-sm text-muted-foreground">Inspect items carefully before completing the purchase</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;