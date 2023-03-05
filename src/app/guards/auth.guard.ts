import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "../services";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.getAuthUser();

  if (!isLoggedIn) {
    authService.logoutFromDummyJson();
    return false;
  }

  return true;
};
