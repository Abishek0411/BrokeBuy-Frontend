import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Heart, Coffee } from 'lucide-react';
import appIcon from '@/assets/app-icon.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={appIcon} alt="SRM BrokeBuy" className="h-8 w-8" />
              <span className="text-lg font-bold">SRM BrokeBuy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Secure marketplace for SRM students to buy and sell second-hand goods
              with integrated wallet system.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/listings/" className="text-muted-foreground hover:text-foreground transition-colors">
                Browse Marketplace
              </Link>
              <Link to="/sell" className="text-muted-foreground hover:text-foreground transition-colors">
                Sell Items
              </Link>
              <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link to="/safety" className="text-muted-foreground hover:text-foreground transition-colors">
                Safety Guidelines
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link to="/report" className="text-muted-foreground hover:text-foreground transition-colors">
                Report an Issue
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/community-guidelines" className="text-muted-foreground hover:text-foreground transition-colors">
                Community Guidelines
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>and</span>
              <Coffee className="h-4 w-4 text-amber-600" />
              <span>for SRM Students</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
              </Link>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            <p>&copy; 2025 SRM BrokeBuy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;