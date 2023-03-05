import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
} from "@angular/core";

@Directive({
  selector: "[appCreditCard]",
  standalone: true,
})
export class CreditCardDirective {
  @HostBinding("style.border")
  border!: string;

  private el: ElementRef = inject(ElementRef);

  constructor() {}

  @HostListener("input", ["$event"])
  onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, "");

    if (trimmed.length > 16) {
      trimmed = trimmed.substring(0, 16);
    }

    const numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substring(i, i + 4));
    }
    input.value = numbers.join(" ");

    this.border = "";

    if (/[^\d]+/.test(trimmed)) {
      this.border = "2px solid red";
    }
  }
}
