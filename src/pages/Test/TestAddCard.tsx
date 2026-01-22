import React from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@mantine/core";

interface TestAddCardProps {
  uid: string;
  display_name: string;
  slug: string;
  type: string;
  sub_type: string;
  mrp: number;
  price: string;
  discount_available: boolean;
  discount_percentage: string;
  home_collection_possible: "0" | "1";
  home_collection_fee: string | null;
  is_exist_in_booking: boolean;
  description?: string;
  isInCart?: boolean;
  onAdd: () => void;
}

const TestAddCard: React.FC<TestAddCardProps> = ({
  uid,
  display_name,
  slug,
  type,
  sub_type,
  mrp,
  price,
  discount_available,
  discount_percentage,
  home_collection_possible,
  home_collection_fee,
  is_exist_in_booking,
  description,
  isInCart = false,
  onAdd,
}) => {
  console.log(
    "Rendering TestAddCard for:",
    uid,
    slug,
    home_collection_possible,
    home_collection_fee,
  );
  return (
    <div className="w-full rounded-xl border border-[#F3F4F6] shadow-sm bg-white p-4">
      {/* Title & description */}
      <h3 className="text-lg font-semibold text-gray-900">{display_name}</h3>
      <p className="mt-1 text-sm text-gray-600">
        {description || `${sub_type} • ${type}`}
      </p>

      {/* Bottom row */}
      <div className="mt-4 flex items-center justify-between">
        {/* Prices */}
        <div className="flex items-center gap-2">
          {mrp > 0 && (
            <span className="text-sm text-gray-400 line-through">₹{mrp}</span>
          )}
          <span className="text-lg font-semibold text-green-600">
            {price || "₹0"}
          </span>
          {discount_available && discount_percentage !== "0.0" && (
            <span className="text-xs text-green-600 font-medium">
              -{discount_percentage}%
            </span>
          )}
        </div>

        {/* Add button */}
        <Button
          onClick={onAdd}
          px={16}
          py={4}
          leftSection={isInCart ? <Minus size={20} /> : <Plus size={20} />}
          disabled={is_exist_in_booking}
          variant="filled"
          color={isInCart ? "#FF2E2E" : "#0D52AF"}
          style={{
            transition: "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
            minWidth: "110px",
          }}
        >
          {isInCart ? "Remove" : "Add"}
        </Button>
      </div>
    </div>
  );
};

export default TestAddCard;
