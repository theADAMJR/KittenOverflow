import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'summary' })
export class SummaryPipe implements PipeTransform {
    transform(value: string, length?: number) {
        return !value ? null : value.substr(0, length || 50) + '...';
    }
}
