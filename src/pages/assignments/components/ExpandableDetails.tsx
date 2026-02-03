import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import whitemapicon from "../../.././assets/whitemap.svg";
import type { AssignmentDetailData } from "../../../apis/modules/assignment/assignment.types";
import ExpandableDetailsSkeleton from "./ExpandableDetailsSkeleton";

interface ExpandableDetailsProps {
  data: AssignmentDetailData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  title?: string;
  defaultOpen?: boolean;
  onLocationClick?: (location: {
    lat?: number;
    lng?: number;
    address?: string;
  }) => void;
}

function ExpandableDetails({
  data,
  isLoading,
  isError,
  error,
  title = "Details",
  defaultOpen = false,
  onLocationClick,
}: ExpandableDetailsProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0,
  );
  const contentRef = useRef<HTMLDivElement>(null);

  // special sections derived from data
  const sections = data
    ? [
        {
          title: "PATIENT DETAILS",
          hasLocation: false,
          items: [
            {
              label: "Name",
              value: data.assignment.for_patient?.name || "N/A",
              color: undefined,
            },
            {
              label: "Age",
              value: data.assignment.for_patient?.age || "N/A",
              color: undefined,
            },
            {
              label: "Gender",
              value: data.assignment.for_patient?.gender || "N/A",
              color: undefined,
            },
          ],
        },
        {
          title: "LOCATION",
          hasLocation: true,
          items: [
            {
              label: "",
              value: data.assignment.location?.address || "N/A",
              color: undefined,
            },
            // {
            //   label: "",
            //   value: `Pincode: ${data.assignment.location?.pincode || "N/A"}`,
            //   color: undefined,
            // },
          ],
        },
        {
          title: "BOOKING DETAILS",
          hasLocation: false,
          items: [
            {
              label: "Booking ID",
              value: data.assignment.booking?.id || "N/A",
              color: undefined,
            },
            {
              label: "Booking Date",
              value: data.assignment.booking?.date || "N/A",
              color: undefined,
            },
          ],
        },
        {
          title: "PAYMENT SUMMARY",
          hasLocation: false,
          items: [
            {
              label: "Total Amount",
              value: `₹${data.assignment.payment_summary?.total_amount || "0"}`,
              color: undefined,
            },
            {
              label: "Discount",
              value: `₹${data.assignment.payment_summary?.discount_amount || "0"}`,
              color: "green",
            },
            {
              label: "Paid Amount",
              value: `₹${data.assignment.payment_summary?.paid_amount || "0"}`,
              color: "green",
            },
            {
              label: "Payable Amount",
              value: `₹${data.assignment.payment_summary?.payable_amount || "0"}`,
              color: undefined,
            },
          ],
        },
      ]
    : [];

  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        if (height === undefined) {
          setHeight(contentRef.current.scrollHeight);
          requestAnimationFrame(() => {
            setHeight(0);
          });
        } else {
          setHeight(0);
        }
      }
    }
  }, [open, height]);

  const handleTransitionEnd = () => {
    if (open && contentRef.current) {
      setHeight(undefined);
    }
  };

  // Show skeleton if loading
  if (isLoading) {
    return <ExpandableDetailsSkeleton />;
  }

  // Show error if error occurred
  if (isError) {
    return (
      <h2 className="text-red-500">
        {error || "An error occurred while loading details"}
      </h2>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-0"
      >
        <span className="text-base font-semibold text-gray-500 tracking-wide">
          {title}
        </span>
        <div className="p-1 rounded-full bg-gray-50 hover:bg-gray-100">
          <ChevronDown
            size={20}
            className={`text-gray-500 transition-transform duration-300 ease-out ${
              open ? "rotate-180" : ""
            }`}
            style={{ willChange: "transform" }}
          />
        </div>
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          height: height,
          overflow: "hidden",
          transition: "height 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "height",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="px-4 pb-3 space-y-4">
          {sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="text-xs font-semibold text-gray-500 tracking-wide mb-3">
                {section.title}
              </h3>
              {section.hasLocation ? (
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    {section.items.map((item, idx) => (
                      <div key={idx}>
                        <p className="text-gray-700">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    onClick={() =>
                      onLocationClick?.({
                        lat: data.assignment.location?.lat,
                        lng: data.assignment.location?.lng,
                        address: data.assignment.location?.address,
                      })
                    }
                    className="px-4 py-3 rounded-lg bg-primary hover:bg-primary-dark transition-colors flex-shrink-0 cursor-pointer"
                    aria-label="View location"
                  >
                    <img
                      className="w-5 h-5"
                      src={whitemapicon}
                      alt="Map icon"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      {item.label && (
                        <span className="text-gray-500">{item.label}</span>
                      )}
                      <span
                        className={`font-semibold ${
                          item.color === "green"
                            ? "text-green-600"
                            : item.color === "red"
                              ? "text-red-600"
                              : "text-gray-900"
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {sectionIdx < sections.length - 1 && (
                <div className="border-t border-gray-200 my-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExpandableDetails;
