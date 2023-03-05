import {
  HttpInterceptorFn,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { map } from "rxjs";
import { ROLE } from "../models";
import { AuthService } from "../services";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("authInterceptor", req.method, req.url);
  const authService = inject(AuthService);

  const cloneReq = req.clone({
    setHeaders: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authService.getAuthUser()?.token}`,
    },
  });

  return next(cloneReq).pipe(
    map((response: HttpEvent<any>) => {
      if (response instanceof HttpResponse) {
        if (response?.ok) {
          if (response.body.username === "kminchelle") {
            response.body.role = ROLE.ADMIN;
          } else if (response.body.username === "hbingley1") {
            response.body.role = ROLE.AUTHOR;
          } else {
            response.body.role = ROLE.USER;
          }
        }
      }
      return response;
    })
  );
};
