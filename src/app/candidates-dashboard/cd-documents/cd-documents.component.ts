import { Component, inject, Output } from '@angular/core';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';
import { ApiService } from '../../services/api/api.service';
import { HttpEventType } from '@angular/common/http';
import { HelpersService } from '../../services/helpers/helpers.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cd-documents',
  standalone: true,
  imports: [FileUploadsComponent, TranslateModule],
  templateUrl: './cd-documents.component.html',
  styleUrl: './cd-documents.component.scss'
})
export class CdDocumentsComponent {
  passportFile: File | null = null;
  personPicFile: File | null = null;
  degreeFile: File | null = null;
  nursingFile: File | null = null;
  uploadProgress: number = 0;
  helper = inject(HelpersService);
  constructor(private api: ApiService) {
  }

  /**
   * @description Handle file selection for both inputs
   * @param event 
   * @param fileType 
   */
  onFileSelected(event: any, fileType: string): void {
    const file = event.target.files[0];
    if (fileType === 'pdf') {
      this.passportFile = file;
    } else if (fileType === 'image') {
      this.personPicFile = file;
    }
  }

  /**
   * @description Upload both files in a single request
   * @param uploadSection 
   */
  uploadFiles(uploadSection: string): void {
    if (uploadSection == "personal") {
      if (this.passportFile && this.personPicFile) {
        const formData = new FormData();
        formData.append('pdfFile', this.passportFile);
        formData.append('imageFile', this.personPicFile);
        this.sendtoserver(formData);
      } else {
        alert('Please select both a PDF and an image file.');
      }
    } else {
      if (this.degreeFile && this.nursingFile) {
        const formData = new FormData();
        formData.append('pdfFile', this.nursingFile);
        formData.append('imageFile', this.degreeFile);
        this.sendtoserver(formData);
      } else {
        alert('Please select both a PDF and an image file.');
      }
    }

  }

  /**
   * @description Used to send the formData to server
   * @param formData 
   */
  sendtoserver(formData: FormData) {
    this.api.uploadtoServer(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round((100 * event.loaded) / (event.total || 1));
      } else if (event.type === HttpEventType.Response) {
        console.log('Files uploaded successfully:', event.body);
      }
    }, error => {
      console.error('Error uploading files:', error);
    });
  }


}
