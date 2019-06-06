import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MemberService {
  constructor(private http: HttpClient) { }

  private headers: HttpHeaders;
  public registeUserService(user) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://83.212.102.61:8080/user/register', JSON.stringify(user), { headers: this.headers, responseType: "text" });
  }

  public loginUserService(email: string, password: string) {
    let encoded: string = btoa("clientId:" + "secret");
    this.headers = new HttpHeaders({
      'Authorization': 'Basic ' + encoded,
      'Content-Type': 'application/json',
    });
    return this.http.post('http://83.212.102.61:8080/oauth/token', "", { headers: this.headers, params: { 'grant_type': 'password', 'username': email, 'password': password } });
  }

  public fetchloggedUser(userId: number, token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer  ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get('http://83.212.102.61:8080/user/' + userId, { headers: this.headers });
  }

  public getRoleOfUser(userId: number, token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer  ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get('http:///83.212.102.61:8080/user/role/' + userId, { headers: this.headers });
  }

  public updateUserRole(characterId: string, typeOfuser: string, token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer  ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put('http:///83.212.102.61:8080/user/updateRole', "", {
      headers: this.headers,
      params: { characterId: characterId, typeOfUser: typeOfuser }
    });
  }

  public addSingleUserToCP(characterId: number, cpId: number, token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer  ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.put('http:///83.212.102.61:8080/user/addUserToCp', "", {
      headers: this.headers,
      params: { characterId: String(characterId), cpId: String(cpId) }
    });
  }

  public deleteUser(user_id: number, token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer  ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.delete('http:///83.212.102.61:8080/user/deleteUser', {
      headers: this.headers,
      params: { userId: String(user_id) }
    });
  }

  public getEpicPointsPrice(token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer  ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get('http:///83.212.102.61:8080/user/epic/points', { headers: this.headers });
  }

  verifyUser(email: any, mainChar: any): Observable<boolean> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<boolean>('http:///83.212.102.61:8080/user/verification', {
      headers: this.headers,
      params: {
        'email': email,
        'mainChar': mainChar
      }
    });
  }

  updatePassword(params: string[]) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('http:///83.212.102.61:8080/user/update/password', JSON.stringify(params), { headers: this.headers });
  }

  isCpMember(userId: number, token: string) : Observable<Boolean> {
    this.headers = new HttpHeaders({
      //'Authorization': 'Bearer  ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Boolean>('http:///localhost:8080/user/isCpMember',
      {
        headers: this.headers,
        params: { 'userId': String(userId) }
      });
  }
}