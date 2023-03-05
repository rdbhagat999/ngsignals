import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { IDummyJsonUser } from "src/app/models";
import { AuthService } from "src/app/services";

@Component({
  selector: "app-me",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section
      class="ease-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200"
      id="profile">
      <ng-container *ngIf="profile$ | async as profile">
        <div class="w-full px-6 py-6 mx-auto drop-zone text-slate-500">
          <div
            class="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable"
            draggable="true">
            <div
              class="flex flex-row justify-start items-center flex-wrap -mx-3">
              <div class="flex-none w-auto max-w-full px-3">
                <div
                  class="text-size-base ease-in-out h-32 w-32 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                  <img
                    [src]="profile?.image || '/assets/profile_user.jpg'"
                    alt="profile_image"
                    class="w-full shadow-sm rounded-xl" />
                </div>
              </div>
              <div class="flex-none w-auto max-w-full px-3 my-auto">
                <div class="h-full">
                  <h5 class="mb-1 text-4xl">
                    {{ profile?.firstName }}
                    {{ profile?.lastName }}
                  </h5>
                  <p class="mb-0 font-semibold leading-normal text-size-sm">
                    {{ profile?.company?.title }}
                  </p>
                  <p
                    data-cy="role"
                    class="mb-0 font-semibold leading-normal text-size-sm">
                    {{ profile?.role }}
                  </p>
                </div>
              </div>
              <div
                class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12"></div>
            </div>
          </div>
          <div class="w-full p-3 mt-6 mx-auto removable">
            <div class="flex flex-wrap -mx-3 drop-zone">
              <div
                class="w-full max-w-full lg-max:mt-6 mb-4 draggable"
                draggable="true">
                <div
                  class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                  <div class="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                    <div class="flex flex-wrap -mx-3">
                      <div
                        class="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                        <h6
                          class="mb-0"
                          data-cy="profile-info">
                          Profile Information
                        </h6>
                      </div>
                      <div
                        class="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
                        <a
                          href="javascript:;"
                          data-target="tooltip_trigger"
                          data-placement="top">
                          <i
                            class="leading-normal fas fa-user-edit text-size-sm text-slate-400"
                            aria-hidden="true"></i>
                        </a>
                        <div
                          data-target="tooltip"
                          class="px-2 py-1 text-center text-white bg-black rounded-lg text-size-sm hidden"
                          role="tooltip"
                          data-popper-placement="top"
                          style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate(985px, 114px);"
                          data-popper-reference-hidden=""
                          data-popper-escaped="">
                          Edit Profile
                          <div
                            class="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                            data-popper-arrow=""
                            style="position: absolute; left: 0px; transform: translate(0px, 0px);"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-auto p-4">
                    <p class="leading-normal text-size-sm">
                      Hi, I’m {{ profile?.firstName }} {{ profile?.lastName }},
                      Decisions: If you can’t decide, the answer is no. If two
                      equally difficult paths, choose the one more painful in
                      the short term (pain avoidance is creating an illusion of
                      equality).
                    </p>
                    <hr
                      class="h-px my-6 bg-transparent bg-gradient-horizontal-light" />
                    <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                      <li
                        class="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit">
                        <strong class="text-slate-700">Full Name:</strong>
                        &nbsp;
                        {{ profile?.firstName }}
                        {{ profile?.lastName }}
                      </li>
                      <li
                        class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
                        <strong class="text-slate-700">Mobile:</strong> &nbsp;
                        {{ profile?.phone }}
                      </li>
                      <li
                        class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
                        <strong class="text-slate-700">Email:</strong> &nbsp;
                        {{ profile?.email }}
                      </li>
                      <li
                        class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
                        <strong class="text-slate-700">Location:</strong> &nbsp;
                        {{ profile?.address?.city }},
                        {{ profile?.address?.state }},
                        {{ profile?.address?.postalCode }}
                      </li>
                      <!-- <li
                      class="relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit">
                      <strong class="leading-normal text-size-sm text-slate-700"
                        >Social:</strong
                      >
                      &nbsp;
                      <a
                        class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center text-blue-800 align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-in bg-none"
                        href="javascript:;">
                        <i
                          class="fab fa-facebook fa-lg"
                          aria-hidden="true"></i>
                      </a>
                      <a
                        class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-in bg-none text-sky-600"
                        href="javascript:;">
                        <i
                          class="fab fa-twitter fa-lg"
                          aria-hidden="true"></i>
                      </a>
                      <a
                        class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-in bg-none text-sky-900"
                        href="javascript:;">
                        <i
                          class="fab fa-instagram fa-lg"
                          aria-hidden="true"></i>
                      </a>
                    </li> -->
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </section>
    <section
      class="ease-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200"
      id="profile">
      <ng-container *ngIf="profile$ | async as profile">
        <div class="w-full px-6 py-6 mx-auto drop-zone text-slate-500">
          <div
            class="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable"
            draggable="true">
            <div
              class="flex flex-row justify-start items-center flex-wrap -mx-3">
              <div class="flex-none w-auto max-w-full px-3">
                <div
                  class="text-size-base ease-in-out h-32 w-32 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                  <img
                    [src]="profile?.image || '/assets/profile_user.jpg'"
                    alt="profile_image"
                    class="w-full shadow-sm rounded-xl" />
                </div>
              </div>
              <div class="flex-none w-auto max-w-full px-3 my-auto">
                <div class="h-full">
                  <h5 class="mb-1 text-4xl">
                    {{ profile?.firstName }}
                    {{ profile?.lastName }}
                  </h5>
                  <p class="mb-0 font-semibold leading-normal text-size-sm">
                    {{ profile?.company?.title }}
                  </p>
                  <p
                    data-cy="role"
                    class="mb-0 font-semibold leading-normal text-size-sm">
                    {{ profile?.role }}
                  </p>
                </div>
              </div>
              <div
                class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12"></div>
            </div>
          </div>
          <div class="w-full p-3 mt-6 mx-auto removable">
            <div class="flex flex-wrap -mx-3 drop-zone">
              <div
                class="w-full max-w-full lg-max:mt-6 mb-4 draggable"
                draggable="true">
                <div
                  class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                  <div class="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                    <div class="flex flex-wrap -mx-3">
                      <div
                        class="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                        <h6
                          class="mb-0"
                          data-cy="profile-info">
                          Profile Information
                        </h6>
                      </div>
                      <div
                        class="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
                        <a
                          href="javascript:;"
                          data-target="tooltip_trigger"
                          data-placement="top">
                          <i
                            class="leading-normal fas fa-user-edit text-size-sm text-slate-400"
                            aria-hidden="true"></i>
                        </a>
                        <div
                          data-target="tooltip"
                          class="px-2 py-1 text-center text-white bg-black rounded-lg text-size-sm hidden"
                          role="tooltip"
                          data-popper-placement="top"
                          style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate(985px, 114px);"
                          data-popper-reference-hidden=""
                          data-popper-escaped="">
                          Edit Profile
                          <div
                            class="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                            data-popper-arrow=""
                            style="position: absolute; left: 0px; transform: translate(0px, 0px);"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-auto p-4">
                    <p class="leading-normal text-size-sm">
                      Hi, I’m {{ profile?.firstName }} {{ profile?.lastName }},
                      Decisions: If you can’t decide, the answer is no. If two
                      equally difficult paths, choose the one more painful in
                      the short term (pain avoidance is creating an illusion of
                      equality).
                    </p>
                    <hr
                      class="h-px my-6 bg-transparent bg-gradient-horizontal-light" />
                    <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                      <li
                        class="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit">
                        <strong class="text-slate-700">Full Name:</strong>
                        &nbsp;
                        {{ profile?.firstName }}
                        {{ profile?.lastName }}
                      </li>
                      <li
                        class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
                        <strong class="text-slate-700">Mobile:</strong> &nbsp;
                        {{ profile?.phone }}
                      </li>
                      <li
                        class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
                        <strong class="text-slate-700">Email:</strong> &nbsp;
                        {{ profile?.email }}
                      </li>
                      <li
                        class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
                        <strong class="text-slate-700">Location:</strong> &nbsp;
                        {{ profile?.address?.city }},
                        {{ profile?.address?.state }},
                        {{ profile?.address?.postalCode }}
                      </li>
                      <!-- <li
                      class="relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit">
                      <strong class="leading-normal text-size-sm text-slate-700"
                        >Social:</strong
                      >
                      &nbsp;
                      <a
                        class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center text-blue-800 align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-in bg-none"
                        href="javascript:;">
                        <i
                          class="fab fa-facebook fa-lg"
                          aria-hidden="true"></i>
                      </a>
                      <a
                        class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-in bg-none text-sky-600"
                        href="javascript:;">
                        <i
                          class="fab fa-twitter fa-lg"
                          aria-hidden="true"></i>
                      </a>
                      <a
                        class="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-size-xs ease-in bg-none text-sky-900"
                        href="javascript:;">
                        <i
                          class="fab fa-instagram fa-lg"
                          aria-hidden="true"></i>
                      </a>
                    </li> -->
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </section>
  `,
  styles: [],
})
export class MeComponent {
  private authService: AuthService = inject(AuthService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  profile$!: Observable<IDummyJsonUser>;
  userId = 0;

  ngOnInit() {
    this.profile$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.userId = +(params.get("id") ?? 0);
        return this.authService.getProfileData(this.userId);
      })
    );
  }
}
