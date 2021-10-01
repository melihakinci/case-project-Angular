import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  postOrder(data : any){
    return this.http.post<any>("http://localhost:3000/orders", data)
    .pipe(map((res:any)=>{return res;}))
  }

  getOrder(){
    return this.http.get<any>("http://localhost:3000/orders").pipe(map((res:any)=>{return res;}));
  }

  updateOrder(data :any,id: number){
    return this.http.put<any>("http://localhost:3000/orders/"+id,data)
    .pipe(map((res:any)=>{return res;}))
  }

  deleteOrder(id:number){
    return this.http.delete<any>("http://localhost:3000/orders/"+id)
    .pipe(map((res:any)=>{return res;}));
  }

}
