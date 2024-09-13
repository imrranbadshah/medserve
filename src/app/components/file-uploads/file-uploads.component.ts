import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-uploads',
  standalone: true,
  imports: [],
  templateUrl: './file-uploads.component.html',
  styleUrl: './file-uploads.component.scss'
})
export class FileUploadsComponent {
  @Input('title') title!: string;
  @Input('desc') desc!: string;
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped(files: any) {
    console.log("Drop files", files.target.files);
    this.prepareFilesList(files.target.files);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    console.log("Choose files", files);
    this.prepareFilesList(files.target.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }



  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
