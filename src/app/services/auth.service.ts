import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { BACKEND_API, IDummyAuthUser, IDummyJsonUser } from "../models";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storageservice: StorageService = inject(StorageService);
  private _backend_url = inject(BACKEND_API);
  private auth_user = new BehaviorSubject<IDummyAuthUser | null>(null);

  auth_user$ = this.auth_user.asObservable();

  setAuthUser(user: any): void {
    this.storageservice.saveUserToStorage(user);
    this.auth_user.next(user);
  }

  setAuthUserFromStorage(): void {
    this.auth_user.next(this.getAuthUser());
  }

  getAuthUser(): IDummyAuthUser | null {
    const user = this.storageservice.getUserFromStorage();
    return user;
  }

  loginToDummyJson(username: string, password: string) {
    return this.http.post<IDummyAuthUser>(`${this._backend_url}/auth/login`, {
      username,
      password,
    });
  }

  getProfileData(userId: number) {
    return this.http.get<IDummyJsonUser>(
      `${this._backend_url}/users/${userId}`
    );
  }

  checkUsername(username: string): Observable<boolean> {
    if (username === "kminchelle") {
      return of(true);
    }
    return of(false);
  }

  isTokenExpired(token: string): boolean {
    try {
      const expiry = JSON.parse(atob(token.split(".")[1])).exp;
      return expiry * 1000 > Date.now();
    } catch (error) {
      return true;
    }
  }

  logoutFromDummyJson() {
    this.setAuthUser(null);
    this.storageservice.clean();
    this.router.navigateByUrl("/login");
  }
}
