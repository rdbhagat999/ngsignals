import { CanDeactivateFn } from "@angular/router";
import { RegisterComponent } from "../pages";

export const deactivateGuard: CanDeactivateFn<RegisterComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate() || confirm("Are you sure?");
};
