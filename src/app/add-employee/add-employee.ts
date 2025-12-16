import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Employee} from '../model/Employee';
import {MatSelectModule} from '@angular/material/select';
import {Department} from '../model/Department';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-add-employee',
    imports: [
        FormsModule,
        MatButton,
        MatFormFieldModule,
        MatInput,
        ReactiveFormsModule,
        MatSelectModule,
        MatCardModule,
        MatProgressBarModule,
        MatIconModule
    ],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee implements OnInit {
    employeeForm!: FormGroup;
    departments: Department[] = []

    selectedFile?: File;
    previewUrl?: string;
    uploadProgress = -1;

    constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    }

    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            code: [null, [Validators.required]],
            name: [null, [Validators.required]],
            dateOfBirth: [null, [Validators.required]],
            address: [null, [Validators.required]],
            mobile: [null, [Validators.required]],
            salary: [null, [Validators.required]],
            department: [null, [Validators.required]],
            image: [null, [Validators.required]],
        });
    }

    saveEmployee(employeeForm: FormGroup): void {
        const employee = this.employeeForm.value as Employee;
        console.log(employee);
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;

        if (!input.files || input.files.length === 0) {
            return;
        }

        this.selectedFile = input.files[0];

        // Preview
        const reader = new FileReader();
        reader.onload = () => this.previewUrl = reader.result as string;
        reader.readAsDataURL(this.selectedFile);
    }

    upload() {
        if (!this.selectedFile) return;

        const formData = new FormData();
        formData.append('image', this.selectedFile);

        this.http.post('http://localhost:8080/api/upload', formData, {
            reportProgress: true,
            observe: 'events'
        }).subscribe((event: HttpEvent<any>) => {

            if (event.type === HttpEventType.UploadProgress && event.total) {
                this.uploadProgress = Math.round(100 * event.loaded / event.total);
            }

            if (event.type === HttpEventType.Response) {
                this.uploadProgress = -1;
                console.log('Upload complete', event.body);
            }
        });
    }
}
