import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Package, ShoppingBag, MessageCircle, Star } from 'lucide-react';
import api from '@/lib/axios';

interface Purchase {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  seller_name: string;
  seller_reg_no: string;
  location: string;
  created_at: string;
  is_available: boolean;
}

const Purchases: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await api.get('/listings/purchased');
      setPurchases(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your purchases",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
      month: 'short',
      year: 'numeric'
    });
  };

  const PurchaseCard = ({ purchase }: { purchase: Purchase }) => (
    <Card className="group hover-card">
      <div className="relative">
        {purchase.images.length > 0 ? (
          <img
            src={purchase.images[0]}
            alt={purchase.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center rounded-t-lg">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={purchase.is_available ? "secondary" : "default"}>
            {purchase.is_available ? "Available" : "Sold"}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{purchase.title}</CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(purchase.price)}
          </span>
          <Badge variant="outline">{purchase.category}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="line-clamp-2 mb-4">
          {purchase.description}
        </CardDescription>
        
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div>Purchased on {formatDate(purchase.created_at)}</div>
          <div>Sold by {purchase.seller_name} ({purchase.seller_reg_no})</div>
          <div>Condition: {purchase.condition}</div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <MessageCircle className="h-3 w-3 mr-1" />
            Contact Seller
          </Button>
          <Button variant="outline" size="sm">
            <Star className="h-3 w-3 mr-1" />
            Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4"></div>
                <div className="h-6 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">My Purchases</h1>
        <p className="text-muted-foreground">Track your orders and purchase history</p>
      </div>

      {purchases.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your purchases here
          </p>
          <Button 
            onClick={() => window.location.href = '/listings/'}
            className="btn-primary"
          >
            Browse Marketplace
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Purchases;