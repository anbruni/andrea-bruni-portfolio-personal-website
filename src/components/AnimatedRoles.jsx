import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoles() {
  const roles = [
    'Campaign Specialist',
    'Front-End Developer',
    'AI Enthusiast',
    'Growth Engineer',
  ];

  const gradients = [
    "bg-gradient-to-r from-blue-400 to-purple-500",
    "bg-gradient-to-r from-pink-400 to-orange-500",
    "bg-gradient-to-r from-green-400 to-cyan-500",
    "bg-gradient-to-r from-yellow-400 to-red-500"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentGradient = gradients[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const currentRole = roles[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.span
        className={`inline-block text-transparent bg-clip-text font-bold ${currentGradient}`}
        key={currentRole}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {currentRole}
      </motion.span>
    </AnimatePresence>
  );
}

export default AnimatedRoles;
