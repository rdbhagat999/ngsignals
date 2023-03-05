import { Component, computed, effect, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-counter",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="counter-container">
      <button (click)="increment()">Increment</button>
      <p>Counter: {{ counter() }}</p>
      <p>DoubleCounter: {{ doubleCounter() }}</p>
      <button (click)="decrement()">Decrement</button>
    </div>
  `,
  styles: [
    `
      .counter-container {
        display: flex;
        justify-content: center;
        align-items: center;

        P {
          margin: 0 16px;
        }
      }
    `,
  ],
})
export class CounterComponent implements OnInit {
  counter = signal(0);

  doubleCounter = computed(() => this.counter() * 2);

  ngOnInit() {
    this.printToConsole();
  }

  printToConsole() {
    effect(() => console.log(`counter:`, this.counter()));
  }

  increment() {
    this.counter.update((counter) => (counter += 1));
  }

  decrement() {
    this.counter.update((counter) => (counter -= 1));
  }
}
