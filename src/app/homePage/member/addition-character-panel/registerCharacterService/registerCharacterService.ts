import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterUpdate } from '../../update-character/update-character.component';

@Injectable()
export class RegisterCharacterService {
  constructor(private http: HttpClient) { }
  private headers: HttpHeaders;

  public getInfoToRegisterCharacter(userId: number, access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get('http://localhost:8080/character/getInfoForRegister/' + userId, { headers: this.headers });
  }

  public registerCharacter(character: any, access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.post('http://localhost:8080/character/register', JSON.stringify(character), { headers: this.headers });
  }

  deleteCharacter(access_token: string, characterId: number) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.delete('http://localhost:8080/character/delete', {
      headers: this.headers,
      params: {
        'characterId': String(characterId)
      }
    });
  }

  updateCharacer(updateChar: CharacterUpdate, access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.put('http://localhost:8080/character/update', JSON.stringify(updateChar), { headers: this.headers });
  }

  removeCharacterFromClan(memberId: number, access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.put('http://localhost:8080/character/removeCharacterFromClan', "", {
      headers: this.headers,
      params: {
        characterId: String(memberId)
      }
    });
  }

}