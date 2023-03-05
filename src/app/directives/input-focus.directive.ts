import { Directive, ElementRef, inject } from "@angular/core";
import { WINDOW } from "../models";

@Directive({
  selector: "[appInputFocus]",
  standalone: true,
})
export class InputFocusDirective {
  private el: ElementRef = inject(ElementRef);
  private window = inject(WINDOW);
  private timer: number = 0;

  ngOnInit() {
    if (!this.el.nativeElement["focus"]) {
      console.log("Element does not accept focus.");
    }
  }

  ngAfterViewInit(): void {
    this.timer = this.window.setTimeout(() => {
      this.el.nativeElement.focus();
    }, 200);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
