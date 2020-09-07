import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from'@angular/forms';
import { AuthService } from '../shared/auth.service';
import { UploadService } from '../shared/upload.service';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { async } from 'rxjs/internal/scheduler/async';
import { JwtHelperService } from "@auth0/angular-jwt";
import { getMaxListeners } from 'process';


interface allocationDetail {
applicationid: string,
deviceid : string
}
@Component({
  selector: 'app-allocate-thing',
  templateUrl: './allocate-thing.component.html',
  styleUrls: ['./allocate-thing.component.css']
})
export class AllocateThingComponent implements OnInit {
  public helper = new JwtHelperService();
  constructor(public service : AuthService, public serv: UploadService) { }
  newDeviceListone:any;
  newArray: Array<any> = new Array<any>();
fileUploads: Array<any>=new Array<any>();
newData: Array<any> = new Array<any>();
   userInfo: any;
  
  AllocateThing = new FormGroup({
  // vehiclenumber: new FormControl('', Validators.required),
  applicationName : new FormControl('', Validators.required),
  deviceName : new FormControl('',Validators.required)
    });
    vehicleNamelist: Array<any>= new Array<any>();
    newDeviceList:any;
    vehicleNumberlist: Array<any>= new Array<any>();
    i: number;
   ngOnInit() {
// this.f1().then(res => this.abc());
     this.userInfo =this.helper.decodeToken(localStorage.getItem("token"));
     console.log(this.userInfo.identity)
     var user= this.userInfo.identity;
// this.fileUploads = 
 this.serv.getFiles()
 .then((res: any)=>{ 
  this.fileUploads= res; 
  console.log(this.fileUploads);
  setTimeout(() => {
   this.abc()},3000)
  });
 
 //this.userInfo = this.service.getUser(); 
 //this.serv.getdeviceList().toPromise().then((res)=> this.newDeviceListone= res);
  this.newDeviceListone = {user :[["PB35A11","car"], ["PB35A12", "car"]]}

for(let i = 0; i<this.newDeviceListone.user.length; i++ )
{
  this.newArray.push(this.newDeviceListone.user[i][0])
}
console.log(this.newArray);

//  console.log(this.newDeviceListone.user.length) 
 // this.newDeviceListone.
// console.log(user.length)
 
    this.newDeviceList= [{"VehicleInfo":{
"MacId":"1234","DeviceName": [
"fridge"]}},{"VehicleInfo":{
"MacId":"5678","DeviceName": [
"car"]}},{"VehicleInfo":{
  "MacId":"4321","DeviceName": [
  "truck"]}}]
  
this.getVehicleNames();
this.getVehicleData();
//  setTimeout(() => {
  // this.abc()
// }, 3000);
//   }
//  f1(){
//   return new Promise((resolve, reject)=>{ this.fileUploads =  this.serv.getFiles(); resolve();})
//   ;
 }
 get applicationName(){
  return this.AllocateThing.get('applicationName');
}
 
 get deviceName(){
  return this.AllocateThing.get('deviceName');
}
id: string;
 onFormSubmit(){
  var newObjectone:allocationDetail = {applicationid:null,deviceid:null}
  this.newData.forEach(e => {

    if (e[0].ApplicationName === this.applicationName.value) {
      this.id = e[0].applicationid
    }
  })

  newObjectone.applicationid=this.id;

  newObjectone.deviceid= this.deviceName.value;
  
  
  console.log(JSON.stringify(newObjectone));
  
   this.serv.allocatingDevice(JSON.stringify(newObjectone))      // this.newArray.push(newObjectone);new
 
 }

  ApplicationData:Array<{ID: string, MacId: string,DeviceName:string}>=new Array<{ID: string, MacId: string,DeviceName:string}>();
 
  public data: { [key: string]: Object }[] = this.ApplicationData;
  // maps the appropriate column to fields property
  public fields: Object = { groupBy:'MacId', text:'DeviceName', value:'ID' };
  // set the placeholder to the DropDownList input
  public text: string = "Select a Device";
  // Set the popup list height
  public height: string = '200px';
   
  
getVehicleNames(){
  // console.log(this.newVehicleList)
  this.newDeviceList.forEach((e:any)=> {this.vehicleNamelist.push(e.VehicleInfo.MacId)});
  this.newDeviceList.forEach((e:any)=> {this.vehicleNumberlist.push(e.VehicleInfo.DeviceName)});
  // console.log(this.vehicleNamelist);
  // console.log(this.vehicleNumberlist);
    }

  getVehicleData(){
  this.newDeviceList.forEach((e:any) => {
  //  this.vehicleData.push({ID: e.VehicleInfo.VehicleNumbers, VehicleNumber: "Vimal"});
  e.VehicleInfo.DeviceName.forEach((elem:any) => {
  this.ApplicationData.push({ID:elem, DeviceName:elem,MacId:e.VehicleInfo.MacId});
    });
   });
  }

  abc() {
   console.log('hi')
   console.log(this.fileUploads)
    var i=1;
   this.fileUploads.forEach(async e=> {
    //  console.log(e[0])
    if(i != 1) {
    
      await this.serv.fileFetch(e).toPromise().then((res: any)=> {console.log(res); this.newData[this.newData.length] = res})
    }
    i++;
   })

  // await this.service.fileFetch().toPromise().then((res: any)=> this.newData = res)
//  console.log(this.newData);
//  this.newData.forEach(e=>
//  console.log(e[0].ApplicationId))
  // console.log(this.fileUploads.forEach(e => this.http.get(e + 1)))
}
}
