import { inject } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { AuthService } from "../services";

export class AsyncUsernameExists implements AsyncValidator {
  authService = inject(AuthService);

  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.checkUsername(control.value).pipe(
      map((isTaken) => (isTaken ? { usernameExists: true } : null)),
      catchError(() => of(null))
    );
  }
}
