import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Employee } from '../model/Employee';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {Department} from '../model/Department';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Address} from '../model/Address';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {Notification} from '../notification';

@Component({
  selector: 'app-employee-detail-edit',
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
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css',
})
export class EmployeeEdit implements OnInit{
    employeeForm!: FormGroup;
    departments: Department[] = []
    selectedFile?: File;
    addressText!: string;
    constructor(private formBuilder: FormBuilder, private notification: Notification,
                private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.employeeForm = this.formBuilder.group({
            code: [null, [Validators.required]],
            name: [null, [Validators.required]],
            dateOfBirth: [null, [Validators.required]],
            addressDto: this.formBuilder.group({
                id: [null, [Validators.required]],
                state: [null, [Validators.required]],
                city: [null, [Validators.required]],
                street: [null, [Validators.required]],
            }),
            mobile: [null, [Validators.required]],
            salary: [null, [Validators.required]],
            departmentId: [null, [Validators.required]],
        });


        this.loadDepartments()

        const id = this.route.snapshot.paramMap.get('id')

        this.http.get<any>(`http://localhost:8080/employees/${id}`).subscribe((res) => {
            console.log(res)
            this.employeeForm.patchValue(res)

            if (res.addressDto) {
                const { state, city, street } = res.addressDto;
                this.addressText = `${state}, ${city}, ${street}`;
                this.address = res.addressDto; // keep object in sync
            }
        })
    }

    loadDepartments(): void {
        this.http.get<Department[]>('http://localhost:8080/departments')
            .subscribe({
                next: (res) => this.departments = res,
                error: (err) => console.error('Department load failed', err)
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

        let address: Address = {
            state: state || '',
            city: city || '',
            street: street || '',
        };

        this.address = address;

        console.log(address);
    }

    saveEmployee(): void {
        const formData = new FormData();

        if (this.selectedFile) {
            formData.append('image', this.selectedFile);
        }

        this.employeeForm.patchValue({
            addressDto: this.address
        });

        const employee = this.employeeForm.value as Employee;

        console.log(employee)

        formData.append("employee", new Blob([JSON.stringify(employee)], {
            type: 'application/json',
        }))
        const id = this.route.snapshot.paramMap.get('id')
        this.http.put(`http://localhost:8080/employees/${id}`, formData)
            .subscribe({
                next: res => {
                    console.log('Employee updated successfully', res);
                    this.notification.success('Employee updated successfully');
                    this.router.navigate([`/employees/${res}`]);
                },
                error: err => {
                    console.error('Failed Update', err);
                    this.notification.error(err.error?.message || 'Save failed');
                }
            });
    }

}
