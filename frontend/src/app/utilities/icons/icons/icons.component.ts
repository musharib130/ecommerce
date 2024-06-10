import { Component, Input, HostBinding } from '@angular/core';

const colorHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{6})$/

interface Colors {
  color: string, 
  hover: string 
}

function isColors(data: any): data is Colors {
  return (
    typeof data === 'object' &&
    'color' in data &&
    'hover' in data &&
    typeof data.color === 'string' &&
    typeof data.hover === 'string'
  );
}

@Component({
  selector: 'custom-icon',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent {

  @Input()
  name: string = 'search'

  @HostBinding('style.--color')
  selectColor = '#000'

  @HostBinding('style.--hover-color')
  hoverColor = '#000'

  @HostBinding('style.--size')
  selectSize = '32px'

  @HostBinding('style.--stroke')
  selectStroke = 1.5

  @Input()
  set color(data: string | Colors) {
    if (typeof data === 'string' && colorHex.test(data)) {
      this.selectColor = data
      this.hoverColor = data
    } else if (isColors(data) && colorHex.test(data.color) && colorHex.test(data.hover)) {
      this.selectColor = data.color;
      this.hoverColor = data.hover
    }
  }

  @Input()
  set hover(data: string) {
    if (colorHex.test(data)) {
      this.hoverColor = data;
    }
  }

  @Input()
  set size(data: number) {
    if (data > 0 && data < 100) {
      this.selectSize = `${data}px`
    }
  }

  @Input()
  set stroke(data: number) {
    if (data > 0 && data < 5) {
      this.selectStroke = data
    }
  }
}
