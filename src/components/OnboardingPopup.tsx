import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Coins } from 'lucide-react';

interface OnboardingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingPopup: React.FC<OnboardingPopupProps> = ({ isOpen, onClose }) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('showOnboarding', 'false');
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent-mint rounded-full">
                <Coins className="h-5 w-5 text-primary" />
              </div>
              <DialogTitle className="text-xl font-bold">Welcome to SRM BrokeBuy!</DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
          You have been given enough credit points. These are just virtual credit points meant only for ledger purpose. 
          Talk with the seller, if satisfied, give a buying request to the seller and once the seller confirms the request, 
          pay them and get the product carefully.
          <br /><br />
          <strong>Credit points will be deducted from the buyer and added to the seller.</strong>
          <br />
          The seller must mark the listing as sold after the delivery.
        </DialogDescription>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dont-show-again"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
            />
            <label
              htmlFor="dont-show-again"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Don't show me again
            </label>
          </div>
          
          <Button onClick={handleClose} className="w-full btn-primary">
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingPopup;