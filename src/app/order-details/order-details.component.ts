import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Order } from '../order';
import { OrderModel } from './order.model';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  formValue !:FormGroup; 
  orderModelObj : OrderModel= new OrderModel();
  orderData !:any;
  searchValue :string ;
  showAdd !:boolean;
  showUpdate !:boolean;
  p:number=1;
  Orders: Order[];
  
  constructor(private formbuilder: FormBuilder, private api: ApiService){}
  

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      id : [''],
      Order:[''],
      Model:[''],
      Date:[''],
      Country:[''],
      Status:['']

      


    })
    this.getAllOrders();
  }

  key: string = 'id';
  reverse:boolean=false; 
  sort(key){
    this.key=key;
    this.reverse = !this.reverse;
    

  }

 


  clickAddOrderBtn(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }


  postOrderDetails(){
    
    this.orderModelObj.Order=this.formValue.value.Order;
    this.orderModelObj.Model=this.formValue.value.Model;
    this.orderModelObj.Date=this.formValue.value.Date;
    this.orderModelObj.Country=this.formValue.value.Country;
    this.orderModelObj.Status=this.formValue.value.Status;

    this.api.postOrder(this.orderModelObj).subscribe(res=>{
      console.log(res);
      alert("Order has been added.")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllOrders();
    },
    err=>{
      alert("Error.");
    })
    
  }


  getAllOrders(){
    this.api.getOrder().subscribe(res=>{
      this.orderData = res;
    })

  }

  deleteOrder(row : any){
    
    this.api.deleteOrder(row.id).subscribe(res=>{
      alert("Order has been deleted.");
      this.getAllOrders();
    });
  }

  onEdit(Order:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.orderModelObj.id=Order.id;
    this.formValue.controls['Order'].setValue(Order.Order);
    this.formValue.controls['Model'].setValue(Order.Model);
    this.formValue.controls['Date'].setValue(Order.Date);
    this.formValue.controls['Country'].setValue(Order.Country);
    this.formValue.controls['Status'].setValue(Order.Status);
    
  }

  updateOrderDetails(){
    
    this.orderModelObj.Order=this.formValue.value.Order;
    this.orderModelObj.Model=this.formValue.value.Model;
    this.orderModelObj.Date=this.formValue.value.Date;
    this.orderModelObj.Country=this.formValue.value.Country;
    this.orderModelObj.Status=this.formValue.value.Status;

    this.api.updateOrder(this.orderModelObj,this.orderModelObj.id).subscribe(res=>{
      alert("Order has been updated.");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllOrders();
    })
  }

}
