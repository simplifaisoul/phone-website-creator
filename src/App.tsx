import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  artist: string;
}

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

interface CartItem extends Product {
  quantity: number;
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      title: "Twisted Sunset",
      price: 299,
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800",
      description: "A mesmerizing blend of warm sunset hues twisted into abstract perfection.",
      artist: "Sarah Chen"
    },
    {
      id: 2,
      title: "Purple Dreams",
      price: 399,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      description: "Deep purple tones create a dreamlike atmosphere in this stunning piece.",
      artist: "Michael Torres"
    },
    {
      id: 3,
      title: "Color Explosion",
      price: 499,
      image: "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800",
      description: "An explosive celebration of color and movement captured in time.",
      artist: "Emma Williams"
    },
    {
      id: 4,
      title: "Neon Nights",
      price: 349,
      image: "https://images.unsplash.com/photo-1541480551145-2370a440d585?w=800",
      description: "Urban energy meets artistic expression in this vibrant neon masterpiece.",
      artist: "David Park"
    },
    {
      id: 5,
      title: "Rainbow Flow",
      price: 449,
      image: "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=800",
      description: "Fluid rainbow colors flow seamlessly in this captivating abstract work.",
      artist: "Lisa Anderson"
    },
    {
      id: 6,
      title: "Gradient Paradise",
      price: 379,
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
      description: "Paradise reimagined through bold gradients and artistic vision.",
      artist: "James Liu"
    }
  ];

  const reviews: Review[] = [
    {
      name: "Jennifer Martinez",
      rating: 5,
      text: "Absolutely stunning artwork! The colors are even more vibrant in person. The quality exceeded my expectations and the shipping was incredibly fast.",
      date: "January 28, 2026",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Robert Thompson",
      rating: 5,
      text: "I've purchased three pieces now and each one transforms the room completely. The customer service is exceptional and they really care about their art.",
      date: "January 25, 2026",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      name: "Emily Chen",
      rating: 5,
      text: "As an interior designer, I recommend Twisted Colors to all my clients. The quality, creativity, and professionalism are unmatched.",
      date: "January 22, 2026",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Marcus Johnson",
      rating: 5,
      text: "The 'Color Explosion' piece is the centerpiece of my living room. Everyone who visits asks where I got it. Worth every penny!",
      date: "January 20, 2026",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    {
      name: "Sarah Williams",
      rating: 5,
      text: "Beautiful art at reasonable prices. The checkout process was smooth and my piece arrived perfectly packaged. Highly recommend!",
      date: "January 18, 2026",
      avatar: "https://i.pravatar.cc/150?img=9"
    }
  ];

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowCart(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderHome = () => (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl mb-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 opacity-90"></div>
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200')] bg-cover bg-center mix-blend-overlay"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        ></motion.div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-7xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            Twisted Colors
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl text-white mb-8 font-light"
          >
            Where Art Meets Vibrant Expression
          </motion.p>
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('shop')}
            className="bg-white text-purple-600 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all"
          >
            Shop Collection
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {[
          { number: "2,500+", label: "Happy Customers" },
          { number: "5,000+", label: "Artworks Sold" },
          { number: "4.9/5", label: "Customer Rating" },
          { number: "50+", label: "Featured Artists" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + (index * 0.1) }}
            className="bg-white rounded-2xl p-8 text-center shadow-lg"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600 font-semibold">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Featured Collection Preview */}
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Featured Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + (index * 0.15) }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              onClick={() => {
                setSelectedProduct(product);
                setActiveSection('product');
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm">Click to view details</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">by {product.artist}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-purple-600">${product.price}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => setActiveSection('shop')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-xl"
          >
            View Full Collection
          </button>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          What Our Customers Say
        </h2>
        <p className="text-center text-gray-600 text-xl mb-12">Join thousands of satisfied art lovers</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + (index * 0.1) }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-lg">{review.name}</h4>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
              <p className="text-gray-400 text-sm">{review.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderShop = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
        Complete Collection
      </h2>
      <p className="text-center text-gray-600 text-xl mb-12">Discover your perfect piece</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
            onClick={() => {
              setSelectedProduct(product);
              setActiveSection('product');
            }}
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-purple-600">
                ${product.price}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">by {product.artist}</p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderProductDetail = () => {
    if (!selectedProduct) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <button
          onClick={() => setActiveSection('shop')}
          className="mb-8 text-purple-600 font-semibold hover:underline flex items-center text-lg"
        >
          ← Back to Collection
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              {selectedProduct.title}
            </h1>
            <p className="text-2xl text-gray-600 mb-6">by {selectedProduct.artist}</p>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {selectedProduct.description}
            </p>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-600 text-xl">Price:</span>
                <span className="text-5xl font-bold text-purple-600">${selectedProduct.price}</span>
              </div>
              <div className="space-y-3 text-gray-700 mb-6">
                <p>✓ Free Shipping Worldwide</p>
                <p>✓ 30-Day Money Back Guarantee</p>
                <p>✓ Premium Quality Canvas</p>
                <p>✓ Certificate of Authenticity Included</p>
              </div>
            </div>
            <button
              onClick={() => addToCart(selectedProduct)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-6 rounded-2xl text-2xl font-bold hover:scale-105 transition-transform shadow-2xl hover:shadow-purple-500/50"
            >
              Add to Cart - ${selectedProduct.price}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderAbout = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        About Twisted Colors
      </h2>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          At <span className="font-bold text-purple-600">Twisted Colors</span>, we believe art should be accessible, 
          vibrant, and transformative. Founded in 2020, we've become a leading destination for contemporary abstract art.
        </p>
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          We work with over 50 talented artists worldwide to curate a collection that brings joy, inspiration, 
          and color into homes and offices. Each piece is carefully selected for its ability to transform spaces 
          and evoke emotion.
        </p>
        <p className="text-xl text-gray-700 leading-relaxed">
          With over 5,000 artworks sold to satisfied customers in 40+ countries, we're committed to 
          exceptional quality, fair pricing, and outstanding customer service. Your satisfaction is our masterpiece.
        </p>
      </div>
    </motion.div>
  );

  const renderContact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
          Get In Touch
        </h2>
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
          {submitted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">✓</div>
              <div className="text-3xl text-green-600 font-bold">Thank You!</div>
              <p className="text-gray-600 mt-4 text-lg">We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 outline-none transition text-lg"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 outline-none transition text-lg"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">Message</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 outline-none transition resize-none text-lg"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-5 rounded-xl text-xl font-bold hover:scale-105 transform transition shadow-xl"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveSection('home')}
            >
              Twisted Colors
            </motion.div>
            <div className="flex items-center space-x-8">
              {['home', 'shop', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-lg font-semibold capitalize transition ${
                    activeSection === section
                      ? 'text-purple-600 scale-110'
                      : 'text-gray-600 hover:text-purple-500'
                  }`}
                >
                  {section}
                </button>
              ))}
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
              >
                Cart ({cart.length})
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && <div key="home">{renderHome()}</div>}
          {activeSection === 'shop' && <div key="shop">{renderShop()}</div>}
          {activeSection === 'product' && <div key="product">{renderProductDetail()}</div>}
          {activeSection === 'about' && <div key="about">{renderAbout()}</div>}
          {activeSection === 'contact' && <div key="contact">{renderContact()}</div>}
        </AnimatePresence>
      </div>

      {/* Shopping Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                  ×
                </button>
              </div>
              
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-xl text-gray-600">Your cart is empty</p>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setActiveSection('shop');
                    }}
                    className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-6 mb-8">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-6 bg-gray-50 rounded-2xl p-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          <p className="text-gray-600">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t-2 border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-2xl font-bold">Total:</span>
                      <span className="text-4xl font-bold text-purple-600">${cartTotal}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-5 rounded-2xl text-xl font-bold hover:scale-105 transition shadow-xl">
                      Proceed to Checkout
                    </button>
                    <p className="text-center text-gray-500 mt-4">Free shipping on all orders</p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Twisted Colors</h3>
              <p className="opacity-90">Bringing vibrant art to your world since 2020</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <p className="opacity-90 cursor-pointer hover:opacity-100">Shop Collection</p>
                <p className="opacity-90 cursor-pointer hover:opacity-100">About Us</p>
                <p className="opacity-90 cursor-pointer hover:opacity-100">Shipping Info</p>
                <p className="opacity-90 cursor-pointer hover:opacity-100">Returns</p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="opacity-90">Email: hello@twistedcolors.com</p>
              <p className="opacity-90">Phone: +1-343-571-9939</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-lg">© 2026 Twisted Colors. All rights reserved.</p>
            <p className="mt-2 opacity-90">Transforming spaces with vibrant art</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
