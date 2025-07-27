import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, MapPin, Eye, MessageCircle, CreditCard, AlertTriangle } from 'lucide-react';

const SafetyGuidelines: React.FC = () => {
  const guidelines = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Meet in Public Places",
      description: "Always meet in well-lit, public areas on campus",
      tips: [
        "Library common areas during busy hours",
        "Student center or cafeteria",
        "Main campus walkways",
        "Avoid dormitory rooms or private areas"
      ]
    },
    {
      icon: <Eye className="h-6 w-6 text-primary" />,
      title: "Inspect Before Buying",
      description: "Thoroughly check items before completing the transaction",
      tips: [
        "Test electronic items if possible",
        "Check for damage or wear",
        "Verify authenticity for branded items",
        "Ask for proof of purchase if needed"
      ]
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      title: "Communicate Through the Platform",
      description: "Keep all communications within SRM BrokeBuy",
      tips: [
        "Use our secure messaging system",
        "Don't share personal contact details immediately",
        "Keep records of all conversations",
        "Report suspicious behavior"
      ]
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Use Secure Payment Methods",
      description: "Always use our integrated wallet system",
      tips: [
        "Never pay outside the platform",
        "Avoid cash transactions when possible",
        "Keep payment receipts",
        "Report payment issues immediately"
      ]
    }
  ];

  const redFlags = [
    "Sellers asking for payment outside the platform",
    "Prices that seem too good to be true",
    "Pressure to buy immediately",
    "Reluctance to meet in person",
    "Asking for personal banking information",
    "Poor quality or unclear photos",
    "New accounts with no transaction history"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Safety First</Badge>
          <h1 className="text-4xl font-bold mb-4">Safety Guidelines</h1>
          <p className="text-xl text-muted-foreground">
            Your safety is our priority. Follow these guidelines for secure transactions
          </p>
        </div>

        <Alert className="mb-8">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Remember:</strong> SRM BrokeBuy is exclusively for SRM students. 
            All users are verified through student credentials for added security.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {guidelines.map((guideline, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {guideline.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{guideline.title}</CardTitle>
                    <CardDescription>{guideline.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guideline.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <div>
                <CardTitle className="text-destructive">Red Flags to Watch Out For</CardTitle>
                <CardDescription>Be cautious if you encounter any of these warning signs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {redFlags.map((flag, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-destructive mt-1">⚠️</span>
                  <span className="text-sm">{flag}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <strong>Campus Security:</strong><br />
                📞 +91-XXXX-XXXXXX
              </div>
              <div>
                <strong>Student Services:</strong><br />
                📞 +91-XXXX-XXXXXX
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Report Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>If you encounter any problems:</p>
              <ul className="space-y-1">
                <li>• Use the "Report" button on listings</li>
                <li>• Contact our support team</li>
                <li>• Contact campus security if needed</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trust Your Instincts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>If something feels wrong:</p>
              <ul className="space-y-1">
                <li>• Don't proceed with the transaction</li>
                <li>• Trust your gut feeling</li>
                <li>• Report suspicious behavior</li>
                <li>• There are always other options</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelines;