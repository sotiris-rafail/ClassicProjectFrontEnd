import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable()
export class ClanService{

    headers : HttpHeaders;
    constructor(private http : HttpClient){}

    public getAllClansInfo(access_token : string) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.get('http://localhost:8080/clan/allInfo', {headers : this.headers});
    }
    
}