// import React from 'react'
import TestCard from "./TestCard";
import TestCardSkeleton from "./TestCardSkeleton";
import { useParams } from "react-router-dom";
import { useDeleteTest } from "../../hooks/useDeleteTest";
import EmptyState from "../../../../shared/ui/EmptyState";
interface Test {
  description: string;
  short_about: string;
  is_deletable: boolean;
  item_added_by: string;
  uid: string;
  name: string;
  display_name: string;
  slug: string;
  mrp: number;
  price: string;
  status: string;
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
  const { id } = useParams();
  const { deleteTest, isLoading: isDeleting } = useDeleteTest(id || "");

  console.log("Rendering TestTab with assignment ID:", id);

  console.log(pagination);
  console.log("TestTab Props:", tests);
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
      <EmptyState
        title="No tests assigned"
        description="Tests will appear here once assigned"
        imageSizePercent={50}
      />
    );
  }

  console.log("✅ Showing test cards - data loaded");

  const handleDelete = (uid: string) => {
    console.log("Deleting test:", uid);
    deleteTest(uid);
  };

  console.log("Rendering Test Cards:", tests);

  return (
    <div className="space-y-4">
      {tests.map((test) => (
        <TestCard
          key={test.uid}
          title={test.display_name}
          description={test.description}
          status={test.status}
          is_deletable={test.is_deletable}
          onDelete={
            test.is_deletable ? () => handleDelete(test.uid) : undefined
          }
        />
      ))}
    </div>
  );
};

export default TestTab;
