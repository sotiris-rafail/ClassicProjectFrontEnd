import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable()
export class ConstantPartyService {

    constructor(private http : HttpClient){}
    headers: any;

    public getCpById(cpId : string, access_token : string) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.get('http://localhost:8080/cp/'+cpId, {headers : this.headers});
    }

    public getUsersWithoutCp(access_token : string) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.get('http://localhost:8080/user/noCpPeople', {headers : this.headers});
    }
}