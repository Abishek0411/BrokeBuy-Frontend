import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Clock, User, ShoppingCart, MessageCircle, Heart } from 'lucide-react';
import api from '@/lib/axios';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  seller: {
    name: string;
    reg_no: string;
    avatar?: string;
  };
  location: string;
  created_at: string;
  is_available: boolean;
  posted_by: string;
}

const ViewDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchListing();
    }
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await api.get(`/listings/${id}`);
      setListing(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load listing details",
        variant: "destructive",
      });
      navigate('/listings/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!listing) return;
    
    setIsBuying(true);
    try {
      await api.post(`/buy/${listing.id}`);
      toast({
        title: "Purchase Successful!",
        description: "Your purchase has been processed successfully",
      });
      navigate('/purchases');
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to process your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBuying(false);
    }
  };

  const handleMessageSeller = () => {
    if (!listing) return;
    
    navigate('/messages', { 
      state: { targetUserId: listing.posted_by } 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
        <Button onClick={() => navigate('/listings/')}>
          Back to Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/listings/')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Marketplace
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="space-y-4">
          {listing.images.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {listing.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="p-0">
                        <img
                          src={image}
                          alt={`${listing.title} - Image ${index + 1}`}
                          className="w-full h-96 object-cover rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {listing.images.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-96 bg-muted flex items-center justify-center rounded-lg">
                  <span className="text-muted-foreground">No images available</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatDate(listing.created_at)}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary">{listing.condition}</Badge>
              <Badge variant="outline">{listing.category}</Badge>
              {listing.is_available && (
                <Badge variant="default">Available</Badge>
              )}
            </div>
          </div>

          <div>
            <span className="text-4xl font-bold text-primary">
              {formatCurrency(listing.price)}
            </span>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {listing.description}
              </p>
            </CardContent>
          </Card>

          {/* Seller Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Seller Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={listing.seller.avatar} />
                  <AvatarFallback>
                    {listing.seller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{listing.seller.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {listing.seller.reg_no}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full btn-primary"
              onClick={handleBuyNow}
              disabled={!listing.is_available || isBuying}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isBuying ? 'Processing...' : 'Buy Now'}
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={handleMessageSeller}
                className="flex-1"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Seller
              </Button>
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;