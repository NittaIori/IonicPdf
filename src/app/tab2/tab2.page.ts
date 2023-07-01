import { Component } from '@angular/core';

import { Filesystem, Directory } from '@capacitor/filesystem';

import * as constant from 'src/app/constant';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  url = constant.pdf_url;
  dataUrl = '';

  constructor() {
    this.loadLocal();
  }

  async loadLocal() {
    const data = await Filesystem.readFile({
      path: 'document.pdf',
      directory: Directory.Documents,
    })
    console.log(data);
    this.dataUrl = 'data:application/pdf;base64,' + data.data;
  }
}
