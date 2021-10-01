import { Pipe, PipeTransform } from '@angular/core';
import { Order } from './order';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Orders: Order[],searchValue:string): Order[] {
    if(!Orders ||  ! searchValue){
      return Orders;
    }

    return Orders.filter(order =>  
      order.Order.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      order.Model.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      order.Country.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      order.Date.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      order.id.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
       );
  }

}
