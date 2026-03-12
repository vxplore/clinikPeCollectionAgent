
export interface DuePayment {
    amount: string;      // keep as string (money precision)
    currency: string;    // e.g. "INR"
}
export interface StatisticsResponse {
    statistics: {
        today_task: number;
        pending_sample: number;
        due_payment: DuePayment;
        notification_count: number;
    }
    

}

export interface MaskingNumberResponse {
    virtual_number: string;
}
