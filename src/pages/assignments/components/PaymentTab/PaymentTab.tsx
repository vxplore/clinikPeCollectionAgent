// import React from 'react'
import PaymentCard from "./PaymentCard";
import PaymentStatCard from "./PaymentStatCard";
import PaymentCardSkeleton from "./PaymentCardSkeleton";
import PaymentStatCardSkeleton from "./PaymentStatCardSkeleton";
import { type AssignmentPaymentsData } from "../../../../apis/modules/assignment/assignment.types";
import EmptyState from "../../../../shared/ui/EmptyState";
export interface AssignmentPaymentsDataProps {
  payments?: AssignmentPaymentsData;
  isLoading: boolean;
  error: Error | null;
}

const PaymentTab = ({
  payments,
  isLoading,
  error,
}: AssignmentPaymentsDataProps) => {
  const paymentList = payments?.payments || [];
  const { currency, statistics } = payments || {};
  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  // Check if all payment statistics are 0
  const allStatsZero =
    !statistics ||
    (statistics.total_amount === "0" &&
      statistics.discount_amount === "0" &&
      statistics.payable_amount === "0" &&
      statistics.paid_amount === "0");

  if (!isLoading && allStatsZero) {
    return (
      <EmptyState
        title="No payments available"
        description="Payment records will appear here"
        imageSizePercent={50}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <>
          <PaymentStatCardSkeleton />
          <h1 className="text-base font-semibold">Payment History</h1>
          {Array.from({ length: 3 }).map((_, index) => (
            <PaymentCardSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          <PaymentStatCard
            items={[
              { label: "Total", value: `₹${statistics?.total_amount}` },
              {
                label: "Discount",
                value: `₹${statistics?.discount_amount}`,
                valueColor: "#16A34A",
              },
              { label: "Payable", value: `₹${statistics?.payable_amount}` },
              {
                label: "Paid",
                value: `₹${statistics?.paid_amount}`,
                valueColor: "#16A34A",
              },
            ]}
          />
          {paymentList.length > 0 && (
            <>
              <h1 className="text-base font-semibold">Payment History</h1>
              {paymentList.map((payment, index) => (
                <PaymentCard
                  key={payment.id || index}
                  amount={payment.amount}
                  method={payment.method}
                  dateTime={payment.paid_at}
                  status={payment.status}
                  note={payment.note}
                  type={payment.type}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentTab;
