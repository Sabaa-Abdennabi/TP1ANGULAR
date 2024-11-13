import { Injectable, inject } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CONSTANTES } from 'src/config/const.config';
import { UserDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private userSubject = new BehaviorSubject<UserDto | null>(null);
  user$ = this.userSubject.asObservable();
  constructor() {
    this.loadUserFromStorage();
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        localStorage.setItem(CONSTANTES.token, response.id);
        localStorage.setItem(CONSTANTES.email, credentials.email);
        this.userSubject.next({ id: response.id, email: credentials.email });
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(CONSTANTES.token);
  }

  logout() {
    localStorage.removeItem(CONSTANTES.token);
    localStorage.removeItem(CONSTANTES.email);
    this.userSubject.next(null);
  }
  private loadUserFromStorage() {
    const id = localStorage.getItem(CONSTANTES.token);
    const email = localStorage.getItem(CONSTANTES.email);
    if (id && email) {
      this.userSubject.next({ id, email });
    }
  }
}
