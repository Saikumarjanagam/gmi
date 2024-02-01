
// pdf-generator.service.ts
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Weight } from './weight.model';
import { count } from 'rxjs';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  generatePdf(weight: Weight): void {

    pdfMake.createPdf({
      content: [
        { text: `_______________________________________________________________________________________`, style: 'subheader' },
        { text: `Customer Name : ${weight.partyName}`, style: 'subheader' },
        { text: `Destination : EX-FACTORY`, style: 'subheader' },
        { text: `Delivery challaran cum Weighing slip No: ${localStorage.getItem('count')}`, style: 'subheader1' },
        { text: `_______________________________________________________________________________________________`, style: 'line2' },
        { text: `Challan Date : ${weight.dateZero}${weight.outDate}-${weight.monthZero}${weight.outMonth + 1}-${weight.outYear}`, style: 'subheader' },
        { text: `Vehicle No  : ${weight.vehicleNo}`, style: 'subheader' },
        { text: `Transporter : OTHERS`, style: 'subheader' },
        { text: `Product Name : ${weight.productName}`, style: 'subheader' },
        { text: `Tran. Pass No : NA`, style: 'subheader' },
        { text: `Date in : ${weight.IndateZero}${weight.inDate}-${weight.InmonthZero}${weight.inMonth + 1}-${weight.inYear}   Time In: ${weight.InhourZero}${weight.inHours}:${weight.InminuteZero}${weight.inMinutes}:00 ${weight.InAmPm}`, style: 'subheader' },
        { text: `Date Out : ${weight.dateZero}${weight.outDate}-${weight.monthZero}${weight.outMonth + 1}-${weight.outYear}    Time Out: ${weight.hourZero}${weight.outHours}:${weight.minuteZero}${weight.outMinutes}:00 ${weight.OutAmPm}`, style: 'subheader' },
        { text: `Gross Wt. : ${weight.tenGoss},${weight.thousenGross} kg      Tare Wt. : ${weight.tenTare},${weight.thousenTare} kg     Net Wt. : ${weight.tenNet},${weight.thousenNet} kg`, style: 'subheader1' },
        { text: `_______________________________________________________________________________________________`, style: 'line' },

        { text: `Dispatch incharge          Driver Sign.        Customer Sign. with stamp`, style: 'subheader' },
        { text: `Dispatch incharge          Driver Sign.        Customer Sign. with stamp`, style: 'bold' }



        // Add more fields as needed
      ],
      styles: {
        subheader1: {
          fontSize: 13,
          margin: [0, 0, 0, 0],
        },
        subheader: {
          fontSize: 13,
          margin: [0, 0, 0, 3],
        },
        line: {
          margin: [0, 0, 0, 48],
        },
        line2: {
          margin: [0, 0, 0, 15],
        },
        bold: {
          bold: true
        }
      },
    }).open();
  }
}
