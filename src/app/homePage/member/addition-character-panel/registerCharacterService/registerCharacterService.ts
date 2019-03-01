import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterCharacterService {
  constructor(private http: HttpClient) { }
  private headers: HttpHeaders;

  public getInfoToRegisterCharacter(userId: number, access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get('http://83.212.102.61:8080/character/getInfoForRegister/' + userId, { headers: this.headers });
  }

  public registerCharacter(character: any, access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.post('http://83.212.102.61:8080/character/register', JSON.stringify(character), { headers: this.headers });
  }

  deleteCharacter(access_token: string, characterId: number) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get('http://83.212.102.61:8080/character/getInfoForRegister/', {
      headers: this.headers,
      params: {
        'characterId': String(characterId)
      }
    });
  }

}