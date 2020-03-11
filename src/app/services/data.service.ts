import { HttpClient } from '@angular/common/http';

export abstract class DataService {
    constructor(private url: string, protected http: HttpClient) {}

    get(): Promise<any> | null {
        return new Promise((resolve, reject) => {
            this.http.get(this.url)
                .subscribe(res => resolve(res),
                err => reject(err));
        });
    }

    create(object: any): Promise<any> | null {
        return new Promise((resolve, reject) => {
            this.http.post(this.url, object)
                .subscribe(res => resolve(res),
                err => reject(err));
        });
    }

    update(id: string, newItem: any, options: any): Promise<any> | null {
        return new Promise((resolve, reject) => {
            this.http.put(`${this.url}/${id}`, newItem, options)
                .subscribe(res => resolve(res),
                err => reject(err));
        });
    }

    delete(id: string): Promise<any> | null {
        return new Promise((resolve, reject) => {
            this.http.delete(`${this.url}/${id}`)
                .subscribe(res => resolve(res),
                err => reject(err));
        });
    }
}
