export interface Toast {
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning';
    delay?: number;
}