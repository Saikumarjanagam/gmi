import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChallanService {

  constructor() { }
  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
