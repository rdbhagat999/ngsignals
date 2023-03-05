import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map } from "rxjs";
import { fromObservable } from "../lib";
import { BACKEND_API, IPost } from "../models";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private _http = inject(HttpClient);
  private _backend_url = inject(BACKEND_API);

  getPosts(limit: number = 5) {
    const response$ = this._http
      .get(`${this._backend_url}/auth/posts?limit=${limit}`, {
        reportProgress: false,
      })
      .pipe(map((data: any) => data?.posts as IPost[]));

    const responseSignal = fromObservable(response$, [] as IPost[]);
    return responseSignal;
  }

  getPostById(postId: number) {
    const response$ = this._http.get<IPost>(
      `${this._backend_url}/auth/posts/${postId}`,
      {
        reportProgress: false,
      }
    );

    const responseSignal = fromObservable(response$, {} as IPost);
    return responseSignal;
  }

  getAllPostsByUserId(userId: number) {
    const response$ = this._http
      .get(`${this._backend_url}/auth/posts/user/${userId}`, {
        reportProgress: false,
      })
      .pipe(map((data: any) => data?.posts as IPost[]));

    const responseSignal = fromObservable(response$, [] as IPost[]);
    return responseSignal;
  }
}
