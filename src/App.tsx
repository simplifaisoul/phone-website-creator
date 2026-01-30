import React from 'react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <motion.div
      className="bg-pink-500 min-h-screen flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-5xl font-bold text-white">Welcome to Twisted Colors!</h1>
    </motion.div>
  );
};

export default App;
