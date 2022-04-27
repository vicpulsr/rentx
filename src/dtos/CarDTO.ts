export interface CarDTO {
    id: string;
    brand: string;
    name: string;
    about: string;
    rent: {
        period: string;
        price: string;
    },
    fuel_type: string;
    thumbnail: string;
    accessories:
    {
        type: string;
        name: string;
    }[],
    photos: string[];
};