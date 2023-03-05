import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IDummyAuthUser } from "src/app/models";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-desktop-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex space-x-4">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      <a
        [attr.data-cy]="link?.label"
        *ngFor="let link of navLinks"
        [routerLink]="link?.path"
        routerLinkActive="bg-gray-900 text-white"
        [routerLinkActiveOptions]="{ exact: true }"
        class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        aria-current="page"
        >{{ link?.label }}</a
      >
      <ng-container *ngIf="!auth_user">
        <a
          data-cy="login"
          routerLink="/login"
          routerLinkActive="bg-gray-900 text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          aria-current="page"
          >Login</a
        >
        <a
          data-cy="register"
          routerLink="/register"
          routerLinkActive="bg-gray-900 text-white"
          [routerLinkActiveOptions]="{ exact: true }"
          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          aria-current="page"
          >Register</a
        >
      </ng-container>
    </div>
  `,
  styles: [],
})
export class DesktopNavbarComponent {
  @Input() navLinks: any = [];
  @Input() auth_user!: IDummyAuthUser | null;
}
