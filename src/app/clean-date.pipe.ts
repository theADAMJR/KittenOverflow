import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanDate'
})
export class CleanDatePipe implements PipeTransform
{
  transform(value: string)
  {
    const date = new Date(value);
    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();    
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }

    let day: string | number = date.getDate();
    if (day < 10) { day = "0" + day; }
    
    const month = date.toLocaleString('default', { month: 'long' });
    return `${month} ${day} ${date.getFullYear()}, ${hours}:${minutes}`;
  }
}