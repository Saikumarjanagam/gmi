import { Component, OnInit } from '@angular/core';
import { Weight } from './weight.model';
import { PdfGeneratorService } from './pdf-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChallanService } from './challan-service.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private pdfGeneratorService: PdfGeneratorService, private challanService: ChallanService) { }

  weights = new Weight();
  grossweight: string;
  gross: number;
  inTime: string;
  tareweight: string = '';
  count: number = 100342300983;

  ngOnInit(): void {
    const storedCount = localStorage.getItem('count');
    this.count = storedCount ? parseInt(storedCount) : 0;
    this.tareweight = '';

  }

  printFormData() {
    this.count++;
    localStorage.setItem('count', this.count.toString());
    this.pdfGeneratorService.generatePdf(this.weights);
    this.weights = new Weight();
    this.grossweight = '';
    this.inTime = '';
  }
  vehicleNo() {
    this.weights.vehicleNo = this.weights.vehicleNo.toUpperCase()
  }

  updateResult() {

    this.gross = eval(this.grossweight)
    this.weights.grossWeight = this.gross;
    let net = this.gross - parseInt(this.tareweight);
    this.weights.netWeight = net.toString()
    if (!this.weights.grossWeight || !this.tareweight) {
      this.weights.netWeight = '';
    }
    this.weights.tenNet = net.toString().substr(0, 2);
    this.weights.thousenNet = net.toString().substr(2, 3)
    this.weights.tenGoss = this.weights.grossWeight.toString().substr(0, 2);
    this.weights.thousenGross = this.weights.grossWeight.toString().substr(2, 3)

  }
  OutDateTime() {
    this.weights.outYear = new Date().getFullYear();
    this.weights.outMonth = new Date().getMonth();
    this.weights.outDate = new Date().getDate();
    this.weights.outHours = new Date().getHours();
    this.weights.outMinutes = new Date().getMinutes();
    if (this.weights.outHours >= 12) {
      this.weights.OutAmPm = 'PM'
    }
    else {
      this.weights.OutAmPm = 'AM'
    }

    if (this.weights.outHours == 0) {
      this.weights.outHours = 12;
    }
    if (this.weights.outHours > 12) {
      this.weights.outHours = this.weights.outHours - 12;
    }
    if (this.weights.outHours < 10) {
      this.weights.hourZero = '0';
    }


    if (this.weights.outMonth < 10) {
      this.weights.monthZero = '0';
    }

    if (this.weights.outDate < 10) {
      this.weights.dateZero = '0'
    }

    if (this.weights.outMinutes < 10) {
      this.weights.minuteZero = '0'
    }

  }

  InDateTime() {
    this.weights.inYear = new Date().getFullYear();
    this.weights.inMonth = new Date().getMonth();
    this.weights.inDate = parseInt(this.inTime.substr(5, 2));
    if (this.weights.inDate < 10) {
      this.weights.IndateZero = '0'
    }
    if (this.weights.inDate >= 10) {
      this.weights.IndateZero = ''
    }
    if (!this.weights.inDate) {
      this.weights.inDate = new Date().getDate();
    }

    this.weights.inHours = this.inTime.substr(0, 2);
    this.weights.inMinutes = this.inTime.substr(2, 2);
    this.weights.InAmPm = this.inTime.substr(4, 1);
    if (this.weights.InAmPm === 'a' || this.weights.InAmPm === 'A') {
      this.weights.InAmPm = 'AM'
    }
    if (this.weights.InAmPm === 'p' || this.weights.InAmPm === 'P') {
      this.weights.InAmPm = 'PM'
    }

    if (this.weights.inMonth < 10) {
      this.weights.InmonthZero = '0';
    }

    if (this.weights.inDate < 10) {
      this.weights.IndateZero = '0'
    }

  }
  tare() {
    this.weights.tenTare = this.tareweight.toString().substr(0, 2);
    this.weights.thousenTare = this.tareweight.toString().substr(2, 3);
    //this.weights.tareWeight = tens + ',' + thousends;
    if (!this.weights.inYear) {
      this.weights.inYear = new Date().getFullYear();
    }
    if (!this.weights.inMonth) {
      this.weights.inMonth = new Date().getMonth();
      if (this.weights.inMonth < 10) {
        this.weights.InmonthZero = '0'
      }
    }
    if (!this.weights.inDate) {
      this.weights.inDate = new Date().getDate();
    }
    if (!this.weights.inHours) {
      this.weights.inHours = new Date().getHours().toString()
      if (parseInt(this.weights.inHours) > 12) {
        this.weights.inHours = (parseInt(this.weights.inHours) - 12).toString()
      }
      if (parseInt(this.weights.inHours) >= 12) {
        this.weights.InAmPm = 'PM';
      }
      if (parseInt(this.weights.inHours) < 12) {
        this.weights.InAmPm = 'AM';
      }
      if (parseInt(this.weights.inHours) < 10) {
        this.weights.InhourZero = '0';
      }
    }

    if (!this.weights.inMinutes) {
      this.weights.inMinutes = new Date().getMinutes().toString()
      if (parseInt(this.weights.inMinutes) == 0) {
        this.weights.InminuteZero = '00';
      }
      if (parseInt(this.weights.inMinutes) < 10) {
        this.weights.InminuteZero = '0';
      }
    }

  }
}
