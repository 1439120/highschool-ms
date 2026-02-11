export interface User{
    id: number,
    name: string,
    surname: string,
    phone: string,
    email: string,
    role: string,
    address: string,
    dateOfBirth: Date | null;
    dateJoined: Date | null;
    type: string;
    [key: string]: any;
}
