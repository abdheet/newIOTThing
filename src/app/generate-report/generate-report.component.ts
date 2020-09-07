import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UploadService } from '../shared/upload.service';
import { formatDate, DatePipe } from '@angular/common';
import { strict } from 'assert';




interface Post {
  startDate: Date | 'dd-MM-yyyy';
}

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {
  fileUploads: Array<any> = new Array<any>();

  constructor(public service: UploadService, public formBuilder: FormBuilder) { }

  post: Post = {
    startDate: new Date(Date.now())
  }
  str5: string = '';
  newData: Array<any> = new Array<any>();

  //  datePipe = new DatePipe('en');
  // setDob = this.datePipe.transform(this.startDate, 'dd-MM-yyyy');

  generateReport = this.formBuilder.group({
    applicationName: new FormControl('', Validators.required),
    startDate: [formatDate(this.post.startDate, 'dd-MM-yyyy', 'en'), [Validators.required]]
    // startDate: [formatDate(this.post.startDate,'dd-MM-yyyy', 'en-IN'), [Validators.required]]
  })



  ngOnInit(): void {
    this.service.getFiles()
      .then((res: any) => {
        this.fileUploads = res;
        
        setTimeout(() => {
          this.abc()
        }, 3000)
      });
  }


  get applicationName() {
    return this.generateReport.get('applicationName');
  }
  get startDate() {

    return this.generateReport.get('startDate');
  }

  abc() {
    var i = 1;
    this.fileUploads.forEach(async e => {

      if (i != 1) {

        await this.service.fileFetch(e).toPromise().then((res: any) => {this.newData[this.newData.length] = res })
      }
      i++;
    })
  }
  id: any;
  async onFormSubmit() {
    // console.log(this.applicationName.value);
    this.newData.forEach(e => {

      if (e[0].ApplicationName === this.applicationName.value) {
        this.id = e[0].ApplicationId
      }
    })

    var str: string = this.startDate.value;

    var str1: string = str.substring(0, str.indexOf('-'))

    var str2: string = str.substring(str.lastIndexOf('-') + 1, str.length)

    var str3: string = str.substring(str.indexOf('-'), str.lastIndexOf('-') + 1)

    var str4: string = str2 + str3 + str1;

    await this.service.getReport(this.applicationName, str4, this.id).toPromise().then((res: any) => this.str5 =res);
    console.log(this.str5);
  }

}
