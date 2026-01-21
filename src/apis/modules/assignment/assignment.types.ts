export interface AssignmentsResponse {

  assignments: {
    id: string;
    booking_id: string;
    for_patient: {
      id: string;
      name: string;
      age: number | null;
      gender: string
    };
    location: {
      address: string;
      pincode: string;
      lat: number;
      lng: number;
    };
    status: string
    count_test: number;
    samples: {
      id: string;
      name: string;
      status: string
      booking_item_ids: string[];
    }[];
    sample_statistics: {
      total: number;
      collected: number;
      pending: number;
    };
    schedule: {
      start_date: string;
      end_date: string;
    };
  }[];
};





export interface AssignmentFilter {
  filters: {
    key: string;
    value: string;
  }[];
}


export interface AssignmentDetailData {
  assignment: {
    id: string;
    status:string
    count_test: number;
    currency: string;

    for_patient: {
      id: string;
      name: string;
      age: string; // "N/A" from backend
      gender: string
    };

    location: {
      address: string;
      pincode: string;
      lat: number;
      lng: number;
    };

    samples: {
      id: string;
      name: string;
      status: string
      booking_item_ids: string[];
    }[];

    sample_statistics: {
      total: number;
      collected: number;
      pending: number;
    };

    schedule: {
      start_date: string;
      end_date: string;
    };

    booking: {
      id: string;
      date: string;
    };

    payment_summary: {
      total_amount: string;
      discount_amount: string;
      payable_amount: string;
      paid_amount: string;
    };
  };
}

  
export interface AssignmentSamplesData {
  sample_statistics: {
    total: number;
    collected: number;
    pending: number;
  };
  samples: {
    id: string;
    name: string;
    status: "pending" | "collected";
    description: string | null;
    notes: string | null;
    booking_item_ids: string[];
  }[];
}

export interface AssignmentTestsData {
  tests: AssignmentTest[];
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  };
}

export interface AssignmentTest {
  uid: string;
  name: string;
  slug: string;
  display_name: string;
  mrp: number;
  price: string;
  gender: "male" | "female";
  home_collection_possible: "0" | "1";
  home_collection_fee: string;
  organization_id: string;
  center_id: string;
  test_count: string;
  type: "panels" | "other-tests";
  sub_type: "lab" | "other";
  discount_available: boolean;
  discount_percentage: string;
  is_assigned: boolean;
}


export interface AssignmentPaymentsData {
  currency: "INR";
  statistics: { 
    total_amount: string;
    discount_amount: string;
    payable_amount: string;
    paid_amount: string;
  };
  payments: {
    id: string;
    amount: string;
    type: "full" | "partial";
    method: "online" | "cash" | "upi";
    status: "paid" | "pending" | "failed";
    note: string;
    paid_at: {
      timestamp: string;
      date: string;
      time: string;
    };
  }[];
}
