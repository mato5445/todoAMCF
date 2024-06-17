import { AbstractControl } from '@angular/forms';

export function blankValidator(
  control: AbstractControl,
): { blank: boolean } | null {
  const value = control && control.value;
  if (value !== undefined) {
    const trimmedVal = (value ?? '').trim();
    return trimmedVal.length ? null : { blank: true };
  }

  return null;
}
