import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {

  prevInput = signal('0');
  input = signal('0');
  preview = signal('n');
  operator = signal('');
  percent = signal(false);
  enableEquals = signal(true);
  positive = signal(true);

}
