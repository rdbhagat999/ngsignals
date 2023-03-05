import { Route } from "@angular/router";
import { deactivateGuard, authGuard } from "./guards";
import { HomeComponent } from "./pages";

export const APP_ROUTES: Route[] = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home",
  },

  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    loadComponent: () => import("./pages").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    canDeactivate: [deactivateGuard],
    loadComponent: () => import("./pages").then((m) => m.RegisterComponent),
  },
  {
    path: "posts",
    canActivate: [authGuard],
    loadComponent: () => import("./pages").then((m) => m.PostsComponent),
  },
  {
    path: "posts/:id",
    canActivate: [authGuard],
    loadComponent: () => import("./pages").then((m) => m.PostComponent),
  },
  {
    path: "me/:id",
    canActivate: [authGuard],
    loadComponent: () => import("./pages").then((m) => m.MeComponent),
  },
  {
    path: "products",
    canActivate: [authGuard],
    loadComponent: () => import("./pages").then((m) => m.ProductsComponent),
  },
  {
    path: "about",
    loadComponent: () => import("./pages").then((m) => m.AboutComponent),
  },
  {
    path: "counter",
    loadComponent: () => import("./components").then((m) => m.CounterComponent),
  },
  {
    path: "**",
    loadComponent: () => import("./pages").then((m) => m.PageNotFoundComponent),
  },
];
