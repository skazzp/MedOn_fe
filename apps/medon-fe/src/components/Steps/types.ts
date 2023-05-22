export interface ButtonProps {
    buttonType?: 'next' | 'previous' | 'booking';
    position?: number;
};

export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    specialityId: number;
    city: string;
    country: string;
};