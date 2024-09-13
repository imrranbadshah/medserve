import { Component } from '@angular/core';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';

@Component({
  selector: 'app-cd-documents',
  standalone: true,
  imports: [FileUploadsComponent],
  templateUrl: './cd-documents.component.html',
  styleUrl: './cd-documents.component.scss'
})
export class CdDocumentsComponent {

}
