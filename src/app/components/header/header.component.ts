import { ChangeDetectionStrategy, Component, VERSION } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1
          data-cy="title"
          class="text-3xl font-bold tracking-tight text-gray-900">
          {{ title }}
        </h1>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  title = "Angular " + VERSION.full;
}
