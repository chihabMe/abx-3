export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const pulseAnimation = {
  hover: {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0px 0px 0px rgba(57, 255, 20, 0)",
      "0px 0px 20px rgba(57, 255, 20, 0.7)",
      "0px 0px 0px rgba(57, 255, 20, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const cardHover = {
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const cardFlip = {
  front: {
    rotateY: 0,
    transition: { duration: 0.5 },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.5 },
  },
};

export const cardContainer = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

export const rotateAnimation = {
  animate: {
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

export const glowAnimation = {
  animate: {
    boxShadow: [
      "0px 0px 0px rgba(57, 255, 20, 0)",
      "0px 0px 20px rgba(57, 255, 20, 0.7)",
      "0px 0px 0px rgba(57, 255, 20, 0)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};
