import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ShoppingCart } from 'lucide-react';

interface BuyNowConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BuyNowConfirmationModal: React.FC<BuyNowConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent className="animate-scale-in">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-accent-mint rounded-full">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Are you sure you want to send a buying request? This will notify the seller and initiate the purchase process.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isLoading} className="btn-primary">
            {isLoading ? 'Processing...' : 'Confirm Purchase'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BuyNowConfirmationModal;