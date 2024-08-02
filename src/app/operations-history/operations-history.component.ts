import { Component, Input } from '@angular/core';
import { MyCalculatorComponent } from '../my-calculator/my-calculator.component';

@Component({
  selector: 'app-operations-history',
  standalone: true,
  imports: [MyCalculatorComponent],
  templateUrl: './operations-history.component.html',
  styleUrl: './operations-history.component.scss'
})
export class OperationsHistoryComponent {
  public currentTime: string = new Date().toLocaleTimeString();

  @Input() result!: string


  // public parseTime = this.currentTime.split(':').slice(0, 2).join(':');

}
