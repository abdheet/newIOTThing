import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadService } from "../shared/upload.service"


@Component({
  selector: 'app-created-app',
  templateUrl: './created-app.component.html',
  styleUrls: ['./created-app.component.css']
})
export class CreatedAppComponent implements OnInit {
 
  newData:Array<any>= new Array<any>();
  fileUploads: Array<any>;
  constructor(public service: UploadService) { }

  // Arr = Array; //Array type captured in a variable
  // num:number = 20;
   ngOnInit() {
     this.showFiles();
  }
    showFiles() {
  
      // this.fileUploads =
        this.service.getFiles().then((res:any)=> this.fileUploads= res);

  
    console.log(this.fileUploads);

  } 
    abc() {
      var i=1;
     this.fileUploads.forEach(async e=> {
      if(i != 1) {
        await this.service.fileFetch(e).toPromise().then((res: any)=> this.newData[this.newData.length] = res)
      }
      i++;
     })
    // await this.service.fileFetch().toPromise().then((res: any)=> this.newData = res)
  //  console.log(this.newData);
  //  this.newData.forEach(e=>
  //  console.log(e[0].ApplicationId))
    // console.log(this.fileUploads.forEach(e => this.http.get(e + 1)))
  }

  details(data:any)
  {
console.log(data)
  }
}
