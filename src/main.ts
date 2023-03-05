import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { importProvidersFrom, ErrorHandler } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./app/app-routing.module";
import { AppComponent } from "./app/app.component";
import {
  errorInterceptor,
  authInterceptor,
  cacheInterceptor,
} from "./app/interceptors";
import { BACKEND_API } from "./app/models";
import { AuthService, GlobalErrorHandlerService } from "./app/services";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([BrowserAnimationsModule]),
    { provide: BACKEND_API, useValue: "https://dummyjson.com" },
    // { provide: ToastrService, useClass: ToastrService },
    { provide: AuthService, useClass: AuthService },
    provideHttpClient(
      withInterceptors([errorInterceptor, authInterceptor, cacheInterceptor])
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    provideRouter([...APP_ROUTES]),
  ],
});
