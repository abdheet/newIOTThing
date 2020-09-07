import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Options } from 'ng5-slider';
import { UploadService } from "../shared/upload.service"
import { threadId } from 'worker_threads';




interface SliderDetails {
  start: string;
  value: number;
  highValue?: number;
  floor: number;
  ceil: number;
  step: any;
}
@Component({
  selector: 'app-create-thing',
  templateUrl: './create-thing.component.html',
  styleUrls: ['./create-thing.component.css']
})



export class CreateThingComponent implements OnInit {
id: string;
  registrationForm = this.fb.group({
    SensorName: ['', [Validators.required]],
    SensorBoolean:['', [Validators.required]],
    Threshold: ['', [Validators.required]],
    SensorType:  ['', [Validators.required]]

  })
  ThingNameForm = this.fb.group({
    ThingName:['',[Validators.required]]
    // SensorData:['',[Validators.required]]
  })

  state: boolean;

  
  // ThingName = new FormControl('', Validators.required);

  // sliderForm: FormGroup = new FormGroup({
  //   sliderControl: new FormControl([20, 80])
  // });
 
  // options: Options = {
  //   floor: -100,
    
  //   ceil: 100,
  //   step: 0.1
  // };
  // options1: Options = {
  //   floor: -200,
  //   ceil: 200,
  //   step: 0.1
  // };

  resetForm(): void {
    this.registrationForm.reset();
    this.ThingNameForm.reset();
    this.dataArray.splice(0,this.dataArray.length);
    this.booleanArray.splice(0,this.booleanArray.length);
    // console.log(a)
    // this.sliderControl.reset({sliderControl: [a, b]});
  }

  isSubmitted = false;

  // iot devices
  // Sensors: Array<string> = new Array<string>();
  // deviceData: any;
  dataArray : Array<any> = new Array<any>();
  booleanArray: Array<any> = new Array<any>();
  sensorDataArray : Array<any> = new Array<any>();
  constructor(public fb: FormBuilder, public service: UploadService) { }
 
  ngOnInit(): void {
    console.log(JSON.stringify('abc: '+false))
    // this.Sensors = ['Pressure Sensor', 'Temperature Sensor', 'Optical Sensor', 'Gas Sensor', 'Accelerometer and Gyroscope Sensor', 'Smoke Sensor']

    // this.deviceData = {
    //   "1: Pressure Sensor": ["1", "2", "3", "4"],
    //   "2: Temperature Sensor": ["10", "20", "30", "40"],
    //   "3: Optical Sensor": ["1", "2", "3", "4"]
    // }


  }

  //  changeSensor(e: any) {
  //  console.log(e.target.value)
  // this.SensorName.setValue(e.target.value, {
  //   onlySelf: true
  //    })
  // return e;
  //  }

  get SensorName() {
    return this.registrationForm.get('SensorName');
  }
  // get sliderControl(){
  //   return this.registrationForm.get('sliderControl');
  // }
 
  get Threshold(){
    return this.registrationForm.get('Threshold');
  }
  get ThingName(){
    return this.ThingNameForm.get('ThingName');
  }
  get SensorBoolean(){
    return this.registrationForm.get('SensorBoolean')
  }
  get SensorType(){
    return this.registrationForm.get('SensorType')
  }
  // get SensorData(){
  //   return this.ThingNameForm.get('SensorData');
  // }
 


  onAddbutton(){
    if(this.SensorType.value == '1'){
      this.dataArray[this.dataArray.length]= this.registrationForm.value;console.log(this.registrationForm.value)
      console.log(this.Threshold.value);

    }
    else{
      // if(this.SensorBoolean.value == "True")
      // {
      //   this.state = true;
      //  this.SensorBoolean = this.state;
      // }


      this.booleanArray[this.booleanArray.length] = this.registrationForm.value;
      // this.dataArray.push(this.SensorName.value);
      console.log(this.registrationForm.value);
    }
    

    // this.dataArray.push(this.Threshold.value);
    // console
    // .log(this.dataArray)
  //  console.log(this.ThingName.value);
  }
    newguid()
    {
      return 'xxxxx'.replace(/[x]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      })
    }

    sliders: SliderDetails[] = [
      {
        start: "PressureSensor",
        value: 1,
        highValue: 2,
        floor: -5,
        ceil: 5,
        step :0.1
      },
      {
        start: "tempsensor",
        value: 2,
        highValue: 2,
        floor: 0,
        step: 0.1,
        ceil: 5
      },
      {
        start: "OpticalSensor",
        value: 30,
        highValue: 60,
        floor: -100,
        step: 0.1,
        ceil: 100
      }
  ,
      {
        start: "heightsensor",
        highValue : 3,
        value: 0,
        floor: 0,
        step: 1,
        ceil: 50
      },
      {
        start: "gpssensor",
        highValue : 5 ,
        value: 0,
        floor: 0,
        step: 1,
        ceil: 10
      }
    ];
  


    sliderOptions(slider: SliderDetails): Options {
   
      return {
        floor: slider.floor,
        ceil: slider.ceil,
        step: slider.step,
        keyboardSupport: false
     
        
      };
    }




   onSubmit() {
    var newobject= {'applicationid': null};
    // newobject['ApplicationId']= this.newguid();
    // newobject['ApplicationName']= this.ThingName.value;
    
    // var sensor: SensorData;
    // if(this.SensorName.value == "Temperature Sensor"){
    //   sensor.TemperatureSensor = this.registrationForm.value['Threshold']
    // }
    // newobject['Sensor'] = sensor;


// this.dataArray[this.dataArray.length]=this.ThingNameForm.value;
this.id=this.newguid();
let i = 0;
// console.log(this.dataArray[0]['SensorName'])
if(this.dataArray.length>0){
  this.dataArray.forEach(e => {console.log(e['SensorName'], e['Threshold']); i++
var a = e['Threshold'][0];
var b = e['Threshold'][1];
var c= a+'-'+b;

  newobject[e['SensorName']] =c;
 
 
 })
}
if(this.booleanArray.length>0){
  this.booleanArray.forEach(e => {console.log(e['SensorName'], e['SensorBoolean']); i++

if(e['SensorBoolean']== "true")
{
  this.state= true;
  newobject[e['SensorName']] =this.state;
}
else{
  this.state= false;
  newobject[e['SensorName']] =this.state;
}
  
  })
}

newobject['applicationname']= this.ThingName.value;
newobject['applicationid'] = this.newguid();
this.sensorDataArray.push(newobject);
// console.log(this.sensorDataArray)
console.log(JSON.stringify( this.sensorDataArray[0]));
    this.service.fileUpload(JSON.stringify(this.sensorDataArray[0]), this.ThingName.value);
    this.resetForm();

// console.log(this.newguid()) 
// window.location.reload();
  }
}
