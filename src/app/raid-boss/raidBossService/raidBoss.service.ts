import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class RaidBossService{
    constructor(private http : HttpClient){}
    headers: any;

    public getALlBosses(access_token : string) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.get('http://localhost:8080/raidboss/getInfo', {headers : this.headers});
    }
}