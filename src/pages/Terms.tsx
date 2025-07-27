import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Legal</Badge>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                By accessing and using SRM BrokeBuy ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These Terms of Service apply to all users of SRM BrokeBuy, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Platform Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                SRM BrokeBuy is an online marketplace exclusively for SRM Institute of Science and Technology students to buy and sell second-hand goods. The platform facilitates transactions between verified SRM students only.
              </p>
              <p>
                We provide a secure environment for peer-to-peer transactions, including integrated wallet services, messaging systems, and safety features designed specifically for the campus community.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                <strong>Exclusive Access:</strong> SRM BrokeBuy is exclusively available to currently enrolled students of SRM Institute of Science and Technology.
              </p>
              <p>
                <strong>Verification Required:</strong> All users must verify their identity using valid SRM student credentials, including student ID and institutional email address.
              </p>
              <p>
                <strong>Account Responsibility:</strong> Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Acceptable Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p><strong>Permitted Items:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Textbooks and academic materials</li>
                <li>Electronics and gadgets</li>
                <li>Clothing and accessories</li>
                <li>Furniture and home items</li>
                <li>Sports and recreational equipment</li>
                <li>Other legal second-hand goods</li>
              </ul>
              
              <p><strong>Prohibited Items:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Food, beverages, or perishable items</li>
                <li>Medicines, drugs, or controlled substances</li>
                <li>Weapons or dangerous items</li>
                <li>Stolen or counterfeit goods</li>
                <li>Adult content or materials</li>
                <li>Items that violate intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. User Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>Users agree to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide accurate and truthful information in listings</li>
                <li>Communicate respectfully with other users</li>
                <li>Complete transactions in good faith</li>
                <li>Report suspicious or inappropriate behavior</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
              
              <p>Users agree NOT to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Create fake accounts or impersonate others</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Attempt to circumvent platform security measures</li>
                <li>Use the platform for commercial or business purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Transactions and Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                <strong>Wallet System:</strong> All transactions must be conducted through our integrated wallet system for security and record-keeping purposes.
              </p>
              <p>
                <strong>Transaction Fees:</strong> The platform may charge a small service fee on completed transactions to maintain and improve our services.
              </p>
              <p>
                <strong>Payment Processing:</strong> We partner with secure payment processors to handle financial transactions. We do not store sensitive payment information.
              </p>
              <p>
                <strong>Dispute Resolution:</strong> While we facilitate transactions, users are primarily responsible for resolving disputes. We may assist in mediation when appropriate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                Your privacy is important to us. Our Privacy Policy, which describes how we collect, use, and protect your information, is incorporated into these Terms by reference.
              </p>
              <p>
                By using SRM BrokeBuy, you consent to the collection and use of your information as outlined in our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                The SRM BrokeBuy platform, including its design, functionality, and content, is protected by intellectual property laws. Users may not copy, modify, or distribute platform content without permission.
              </p>
              <p>
                Users retain ownership of content they post but grant SRM BrokeBuy a license to display and use such content for platform operations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                SRM BrokeBuy serves as a platform connecting buyers and sellers. We are not responsible for the quality, safety, legality, or accuracy of items listed on the platform.
              </p>
              <p>
                Users engage in transactions at their own risk. We recommend following our safety guidelines and meeting in public places on campus.
              </p>
              <p>
                To the maximum extent permitted by law, SRM BrokeBuy shall not be liable for any indirect, incidental, or consequential damages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Account Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms of Service or engage in inappropriate behavior.
              </p>
              <p>
                Users may delete their accounts at any time. Upon deletion, access to the platform and associated data will be removed according to our data retention policies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                We reserve the right to modify these Terms of Service at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of updated terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <div className="ml-4">
                <p><strong>Email:</strong> legal@srmbrokeboy.com</p>
                <p><strong>Address:</strong> SRM Institute of Science and Technology, Kattankulathur, Tamil Nadu, India</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            By using SRM BrokeBuy, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;