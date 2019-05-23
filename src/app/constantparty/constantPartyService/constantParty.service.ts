import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UpdatableUser } from '../addition-member-panel/addition-member-panel.component';
import { CP } from '../add-user-to-cp-from-clan-page/add-user-to-cp-from-clan-page.component';
import { TodoItemNode } from '../cp-photos-show/cp-photos-show.component';
// import { RootFolderResponse } from '../cp-photos-show/cp-photos-show.component';


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

  public getCpPhotos(cpId: number, access_token: string, userId: number): Observable<TodoItemNode> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get<TodoItemNode>('http://83.212.102.61:8080/cp/' + cpId + '/' + userId + '/photos', { headers: headers });
  }

  public addNewFolder(cpId: number, access_token: string, folder: TodoItemNode){
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.post('http://83.212.102.61:8080/cp/addFolder', JSON.stringify(folder),
      {
        headers: headers,
        params: { cpId: String(cpId) }
      });
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

  public getCPIdName(access_token: string): Observable<CP[]> {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get<CP[]>('http://83.212.102.61:8080/cp/getCPIdName', { headers: this.headers });
  }

  public addNewCP(access_token: string, cp: import("../add-new-constant-party/add-new-constant-party.component").CP) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.post('http://83.212.102.61:8080/cp/add', JSON.stringify(cp), { headers: this.headers });
  }

  public uploadImage(file: File, access_token: String, cpId: number, cpName: string): Observable<Boolean> {
    this.headers = new HttpHeaders({
      //'Authorization': 'Bearer ' + access_token,
    });
    const formData = new FormData();

    formData.append('photo', file);
    return this.http.post<Boolean>('http://localhost:8080/cp/upload', formData,
      {
        headers: this.headers,
        params: {
          'cpId': String(cpId),
          'cpName': cpName,
        }
      });
  }

}