import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiRoutes } from '@models/api.routes';
import { DialogService } from '@services/dialog-service';
import { formatFileSize } from '@services/utilities';

@Component({
  selector: 'student-modal',
  standalone: false,
  templateUrl: './import-student.component.html',
  styleUrl: './import-student.component.css'
})
export class ImportStudentModal {
  
  @ViewChild("fileInput", { static: true }) fileInput!: ElementRef
  selectedFile: File | null = null;
  isSubmitting = false
  isUploading = false
  constructor(private dialogService: DialogService, private httpClient: HttpClient) {

  }

  closeDialog(){
    if(!this.isUploading) this.dialogService.closeDialog(false)
  }

  removeFile(){
    if (!this.isUploading) this.selectedFile = null
  }

  openSelect(){
    this.fileInput.nativeElement.click()
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  getSize(s: number){
    return formatFileSize(s);
  }

  uploadFile(): void {
    this.isSubmitting = true
    if (!this.isUploading && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile!);

      this.isUploading = true
      this.httpClient.post(ApiRoutes.student.alive, formData, { responseType: "blob", observe: "response"}).subscribe({
        next: res => {
          this.isUploading = false
          this.dialogService.showNotification("Students uploaded", "Students uploaded successfully", "success")
          this.dialogService.closeDialog(true)
        },
        error: er => {
          this.isUploading = false
          this.isSubmitting = false
        }
      })
    }else{
      this.dialogService.showNotification("Selection Error", "Please select a file", "danger")
    }
  }
}
