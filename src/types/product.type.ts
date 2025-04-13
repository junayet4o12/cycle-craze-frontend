import { productCategories, productFrameMaterial } from "@/constant/product.const";

export type TSpecification = {
    key: string;
    value: string;
}

export interface IProduct {
    _id: string;
    name: string;
    brand: string;
    price: number;
    category: typeof productCategories[number];
    frameMaterial: typeof productFrameMaterial[number];
    wheelSize: number;
    quantity: number;
    description: string;
    images: string[];
    specifications: TSpecification[];
    isDeleted?: boolean;
}