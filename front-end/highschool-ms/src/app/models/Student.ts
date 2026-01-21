import { User } from "./User";

export interface Student extends User{

}

export const students: Student[] = [
      {
          id: 2239, name: 'Bheki', surname: 'Cele', phone: '072 171 2233', email: 'bhekic@mail.com', role: 'Student', address: '123 Avenue',
          date_of_birth: new Date()
      },
        {
            id: 8376, name: 'Musa', surname: 'Maziya', phone: '082 119 2234', email: 'musam@mail.com', role: 'Representative', address: '450 Value',
            date_of_birth: new Date()
        },
        {
            id: 1730, name: 'Freddie', surname: 'Khumalo', phone: '072 118 1231', email: 'freddiek@mail.com', role: 'Student', address: '011 Vilikazi',
            date_of_birth: new Date()
        },
        {
            id: 7839, name: 'Thembi', surname: 'Ntimba', phone: '076 222 3344', email: 'thembin@mail.com', role: 'Representative', address: '789 Street',
            date_of_birth: new Date()
        },
        {
            id: 1348, name: 'Silva', surname: 'Mlambo', phone: '079 333 4455', email: 'silvam@mail.com', role: 'Student', address: '456 Road',
            date_of_birth: new Date()
        },
        {
            id: 3283, name: 'Gray', surname: 'Jordan', phone: '081 444 5566', email: 'grayj@mail.com', role: 'Student', address: '321 Boulevard',
            date_of_birth: new Date()
        }
    ]
