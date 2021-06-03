import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker/worker.service';

@Component({
  selector: 'app-worker-nav',
  templateUrl: './worker-nav.component.html',
  styleUrls: ['./worker-nav.component.css']
})
export class WorkerNavComponent implements OnInit {
   

  constructor(private _worker:WorkerService, private _router:Router) { }

  ngOnInit(): void {
  }
  handlelogout(){
    this._worker.logoutworker().subscribe(
      res=>{
        this._router.navigateByUrl('worker/login')
      },
      err=>{
        console.log(err)
      }
    )
  }

}
