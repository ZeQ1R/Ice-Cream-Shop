import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { 
  shopInfo, 
  iceCreamFlavors, 
  specialOffers, 
  customerReviews, 
  galleryImages 
} from '../data/mock';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  IceCream, 
  Star, 
  Clock, 
  MapPin, 
  Phone,
  ChefHat,
  Heart,
  Award,
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = galleryImages.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const popularFlavors = iceCreamFlavors.filter(flavor => flavor.popular).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-orange-400 to-pink-400 text-white border-0 px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Since 1985
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  {shopInfo.name}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {shopInfo.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/menu">
                  <Button size="lg" className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white border-0 group">
                    <IceCream className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Explore Menu
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                    <MapPin className="h-5 w-5 mr-2" />
                    Visit Store
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Open Today</p>
                    <p className="text-sm text-gray-600">{shopInfo.hours.weekdays}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Call Us</p>
                    <p className="text-sm text-gray-600">{shopInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-700">
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {heroImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-110' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-orange-400 to-pink-400 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">40+</p>
                    <p className="text-sm text-gray-600">Years of Excellence</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -right-8 bg-white rounded-xl p-6 shadow-lg border border-orange-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-pink-400 to-orange-400 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">10K+</p>
                    <p className="text-sm text-gray-600">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Flavors Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-pink-400 to-orange-400 text-white border-0 px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              Customer Favorites
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800">Most Popular Flavors</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our signature creations that have won hearts and taste buds across the community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularFlavors.map((flavor, index) => (
              <Card 
                key={flavor.id} 
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-orange-400 to-pink-400 text-white border-0">
                      Popular
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-orange-500 transition-colors">
                    {flavor.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {flavor.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-500">
                      ${flavor.price.toFixed(2)}
                    </span>
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      {flavor.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu">
              <Button size="lg" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 group">
                View Full Menu
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-100 to-pink-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-red-400 to-pink-400 text-white border-0 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Limited Time
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800">Special Offers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these amazing deals and save on your favorite treats
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialOffers.map((offer, index) => (
              <Card 
                key={offer.id} 
                className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 bg-white/90 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                    <ChefHat className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{offer.title}</CardTitle>
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    {offer.discount}
                  </div>
                  <CardDescription className="text-gray-600">
                    {offer.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      Code: {offer.code}
                    </Badge>
                    <p className="text-sm text-gray-500">
                      Valid until: {offer.validUntil}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              5-Star Reviews
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from real customers who love our ice cream
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerReviews.map((review, index) => (
              <Card 
                key={review.id} 
                className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    {review.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "{review.comment}"
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;