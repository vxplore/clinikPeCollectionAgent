// import React from "react";
import { useState, useEffect } from "react";
import TestAddCard from "../../pages/Test/TestAddCard";
import TestAddCardSkeleton from "../../pages/Test/TestAddCardSkeleton";
import { FloatingCartOverlay } from "./components/FloatingCartOverlay";
import TestCartModal from "./components/TestCartModal";
import SecondaryHeader from "../../layouts/AppShell/SecondaryHeader";
import { TextInput } from "@mantine/core";
import { Search } from "lucide-react";
import { useOtherTests } from "./hooks/useOtherTests";
import { useParams, useNavigate } from "react-router-dom";
import { useAssignmentPaymentAddition } from "./hooks/useAddOtherTest";
import { buildAddTestPayload } from "./utils/payloadbuilder";
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

const AddTest = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: addTests, isPending } = useAssignmentPaymentAddition(id!);
  // Debounce search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchValue]);

  const { tests, isLoading, error } = useOtherTests(
    id!,
    100000,
    1,
    debouncedSearch,
  );

  const handleAddTest = (test: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.uid === test.uid);
      if (exists) {
        return prev.filter((item) => item.uid !== test.uid);
      }
      return [...prev, test];
    });
  };

  const isTestInCart = (uid: string) => cart.some((item) => item.uid === uid);

  const cartTotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price;
  }, 0);

  console.log("Cart:", cart);
  console.log("Other Tests Data:", tests);

  return (
    <div className="space-y-0 ">
      <div className="space-y-3">
        <SecondaryHeader>
          <TextInput
            leftSection={<Search size={18} />}
            radius="lg"
            placeholder="Search Test"
            className="w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            styles={{
              input: {
                borderRadius: "16px",
                padding: "12px 40px",
              },
            }}
          />
        </SecondaryHeader>
        {error && (
          <div className="text-red-500 text-sm font-medium">
            Error: {error.message}
          </div>
        )}

        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <TestAddCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {tests?.map((test) => (
              <TestAddCard
                key={test.uid}
                uid={test.uid}
                display_name={test.display_name || ""}
                slug={test.slug}
                type={test.type}
                sub_type={test.sub_type}
                mrp={test.mrp}
                price={test.price}
                discount_available={test.discount_available}
                discount_percentage={test.discount_percentage}
                home_collection_possible={test.home_collection_possible}
                home_collection_fee={test.home_collection_fee}
                is_exist_in_booking={test.is_exist_in_booking}
                description={test.description || undefined}
                isInCart={isTestInCart(test.uid)}
                onAdd={() =>
                  handleAddTest({
                    uid: test.uid,
                    display_name: test.display_name || "",
                    price: test.price,
                    mrp: test.mrp,
                    slug: test.slug,
                    type: test.type,
                    sub_type: test.sub_type,
                    discount_available: test.discount_available,
                    discount_percentage: test.discount_percentage,
                    home_collection_possible: test.home_collection_possible,
                    home_collection_fee: test.home_collection_fee,
                    is_exist_in_booking: test.is_exist_in_booking,
                    description: test.description || undefined,
                  })
                }
              />
            ))}
          </>
        )}
      </div>

      {!isCartModalOpen && (
        <FloatingCartOverlay
          itemCount={cart.length}
          totalAmount={cartTotal}
          onClick={() => setIsCartModalOpen(true)}
        />
      )}

      <TestCartModal
        isPending={isPending}
        isOpen={isCartModalOpen}
        items={cart}
        totalAmount={cartTotal}
        showSuccess={showSuccess}
        onRemove={(uid) => {
          setCart((prev) => prev.filter((item) => item.uid !== uid));
        }}
        onClose={() => {
          setIsCartModalOpen(false);
          setShowSuccess(false);
        }}
        onCheckout={() => {
          if (cart.length === 0) {
            console.log("Cart is empty");
            return;
          }

          const payload = buildAddTestPayload(cart);
          console.log("Proceeding to checkout with payload:", payload);

          addTests(payload, {
            onSuccess: (response) => {
              console.log("Tests added successfully:", response);
              setShowSuccess(true);

              // Navigate after 3 seconds to allow success animation to complete
              setTimeout(() => {
                navigate(`/assignments/${id}?tab=tests`);
              }, 3000);
            },
            onError: (error) => {
              console.error("Error adding tests:", error);
            },
          });
        }}
      />
    </div>
  );
};

export default AddTest;
