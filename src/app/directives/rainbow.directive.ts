import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[rainbow]', // La directive s'appliquera uniquement aux <input> ayant l'attribut rainbowText
  standalone: true,
})
export class RainbowDirective {
  private colors: string[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
  ];
  @HostBinding('style.color') textColor: string = 'red';
  @HostBinding('style.borderColor') borderColor: string = 'black';
  @HostListener('keyup') newColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    this.textColor = this.colors[randomIndex];
    this.borderColor = this.colors[randomIndex];
  }
}
