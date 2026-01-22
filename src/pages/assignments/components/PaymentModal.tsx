import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";
import { Button, Group } from "@mantine/core";
import { notify } from "../../../app/notifications";
import SuccessAnimation from "./SuccessAnimation";
import cash from "../../../assets/cash.svg";
import card from "../../../assets/card.svg";
import building from "../../../assets/building.svg";
import payments from "../../../assets/payments.svg";
import {
  useAssignmentPaymentAddition,
  useAssignmentPaymentTypes,
} from "../hooks/usePayment";

interface PaymentModalProps {
  onClose: () => void;
}

interface PaymentFormData {
  amount: string;
  mode: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { paymentTypes, isLoading } = useAssignmentPaymentTypes();
  const { id } = useParams<{ id: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    defaultValues: {
      amount: "",
      mode: "",
    },
  });

  const paymentMethodOptions =
    paymentTypes?.map((type) => ({
      value: type.key,
      label: type.value,
    })) || [];

  const queryClient = useQueryClient();
  const paymentMutation = useAssignmentPaymentAddition(id!);

  const getPaymentIcon = (paymentType: string) => {
    switch (paymentType.toLowerCase()) {
      case "cash":
        return cash;
      case "card":
      case "credit card":
        return card;
      case "upi":
        return payments;
      case "bank_transfer":
      case "bank transfer":
        return building;
      default:
        return payments;
    }
  };

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

  const onSubmit = (data: PaymentFormData) => {
    paymentMutation.mutate(
      {
        amount: Number(data.amount),
        mode: data.mode,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["assignments-payments", id],
          });
          setShowSuccess(true);
          // notify.success(response.message || "Payment added successfully");
          // Close modal after animation completes (2.5 seconds for animation + 1 second buffer)
          setTimeout(() => {
            handleClose();
          }, 3500);
        },
        onError: (response) => {
          notify.error(response?.message || "Failed to add payment");
        },
      },
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-end sm:items-center justify-center z-50 p-0 transition-all duration-300 ${
          isClosing ? "bg-opacity-0" : "bg-opacity-30"
        } bg-black/70`}
        onClick={handleClose}
      >
        <div
          className={`bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md shadow-2xl h-[460px] flex flex-col ${
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
          {!showSuccess && (
            <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  New Payment
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Add a new payment to this assignment
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Content */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 overflow-hidden transition-all duration-300"
          >
            <div
              className={`h-full flex flex-col ${showSuccess ? "p-12" : "p-6 space-y-6"}`}
            >
              {showSuccess ? (
                /* Success State - Full screen animation */
                <div className="flex flex-col items-center justify-center h-full">
                  <SuccessAnimation />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Amount Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            type="number"
                            placeholder="Enter amount"
                            {...field}
                            value={field.value || ""}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0D52AF] focus:ring-1 focus:ring-[#0D52AF] transition-colors"
                          />
                          {errors.amount?.message && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.amount.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method
                    </label>
                    <Controller
                      name="mode"
                      control={control}
                      render={({ field }) => (
                        <>
                          <div className="grid grid-cols-2 gap-3">
                            {paymentMethodOptions.map((option) => {
                              const iconSrc = getPaymentIcon(option.value);
                              return (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => field.onChange(option.value)}
                                  disabled={isLoading}
                                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                                    field.value === option.value
                                      ? "border-[#0D52AF] bg-[#0D52AF]/10"
                                      : "border-gray-200 bg-white hover:border-gray-300"
                                  } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                  <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                      field.value === option.value
                                        ? "bg-[#0D52AF]"
                                        : "bg-gray-200"
                                    }`}
                                  >
                                    <img
                                      src={iconSrc}
                                      alt={option.label}
                                      className={`w-5 h-5 ${
                                        field.value === option.value
                                          ? "filter brightness-0 invert"
                                          : ""
                                      }`}
                                    />
                                  </div>
                                  <span
                                    className={`text-xs font-medium text-center line-clamp-2 ${
                                      field.value === option.value
                                        ? "text-[#0D52AF]"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {option.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          {errors.mode?.message && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.mode.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>

                  {/* Buttons */}
                  <Group gap="sm" pt="xs" grow>
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={paymentMutation.isPending}
                      disabled={isLoading}
                      style={{ backgroundColor: "#0D52AF" }}
                      classNames={{
                        root: "hover:bg-[#0D52AF]/90 transition-colors",
                      }}
                    >
                      Pay
                    </Button>
                  </Group>
                </div>
              )}
            </div>
          </form>
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
    </>
  );
};

export default PaymentModal;
