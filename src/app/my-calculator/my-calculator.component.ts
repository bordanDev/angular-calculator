import { Component, Input } from '@angular/core';
import { AppFormsModule } from '../app-forms/app-forms.module';
import { CommonModule } from '@angular/common';

interface CalcGroups {
  first: CalcVar;
  second: CalcVar;
  operation: CalcOperations;
}

interface CalcVar {
  value: number;
  modifier: CalcModifiers
}

enum CalcOperations {
  plus = '+',
  minus = '-',
  multiply = '*',
  divide = '/'
}

enum CalcModifiers {
  sin = 'sin',
  cos = 'cos',
  sqrt = 'sqrt',
  square = 'square',
  none = 'none'
}

@Component({
  selector: 'app-my-calculator',
  standalone: true,
  imports: [AppFormsModule, CommonModule],
  templateUrl: './my-calculator.component.html',
  styleUrl: './my-calculator.component.scss'
})
export class MyCalculatorComponent {

  public currentTime: string = new Date().toLocaleTimeString();

  public calcOperations = CalcOperations;

  public calcModifiers = CalcModifiers;

  public calcGroups: CalcGroups[] = [
    {
      first: {
        value: 0,
        modifier: CalcModifiers.none
      },
      second: {
        value: 0,
        modifier: CalcModifiers.none
      },
      operation: CalcOperations.plus
    }
  ]

  public history: string[] = [];

  public operationsBetweenGroups: CalcOperations[] = [];

  public result?: number;


  public addGroup(): void {
    this.calcGroups.push({
      first: {
        value: 0,
        modifier: CalcModifiers.none
      },
      second: {
        value: 0,
        modifier: CalcModifiers.none
      },
      operation: CalcOperations.plus
    })

    this.operationsBetweenGroups.push(CalcOperations.plus)
  }

  public removeGroup(index: number): void {
    this.calcGroups.splice(index, 1)
  }

  public calcGroup() {

    let result = 0;

    let tempHistory: string[] = [];

    this.calcGroups.forEach((group, i) => {
      if (i == 0) {
        result = this.calc(this.calcValueWithModifier(group.first), this.calcValueWithModifier(group.second), group.operation)
      } else {
        let tempResult = this.calc(this.calcValueWithModifier(group.first), this.calcValueWithModifier(group.second), group.operation)
        result = this.calc(result, tempResult, this.operationsBetweenGroups[i - 1]) // вроде какая-то дичь
      }

      tempHistory.push(`
            ${group.first.modifier !== CalcModifiers.none ? group.first.modifier : ''}
            ${group.first.value}
            ${group.operation}
            ${group.second.modifier !== CalcModifiers.none ? group.second.modifier : ''}
            ${group.second.value}
            ${this.operationsBetweenGroups}
        `)
    })

    tempHistory.push(`= ${result}`)
    this.history.push(tempHistory.join(' '))

    this.result = result

  }

  public calcValueWithModifier(value: CalcVar): number {
    switch (value.modifier) {
      case CalcModifiers.none:
        return value.value

      case CalcModifiers.sin:
        return Math.sin(value.value)

      case CalcModifiers.cos:
        return Math.cos(value.value)

      case CalcModifiers.sqrt:
        return Math.sqrt(value.value)

      case CalcModifiers.square:
        return Math.pow(value.value, 2)

    }
  }

  public calc(first: number, second: number, operation: CalcOperations): number {
    switch (operation) {
      case CalcOperations.plus:
        return Number(first) + Number(second);
      case CalcOperations.minus:
        return Number(first) - Number(second);
      case CalcOperations.multiply:
        return Number(first) * Number(second);
      case CalcOperations.divide:
        return Number(first) / Number(second);
    }
  }

}
