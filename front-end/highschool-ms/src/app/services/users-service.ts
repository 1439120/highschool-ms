import { computed, Injectable, signal } from '@angular/core';
import { User, users } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users = signal<User[]>(users);

  updateUser(newData: User) {
    console.log('Before update:', this._users());
    console.log('Updating with:', newData);
    console.log('Looking for ID:', newData.id);
    
    this._users.update(users => {
      const updatedUsers = users.map(u => {
        console.log('Checking user:', u.id, 'vs', newData.id, 'match?', u.id === newData.id);
        let type = u.type
        return u.id === newData.id ? { ...newData, type: type } : u;
      });
      
      console.log('After update:', updatedUsers);
      return updatedUsers;
    });
  }

  findUser(Id: string | null){
      return this._users().find(user => user.id.toString() === Id);
  }

  getUsersByType(type: string){
      return users.filter((user)=> user.type === type)
  }

  teachers = computed(()=> this._users().filter(user => user.type === 'staff')) 
  students = computed(()=> this._users().filter(user => user.type === 'student')) 
  addUser(user: User, type: string){
      const current = this._users();
    const newUser: User = {
      ...user,
      id: current[current.length - 1]?.id + 1 || 1,
      type
    };

    this._users.set([...current, newUser]); // 🔥 THIS is the fix
    return newUser;
  }

}
