import { Injectable } from '@angular/core';
import QRCode from 'qrcode';

@Injectable({
  providedIn: 'root',
})
export class QRService {
  constructor() {}

  generateQR(surveyId: string) {
    const url = `${window.location.origin}/rate/${surveyId}`;
    return QRCode.toDataURL(url);
  }
}
