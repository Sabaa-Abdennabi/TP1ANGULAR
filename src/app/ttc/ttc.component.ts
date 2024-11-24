import {
  Component,
  computed,
  input,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
})
export class TTCComponent {
  prix: WritableSignal<number> = signal(0);
  quantity: WritableSignal<number> = signal(1);
  tva: WritableSignal<number> = signal(18);
  prixTTC: Signal<number> = computed(() => {
    let total = this.prix() * this.quantity();
    if (this.quantity() >= 10 && this.quantity() <= 15) {
      total *= 0.8;
    } else if (this.quantity() > 15) {
      total *= 0.7;
    }
    total += total * (this.tva() / 100);
    return total;
  });
  prixUnitaire : Signal<number> = computed (()=>{
    return (this.prix() * (1+this.tva()/100))
  })
  Discount : Signal<number>=computed (()=>{
    if (this.quantity()>=10 && this.quantity()<=15){
      return 20 ;
    }
    else if (this.quantity()>15){
      return 30 ;
    }
    else {
      return 0;
    }
  })
}
