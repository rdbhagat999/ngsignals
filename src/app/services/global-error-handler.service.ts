import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GlobalErrorHandlerService {
  // for client-side errors
  //  private toastrService: ToastrService = inject(ToastrService);

  showError(message: string) {
    console.log(`Error: ${message}`);
    //  this.toastrService.errorToastr("Error", message);
  }

  handleError(err: any): void {
    console.log("GlobalErrorHandlerService");

    if (err instanceof HttpErrorResponse) {
      console.log("HttpErrorResponse");
      console.log(err.status, err.error.message);
    } else {
      console.log("NOT HttpErrorResponse");
      this.showError(err.message);
    }
  }
}
