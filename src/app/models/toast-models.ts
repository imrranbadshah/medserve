export interface Toast {
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning';
    delay?: number;
}

export interface passDataType {
    data: any;
    fromPage: string;

}