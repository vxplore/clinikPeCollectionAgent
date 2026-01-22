import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button, Group } from "@mantine/core";
import TestAddCard from "../TestAddCard";
import { AnimatePresence, motion } from "framer-motion";
import SuccessAnimation from "./SuccessTestAdd";

interface CartItem {
  uid: string;
  display_name: string;
  price: string;
  mrp: number;
  slug: string;
  type: string;
  sub_type: string;
  discount_available: boolean;
  discount_percentage: string;
  home_collection_possible: "0" | "1";
  home_collection_fee: string | null;
  is_exist_in_booking: boolean;
  description?: string;
}

interface TestCartModalProps {
  isOpen: boolean;
  items: CartItem[];
  totalAmount: number;
  onRemove: (uid: string) => void;
  onClose: () => void;
  onCheckout?: () => void;
  isPending: boolean;
  showSuccess?: boolean;
}

const TestCartModal: React.FC<TestCartModalProps> = ({
  isPending,
  isOpen,
  items,
  totalAmount,
  onRemove,
  onClose,
  onCheckout,
  showSuccess = false,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [dragY, setDragY] = useState(0);

  // Reset closing state when modal opens
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsClosing(false);
    }
  }, [isOpen]);

  // Auto-close modal when cart becomes empty

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    if (endY - dragY > 100) {
      handleClose();
    }
  };

  if (showSuccess) {
    return (
      <div
        className={`fixed inset-0 flex items-end sm:items-center justify-center z-50 p-0 transition-all duration-300 bg-opacity-30 bg-black/70`}
      >
        <div
          className={`bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md shadow-2xl h-[80vh] flex flex-col animate-slide-up`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 overflow-hidden transition-all duration-300">
            <div className="h-full flex flex-col items-center justify-center p-6">
              <SuccessAnimation />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 flex items-end sm:items-center justify-center z-50 p-0 transition-all duration-300 ${
        isClosing ? "bg-opacity-0" : "bg-opacity-30"
      } bg-black/70`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md shadow-2xl h-[80vh] flex flex-col ${
          isClosing ? "animate-slide-down" : "animate-slide-up"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-12 h-1 bg-gray-300 rounded-full cursor-grab active:cursor-grabbing"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">My Tests</h2>
            <p className="text-sm text-gray-500 mt-1">
              {items.length} test{items.length !== 1 ? "s" : ""} selected
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 overflow-hidden transition-all duration-300">
          <div
            className={`h-full flex flex-col ${items.length === 0 ? "p-6" : "p-4"}`}
          >
            {/* Items List */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500 text-center">No tests selected</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.uid}
                      layout
                      initial={false} // 👈 VERY IMPORTANT
                      exit={{
                        opacity: 0,
                        height: 0,
                        marginBottom: 0,
                        scale: 0.95,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                    >
                      <TestAddCard
                        uid={item.uid}
                        display_name={item.display_name}
                        slug={item.slug}
                        type={item.type}
                        sub_type={item.sub_type}
                        mrp={item.mrp}
                        price={item.price}
                        discount_available={item.discount_available}
                        discount_percentage={item.discount_percentage}
                        home_collection_possible={item.home_collection_possible}
                        home_collection_fee={item.home_collection_fee}
                        is_exist_in_booking={item.is_exist_in_booking}
                        description={item.description}
                        isInCart={true}
                        onAdd={() => onRemove(item.uid)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer with Total and Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 flex flex-col gap-2  pt-4 mt-4 space-y-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
                <Group gap="sm" grow p={0} m={0}>
                  <Button variant="outline" onClick={handleClose}>
                    Add More
                  </Button>
                  <Button
                    loading={isPending}
                    style={{ backgroundColor: "#0D52AF" }}
                    onClick={onCheckout}
                    classNames={{
                      root: "hover:bg-[#0D52AF]/90 transition-colors",
                    }}
                  >
                    Proceed
                  </Button>
                </Group>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-down {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default TestCartModal;
