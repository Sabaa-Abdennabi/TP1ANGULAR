import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RainbowDirective } from '../rainbow.directive';

@Component({
    selector: 'app-mini-word',
    templateUrl: './mini-word.component.html',
    styleUrls: ['./mini-word.component.css'],
    standalone: true,
    imports: [NgStyle, FormsModule, RainbowDirective],
})
export class MiniWordComponent {
  color = 'red';
  size = 75;
  font = 'garamond';
}
