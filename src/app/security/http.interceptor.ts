import { HttpRequest, HttpEvent, HttpHandlerFn, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environment/environment'
import { DialogService } from '@services/dialog-service';
import { inject } from '@angular/core';
import AuthorizeService from './auth.service';

export function baseHttpInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const dialogService = inject(DialogService);
  const authorizeService = inject(AuthorizeService);

  let k = getRootDomain(window.location.hostname);
  let baseUrl = environment.production? `https://scmworkspace.${k}/` : environment.BASE_URL

  req = req.clone({
    url: `${baseUrl}${req.url}`,
    setHeaders: {
        'x-app-id': window.location.hostname,
        'x-client-app': 'Admin'
      },
    withCredentials: true
  });

  dialogService.toggleAsyncMode();

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        dialogService.toggleAsyncMode(false);
      }
    }),
    catchError((err) => {
      dialogService.toggleAsyncMode(false);

      // --- CASE 1: ResponseType is BLOB but contains JSON ---
      if (err.error instanceof Blob) {
        return new Observable<any>(observer => {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const json = JSON.parse(reader.result as string);

              handleServerError(json, err.status, authorizeService, dialogService);
              observer.error(json);
            } catch {
              // Blob was not JSON, fallback to default message
              dialogService.showNotification(
                "Request Error",
                err.message || "An unexpected error occurred",
                "danger"
              );
              observer.error(err);
            }
          };

          reader.onerror = () => {
            dialogService.showNotification(
              "Request Error",
              err.message || "An unexpected error occurred",
              "danger"
            );
            observer.error(err);
          };

          reader.readAsText(err.error);
        });
      }

      // --- CASE 2: Standard JSON error ---
      handleServerError(err.error, err.status, authorizeService, dialogService);

      return throwError(() => err);
    })
  );
}


// Helper function
function handleServerError(errorBody: any, status: number, authorizeService: AuthorizeService, dialogService: DialogService) {
  if (status === 401) {
    authorizeService.signOut();
    return
  }

  if (status > 399) {
    let message = '';

    if (errorBody?.errors) {
      message = Object.values(errorBody.errors).join("\n");
    } else if (errorBody?.message) {
      message = errorBody.message;
    } else {
      message = "An error occurred";
    }

    dialogService.showNotification("Request Failed", message, "danger");
  }
}

function getRootDomain(hostname: string): string {
  const parts = hostname.split('.');

  if (parts.length <= 2) return hostname;

  return parts.slice(-2).join('.');
}