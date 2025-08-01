import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Heart, MessageSquareMore, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  seller?: {
    name?: string;
    reg_no?: string;
  };
  location?: string;
  created_at?: string;
  is_available?: boolean;
  posted_by?: string;
}

const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const currentUserId = user?.id;

  const categories = [
    'Electronics', 'Books', 'Clothing', 'Sports', 'Furniture', 
    'Stationery', 'Accessories', 'Vehicles', 'Other'
  ];

  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Used'];

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await api.get('/listings/');
      setListings(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load listings",
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
      month: 'short'
    });
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesCondition = selectedCondition === 'all' || listing.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition && listing.is_available;
  });

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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Marketplace</h1>
        <p className="text-muted-foreground">Discover amazing deals from fellow students</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 glass-card rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCondition} onValueChange={setSelectedCondition}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Conditions</SelectItem>
            {conditions.map(condition => (
              <SelectItem key={condition} value={condition}>{condition}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" className="flex items-center gap-2" title="Yet to be implemented">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredListings.length} item{filteredListings.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Listings grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => {
              const isOwnListing = currentUserId === listing.posted_by;
              return(
                <Card key={listing.id} className="group hover-card">
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
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
                      <Badge variant="secondary">{listing.condition}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {listing.location}
                      <Clock className="h-3 w-3 ml-2" />
                      {formatDate(listing.created_at)}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="line-clamp-2 mb-3">
                      {listing.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(listing.price)}
                      </span>
                      <Badge variant="outline">{listing.category}</Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Sold by {listing.seller?.name || 'Unknown'} ({listing.seller?.reg_no || 'N/A'})
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <div className="flex gap-2 w-full">
                      <Button 
                        className="flex-1 btn-primary"
                        onClick={() => navigate(`/listings/${listing.id}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={isOwnListing}
                        title={isOwnListing ? "You cannot message yourself" : "Message seller"}
                        onClick={() => {
                          if (!isOwnListing) {
                            navigate(`/messages/${listing.id}/${listing.posted_by}`);
                          }
                        }}
                      >
                        <MessageSquareMore className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
      )}
    </div>
  );
};

export default Marketplace;