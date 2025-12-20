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
import {Route} from '@angular/router';
import { Router } from '@angular/router';
import {Notification} from '../notification';
@Component({
  selector: 'app-add-employee-detail',
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

    constructor(private formBuilder: FormBuilder, private notification: Notification,
                private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            code: [null, [Validators.required]],
            name: [null, [Validators.required]],
            dateOfBirth: [null, [Validators.required]],
            addressDto: this.formBuilder.group({
                id: [null, [Validators.required]],
                state: ['', [Validators.required]],
                city: ['', Validators.required],
                street: ['', Validators.required],
            }),
            mobile: [null, [Validators.required]],
            salary: [null, [Validators.required]],
            departmentId: [null, [Validators.required]],
        });


        this.http.get('http://localhost:8080/departments').subscribe((res) => {
            this.departments = res as Department[]
        })
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
            state: state || '',
            city: city || '',
            street: street || '',
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

        this.employeeForm.patchValue({
            addressDto: this.address
        });

        const employee = this.employeeForm.value as Employee;

        console.log(employee)

        formData.append("employee", new Blob([JSON.stringify(employee)], {
            type: 'application/json',
        }))
        console.log(this.employeeForm.value)
        this.http.post('http://localhost:8080/employees', formData)
            .subscribe({
                next: res => {
                    console.log('Employee saved successfully', res);
                    this.notification.success('Employee saved successfully');
                    this.router.navigate([`/employees/${res}`]);
                },
                error: (err) => {
                    if (err.error instanceof Blob) {
                        const reader = new FileReader();

                        reader.onload = () => {
                            const errorResponse = JSON.parse(reader.result as string);
                            console.error('Backend error:', errorResponse);
                            this.notification.error(errorResponse.message);
                        };

                        reader.readAsText(err.error);
                    } else {
                        this.notification.error(err.error?.message || 'Unexpected error');
                    }
                }
            });
    }

}
