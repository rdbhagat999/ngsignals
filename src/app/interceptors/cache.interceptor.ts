import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { of, tap } from "rxjs";

const cache = new Map<string, any>();
const cacheTime = new Map<string, any>();
const MAX_CACHE_TIME = 9_20_000;

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("cacheInterceptor", req.method, req.url);

  if (req.method !== "GET") {
    return next(req);
  }

  const currentTime = new Date().getTime();

  const cachedURLTime = cacheTime.get(req.url) || currentTime;

  const diffTime = currentTime - cachedURLTime;

  if (diffTime > MAX_CACHE_TIME) {
    cache.delete(req.url);
    console.log("request cache deleted.");
  }

  const cachedResponse = cache.get(req.url);

  if (cachedResponse) {
    console.log("Found request cache.");
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((response) => {
      if (response instanceof HttpResponse) {
        if (response?.ok) {
          console.log("Stored request.");
          if (cache.size > 20) {
            cache.clear();
            console.log("Cleared all request cache.");
          }
          cache.set(req.url, response);
          cacheTime.set(req.url, new Date().getTime());
        }
      }
    })
  );
};
