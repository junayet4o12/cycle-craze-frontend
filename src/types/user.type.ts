import { TRole } from "./global.type";

export type TUserData = {
    _id: string;
    name: string;
    email: string;
    role: TRole;
    profile?: string;
    address?: string;
    contactNumber: string;
    isBlock?: boolean;
    
}
export type TUserDataBackend = {
    _id: string;
    name: string;
    email: string;
    role: TRole;
    profile?: string;
    address?: string;
    contactNumber: string;
    isBlock?: boolean;
    isSuperAdmin?:boolean;
    createdAt?: string;
    updatedAt?:string;
}