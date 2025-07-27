import React from 'react';
import { ShoppingCart } from 'lucide-react';
// Updated import to use your animated GIF
import shoppingCartGif from '@/assets/shopping-cart.gif';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-hero flex items-center justify-center z-50">
      <div className="text-center">
        {/* --- MODIFIED SECTION --- */}
        {/* Display the animated GIF */}
        <div className="mb-8 flex justify-center items-center h-32">
          <img 
            src={shoppingCartGif}
            alt="Loading marketplace animation"
            // The GIF provides its own animation, so we just control its size
            className="h-full object-contain"
          />
        </div>
        {/* --- END MODIFIED SECTION --- */}
        
        {/* Fallback animated cart icon (This remains as a good fallback) */}
        <div className="mb-6">
          <ShoppingCart className="h-16 w-16 text-accent-mint mx-auto animate-pulse-glow" />
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">SRM BrokeBuy</h2>
          <p className="text-accent-mint">Loading your marketplace...</p>
          
          {/* Loading dots */}
          <div className="flex justify-center space-x-1 pt-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-accent-mint rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;