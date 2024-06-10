import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject, skip } from 'rxjs';

export type Animation = 'fade-in' | 'fade-down' | 'fade-up' | 'fade-right' | 'fade-left';

export type ElementPosition = 'top' | 'mid' | 'bottom';

export type Screen = 'top' | 'top-mid' | 'mid' | 'bottom-mid' | 'bottom';

export type Status = 'visible' | 'hidden';

@Directive({
  selector: '[NgxAos]'
})
export class NgxAosDirective implements OnInit {

  status = new BehaviorSubject<Status>('hidden')

  @Input() animation: Animation | null = null;

  @Input() element: ElementPosition = 'top'

  @Input() screen: Screen = 'mid'

  @Input() delay: number = 0

  @Output()
  statusChange: EventEmitter<Status> = new EventEmitter()

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'ngx-aos')
    this.renderer.addClass(this.elementRef.nativeElement, 'hidden')

    if (this.animation) this.hide(true)

    this.status.pipe(skip(1)).subscribe((stat) => {
      this.statusChange.emit(stat)
      this.classChange(stat)
      if (this.animation) {
        if (stat === 'hidden') {
          this.hide()
        } else {
          this.show()
        }
      }
    })

    this.run()
  }

  @HostListener('window: wheel')
  run() {
    if (this.checkShowZone() && this.status.value === 'hidden') {
      this.status.next('visible')
    } else if (!this.checkShowZone() && this.status.value === 'visible') {
      this.status.next('hidden')
    }
  }

  classChange(value: Status) {
    if (value === 'visible') {
      this.renderer.removeClass(this.elementRef.nativeElement, 'hidden')
      this.renderer.addClass(this.elementRef.nativeElement, 'visible')
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'visible')
      this.renderer.addClass(this.elementRef.nativeElement, 'hidden')
    }
  }

  hide(inital: boolean = false) {
    const style: any = {
      opacity: '0',
    }

    if (!inital) {
      style.transition = 'transform 800ms ease-out, opacity 400ms east-out';
    }

    switch (this.animation) {
      case ('fade-down'): style.transform = 'translate(0, -20px)'; break;
      case ('fade-up'): style.transform = 'translate(0, 20px)'; break;
      case ('fade-right'): style.transform = 'translate(-20px, 0)'; break;
      case ('fade-left'): style.transform = 'translate(20px, 0)'; break;
    }

    Object.entries(style).forEach(([style, value]) => {
      this.renderer.setStyle(this.elementRef.nativeElement, style, value)
    })
  }

  show() {
    const style: any = {
      opacity: '1',
      transition: 'transform 800ms ease-in, opacity 400ms ease-in',
      transform: 'translate(0, 0)'
    }

    Object.entries(style).forEach(([style, value]) => {
      this.renderer.setStyle(this.elementRef.nativeElement, style, value)
    })
  }

  checkShowZone(): boolean {
    const elementPoint: number = this.requiredElementPoint();
    
    const screenPoint: number = this.requiredScreenPoint()

    if (elementPoint <= screenPoint) {
      return true
    } else {
      return false
    }
  }

  requiredScreenPoint(): number {
    switch (this.screen) {
      case ('top'): return 0
      case ('bottom'): return window.innerHeight
      case ('top-mid'): return window.innerHeight / 4
      case ('bottom-mid'): return (window.innerHeight / 4) * 3
      default: return window.innerHeight / 2
    }
  }


  requiredElementPoint(): number {
    const values = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect()

    switch (this.element) {
      case ('mid'): return (values.top + values.bottom) / 2;
      case ('bottom'): return values.bottom;
      default: return values.top;
    }
  }
}



//===>> Need to add delays


//===>> Need to add durations 


//===>> Need to add more animations


//===>> Find way to define styles in different file


//===>> Find way to add new animations with ease


//===>> Optamize Code
