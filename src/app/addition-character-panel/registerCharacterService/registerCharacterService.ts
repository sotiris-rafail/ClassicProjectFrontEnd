import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterCharacterService {
    constructor(private http : HttpClient){}
    private headers : HttpHeaders;

    public getInfoToRegisterCharacter(userId : number, access_token : string){
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer  ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.get('http://localhost:8080/character/getInfoForRegister/'+userId, {headers : this.headers});
    }

}