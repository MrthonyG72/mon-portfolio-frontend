import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class BaseService {
    constructor(private http: HttpClient) {}
    save(url: string, data: any) {
        return this.http.post(url, data);
    }
    get(url:string){
        return this.http.get(url)
    }
}