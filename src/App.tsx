import React, { useState } from 'react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Sample gallery images (using placeholder images)
  const galleryImages = [
    'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=400',
    'https://images.unsplash.com/photo-1541480551145-2370a440d585?w=400',
    'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=400',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400',
  ];

  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <motion.h1
        className="text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Welcome to Twisted Colors!
      </motion.h1>
      <p className="text-2xl text-gray-700 mb-8">
        Where creativity meets vibrant design
      </p>
      <button
        onClick={() => setActiveSection('gallery')}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:scale-105 transform transition"
      >
        Explore Our Gallery
      </button>
    </motion.div>
  );

  const renderGallery = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
        Photo Gallery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((img, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderAbout = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
        About Us
      </h2>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          At <span className="font-bold text-purple-600">Twisted Colors</span>, we believe in the power of vibrant design
          to transform spaces and inspire creativity. Our passion lies in bringing bold, colorful visions to life.
        </p>
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          With years of experience in design and a commitment to excellence, we work closely with our clients
          to create unique, eye-catching solutions that stand out from the crowd.
        </p>
        <p className="text-xl text-gray-700 leading-relaxed">
          Whether you're looking for stunning visuals, creative branding, or artistic installations,
          we're here to turn your colorful dreams into reality.
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
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
          Contact Us
        </h2>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          {submitted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center text-2xl text-green-600 font-semibold"
            >
              ✓ Thank you! We'll be in touch soon!
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-300 focus:border-purple-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-300 focus:border-purple-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-300 focus:border-purple-500 outline-none transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg text-xl font-semibold hover:scale-105 transform transition"
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveSection('home')}
            >
              Twisted Colors
            </motion.div>
            <div className="flex space-x-6">
              {['home', 'gallery', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-lg font-semibold capitalize transition ${
                    activeSection === section
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-purple-500'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'gallery' && renderGallery()}
        {activeSection === 'about' && renderAbout()}
        {activeSection === 'contact' && renderContact()}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg">© 2026 Twisted Colors. All rights reserved.</p>
          <p className="mt-2 text-sm opacity-90">Bringing color to your world</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
