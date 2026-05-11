import { Component, signal } from '@angular/core';
import { Service } from './service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Calculator');

  constructor(public service : Service){}

  numberClicked(number : string){
    if(this.service.input() === '0'){
      this.service.input.set(number);
    }else{
      this.service.input.set(this.service.input() + number);
    }
  }

  operatorClicked(operator : string){
    if(this.service.prevInput() !== '0' && this.service.input() === '0'){
      this.service.preview.set(this.service.prevInput() + ' ' + operator);
      this.service.input.set('0');
      this.service.operator.set(operator);
    }else{
      this.service.prevInput.set(this.service.input());
      this.service.input.set('0');
      this.service.operator.set(operator);
      this.service.preview.set(this.service.prevInput() + ' ' + operator);
    }
    this.service.enableEquals.set(true);
  }

  calculate(){
    if(this.service.percent()){
      this.service.input.set((parseInt(this.service.input()) / 100).toString())
    }

    switch(this.service.operator()){
      case '+':
        this.service.preview.set(this.service.preview() + ' ' + this.service.input());
        this.service.input.set(this.formatNumber((parseFloat(this.service.prevInput()) + parseFloat(this.service.input())).toFixed(5).toString()))
        break;
      case '−':
        this.service.preview.set(this.service.preview() + ' ' + this.service.input().toString());
        this.service.input.set(this.formatNumber((parseFloat(this.service.prevInput()) - parseFloat(this.service.input())).toFixed(5).toString()))
        break;
      case '×':
        this.service.preview.set(this.service.preview() + ' ' + this.service.input().toString());
        this.service.input.set(this.formatNumber((parseFloat(this.service.prevInput()) * parseFloat(this.service.input())).toFixed(5).toString()))
        break;
      case '÷':
        this.service.preview.set(this.service.preview() + ' ' + this.service.input().toString());
        this.service.input.set(this.formatNumber((parseFloat(this.service.prevInput()) / parseFloat(this.service.input())).toFixed(5).toString()))
        break;
    }

    if(this.service.input() === 'Infinity'){
      this.service.preview.set('n');
      this.service.input.set('UNDEFINED');
      document.getElementById('input')!.style.fontSize = '30px';
      setTimeout(() => {
        document.getElementById('input')!.style.fontSize = '60px';
        this.clearAll();
      }, 1000);
    }

    if(this.service.input() === '0'){
      setTimeout(() => {
        this.clearAll();
      }, 1000);
    }

    this.service.percent.set(false);
    this.service.enableEquals.set(false);
  }

  clearAll(){
    this.service.prevInput.set('0');
    this.service.input.set('0');
    this.service.operator.set('');
    this.service.preview.set('n');  
  }

  formatNumber(value: string): string {
    const num = parseFloat(value);

    if (Number.isInteger(num)) {
      return num.toString();
    }

    return Number(num.toFixed(8)).toString();
  }

  backspace(){
    this.service.input.update(value => value.slice(0, -1));
    if(this.service.input() === ''){
      this.service.input.set('0');
    }
  }

  toggleType(){
    if(this.service.positive()){
      this.service.input.set('-' + this.service.input());
      this.service.positive.set(false);
    }else{
      this.service.input.update(value => value.slice(1));
      this.service.positive.set(true);
    }
  }
}
