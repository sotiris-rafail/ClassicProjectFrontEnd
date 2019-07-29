
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clan } from '../add-clan/add-clan.component';


@Injectable()
export class ClanService {

    headers: HttpHeaders;
    constructor(private http: HttpClient) {}

    public getAllClansInfo(access_token: string) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.get('http:///localhost:8080/clan/allInfo', {headers : this.headers});
    }

    public addNewClan(access_token: string, clan: Clan) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.post('http:///localhost:8080/clan/add', clan, {headers : this.headers});
    }
}
