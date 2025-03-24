import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {finalize} from "rxjs/operators";

export class LoadingInterceptor implements HttpInterceptor {
  public static loadingSubject = new Subject<boolean>();
  public static loading$ = LoadingInterceptor.loadingSubject.asObservable();
  public static ignoreKey = 'loading-ignore';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.params.has(LoadingInterceptor.ignoreKey)) {
      return next.handle(req);
    } else {
      LoadingInterceptor.loadingSubject.next(true);
      return next.handle(req).pipe(finalize(() => LoadingInterceptor.loadingSubject.next(false)));
    }
  }

}
