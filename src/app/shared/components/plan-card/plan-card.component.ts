import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css']
})
export class PlanCardComponent {
  @Input() titulo!: string;
  @Input() beneficios!: string[];
  @Input() precioMensual!: string;
  @Input() precioAnual!: string;
  @Input() colorTitulo: string = '#0077cc'; // color opcional para destacar
}