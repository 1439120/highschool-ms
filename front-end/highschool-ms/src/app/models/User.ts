export interface User{
    id: number,
    name: string,
    surname: string,
    phone: string,
    email: string,
    role: string,
    address: string,
    date_of_birth: Date;
    date_joined: Date;
    [key: string]: any;
}
