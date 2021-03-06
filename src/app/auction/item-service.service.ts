import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SoldItem, UnSoldItem, UnSoldItemEdit } from './auction.component';
import { UnSoldItemDisplay } from './un-sold-items/un-sold-items.component';

@Injectable()
export class ItemService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) { }

  public addNewItemForSale(item: UnSoldItem[], access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.post('http://83.212.113.1:8080/unsold/add', JSON.stringify(item),
      {
        headers: this.headers
      });
  }

  public deliverSoldItem(itemId: number, isDelivered: boolean, access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.put('http://83.212.113.1:8080/sold/delivery', '',
      {
        headers: this.headers,
        params: { itemId: String(itemId), isDelivered: String(isDelivered) }
      });
  }

  public bidForItem(itemId: number, bidStep: number, userId: string, access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'text/plain, */*',
    });
    return this.http.put('http://83.212.113.1:8080/unsold/bidForItem', '',
      {
        headers: this.headers,
        params: { itemId: String(itemId), bidStep: String(bidStep), userId: userId },
        responseType: 'text'
      });
  }


  public buyNow(itemId: number, userId: string, access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.put('http://83.212.113.1:8080/unsold/buyNow', '',
      {
        headers: this.headers,
        params: { itemId: String(itemId), userId: userId }
      });
  }

  public getSoldItems(access_token: string): Observable<SoldItem[]> {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get<SoldItem[]>('http://83.212.113.1:8080/sold/getSoldItems',
      { headers: this.headers });
  }

  public getUnSoldItems(access_token: string): Observable<UnSoldItemDisplay[]> {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get<UnSoldItemDisplay[]>('http://83.212.113.1:8080/unsold/getUnSoldItems',
      { headers: this.headers });
  }

  public getNumberOfUnsoldItems(access_token: string): Observable<number> {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get<number>('http://83.212.113.1:8080/unsold/getNumberOfUnsoldItems',
      { headers: this.headers });
  }

  renewItemsWithoutBuyer(selected: number[], access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.post('http://83.212.113.1:8080/sold/renewItems', JSON.stringify(selected), { headers: this.headers });
  }

  editReSaleItem(unsoldItemEdit: UnSoldItemEdit, access_token: string) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.put('http://83.212.113.1:8080/unsold/edit', JSON.stringify(unsoldItemEdit),
      { headers: this.headers });
  }

  getDistinctPreviewItems(access_token: string): Observable<any[]>{
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>('http://83.212.113.1:8080/item/distinctNames',
      { headers: this.headers });
  }
}
