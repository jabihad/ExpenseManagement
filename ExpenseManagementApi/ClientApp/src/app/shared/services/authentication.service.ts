import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthResponseDto } from 'src/app/_interfaces/response/authResponseDto.model';
import { RegistrationResponseDto } from 'src/app/_interfaces/response/registrationResponseDto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _loggedinMessageSource = new Subject<string>();
  loggedinMessage$ = this._loggedinMessageSource.asObservable();
  public baseUrl : string = 'https://localhost:44372/api/account/'
  public reqHeader = new HttpHeaders({ 
    'Authorization': 'Bearer ' + localStorage.getItem('token')
   });

  

  constructor(private _http: HttpClient) { }
  public login(userForAuthenticationDto)
  {
    return this._http.post<AuthResponseDto>(this.baseUrl + 'login', userForAuthenticationDto);
  }
  public register(user)
  {
    return this._http.post<RegistrationResponseDto>(this.baseUrl + 'registration', user);
  }
  public logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
  public sendMessage(message: string)
  {
    this._loggedinMessageSource.next(message)
  }
}
