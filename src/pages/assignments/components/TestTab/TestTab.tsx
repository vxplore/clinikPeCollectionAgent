// import React from 'react'
import TestCard from "./TestCard";
import TestCardSkeleton from "./TestCardSkeleton";

interface Test {
  uid: string;
  name: string;
  display_name: string;
  slug: string;
  mrp: number;
  price: string;
  gender: string;
  home_collection_possible: string;
  home_collection_fee: string;
  organization_id: string;
  center_id: string;
  test_count: string;
  type: string;
  sub_type: string;
  discount_available: boolean;
  discount_percentage: string;
  is_assigned: boolean;
}

interface TestTabProps {
  tests?: Test[];
  pagination?: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  };
  isLoading?: boolean;
  error?: Error | null;
}

const TestTab = ({
  tests,
  pagination,
  isLoading = false,
  error = null,
}: TestTabProps) => {
  console.log(pagination);
  
  console.log("======== TestTab Render ========");
  console.log("isLoading:", isLoading);
  console.log("tests:", tests);
  console.log("error:", error);
  console.log("================================");

  // Show skeleton if loading
  if (isLoading) {
    console.log("🔄 Showing skeleton - isLoading is TRUE");
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <TestCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  // Show error if error occurred
  if (error) {
    console.log("❌ Showing error");
    return (
      <div className="text-center py-8 text-red-500">
        Error loading tests: {error.message}
      </div>
    );
  }

  // Show empty state if no data
  if (!tests || tests.length === 0) {
    console.log("⚠️ No tests available");
    return (
      <div className="text-center py-8 text-gray-500">No tests available</div>
    );
  }

  console.log("✅ Showing test cards - data loaded");

  const handleDelete = (uid: string) => {
    console.log("Delete test:", uid);
  };

  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <TestCard
          key={test.uid}
          title={test.display_name}
          description={`₹${test.price} (MRP: ₹${test.mrp})${test.discount_available ? ` - ${test.discount_percentage}% off` : ""}`}
          status={test.is_assigned ? "Active" : "Completed"}
          onDelete={() => handleDelete(test.uid)}
        />
      ))}
    </div>
  );
};

export default TestTab;
