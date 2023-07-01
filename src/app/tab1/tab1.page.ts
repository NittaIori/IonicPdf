import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Http, HttpDownloadFileOptions, HttpDownloadFileResult } from '@capacitor-community/http';
import { Filesystem, Directory } from '@capacitor/filesystem';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';

import * as constant from 'src/app/constant';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private iab: InAppBrowser,
    private fileOpener: FileOpener,
    private documentViewer: DocumentViewer,
  ) {}

  async download() {
    const options: HttpDownloadFileOptions = {
      url: constant.pdf_url,
      filePath: 'document.pdf',
      fileDirectory: Directory.Documents,
      method: 'GET',
    };

    const response: HttpDownloadFileResult = await Http.downloadFile(options);
    console.log(response.path);
  }

  async onClickCapacitorBrowser() {
    const options = {
      url: constant.pdf_url,
    };
    await Browser.open(options)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  onClickInAppBrowser() {
    const pdf_url = 'https://nittaiori.github.io/IonicPdf/pdf_test.pdf';
    this.iab.create(pdf_url, "_blank", "toolbarposition=top");
  }

  async onClickFileOpener() {
    const local_url = await Filesystem.getUri({
      path: 'document.pdf',
      directory: Directory.Documents
    });

    if (local_url.uri) {
      this.fileOpener.open(local_url.uri, 'application/pdf');
    }
  }

  async onClickDocumentViewer() {
    const local_url = await Filesystem.getUri({
      path: 'document.pdf',
      directory: Directory.Documents
    });

    if (local_url.uri) {
      const document_options: DocumentViewerOptions = {
        title: "TestPdf",
      };
      this.documentViewer.viewDocument(local_url.uri, 'application/pdf', document_options);
    }
  }
}
