import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Package, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import api from '@/lib/axios';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  location: string;
  created_at: string;
  is_available: boolean;
  views: number;
  interested_users: number;
}

const MyListings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await api.get('/listings/my-listings');
      setListings(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your listings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListingStatus = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/listings/${id}/toggle-status`);
      setListings(listings.map(listing => 
        listing.id === id 
          ? { ...listing, is_available: !currentStatus }
          : listing
      ));
      toast({
        title: "Listing updated",
        description: `Listing has been ${!currentStatus ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update listing status",
        variant: "destructive",
      });
    }
  };

  const deleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      await api.delete(`/listings/${id}`);
      setListings(listings.filter(listing => listing.id !== id));
      toast({
        title: "Listing deleted",
        description: "Your listing has been removed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      });
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

  const activeListings = listings.filter(listing => listing.is_available);
  const inactiveListings = listings.filter(listing => !listing.is_available);

  const ListingCard = ({ listing }: { listing: Listing }) => (
    <Card className="group hover-card">
      <div className="relative">
        {listing.images.length > 0 ? (
          <div className="w-full h-48 bg-muted flex items-center justify-center rounded-t-lg overflow-hidden">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center rounded-t-lg">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant={listing.is_available ? "default" : "secondary"}>
            {listing.is_available ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(listing.price)}
          </span>
          <Badge variant="outline">{listing.category}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="line-clamp-2 mb-4">
          {listing.description}
        </CardDescription>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>Listed on {formatDate(listing.created_at)}</span>
          <div className="flex items-center gap-4">
            <span>{listing.views} views</span>
            <span>{listing.interested_users} interested</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.location.href = `/listings/${listing.id}/edit`}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleListingStatus(listing.id, listing.is_available)}
          >
            {listing.is_available ? (
              <EyeOff className="h-3 w-3" />
            ) : (
              <Eye className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteListing(listing.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3 w-3" />
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">My Listings</h1>
          <p className="text-muted-foreground">Manage your items and track their performance</p>
        </div>
        <Link to="/sell">
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add New Listing
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">
            Active ({activeListings.length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive ({inactiveListings.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All ({listings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeListings.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No active listings</h3>
              <p className="text-muted-foreground mb-4">
                Start selling by creating your first listing
              </p>
              <Link to="/sell">
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Listing
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="inactive">
          {inactiveListings.length === 0 ? (
            <div className="text-center py-12">
              <EyeOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No inactive listings</h3>
              <p className="text-muted-foreground">
                All your listings are currently active
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inactiveListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyListings;