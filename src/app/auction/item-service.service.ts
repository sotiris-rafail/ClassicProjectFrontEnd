import { UnSoldItem } from './auction.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) { }

  public addNewItemForSale(item: UnSoldItem, amountOfItem: number, access_token: string) {
    this.headers = new HttpHeaders({
      //'Authorization' : 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    console.log(item)
    return this.http.post("http://localhost:8080/unsold/add", JSON.stringify(item), { headers: this.headers, params: { amountOfItem: String(amountOfItem) } });
  }

  public deliverSoldItem(itemId: number, isDelivered: boolean, access_token: string) {
    this.headers = new HttpHeaders({
      //'Authorization' : 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.put("http://localhost:8080/sold/delivery", "", { headers: this.headers, params : { itemId : String(itemId) , isDelivered : String(isDelivered) } })
  }
}
