import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private httpClient: HttpClient) { }

  private apiUrl="http://localhost:9093/user/"

  getAllUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl+"getAllUser")
  }

  addUser(user:User): Observable <User> {
    return this.httpClient.post<User>(this.apiUrl+"addUser",user)
  }

  updateUser(id:number,user:User):Observable<User>{
    return this.httpClient.put<User>(this.apiUrl+"updateUser/"+id,user);
  }

  deleteUser(id:number) : Observable<void>
  {
    //http://localhost:8080/user/deleteUser/id  
    return this.httpClient.delete<void>(this.apiUrl+"deleteUser/"+id)
  }

  getUserById(id:Number):Observable<User>{
    return this.httpClient.get<User>(this.apiUrl+"getUserById/"+id);
  }
}
