import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { LifeCycleDirective } from "src/app/directives";
import { takeUntil, filter, tap } from "rxjs";
import { IDummyAuthUser } from "src/app/models";

@Component({
  selector: "app-toggle-dropdown",
  standalone: true,
  imports: [CommonModule, RouterModule],
  hostDirectives: [LifeCycleDirective],
  template: `
    <div *ngIf="auth_user">
      <button
        data-cy="toggle-dropdown"
        (click)="handleToggleDropdown()"
        type="button"
        class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true">
        <span class="sr-only">Open user menu</span>
        <img
          class="h-8 w-8 rounded-full"
          src="/assets/navbar_avatar.avif"
          alt="avatar" />
      </button>
    </div>
  `,
  styles: [],
})
export class ToggleDropdownComponent {
  private router: Router = inject(Router);
  private lifeCycleDirective = inject(LifeCycleDirective);
  @Input() isDropdownOpen = false;
  @Input() auth_user!: IDummyAuthUser | null;
  @Output() toggleDropdown = new EventEmitter<boolean>();

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.lifeCycleDirective.destroy$),
        filter((event) => event instanceof NavigationEnd),
        tap(() => (this.isDropdownOpen = false))
      )
      .subscribe();
  }

  handleToggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.toggleDropdown.emit(this.isDropdownOpen);
  }
}
