import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UpdatableUser } from '../addition-member-panel/addition-member-panel.component';
import { CP } from '../add-user-to-cp-from-clan-page/add-user-to-cp-from-clan-page.component';


@Injectable()
export class ConstantPartyService {
  constructor(private http: HttpClient) { }
  headers: any;

  public getCpById(cpId: number, access_token: string, userId: number) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get('http://83.212.102.61:8080/cp/' + cpId + "/" + userId, { headers: this.headers });
  }

  public getUsersWithoutCp(access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get('http://83.212.102.61:8080/user/noCpPeople', { headers: this.headers });
  }

  public addUsersToCP(access_token: string, updateObject: UpdatableUser) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.put('http://83.212.102.61:8080/user/addPeopleToCp', updateObject, { headers: this.headers });
  }

  public updateEpicPoints(access_token: string, rb: string, pointsToAdd: number, cpId: number) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.put('http://83.212.102.61:8080/cp/updateEpicPoints', "", {
      headers: this.headers,
      params: {
        'rbName': rb,
        'pointsToAdd': String(pointsToAdd),
        'cpId': String(cpId)
      }
    });
  }

  public deleteMember(access_token: string, characterId: number) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.delete('http://83.212.102.61:8080/cp/delete', {
      headers: this.headers,
      params: {
        'characterId': String(characterId)
      }
    });
  }

  getCPIdName(access_token: string): Observable<CP[]> {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get<CP[]>('http://83.212.102.61:8080/cp/getCPIdName', { headers: this.headers });
  }

  addNewCP(access_token: string, cp: import("../add-new-constant-party/add-new-constant-party.component").CP) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.post('http://83.212.102.61:8080/cp/add',JSON.stringify(cp),  { headers: this.headers });
  }

}