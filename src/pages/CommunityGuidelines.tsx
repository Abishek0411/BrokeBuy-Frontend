import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Users, Shield, MessageCircle, Star, AlertTriangle } from 'lucide-react';

const CommunityGuidelines: React.FC = () => {
  const principles = [
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Respect and Kindness",
      description: "Treat every member of our community with respect and courtesy",
      details: [
        "Use polite and professional language in all communications",
        "Be patient with new users learning the platform",
        "Respect cultural and personal differences",
        "Avoid offensive or discriminatory language"
      ]
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Honest and Fair Trading",
      description: "Maintain transparency and integrity in all transactions",
      details: [
        "Provide accurate descriptions and photos of items",
        "Honor agreed-upon prices and terms",
        "Disclose any defects or issues with items",
        "Complete transactions in a timely manner"
      ]
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Community First",
      description: "Support and strengthen our SRM student community",
      details: [
        "Prioritize fellow students' needs and success",
        "Share knowledge and help others navigate the platform",
        "Report issues to help maintain a safe environment",
        "Contribute to positive community discussions"
      ]
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      title: "Clear Communication",
      description: "Foster open and transparent communication",
      details: [
        "Respond to messages promptly and clearly",
        "Ask questions if something is unclear",
        "Provide constructive feedback when appropriate",
        "Keep conversations professional and on-topic"
      ]
    }
  ];

  const dosDonts = {
    dos: [
      "Verify your student status and maintain updated profile information",
      "Take clear, honest photos of items you're selling",
      "Meet in safe, public places on campus for exchanges",
      "Use the integrated wallet system for all transactions",
      "Report suspicious activity or inappropriate behavior",
      "Leave honest reviews after transactions",
      "Help new users understand platform features",
      "Follow campus rules and regulations during meetups"
    ],
    donts: [
      "Create fake accounts or impersonate others",
      "List prohibited items or services",
      "Engage in price manipulation or unfair practices",
      "Share personal contact information publicly",
      "Pressure others into transactions",
      "Leave false or malicious reviews",
      "Spam users with unwanted messages",
      "Conduct business outside the platform"
    ]
  };

  const consequences = [
    {
      level: "Warning",
      description: "Minor violations receive a formal warning",
      examples: ["Late responses", "Minor listing errors", "Casual rule oversights"]
    },
    {
      level: "Temporary Suspension",
      description: "Serious violations result in temporary account suspension",
      examples: ["Repeated complaints", "Inappropriate behavior", "Transaction disputes"]
    },
    {
      level: "Permanent Ban",
      description: "Severe violations lead to permanent account termination",
      examples: ["Fraud", "Harassment", "Safety violations", "Illegal activities"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Community Guidelines</Badge>
          <h1 className="text-4xl font-bold mb-4">Community Guidelines</h1>
          <p className="text-xl text-muted-foreground">
            Building a safe, respectful, and thriving marketplace for SRM students
          </p>
        </div>

        <Alert className="mb-8">
          <Heart className="h-4 w-4" />
          <AlertDescription>
            <strong>Our Mission:</strong> To create a trusted community where SRM students can safely buy, sell, 
            and connect with each other while fostering mutual respect and support.
          </AlertDescription>
        </Alert>

        {/* Core Principles */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-center">Our Core Principles</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {principles.map((principle, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {principle.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{principle.title}</CardTitle>
                      <CardDescription>{principle.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {principle.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-2">
                        <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-600 dark:text-green-400">
                ✅ What We Encourage
              </CardTitle>
              <CardDescription>
                Behaviors that strengthen our community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {dosDonts.dos.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-red-600 dark:text-red-400">
                ❌ What We Don't Allow
              </CardTitle>
              <CardDescription>
                Behaviors that harm our community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {dosDonts.donts.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Consequences */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <div>
                <CardTitle>Enforcement and Consequences</CardTitle>
                <CardDescription>
                  How we handle violations of community guidelines
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {consequences.map((consequence, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-lg">{consequence.level}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{consequence.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {consequence.examples.map((example, exampleIndex) => (
                      <Badge key={exampleIndex} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <Alert className="mt-6">
              <AlertDescription>
                <strong>Appeals Process:</strong> If you believe enforcement action was taken in error, 
                you can appeal by contacting our support team with relevant details and evidence.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Special Guidelines */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Academic Integrity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>When selling academic materials:</p>
              <ul className="space-y-1 ml-4">
                <li>• Only sell your own legitimate textbooks and notes</li>
                <li>• Don't sell copyrighted materials or assignments</li>
                <li>• Respect intellectual property rights</li>
                <li>• Follow SRM's academic policies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Safety First</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>For safe campus transactions:</p>
              <ul className="space-y-1 ml-4">
                <li>• Meet in well-lit, public campus areas</li>
                <li>• Bring a friend if you feel unsure</li>
                <li>• Trust your instincts about situations</li>
                <li>• Report safety concerns immediately</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Reporting */}
        <Card>
          <CardHeader>
            <CardTitle>Reporting Guidelines Violations</CardTitle>
            <CardDescription>
              Help us maintain a positive community by reporting inappropriate behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-2">When to Report</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Inappropriate behavior</li>
                  <li>• Suspicious listings</li>
                  <li>• Harassment or threats</li>
                  <li>• Fraudulent activity</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">How to Report</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Use "Report" buttons</li>
                  <li>• Contact support team</li>
                  <li>• Provide detailed information</li>
                  <li>• Include evidence if available</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">What Happens Next</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• We review all reports</li>
                  <li>• Investigation begins promptly</li>
                  <li>• Appropriate action is taken</li>
                  <li>• You may receive updates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Together We Build a Better Community</h3>
          <p className="text-muted-foreground">
            By following these guidelines, we create a marketplace where every SRM student 
            can buy, sell, and connect safely and successfully. Thank you for being part 
            of our growing community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;