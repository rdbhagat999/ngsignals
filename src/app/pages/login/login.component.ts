import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ROLE } from "src/app/models";
import { AuthService } from "src/app/services";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <section class="bg-gray-50 dark:bg-gray-900">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          class="cursor-pointer flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Login as
        </div>
        <form
          [formGroup]="loginRoleForm"
          class="text-white mb-4">
          <label class="text-gray-900 dark:text-white">
            <input
              data-cy="user"
              type="radio"
              formControlName="loginRole"
              value="USER"
              class="checked:bg-blue-500 ..." />
            USER
          </label>
          <label class="text-gray-900 dark:text-white">
            <input
              data-cy="author"
              type="radio"
              formControlName="loginRole"
              value="AUTHOR"
              class="checked:bg-blue-500 ..." />
            AUTHOR
          </label>
          <label class="text-gray-900 dark:text-white">
            <input
              data-cy="admin"
              type="radio"
              formControlName="loginRole"
              value="ADMIN"
              class="checked:bg-blue-500 ..." />
            ADMIN
          </label>
        </form>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              data-cy="title"
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              [formGroup]="form"
              (ngSubmit)="handleSubmit()"
              novalidate>
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your username</label
                >
                <input
                  data-cy="username"
                  appInputFocus
                  formControlName="username"
                  [ngClass]="{
                    'is-invalid':
                      username?.invalid &&
                      (username?.dirty || username?.touched)
                  }"
                  type="text"
                  name="username"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter username"
                  required="" />
                <ng-container
                  *ngIf="
                    (username?.invalid && username?.dirty) || username?.touched
                  ">
                  <p
                    class="text-sm font-light text-gray-500 dark:text-gray-400">
                    <span *ngIf="username?.errors?.['required']"
                      >username is required</span
                    >
                  </p>
                </ng-container>
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  data-cy="password"
                  formControlName="password"
                  [ngClass]="{
                    'is-invalid':
                      password?.invalid &&
                      (password?.dirty || password?.touched)
                  }"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="" />
                <ng-container
                  *ngIf="
                    (password?.invalid && password?.dirty) || password?.touched
                  ">
                  <p
                    class="text-sm font-light text-gray-500 dark:text-gray-400">
                    <span *ngIf="password?.errors?.['required']"
                      >password is required</span
                    >
                  </p>
                </ng-container>
              </div>
              <button
                data-cy="login-btn"
                [disabled]="form.invalid || isFormSubmitted()"
                type="submit"
                [ngClass]="{
                  'cursor-not-allowed': form.invalid || isFormSubmitted()
                }"
                class="submit w-full inline-flex justify-center items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-700 hover:bg-indigo-500 transition ease-in-out duration-150">
                <svg
                  [class.hidden]="!isFormSubmitted()"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isFormSubmitted() ? "Processing..." : "Submit" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  // private toastrService = inject(ToastrService);

  form!: FormGroup;
  loginRoleForm!: FormGroup;
  sub1$!: Subscription;
  sub2$!: Subscription;
  sub3$!: Subscription;
  isFormSubmitted = signal(false);

  initLoginRoleForm() {
    this.loginRoleForm = this.fb.group({
      loginRole: new FormControl("USER"),
    });

    this.sub3$ = this.loginRoleForm.valueChanges.subscribe(({ loginRole }) => {
      switch (loginRole) {
        case ROLE.ADMIN:
          this.form.patchValue({
            username: "kminchelle",
            password: "0lelplR",
          });
          break;
        case ROLE.AUTHOR:
          this.form.patchValue({
            username: "hbingley1",
            password: "CQutx25i8r",
          });
          break;
        default:
          this.form.patchValue({
            username: "atuny0",
            password: "9uQFF1Lh",
          });
          break;
      }
    });
  }

  ngOnInit(): void {
    this.initForm();

    if (this.authService.getAuthUser()) {
      this.router.navigate(["/"]);
    }
  }

  initForm() {
    this.form = this.fb.group({
      username: ["atuny0", [Validators.required]],
      password: ["9uQFF1Lh", [Validators.required]],
    });

    this.initLoginRoleForm();
  }

  get username() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
  }

  handleSubmit() {
    // Set flag to true
    this.isFormSubmitted.set(true);

    // Return if form is invalid
    if (this.form?.invalid) {
      this.isFormSubmitted.set(false);
      return;
    }

    // Form field values
    // console.log(this.form?.value);

    this.sub1$ = this.authService
      .loginToDummyJson(this.form.value?.username, this.form.value?.password)
      .subscribe({
        next: async (data: any) => {
          this.authService.setAuthUser(data);
          // this.toastrService.successToastr("Success", "login successful.", {
          //   autoClose: true,
          //   keepAfterRouteChange: true,
          // });
          this.router.navigateByUrl("/");
        },
        error: () => {
          this.isFormSubmitted.set(false);
        },
        complete: () => {
          this.isFormSubmitted.set(false);
        },
      });
  }

  canDeactivate() {
    const pristine = this.form.pristine;
    return pristine;
  }

  ngOnDestroy() {
    if (this.sub1$) {
      this.sub1$.unsubscribe();
    }
    if (this.sub2$) {
      this.sub2$.unsubscribe();
    }
    if (this.sub3$) {
      this.sub3$.unsubscribe();
    }
  }
}
