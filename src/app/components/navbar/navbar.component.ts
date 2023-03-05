import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { LifeCycleDirective } from "src/app/directives";
import { Router, NavigationEnd, RouterModule } from "@angular/router";
import { Observable, takeUntil, filter, tap } from "rxjs";
import { IDummyAuthUser } from "src/app/models";
import { AuthService } from "src/app/services";
import { DesktopNavbarComponent } from "./desktop-navbar/desktop-navbar.component";
import { MobileNavbarComponent } from "./mobile-navbar/mobile-navbar.component";
import { ToggleDropdownComponent } from "./toggle-dropdown/toggle-dropdown.component";
import { ToggleNavbarComponent } from "./toggle-navbar/toggle-navbar.component";
import { ProfileDropdownComponent } from "./profile-dropdown/profile-dropdown.component";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToggleNavbarComponent,
    MobileNavbarComponent,
    DesktopNavbarComponent,
    ProfileDropdownComponent,
    ToggleDropdownComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [LifeCycleDirective],
  template: `
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <app-toggle-navbar
              (isMobileMenuOpenEvent)="toggleMobileMenu($event)"
              [isMobileMenuOpen]="isMobileMenuOpen()"></app-toggle-navbar>
          </div>
          <div
            class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img
                class="block h-8 w-auto lg:hidden"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company" />
              <img
                class="hidden h-8 w-auto lg:block"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company" />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <app-desktop-navbar
                [navLinks]="navLinks()"
                [auth_user]="auth_user$ | async"></app-desktop-navbar>
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <!-- <button
              type="button"
              class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button> -->
            <!-- Profile dropdown -->
            <div class="relative ml-3">
              <div>
                <app-toggle-dropdown
                  [auth_user]="auth_user$ | async"
                  [isDropdownOpen]="isDropdownOpen()"
                  (toggleDropdown)="
                    toggleDropdown($event)
                  "></app-toggle-dropdown>
              </div>
              <!--
          Dropdown menu, show/hide based on menu state.
          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
              <app-profile-dropdown
                (logoutEvent)="logoutEvent($event)"
                [isDropdownOpen]="isDropdownOpen()"
                [auth_user]="auth_user$ | async"></app-profile-dropdown>
            </div>
          </div>
        </div>
      </div>
      <app-mobile-navbar
        [isMobileMenuOpen]="isMobileMenuOpen()"
        [navLinks]="navLinks()"
        [auth_user]="auth_user$ | async"></app-mobile-navbar>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent {
  private router: Router = inject(Router);
  private lifeCycleDirective = inject(LifeCycleDirective);
  private authService = inject(AuthService);
  auth_user$!: Observable<IDummyAuthUser | null>;
  isMobileMenuOpen = signal(false);
  isDropdownOpen = signal(false);

  navLinks: any = signal([
    { path: "/", label: "Home" },
    { path: "/posts", label: "Posts" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
  ]);

  ngOnInit() {
    this.auth_user$ = this.authService.auth_user$;

    this.router.events
      .pipe(
        takeUntil(this.lifeCycleDirective.destroy$),
        filter((event) => event instanceof NavigationEnd),
        tap(() => {
          this.isMobileMenuOpen.set(false);
          this.isDropdownOpen.set(false);
          return;
        })
      )
      .subscribe();
  }

  toggleMobileMenu(event: any) {
    this.isMobileMenuOpen.set(event as boolean);
  }

  toggleDropdown(event: boolean) {
    this.isDropdownOpen.set(event as boolean);
  }

  logoutEvent(event: boolean) {
    this.isDropdownOpen.set(event as boolean);
    this.authService.logoutFromDummyJson();
  }
}
