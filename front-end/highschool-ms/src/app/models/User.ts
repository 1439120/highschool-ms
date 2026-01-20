export interface User{
    id: number,
    name: string,
    surname: string,
    phone: string,
    email: string,
    role: string,
    address: string,
    [key: string]: any;
}