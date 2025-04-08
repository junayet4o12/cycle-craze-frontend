export type TRole = "user" | 'admin'
export type TUser = {
    name: string;
    email: string;
    role: TRole;
    iat: number;
    exp: number;
}
