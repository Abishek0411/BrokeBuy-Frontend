import React from 'react';
import { ShoppingCart } from 'lucide-react';
import loadingCartImage from '@/assets/loading-cart.png';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-hero flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Cart with Image */}
        <div className="relative mb-8 h-32 overflow-hidden">
          <img 
            src={loadingCartImage}
            alt="Loading cart"
            className="absolute inset-0 w-full h-full object-contain animate-cart-move"
          />
        </div>
        
        {/* Fallback animated cart icon */}
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
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;