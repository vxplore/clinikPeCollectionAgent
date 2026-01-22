import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingCartOverlayProps {
  itemCount: number;
  totalAmount: number;
  onClick?: () => void;
}

export const FloatingCartOverlay: React.FC<FloatingCartOverlayProps> = ({
  itemCount,
  totalAmount,
  onClick,
}) => {
  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          onClick={onClick}
          initial={{
            y: 100,
            scale: 0.3,
            opacity: 0,
            x: "-50%",
          }}
          animate={{
            y: 0,
            scale: 1,
            opacity: 1,
            x: "-50%",
          }}
          exit={{
            y: 100,
            scale: 0.3,
            opacity: 0,
            x: "-50%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.8,
          }}
          style={{
            position: "fixed",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#0c831f",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            zIndex: 1000,
          }}
        >
          {/* Count bubble with animation */}
          <motion.div
            key={itemCount}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            style={{
              background: "#fff",
              color: "#0c831f",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {itemCount}
          </motion.div>

          <div style={{ fontWeight: 600 }}>View Cart · ₹{totalAmount}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
