import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertTriangle, Shield, Flag, MessageCircle, CreditCard, Bug } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ReportIssue: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    issueType: '',
    priority: '',
    subject: '',
    description: '',
    userInvolved: '',
    listingId: '',
    contactEmail: ''
  });

  const issueTypes = [
    {
      value: 'user-behavior',
      label: 'Inappropriate User Behavior',
      icon: <Flag className="h-5 w-5" />,
      description: 'Report harassment, spam, or inappropriate conduct'
    },
    {
      value: 'fraudulent-listing',
      label: 'Fraudulent Listing',
      icon: <Shield className="h-5 w-5" />,
      description: 'Report fake items, scams, or misleading descriptions'
    },
    {
      value: 'payment-issue',
      label: 'Payment Issue',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Report payment problems or wallet issues'
    },
    {
      value: 'technical-bug',
      label: 'Technical Bug',
      icon: <Bug className="h-5 w-5" />,
      description: 'Report app crashes, loading issues, or other technical problems'
    },
    {
      value: 'safety-concern',
      label: 'Safety Concern',
      icon: <AlertTriangle className="h-5 w-5" />,
      description: 'Report potential safety risks or dangerous situations'
    },
    {
      value: 'other',
      label: 'Other Issue',
      icon: <MessageCircle className="h-5 w-5" />,
      description: 'Report any other concerns not covered above'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.issueType || !formData.subject || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Report Submitted",
      description: "Thank you for your report. Our team will review it and take appropriate action.",
    });

    // Reset form
    setFormData({
      issueType: '',
      priority: '',
      subject: '',
      description: '',
      userInvolved: '',
      listingId: '',
      contactEmail: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Report Issue</Badge>
          <h1 className="text-4xl font-bold mb-4">Report an Issue</h1>
          <p className="text-xl text-muted-foreground">
            Help us maintain a safe and trustworthy community by reporting any issues
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What type of issue would you like to report?</CardTitle>
            <CardDescription>
              Select the category that best describes your concern. All reports are taken seriously and reviewed promptly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Issue Type Selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Issue Type *</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {issueTypes.map((type) => (
                    <Card 
                      key={type.value}
                      className={`cursor-pointer transition-colors ${
                        formData.issueType === type.value 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, issueType: type.value }))}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="text-primary mt-1">
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{type.label}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Priority Level */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Priority Level</Label>
                <RadioGroup 
                  value={formData.priority} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low - General feedback or minor issues</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium - Problematic but not urgent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High - Serious issue requiring immediate attention</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief summary of the issue"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide as much detail as possible about the issue, including steps to reproduce if applicable"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              {/* Additional Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="userInvolved">User Involved (if applicable)</Label>
                  <Input
                    id="userInvolved"
                    placeholder="Username or email"
                    value={formData.userInvolved}
                    onChange={(e) => setFormData(prev => ({ ...prev, userInvolved: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="listingId">Listing ID (if applicable)</Label>
                  <Input
                    id="listingId"
                    placeholder="e.g., #12345"
                    value={formData.listingId}
                    onChange={(e) => setFormData(prev => ({ ...prev, listingId: e.target.value }))}
                  />
                </div>
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="your.email@srmist.edu.in"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">
                  Optional. We'll use this to follow up on your report if needed.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Report
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">What happens after you report?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-primary">1.</span>
              <span>Your report is immediately flagged for review by our moderation team</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary">2.</span>
              <span>We investigate the issue and take appropriate action within 24-48 hours</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary">3.</span>
              <span>If you provided contact information, we'll update you on the resolution</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary">4.</span>
              <span>Serious violations may result in account suspension or other disciplinary action</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportIssue;