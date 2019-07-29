import { RaidBoss } from './../register-raid-boss/register-raid-boss.component';
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

    public updateTOD(access_token : string, raidId : string, time : string) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.put('http://localhost:8080/raidboss/updateDeathTimer', '', {headers : this.headers, params : {
            'raidId' : raidId , 'timer' : time
        }});
    }

    public setToUnknown(access_token : string, raidId : string) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.put('http://localhost:8080/raidboss/setToUnknown', '', {headers : this.headers, params : {
            'raidId' : raidId 
        }});
    }

    public addNewRaid(access_token :string ,  raidBoss : RaidBoss) {
        this.headers = new HttpHeaders({
            'Authorization' : 'Bearer ' + access_token,
            'Content-Type' : 'application/json',
          });
        return this.http.post('http:///localhost:8080/raidboss/add', raidBoss, {headers : this.headers});
    }
}