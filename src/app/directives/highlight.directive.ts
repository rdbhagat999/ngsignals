import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appHighlight]",
  standalone: true,
})
export class HighlightDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() appHighlight = "";
  @Input() defaultColor = "";

  ngOnInit(): void {}

  // change property of host element
  @HostBinding("class.text-base")
  private isMouseOver: boolean = false;

  // listen to events fired from host element
  @HostListener("mouseenter") onMouseEnter(): void {
    console.log("mouseenter");
    this.highlight("black", this.appHighlight || this.defaultColor || "yellow");
    this.isMouseOver = true;
  }

  // listen to events fired from host element
  @HostListener("mouseleave") onMouseLeave(): void {
    console.log("mouseleave");
    this.highlight("", "");
    this.isMouseOver = false;
  }

  private highlight(color: string, bgcolor: string): void {
    console.log("highlight");
    this.renderer.setStyle(this.el.nativeElement, "color", color);
    this.renderer.setStyle(this.el.nativeElement, "backgroundColor", bgcolor);
  }
}
