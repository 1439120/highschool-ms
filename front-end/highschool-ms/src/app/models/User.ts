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

export const users: User[] = [
    //   {
    //       id: 2239, name: 'Bheki', surname: 'Cele', phone: '072 171 2233', email: 'bhekic@mail.com', role: 'Student', address: '123 Avenue',
    //       dateOfBirth: new Date(), dateJoined: new Date(), type: "student"
    //   },
    //     {
    //         id: 8376, name: 'Musa', surname: 'Maziya', phone: '082 119 2234', email: 'musam@mail.com', role: 'Representative', address: '450 Value',
    //         dateOfBirth: new Date(), dateJoined: new Date(), type: "student"
    //     },
    //     {
    //         id: 1730, name: 'Freddie', surname: 'Khumalo', phone: '072 118 1231', email: 'freddiek@mail.com', role: 'Student', address: '011 Vilikazi',
    //         dateOfBirth: new Date(), dateJoined: new Date(), type: "student"
    //     },
    //     {
    //         id: 7839, name: 'Thembi', surname: 'Ntimba', phone: '076 222 3344', email: 'thembin@mail.com', role: 'Representative', address: '789 Street',
    //         dateOfBirth: new Date(), dateJoined: new Date(), type: "student"
    //     },
    //     {
    //         id: 1348, name: 'Silva', surname: 'Mlambo', phone: '079 333 4455', email: 'silvam@mail.com', role: 'Student', address: '456 Road',
    //         dateOfBirth: new Date(), dateJoined: new Date(), type: "student"
    //     },
    //     {
    //         id: 3283, name: 'Gray', surname: 'Jordan', phone: '081 444 5566', email: 'grayj@mail.com', role: 'Student', address: '321 Boulevard',
    //         dateOfBirth: new Date(), dateJoined: new Date(), type: "student"
    //     },
    //     {
    //         id: 9093, name: 'Alice', surname: 'Mbatha', phone: '012 111 2233', email: 'alice@mail.com', role: 'Admin', address: '123 Avenue',
    //         dateOfBirth: new Date(), dateJoined: new Date(), type: "staff"
    //     },
    //         {
    //             id: 6393, name: 'Bob', surname: 'Mkhonto', phone: '012 111 2233', email: 'bob@mail.com', role: 'User', address: '450 Value',
    //             dateOfBirth: new Date('1983-07-17'), dateJoined: new Date('2010-03-03'), type: "staff"
    //         },
    //         {
    //             id: 9494, name: 'Charlie', surname: 'Nkhosi', phone: '012 111 2233', email: 'charlie@mail.com', role: 'Editor', address: '011 Vilikazi',
    //             dateOfBirth: new Date('1990-12-12'), dateJoined: new Date('2008-06-14'), type: "staff"
    //         },
    //         {
    //             id: 8943, name: 'David', surname: 'Smith', phone: '012 222 3344', email: 'david@mail.com', role: 'User', address: '789 Street',
    //             dateOfBirth: new Date('1986-06-02'), dateJoined: new Date('2010-11-12'), type: "staff"
    //         },
    //         {
    //             id: 3334, name: 'Eve', surname: 'Johnson', phone: '012 333 4455', email: 'eve@mail.com', role: 'Admin', address: '456 Road',
    //             dateOfBirth: new Date(), dateJoined: new Date(), type: "staff"
    //         },
    //         {
    //             id: 5893, name: 'Frank', surname: 'Williams', phone: '012 444 5566', email: 'frank@mail.com', role: 'Editor', address: '321 Boulevard',
    //             dateOfBirth: new Date(), dateJoined: new Date(), type: "staff"
    //         }
        
    ]
