import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  User,
  Wallet,
  Package,
  MessageSquare,
  LogOut,
  Menu,
  Search,
  Plus,
} from 'lucide-react';
import appIcon from '@/assets/app-icon.png';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const NavLinks = () => (
    <>
      <Link to="/listings/" className="btn-ghost">
        <Search className="h-4 w-4 mr-2" />
        {!isMobile && "Browse"}
      </Link>
      
      {isAuthenticated && (
        <Link to="/sell" className="btn-ghost">
          <Plus className="h-4 w-4 mr-2" />
          {!isMobile && "Sell"}
        </Link>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-glow">
            <img src={appIcon} alt="SRM BrokeBuy" className="h-10 w-10" />
            {!isMobile && (
              <span className="text-xl font-bold gradient-text">
                SRM BrokeBuy
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-6">
              <NavLinks />
            </div>
          )}

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Wallet Balance */}
                <Badge variant="secondary" className="hidden sm:flex">
                  <Wallet className="h-3 w-3 mr-1" />
                  {formatCurrency(user?.wallet_balance || 0)}
                </Badge>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user?.avatar}
                          alt={user?.name}
                        />
                        <AvatarFallback>
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user?.reg_no}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {/* Mobile wallet display */}
                    {isMobile && (
                      <>
                        <DropdownMenuItem>
                          <Wallet className="h-4 w-4 mr-2" />
                          Balance: {formatCurrency(user?.wallet_balance || 0)}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => navigate('/listings/my-listings')}>
                      <Package className="h-4 w-4 mr-2" />
                      My Listings
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => navigate('/purchases')}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      My Purchases
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => navigate('/messages')}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => navigate('/wallet')}>
                      <Wallet className="h-4 w-4 mr-2" />
                      Wallet
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/auth/login')}
                  size={isMobile ? "sm" : "default"}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  size={isMobile ? "sm" : "default"}
                  className="btn-primary"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && isAuthenticated && (
          <div className="pb-4 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              <NavLinks />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;