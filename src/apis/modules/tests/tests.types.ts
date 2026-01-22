export interface MoreTestsData {
    tests: MoreTest[];
    pagination: {
        pageNumber: number;
        pageSize: number;
        totalPages: number;
        totalRecords: number;
    };
}

export interface MoreTest {
    description: string | null;
    uid: string;
    name: string;
    slug: string;
    display_name: string | null;
    mrp: number;
    price: string;
    gender: string
    home_collection_possible: "0" | "1";
    home_collection_fee: string | null;
    organization_id: string;
    center_id: string;
    test_count: string;
    type:
    string
    sub_type: string
    discount_available: boolean;
    discount_percentage: string;
    is_exist_in_booking: boolean;
}




export interface AddTestPayload {
    items: {
        item_id: string;
        type: string;
        sub_type: string;
    }[]

}




