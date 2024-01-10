import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brl'
})
export class BrlPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    const newBrl = value / 100; 
    let formattedBrl = newBrl.toFixed(2);
    
    const dot = new RegExp('[\.]', 'g');
    const replacement = ',';
    const finalFormattedBrl = formattedBrl.replace(dot,replacement);
    console.log(finalFormattedBrl);

    return finalFormattedBrl;
  }

}
