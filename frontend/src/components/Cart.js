import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { useToast } from '../hooks/use-toast';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard,
  MapPin,
  Clock,
  Phone,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [orderType, setOrderType] = useState('pickup'); // pickup or delivery

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      updateQuantity(cartId, newQuantity);
    }
  };

  const handleRemoveItem = (cartId, itemName) => {
    removeFromCart(cartId);
    toast({
      title: "Item Removed",
      description: `${itemName} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number.",
        variant: "destructive"
      });
      return;
    }

    // Mock checkout process
    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Your order for $${cart.total.toFixed(2)} has been placed. We'll call you at ${customerInfo.phone} when it's ready!`,
    });

    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
      setCustomerInfo({ name: '', phone: '', email: '', notes: '' });
    }, 2000);
  };

  const taxRate = 0.08; // 8% tax
  const taxAmount = cart.total * taxRate;
  const finalTotal = cart.total + taxAmount;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <div className="text-gray-400 mb-8">
              <ShoppingBag className="h-24 w-24 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Looks like you haven't added any delicious ice cream to your cart yet. 
              Browse our menu to find your perfect flavor!
            </p>
            <Link to="/menu">
              <Button size="lg" className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white border-0">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Cart</h1>
          <p className="text-gray-600">Review your order and complete checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Order Items ({cart.items.length})</span>
                </CardTitle>
                {cart.items.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear Cart
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.cartId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{item.sizeName} • {item.containerName}</p>
                        {item.allergens.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <AlertCircle className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs">Contains: {item.allergens.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right min-w-20">
                        <p className="font-semibold text-orange-500">
                          ${(item.totalPrice * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${item.totalPrice.toFixed(2)} each
                        </p>
                      </div>

                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveItem(item.cartId, item.name)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Checkout */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-orange-500">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Type */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Order Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={orderType === 'pickup' ? 'default' : 'outline'}
                    onClick={() => setOrderType('pickup')}
                    className={orderType === 'pickup' ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white border-0' : ''}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Pickup
                  </Button>
                  <Button
                    variant={orderType === 'delivery' ? 'default' : 'outline'}
                    onClick={() => setOrderType('delivery')}
                    className={orderType === 'delivery' ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white border-0' : ''}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Delivery
                  </Button>
                </div>
                
                {orderType === 'pickup' && (
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-700 font-medium">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Pickup Location
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      123 Sunshine Boulevard, Happy Valley, CA 90210
                    </p>
                    <p className="text-sm text-gray-600">
                      Ready in 15-20 minutes
                    </p>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Delivery Info
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Delivery within 3 miles: $3.99
                    </p>
                    <p className="text-sm text-gray-600">
                      Estimated time: 30-45 minutes
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="(555) 123-4567"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Special Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requests or notes..."
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button 
              onClick={handleCheckout}
              size="lg"
              className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white border-0"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Place Order - ${finalTotal.toFixed(2)}
            </Button>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Phone className="h-4 w-4" />
                <span>Questions? Call us at (555) 123-CREAM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;