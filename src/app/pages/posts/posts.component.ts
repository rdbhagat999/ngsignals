import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { ROLE, IDummyAuthUser, IPost } from "src/app/models";
import { PostService, AuthService } from "src/app/services";
import { RouterModule } from "@angular/router";
import { PostComponent } from "./post/post.component";
import { CardComponent } from "./card/card.component";
import { fromSignal } from "src/app/lib";

@Component({
  selector: "app-posts",
  standalone: true,
  imports: [CommonModule, RouterModule, PostComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      [class.md:grid-cols-2]="auth_user?.role === authorRole"
      class="post-list grid grid-cols-1 gap-4">
      <article>
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3
              data-cy="post-list"
              class="text-lg font-medium leading-6 text-gray-900">
              Post list
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Displays a list of posts from all authors.
            </p>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:px-6">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200">
              <ng-container *ngIf="posts$ | async as posts">
                <app-card
                  [auth_user]="auth_user"
                  *ngFor="let post of posts"
                  [post]="post"></app-card>
              </ng-container>
            </ul>
          </div>
        </div>
      </article>
      <article *ngIf="auth_user?.role === authorRole">
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3
              data-cy="your-post-list"
              class="text-lg font-medium leading-6 text-gray-900">
              Your post list
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Displays a list of posts from you.
            </p>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:px-6">
            <ul
              role="list"
              class="divide-y divide-gray-200 rounded-md border border-gray-200">
              <ng-container *ngIf="yourPosts$ | async as yourPosts">
                <app-card
                  [auth_user]="auth_user"
                  *ngFor="let yourPost of yourPosts"
                  [post]="yourPost"></app-card>
              </ng-container>
            </ul>
          </div>
        </div>
      </article>
    </section>
  `,
  styles: [],
})
export class PostsComponent {
  private postService: PostService = inject(PostService);
  private authService: AuthService = inject(AuthService);
  // public toastrService: ToastrService = inject(ToastrService);

  authorRole = ROLE.AUTHOR;
  adminRole = ROLE.ADMIN;
  auth_user!: IDummyAuthUser | null;

  options = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  posts$!: Observable<IPost[]>;
  yourPosts$!: Observable<IPost[]>;

  ngOnInit() {
    this.auth_user = this.authService.getAuthUser();
    this.posts$ = fromSignal(this.postService.getPosts());
    this.yourPosts$ = fromSignal(
      this.postService.getAllPostsByUserId(this.auth_user?.id || 0)
    );
  }

  trackById(index: number, item: IPost) {
    return item.id;
  }
}
