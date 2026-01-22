import { User } from "./User";

export interface Teacher extends User{
    
}

export const teachers: Teacher[] = [
        {
            id: 9093, name: 'Alice', surname: 'Mbatha', phone: '012 111 2233', email: 'alice@mail.com', role: 'Admin', address: '123 Avenue',
            date_of_birth: new Date(), date_joined: new Date()
        },
        {
            id: 6393, name: 'Bob', surname: 'Mkhonto', phone: '012 111 2233', email: 'bob@mail.com', role: 'User', address: '450 Value',
            date_of_birth: new Date('1983-07-17'), date_joined: new Date('2010-03-03')
        },
        {
            id: 9494, name: 'Charlie', surname: 'Nkhosi', phone: '012 111 2233', email: 'charlie@mail.com', role: 'Editor', address: '011 Vilikazi',
            date_of_birth: new Date('1990-12-12'), date_joined: new Date('2008-06-14')
        },
        {
            id: 8943, name: 'David', surname: 'Smith', phone: '012 222 3344', email: 'david@mail.com', role: 'User', address: '789 Street',
            date_of_birth: new Date('1986-06-02'), date_joined: new Date('2010-11-12')
        },
        {
            id: 3334, name: 'Eve', surname: 'Johnson', phone: '012 333 4455', email: 'eve@mail.com', role: 'Admin', address: '456 Road',
            date_of_birth: new Date(), date_joined: new Date()
        },
        {
            id: 5893, name: 'Frank', surname: 'Williams', phone: '012 444 5566', email: 'frank@mail.com', role: 'Editor', address: '321 Boulevard',
            date_of_birth: new Date(), date_joined: new Date()
        }
    ]

export function updateTeacher(newData: User){
    let teacher = findTeacher(newData.id.toString());
    if(teacher){
        teacher.name = newData.name;
        teacher.surname = newData.surname;
        teacher.phone = newData.phone;
        teacher.email = newData.email;
        teacher.role = newData.role;
        teacher.address = newData.address;
        teacher.date_of_birth = newData.date_of_birth;
        teacher.date_joined = newData.date_joined;
    }
    
}

export function findTeacher(Id: string){
    return teachers.find((teacher) => teacher.id.toString() === Id);
}