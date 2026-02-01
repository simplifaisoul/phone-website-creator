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

  // Bouncy animation for playful feel
  const bounceTransition = {
    type: "spring",
    stiffness: 300,
    damping: 10
  };

  const renderHome = () => (
    <div>
      {/* Hero Section - Blue Theme */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-[3rem] mb-16 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-cyan-400 to-sky-500 opacity-90"></div>
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200')] bg-cover bg-center mix-blend-overlay"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 2, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        ></motion.div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, ...bounceTransition }}
            className="text-7xl md:text-9xl font-bold text-white mb-6 drop-shadow-2xl"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Twisted Colors! 🎨
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-4xl text-white mb-8 font-light"
            style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}
          >
            Where Art Gets Playful & Fun! ✨
          </motion.p>
          <motion.button
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, ...bounceTransition }}
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('shop')}
            className="bg-white text-blue-600 px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-blue-500/50 transition-all"
            style={{ fontFamily: "'Lilita One', sans-serif" }}
          >
            Shop Now! 🛍️
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Section - Blue Theme */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {[
          { number: "2,500+", label: "Happy Customers", emoji: "😊" },
          { number: "5,000+", label: "Artworks Sold", emoji: "🎨" },
          { number: "4.9/5", label: "Customer Rating", emoji: "⭐" },
          { number: "50+", label: "Featured Artists", emoji: "👨‍🎨" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.9 + (index * 0.1), ...bounceTransition }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="bg-white rounded-3xl p-8 text-center shadow-xl border-4 border-blue-200"
          >
            <div className="text-5xl mb-2">{stat.emoji}</div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text mb-2"
                 style={{ fontFamily: "'Fredoka', sans-serif" }}>
              {stat.number}
            </div>
            <div className="text-gray-600 font-semibold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Collection Preview */}
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...bounceTransition }}
          className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 text-transparent bg-clip-text"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          Featured Collection 🌟
        </motion.h2>
        <p className="text-center text-gray-600 text-2xl mb-12" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          Check out our coolest pieces!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + (index * 0.15), ...bounceTransition }}
              whileHover={{ y: -15, rotate: 2 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer group border-4 border-blue-100"
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
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-lg font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      Click to view! 👀
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  by {product.artist}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-blue-600" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    ${product.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition"
                    style={{ fontFamily: "'Lilita One', sans-serif" }}
                  >
                    Add to Cart 🛒
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('shop')}
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-500 text-white px-14 py-5 rounded-full text-2xl font-bold hover:scale-105 transition-transform shadow-2xl"
            style={{ fontFamily: "'Lilita One', sans-serif" }}
          >
            View Full Collection 🎨
          </motion.button>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          What Our Customers Say 💬
        </motion.h2>
        <p className="text-center text-gray-600 text-2xl mb-12" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          Join thousands of happy art lovers!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + (index * 0.1), ...bounceTransition }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl border-4 border-blue-200"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mr-4 border-4 border-blue-300"
                />
                <div>
                  <h4 className="font-bold text-xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                    {review.name}
                  </h4>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                "{review.text}"
              </p>
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
      <h2 className="text-6xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text"
          style={{ fontFamily: "'Fredoka', sans-serif" }}>
        Complete Collection 🎨
      </h2>
      <p className="text-center text-gray-600 text-2xl mb-12" style={{ fontFamily: "'Quicksand', sans-serif" }}>
        Discover your perfect piece!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, ...bounceTransition }}
            whileHover={{ y: -10, rotate: 1 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer group border-4 border-blue-100"
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
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-5 py-2 rounded-full font-bold text-xl shadow-xl"
                   style={{ fontFamily: "'Fredoka', sans-serif" }}>
                ${product.price}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                {product.title}
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                by {product.artist}
              </p>
              <p className="text-gray-700 mb-6 text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                {product.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-full font-bold hover:shadow-lg transition text-lg"
                style={{ fontFamily: "'Lilita One', sans-serif" }}
              >
                Add to Cart 🛒
              </motion.button>
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
          className="mb-8 text-blue-600 font-bold hover:underline flex items-center text-xl"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          ← Back to Collection
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-blue-200"
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="flex flex-col justify-center">
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text"
                style={{ fontFamily: "'Fredoka', sans-serif" }}>
              {selectedProduct.title}
            </h1>
            <p className="text-3xl text-gray-600 mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              by {selectedProduct.artist} 🎨
            </p>
            <p className="text-2xl text-gray-700 mb-8 leading-relaxed" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              {selectedProduct.description}
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 mb-8 border-4 border-blue-200">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-600 text-2xl font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  Price:
                </span>
                <span className="text-6xl font-bold text-blue-600" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  ${selectedProduct.price}
                </span>
              </div>
              <div className="space-y-3 text-gray-700 mb-6 text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                <p>✓ Free Shipping Worldwide 🌍</p>
                <p>✓ 30-Day Money Back Guarantee 💯</p>
                <p>✓ Premium Quality Canvas 🎨</p>
                <p>✓ Certificate of Authenticity Included 📜</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(selectedProduct)}
              className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 text-white py-6 rounded-3xl text-3xl font-bold hover:scale-105 transition-transform shadow-2xl hover:shadow-blue-500/50"
              style={{ fontFamily: "'Lilita One', sans-serif" }}
            >
              Add to Cart - ${selectedProduct.price} 🛒
            </motion.button>
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
      <h2 className="text-6xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text"
          style={{ fontFamily: "'Fredoka', sans-serif" }}>
        About Twisted Colors 🎨
      </h2>
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[3rem] p-12 shadow-2xl border-4 border-blue-200">
        <p className="text-2xl text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          At <span className="font-bold text-blue-600">Twisted Colors</span>, we believe art should be accessible, 
          vibrant, and transformative. Founded in 2020, we've become a leading destination for contemporary abstract art.
        </p>
        <p className="text-2xl text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          We work with over 50 talented artists worldwide to curate a collection that brings joy, inspiration, 
          and color into homes and offices. Each piece is carefully selected for its ability to transform spaces 
          and evoke emotion.
        </p>
        <p className="text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          With over 5,000 artworks sold to satisfied customers in 40+ countries, we're committed to 
          exceptional quality, fair pricing, and outstanding customer service. Your satisfaction is our masterpiece! ✨
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
        <h2 className="text-6xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text"
            style={{ fontFamily: "'Fredoka', sans-serif" }}>
          Get In Touch! 💌
        </h2>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[3rem] p-12 shadow-2xl border-4 border-blue-200">
          {submitted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ ...bounceTransition }}
              className="text-center"
            >
              <div className="text-8xl mb-4">✓</div>
              <div className="text-4xl text-blue-600 font-bold" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                Thank You! 🎉
              </div>
              <p className="text-gray-600 mt-4 text-xl" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                We'll get back to you within 24 hours!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xl font-bold text-gray-700 mb-3" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border-4 border-blue-200 focus:border-blue-500 outline-none transition text-lg"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-xl font-bold text-gray-700 mb-3" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border-4 border-blue-200 focus:border-blue-500 outline-none transition text-lg"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xl font-bold text-gray-700 mb-3" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border-4 border-blue-200 focus:border-blue-500 outline-none transition resize-none text-lg"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                  placeholder="How can we help you?"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-5 rounded-2xl text-2xl font-bold hover:scale-105 transform transition shadow-xl"
                style={{ fontFamily: "'Lilita One', sans-serif" }}
              >
                Send Message 📧
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      {/* Navigation - Blue Theme */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b-4 border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 text-transparent bg-clip-text cursor-pointer"
              whileHover={{ scale: 1.05, rotate: -2 }}
              onClick={() => setActiveSection('home')}
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Twisted Colors 🎨
            </motion.div>
            <div className="flex items-center space-x-8">
              {['home', 'shop', 'about', 'contact'].map((section) => (
                <motion.button
                  key={section}
                  whileHover={{ scale: 1.1, y: -2 }}
                  onClick={() => setActiveSection(section)}
                  className={`text-xl font-bold capitalize transition ${
                    activeSection === section
                      ? 'text-blue-600 scale-110'
                      : 'text-gray-600 hover:text-blue-500'
                  }`}
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {section}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCart(true)}
                className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-7 py-3 rounded-full font-bold hover:scale-105 transition shadow-lg"
                style={{ fontFamily: "'Lilita One', sans-serif" }}
              >
                Cart 🛒 ({cart.length})
                {cart.length > 0 && (
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold"
                  >
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </motion.span>
                )}
              </motion.button>
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
              transition={{ ...bounceTransition }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[3rem] p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-8 border-blue-200"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text"
                    style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  Shopping Cart 🛒
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 text-4xl font-bold"
                >
                  ×
                </button>
              </div>
              
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-4">🛒</div>
                  <p className="text-2xl text-gray-600 mb-8" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Your cart is empty!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setShowCart(false);
                      setActiveSection('shop');
                    }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition text-xl"
                    style={{ fontFamily: "'Lilita One', sans-serif" }}
                  >
                    Start Shopping 🎨
                  </motion.button>
                </div>
              ) : (
                <>
                  <div className="space-y-6 mb-8">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-5 border-4 border-blue-200"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-28 h-28 object-cover rounded-2xl border-4 border-blue-300"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-xl" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                            {item.title}
                          </h3>
                          <p className="text-blue-600 font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl hover:bg-blue-600 shadow-lg"
                          >
                            -
                          </motion.button>
                          <span className="font-bold text-2xl w-10 text-center" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl hover:bg-blue-600 shadow-lg"
                          >
                            +
                          </motion.button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 font-bold text-lg"
                        >
                          Remove
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="border-t-4 border-blue-200 pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-3xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                        Total:
                      </span>
                      <span className="text-5xl font-bold text-blue-600" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                        ${cartTotal}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05, rotate: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-600 text-white py-6 rounded-3xl text-2xl font-bold hover:scale-105 transition shadow-2xl"
                      style={{ fontFamily: "'Lilita One', sans-serif" }}
                    >
                      Proceed to Checkout 💳
                    </motion.button>
                    <p className="text-center text-gray-500 mt-4 text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      Free shipping on all orders! 🚚
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - Blue Theme */}
      <footer className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 text-white py-12 mt-24 border-t-8 border-blue-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                Twisted Colors 🎨
              </h3>
              <p className="opacity-90 text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Bringing vibrant art to your world since 2020!
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                Quick Links
              </h4>
              <div className="space-y-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                <p className="opacity-90 cursor-pointer hover:opacity-100 text-lg">Shop Collection</p>
                <p className="opacity-90 cursor-pointer hover:opacity-100 text-lg">About Us</p>
                <p className="opacity-90 cursor-pointer hover:opacity-100 text-lg">Shipping Info</p>
                <p className="opacity-90 cursor-pointer hover:opacity-100 text-lg">Returns</p>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                Contact 📞
              </h4>
              <div style={{ fontFamily: "'Quicksand', sans-serif" }}>
                <p className="opacity-90 text-lg">Email: hello@twistedcolors.com</p>
                <p className="opacity-90 text-lg">Phone: +1-343-571-9939</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              © 2026 Twisted Colors. All rights reserved. ✨
            </p>
            <p className="mt-2 opacity-90 text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Transforming spaces with vibrant art! 🎨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
