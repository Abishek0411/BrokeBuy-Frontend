import React, { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OnboardingPopup from '@/components/OnboardingPopup';
import {
  ShoppingCart,
  Shield,
  Wallet,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';
import heroBackground from '@/assets/hero-bg.png';
import { useToast } from '@/hooks/use-toast';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-tertiary" />,
      title: "Secure Transactions",
      description: "Built-in wallet system ensures safe and verified payments for all transactions.",
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "SRM Community",
      description: "Exclusively for SRM students - buy and sell within your trusted community.",
    },
    {
      icon: <Wallet className="h-8 w-8 text-accent-mint-dark" />,
      title: "Integrated Wallet",
      description: "Top up your wallet and manage all payments seamlessly within the platform.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Direct Messaging",
      description: "Chat directly with buyers and sellers to negotiate and coordinate.",
    },
  ];

  const stats = [
    { number: "2,500+", label: "Active Students" },
    { number: "5,000+", label: "Items Sold" },
    { number: "₹50L+", label: "Transaction Volume" },
    { number: "4.8", label: "Average Rating" },
  ];

  interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];  // already optimized URLs
  created_at: string;
  is_available: boolean;
  views: number;
  interested_users: number;
  seller_name?: string;
  seller_reg_no?: string;
}
const [recentListings, setRecentListings] = useState<Listing[]>([]);
const { toast } = useToast();

useEffect(() => {
  fetchRecentListings();
}, []);

// Check if onboarding should be shown after user login
useEffect(() => {
  if (isAuthenticated && user) {
    const shouldShowOnboarding = localStorage.getItem('showOnboarding') !== 'false';
    if (shouldShowOnboarding) {
      setShowOnboarding(true);
    }
  }
}, [isAuthenticated, user]);

const fetchRecentListings = async () => {
  try {
    const response = await api.get<Listing[]>('/listings/recent');
    setRecentListings(response.data);
  } catch (error) {
    toast({
      title: "Error loading recent listings",
      description: "Please try again later.",
      variant: "destructive",
    });
  }
};


  return (
    <div className="min-h-screen">
      {/* Onboarding Popup */}
      <OnboardingPopup 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-32 bg-gradient-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-accent-mint text-primary" variant="secondary">
              🛍️ Exclusively for SRM Community
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Your Campus
              <span className="block gradient-text bg-gradient-to-r from-accent-mint to-tertiary bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-slide-up max-w-2xl mx-auto">
              Buy and sell second-hand goods securely with your SRM community. 
              Integrated wallet system for safe transactions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={() => navigate('/listings/')}
                    size="lg"
                    className="bg-accent-mint text-primary hover:bg-accent-mint-dark font-semibold px-8"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Browse Marketplace
                  </Button>
                  <Button
                    onClick={() => navigate('/sell')}
                    variant="outline"
                    size="lg"
                    className="border-white text-black hover:bg-white hover:text-primary"
                  >
                    Start Selling
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate('/register')}
                    size="lg"
                    className="bg-accent-mint text-primary hover:bg-accent-mint-dark font-semibold px-8"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => navigate('/auth/login')}
                    variant="outline"
                    size="lg"
                    className="border-white text-black hover:bg-white hover:text-primary"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose SRM BrokeBuy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built specifically for the SRM community with features that prioritize 
              safety, convenience, and trust.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-accent rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings Preview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Latest Listings
              </h2>
              <p className="text-xl text-muted-foreground">
                Fresh items from your SRM community
              </p>
            </div>
            <Button
              onClick={() => navigate('/listings/')}
              className="btn-primary mt-4 md:mt-0"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* --- UPDATED GRID LOGIC --- */}
          <div className="grid md:grid-cols-3 gap-6">
            {recentListings.map((item, index) => (
              <Card key={index} className="glass-card hover-lift cursor-pointer" onClick={() => navigate(`/listings/${item.id}`)}>
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    // Uses the first image from the 'images' array with a fallback
                    src={item.images?.[0] || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-2xl font-bold text-secondary">
                      {/* Prepends the Rupee symbol to the price */}
                      ₹{item.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {/* Uses 'seller_name' with a fallback */}
                      by {item.seller_name || "Unknown"}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
          {/* --- END UPDATED GRID LOGIC --- */}

        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and straightforward process to buy and sell
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Account",
                description: "Sign up with your SRM email and verify your student status",
                icon: <Users className="h-8 w-8" />,
              },
              {
                step: "2",
                title: "List or Browse",
                description: "Post items for sale or browse through available listings",
                icon: <ShoppingCart className="h-8 w-8" />,
              },
              {
                step: "3",
                title: "Secure Transaction",
                description: "Complete purchases through our integrated wallet system",
                icon: <CheckCircle className="h-8 w-8" />,
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-mint rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    {step.step}
                  </div>
                  <div className="absolute inset-0 mx-auto w-16 h-16 bg-accent-mint rounded-full flex items-center justify-center opacity-20 animate-pulse">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of SRM students already using BrokeBuy for safe, 
              convenient campus trading.
            </p>
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-accent-mint text-primary hover:bg-accent-mint-dark font-semibold px-8"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;