import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent {

  @HostListener('window:click')
  fun() {
    this.open = false
  }

  createArr(count: number) {
    let arr = []

    for (let i = 0; i < count; i++) {
      arr.push(this.normalizeValue(i))
    }

    return arr
  }

  open = false;

  @Input()
  time: string = '00:00'

  @Output()
  timeChange = new EventEmitter<string>()

  hourSelect(value: string, event: Event) {
    this.timeChange.emit(`${value}${this.time.substring(2)}`)
    event.stopPropagation()
  }

  minSelect(value: string, event: Event) {
    this.timeChange.emit(`${this.time.substring(0,3)}${value}`)
    event.stopPropagation()
  }

  normalizeValue(value: number) {
    if (value < 10) {
      return `0${value}`
    } else {
      return `${value}`
    }
  }

  toggle(event: Event) {
    this.open = !this.open
    event.stopPropagation()
  }
}
