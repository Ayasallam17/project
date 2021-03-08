import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/services/worker/worker.service';

@Component({
  selector: 'app-worker-home',
  templateUrl: './worker-home.component.html',
  styleUrls: ['./worker-home.component.css']
})
export class WorkerHomeComponent implements OnInit {
  orders:any
  show = true
  constructor( private _order:WorkerService ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){ 
    this._order.getOrders().subscribe(
      res=>{
        this.orders = res.data
        console.log(res)
      },
      err=>{
        console.log(err)
      }
  )}

  deleteOrder(id){
    this.show != this.show
    this._order.deleteOrder(id).subscribe(
      res=>{
         
        console.log("deleted")
      },
      err=>{
        console.log("err")
      }
    )
  }

}
