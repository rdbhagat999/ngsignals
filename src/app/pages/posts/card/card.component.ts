import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HighlightDirective, TooltipDirective } from "src/app/directives";
import { ROLE, IPost, IDummyAuthUser } from "src/app/models";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule, RouterModule, HighlightDirective, TooltipDirective],
  template: `
    <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
      <div class="flex w-0 flex-1 items-center">
        <svg
          class="h-5 w-5 flex-shrink-0 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
            clip-rule="evenodd" />
        </svg>
        <span
          data-cy="post-title"
          class="ml-2 w-0 flex-1 truncate"
          [appTooltip]="post.title"
          >{{ post.title }}</span
        >
      </div>
      <div class="ml-4 flex-shrink-0 space-x-4">
        <a
          appHighlight
          [routerLink]="['/posts', post.id]"
          data-cy="view-post-link"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >View</a
        >
        <a
          *ngIf="auth_user?.role == authorRole && auth_user?.id === post.userId"
          data-cy="edit-post-link"
          class="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
          >Edit</a
        >
        <a
          *ngIf="
            auth_user?.role == adminRole ||
            (auth_user?.role == authorRole && auth_user?.id === post.userId)
          "
          data-cy="delete-post-link"
          class="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
          >Delete</a
        >
      </div>
    </li>
  `,
  styles: [],
})
export class CardComponent {
  adminRole: ROLE = ROLE.ADMIN;
  authorRole: ROLE = ROLE.AUTHOR;
  @Input() post!: IPost;
  @Input() auth_user!: IDummyAuthUser | null;
}
