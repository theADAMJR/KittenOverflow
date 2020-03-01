import { HttpClient } from '@angular/common/http';

export abstract class DataService
{
    constructor(private url: string, private http: HttpClient) {}

    async get() : Promise<any> | null
    {
        return new Promise((resolve, reject) =>
        {
            console.log("GET");
            this.http.get(this.url)
                .subscribe(res => resolve(res),
                err => reject(err));
        });
    }

    async create(object: any) : Promise<any> | null
    {
        return new Promise((resolve, reject) =>
        {
            console.log("POST");
            this.http.post(this.url, JSON.stringify(object))
                .subscribe(res => resolve(res),
                err => reject(err));
        });
    }

    async update(id: number, newItem: any) : Promise<any> | null
    {
        return new Promise((resolve, reject) =>
        {
            console.log("PATCH");
            this.http.patch(`${this.url}/${id}`, JSON.stringify(newItem))
                .subscribe(res => resolve(res),
                err => reject(err));
        });
    }

    async delete(id: number) : Promise<any> | null
    {
        return new Promise((resolve, reject) =>
        {
            console.log("DELETE");
            this.http.delete(`${this.url}/${id}`)
                .subscribe(res => resolve(res),
                err => reject(err));
        });
    }
}