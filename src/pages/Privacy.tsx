import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Eye, Lock, Database, Users, Mail } from 'lucide-react';

const Privacy: React.FC = () => {
  const dataTypes = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Account Information",
      description: "Name, student ID, email address, profile information"
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Transaction Data",
      description: "Purchase history, wallet balance, payment information"
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Usage Information",
      description: "Pages visited, features used, interaction patterns"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Communication Data",
      description: "Messages sent through our platform, support tickets"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Privacy Policy</Badge>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Our Commitment to Privacy</CardTitle>
                  <CardDescription>
                    Your privacy and data security are fundamental to our mission of creating a safe, trusted marketplace for SRM students.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                This Privacy Policy explains how SRM BrokeBuy collects, uses, protects, and shares your personal information when you use our platform. By using our service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm">
              <div className="grid gap-4 md:grid-cols-2">
                {dataTypes.map((type, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-primary mt-1">
                      {type.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{type.title}</h4>
                      <p className="text-muted-foreground text-xs">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Automatic Information Collection</h4>
                <p>We automatically collect certain information when you use our platform:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Performance and usage analytics</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>We use the collected information for the following purposes:</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Platform Operations</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                    <li>Account creation and verification</li>
                    <li>Processing transactions and payments</li>
                    <li>Facilitating communication between users</li>
                    <li>Providing customer support</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Safety and Security</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                    <li>Fraud detection and prevention</li>
                    <li>Monitoring for inappropriate content</li>
                    <li>Enforcing our Terms of Service</li>
                    <li>Investigating reported issues</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Platform Improvement</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                    <li>Analyzing usage patterns to improve features</li>
                    <li>Personalizing user experience</li>
                    <li>Conducting research and analytics</li>
                    <li>Developing new features and services</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">With Other Users</h4>
                  <p className="text-muted-foreground">
                    Your public profile information and listing details are visible to other verified SRM students on the platform.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Service Providers</h4>
                  <p className="text-muted-foreground">
                    We may share information with trusted service providers who help us operate the platform (payment processors, hosting services, analytics providers).
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Legal Requirements</h4>
                  <p className="text-muted-foreground">
                    We may disclose information when required by law, court order, or to protect our rights and the safety of our users.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Business Transfers</h4>
                  <p className="text-muted-foreground">
                    If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Lock className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>4. Data Security</CardTitle>
                  <CardDescription>How we protect your information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>We implement industry-standard security measures to protect your data:</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-semibold">Technical Safeguards</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Encrypted storage of sensitive information</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Operational Safeguards</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Limited employee access to personal data</li>
                    <li>Regular staff training on privacy practices</li>
                    <li>Incident response procedures</li>
                    <li>Data backup and recovery systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>You have the following rights regarding your personal information:</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Access and Portability</h4>
                  <p className="text-muted-foreground">
                    You can request a copy of your personal data and export your information.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Correction</h4>
                  <p className="text-muted-foreground">
                    You can update or correct your personal information through your account settings.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Deletion</h4>
                  <p className="text-muted-foreground">
                    You can request deletion of your account and associated data, subject to legal retention requirements.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Opt-out</h4>
                  <p className="text-muted-foreground">
                    You can opt out of non-essential communications and certain data processing activities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>We use cookies and similar technologies to enhance your experience:</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Essential Cookies</h4>
                  <p className="text-muted-foreground">
                    Required for platform functionality, security, and user authentication.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Analytics Cookies</h4>
                  <p className="text-muted-foreground">
                    Help us understand how users interact with the platform to improve our services.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Preference Cookies</h4>
                  <p className="text-muted-foreground">
                    Remember your settings and preferences for a personalized experience.
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground">
                You can manage cookie preferences through your browser settings, though this may affect platform functionality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>We retain your information for as long as necessary to provide our services and comply with legal obligations:</p>
              
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Account information: Retained while your account is active</li>
                <li>Transaction records: Retained for 7 years for financial compliance</li>
                <li>Communication data: Retained for 3 years for support purposes</li>
                <li>Usage analytics: Retained for 2 years in aggregated form</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Our platform integrates with third-party services that have their own privacy policies:</p>
              
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Payment processors for secure transaction handling</li>
                <li>Cloud storage providers for data hosting</li>
                <li>Analytics services for platform improvement</li>
                <li>Communication services for notifications</li>
              </ul>
              
              <p className="text-muted-foreground">
                We encourage you to review the privacy policies of these third-party services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify users of significant changes through:
              </p>
              
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Email notifications to registered users</li>
                <li>In-app notifications</li>
                <li>Updates posted on our platform</li>
              </ul>
              
              <p className="text-muted-foreground">
                Your continued use of the platform after changes are posted constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
              
              <div className="space-y-2 ml-4">
                <p><strong>Email:</strong> privacy@srmbrokeboy.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@srmbrokeboy.com</p>
                <p><strong>Address:</strong> SRM Institute of Science and Technology, Kattankulathur, Tamil Nadu, India</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            This Privacy Policy is effective as of the date stated above and will remain in effect except with respect to any changes in its provisions in the future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;