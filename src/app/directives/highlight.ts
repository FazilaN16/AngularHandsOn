import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class Highlight {

  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
onMouseEnter(): void {
  console.log('Highlight directive is working!');
  this.el.nativeElement.style.backgroundColor = this.appHighlight;
}

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
  }
}