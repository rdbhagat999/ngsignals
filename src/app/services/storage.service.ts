import { inject, Injectable } from "@angular/core";
import { WINDOW } from "../models";

const USER_KEY = "storage_user";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private window = inject(WINDOW);

  public clean(): void {
    this.window.sessionStorage.clear();
  }

  public saveUserToStorage(user: any): void {
    this.window.sessionStorage.removeItem(USER_KEY);
    this.window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromStorage() {
    const user = this.window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
