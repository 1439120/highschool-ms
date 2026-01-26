export interface User{
    id: number,
    name: string,
    surname: string,
    phone: string,
    email: string,
    role: string,
    address: string,
    date_of_birth: Date | undefined;
    date_joined: Date | undefined;
    type: string;
    [key: string]: any;
}

export const users: User[] = [
      {
          id: 2239, name: 'Bheki', surname: 'Cele', phone: '072 171 2233', email: 'bhekic@mail.com', role: 'Student', address: '123 Avenue',
          date_of_birth: new Date(), date_joined: new Date(), type: "student"
      },
        {
            id: 8376, name: 'Musa', surname: 'Maziya', phone: '082 119 2234', email: 'musam@mail.com', role: 'Representative', address: '450 Value',
            date_of_birth: new Date(), date_joined: new Date(), type: "student"
        },
        {
            id: 1730, name: 'Freddie', surname: 'Khumalo', phone: '072 118 1231', email: 'freddiek@mail.com', role: 'Student', address: '011 Vilikazi',
            date_of_birth: new Date(), date_joined: new Date(), type: "student"
        },
        {
            id: 7839, name: 'Thembi', surname: 'Ntimba', phone: '076 222 3344', email: 'thembin@mail.com', role: 'Representative', address: '789 Street',
            date_of_birth: new Date(), date_joined: new Date(), type: "student"
        },
        {
            id: 1348, name: 'Silva', surname: 'Mlambo', phone: '079 333 4455', email: 'silvam@mail.com', role: 'Student', address: '456 Road',
            date_of_birth: new Date(), date_joined: new Date(), type: "student"
        },
        {
            id: 3283, name: 'Gray', surname: 'Jordan', phone: '081 444 5566', email: 'grayj@mail.com', role: 'Student', address: '321 Boulevard',
            date_of_birth: new Date(), date_joined: new Date(), type: "student"
        },
        {
            id: 9093, name: 'Alice', surname: 'Mbatha', phone: '012 111 2233', email: 'alice@mail.com', role: 'Admin', address: '123 Avenue',
            date_of_birth: new Date(), date_joined: new Date(), type: "staff"
        },
            {
                id: 6393, name: 'Bob', surname: 'Mkhonto', phone: '012 111 2233', email: 'bob@mail.com', role: 'User', address: '450 Value',
                date_of_birth: new Date('1983-07-17'), date_joined: new Date('2010-03-03'), type: "staff"
            },
            {
                id: 9494, name: 'Charlie', surname: 'Nkhosi', phone: '012 111 2233', email: 'charlie@mail.com', role: 'Editor', address: '011 Vilikazi',
                date_of_birth: new Date('1990-12-12'), date_joined: new Date('2008-06-14'), type: "staff"
            },
            {
                id: 8943, name: 'David', surname: 'Smith', phone: '012 222 3344', email: 'david@mail.com', role: 'User', address: '789 Street',
                date_of_birth: new Date('1986-06-02'), date_joined: new Date('2010-11-12'), type: "staff"
            },
            {
                id: 3334, name: 'Eve', surname: 'Johnson', phone: '012 333 4455', email: 'eve@mail.com', role: 'Admin', address: '456 Road',
                date_of_birth: new Date(), date_joined: new Date(), type: "staff"
            },
            {
                id: 5893, name: 'Frank', surname: 'Williams', phone: '012 444 5566', email: 'frank@mail.com', role: 'Editor', address: '321 Boulevard',
                date_of_birth: new Date(), date_joined: new Date(), type: "staff"
            }
        
    ]

export function updateUser(newData: User){
    let user = findUser(newData.id.toString());
    if(user){
        user.name = newData.name;
        user.surname = newData.surname;
        user.phone = newData.phone;
        user.email = newData.email;
        user.role = newData.role;
        user.address = newData.address;
        user.date_of_birth = newData.date_of_birth;
        user.date_joined = newData.date_joined;
    }
    
}

export function findUser(Id: string){
    return users.find((user) => user.id.toString() === Id);
}

function getUsersByType(type: string){
    console.log("these are list", users)
    return users.filter((user)=> user.type === type)
}

export const teachers = getUsersByType('staff')
export const students = getUsersByType('student')
export function addUser(user: User, type: string){
    // console.log("the last value is ", users[users.length - 1])
    user.id = users[users.length - 1].id + 1;
    user.type = type;
    console.log("before adding the user", user)
    users.push(user);
    console.log("the new list of users are", users)
    return user
}