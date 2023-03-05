import { inject, InjectionToken, PLATFORM_ID } from "@angular/core";

export const BACKEND_API = new InjectionToken<string>("API_URL");

export const WINDOW = new InjectionToken<Window>("Window token", {
  providedIn: "root",
  factory: () => (inject(PLATFORM_ID) === "browser" ? window : ({} as Window)),
});
