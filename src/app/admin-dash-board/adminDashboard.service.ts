import { ConstantPartyNumbersInfoItem } from './constant-party-numbers-info/constant-party-numbers-info-datasource';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AdminDashbordService {
    constructor(private http: HttpClient) { }

    private headers: HttpHeaders;

    public getCPNumbers(token: string) {
        this.headers = new HttpHeaders({
            //'Authorization': 'Bearer  ' + token,
            'Content-Type': 'application/json',
        });
        return this.http.get<ConstantPartyNumbersInfoItem[]>('http://localhost:8080/cp/getEpicPoints', { headers: this.headers })
    }
}