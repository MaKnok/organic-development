import { Directive, OnInit, forwardRef, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { AddUpdateItemService } from 'src/app/manage-items/add-update-item/add-update-item.service';
import { BrlPipe } from '../pipes/brl.pipe';

@Directive({
    selector: '[format]',
  })
  export class FormatDirective implements OnInit {
    currencyChars = new RegExp('[\.,]', 'g'); // we're going to remove commas and dots

  constructor(public el: ElementRef, 
              public renderer: Renderer2, 
              private decimalPipe: DecimalPipe, 
              private currencyPipe: CurrencyPipe, 
              private addUpdateItemService: AddUpdateItemService 
              ) {}

  ngOnInit() {
    this.format(this.el.nativeElement.value); // format any initial values
  }

  @HostListener('input', ["$event.target.value"]) onInput(e: string) {
    this.format(e);
  };

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.format(event.clipboardData.getData('text/plain'));
  }

  format(val:string) {
    // 1. test for non-number characters and replace/remove them

    const rawValue = String(val); 
    
    let numberFormat = parseInt(String(val).replace(this.currencyChars, ''));

    numberFormat = numberFormat/100;
    

    //let newNumberFormat = numberFormat.toFixed(2);
    // console.log(numberFormat); // raw number

    // 2. format the number (add commas)

    let brl = this.decimalPipe.transform(numberFormat, '1.2-2', 'pt-BR');
    console.log('BRL >>>', brl);
 

    // 3. replace the input value with formatted numbers 
    
    this.renderer.setProperty(this.el.nativeElement, 'value', brl);
    console.log('Native Element >>>', this.el.nativeElement.value);
  }

  
  }