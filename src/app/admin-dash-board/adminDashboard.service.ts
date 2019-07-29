import { ConstantPartyNumbersInfoItem } from './constant-party-numbers-info/constant-party-numbers-info-datasource';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CP, User } from './admin-dash-board.component';

@Injectable()
export class AdminDashbordService {
    constructor(private http: HttpClient) { }

    private headers: HttpHeaders;

    public getCPNumbers(token: string) : Observable<ConstantPartyNumbersInfoItem[]>{
        this.headers = new HttpHeaders({
            'Authorization': 'Bearer  ' + token,
            'Content-Type': 'application/json',
        });
        return this.http.get<ConstantPartyNumbersInfoItem[]>('http://localhost:8080/cp/getCPNumbers', { headers: this.headers })
    }

    public getEpicPoints(token: string): Observable<CP[]> {
        this.headers = new HttpHeaders({
            'Authorization': 'Bearer  ' + token,
            'Content-Type': 'application/json',
        });
        return this.http.get<CP[]>('http://localhost:8080/cp/getEpicPoints', { headers: this.headers })
    }

    public getUsersForDashboard(token: string): Observable<User[]> {
        this.headers = new HttpHeaders({
            'Authorization': 'Bearer  ' + token,
            'Content-Type': 'application/json',
        });
        return this.http.get<User[]>('http://localhost:8080/user/getUsersForDashboard', { headers: this.headers })
    }
}