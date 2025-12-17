import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {Department} from '../model/Department';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {Employee} from '../model/Employee';
import {Address} from '../model/Address';

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
        });
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;

        if (!input.files || input.files.length === 0) {
            return;
        }

        this.selectedFile = input.files[0];
        console.log(this.selectedFile);
    }

    address!: Address;
    onAddressInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;

        const [state, city, street] = value
            .split(',')
            .map(v => v.trim());

        const address: Address = {
            country: street || '',
            state: state || '',
            city: city || '',
            street: street || '',
            postalCode: street || '',
        };

        this.address = address;

        console.log(address);
    }

    saveEmployee(): void {
        if (!this.selectedFile) {
            return;
        }

        const formData = new FormData();


        formData.append('image', this.selectedFile);
        this.employeeForm.setControl("address", this.address);

        const employee = this.employeeForm.value as Employee;

        formData.append("employee", new Blob([JSON.stringify(employee)], {
            type: 'application/json',
        }))

        this.http.post('http://localhost:8080/employees', formData)
            .subscribe({
                next: res => {
                    console.log('Employee saved successfully', res);
                },
                error: err => {
                    console.error('Error saving employee', err);
                }
            });
    }

}
