import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { iceCreamFlavors, sizeOptions, containerOptions } from '../data/mock';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useToast } from '../hooks/use-toast';
import { 
  ShoppingCart, 
  Star, 
  Filter,
  Search,
  Plus,
  Minus,
  IceCream,
  AlertCircle
} from 'lucide-react';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    size: 'single',
    container: 'cup',
    quantity: 1
  });
  
  const { addToCart } = useCart();
  const { toast } = useToast();

  const categories = ['All', ...new Set(iceCreamFlavors.map(flavor => flavor.category))];

  const filteredFlavors = iceCreamFlavors.filter(flavor => {
    const matchesCategory = selectedCategory === 'All' || flavor.category === selectedCategory;
    const matchesSearch = flavor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flavor.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && flavor.available;
  });

  const calculatePrice = (basePrice) => {
    const sizeMultiplier = sizeOptions.find(s => s.id === orderDetails.size)?.multiplier || 1;
    const containerCost = containerOptions.find(c => c.id === orderDetails.container)?.extraCost || 0;
    return (basePrice * sizeMultiplier) + containerCost;
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const totalPrice = calculatePrice(selectedItem.price);
    const sizeOption = sizeOptions.find(s => s.id === orderDetails.size);
    const containerOption = containerOptions.find(c => c.id === orderDetails.container);

    const cartItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      image: selectedItem.image,
      basePrice: selectedItem.price,
      size: orderDetails.size,
      sizeName: sizeOption.name,
      container: orderDetails.container,
      containerName: containerOption.name,
      quantity: orderDetails.quantity,
      totalPrice: totalPrice,
      allergens: selectedItem.allergens
    };

    addToCart(cartItem);
    
    toast({
      title: "Added to Cart!",
      description: `${orderDetails.quantity}x ${selectedItem.name} (${sizeOption.name}) added to your cart.`,
    });

    setSelectedItem(null);
    setOrderDetails({ size: 'single', container: 'cup', quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge className="bg-gradient-to-r from-orange-400 to-pink-400 text-white border-0 px-4 py-2">
            <IceCream className="h-4 w-4 mr-2" />
            Our Menu
          </Badge>
          <h1 className="text-4xl font-bold text-gray-800">Delicious Ice Cream Flavors</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handcrafted with premium ingredients and lots of love. Choose from our wide variety of flavors.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search flavors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-400"
              />
            </div>

            {/* Category Filter */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-5 lg:w-auto bg-white border border-orange-200">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-pink-400 data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredFlavors.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No flavors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFlavors.map((flavor, index) => (
              <Card 
                key={flavor.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {flavor.popular && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-white/90 text-orange-600 border-orange-200">
                      {flavor.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-orange-500 transition-colors">
                    {flavor.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {flavor.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-orange-500">
                      ${flavor.price.toFixed(2)}
                    </span>
                    <div className="text-xs text-gray-500">
                      Starting price
                    </div>
                  </div>

                  {flavor.allergens.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-gray-500">
                        Contains: {flavor.allergens.join(', ')}
                      </span>
                    </div>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white border-0 group"
                        onClick={() => setSelectedItem(flavor)}
                      >
                        <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Add to Cart
                      </Button>
                    </DialogTrigger>
                    
                    {selectedItem?.id === flavor.id && (
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <img 
                              src={selectedItem.image} 
                              alt={selectedItem.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span>{selectedItem.name}</span>
                          </DialogTitle>
                          <DialogDescription>
                            Customize your order and add to cart
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                          {/* Size Selection */}
                          <div className="space-y-2">
                            <Label>Size</Label>
                            <Select 
                              value={orderDetails.size} 
                              onValueChange={(value) => setOrderDetails({...orderDetails, size: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {sizeOptions.map(size => (
                                  <SelectItem key={size.id} value={size.id}>
                                    {size.name} (×{size.multiplier})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Container Selection */}
                          <div className="space-y-2">
                            <Label>Container</Label>
                            <Select 
                              value={orderDetails.container} 
                              onValueChange={(value) => setOrderDetails({...orderDetails, container: value})}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {containerOptions.map(container => (
                                  <SelectItem key={container.id} value={container.id}>
                                    {container.name} 
                                    {container.extraCost > 0 && ` (+$${container.extraCost.toFixed(2)})`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Quantity */}
                          <div className="space-y-2">
                            <Label>Quantity</Label>
                            <div className="flex items-center space-x-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setOrderDetails({
                                  ...orderDetails, 
                                  quantity: Math.max(1, orderDetails.quantity - 1)
                                })}
                                disabled={orderDetails.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-lg font-medium w-8 text-center">
                                {orderDetails.quantity}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setOrderDetails({
                                  ...orderDetails, 
                                  quantity: orderDetails.quantity + 1
                                })}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Price Summary */}
                          <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Base price:</span>
                              <span>${selectedItem.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Size multiplier:</span>
                              <span>×{sizeOptions.find(s => s.id === orderDetails.size)?.multiplier}</span>
                            </div>
                            {containerOptions.find(c => c.id === orderDetails.container)?.extraCost > 0 && (
                              <div className="flex justify-between text-sm">
                                <span>Container fee:</span>
                                <span>+${containerOptions.find(c => c.id === orderDetails.container)?.extraCost.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm">
                              <span>Quantity:</span>
                              <span>×{orderDetails.quantity}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                              <span>Total:</span>
                              <span className="text-orange-500">
                                ${(calculatePrice(selectedItem.price) * orderDetails.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <Button 
                            onClick={handleAddToCart}
                            className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white border-0"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart - ${(calculatePrice(selectedItem.price) * orderDetails.quantity).toFixed(2)}
                          </Button>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Menu;