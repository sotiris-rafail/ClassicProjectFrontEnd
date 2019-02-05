import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UpdatableUser } from 'src/app/addition-member-panel/addition-member-panel.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ConstantPartyService {

    constructor(private http : HttpClient){}
    headers: any;

    public getCpById(cpId : number, access_token : string, userId : number) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.get('http://localhost:8080/cp/'+cpId +"/" + userId, {headers : this.headers});
    }

    public getUsersWithoutCp(access_token : string) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.get('http://localhost:8080/user/noCpPeople', {headers : this.headers});
    }

    public addUsersToCP(access_token : string, updateObject: UpdatableUser) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.put('http://localhost:8080/user/addPeopleToCp', updateObject ,{headers : this.headers});
    }
}