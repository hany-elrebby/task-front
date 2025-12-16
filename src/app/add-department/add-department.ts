import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Department} from '../model/Department';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
@Component({
  selector: 'app-add-department',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInput,
        MatButton
    ],
  templateUrl: './add-department.html',
  styleUrl: './add-department.css',
})
export class AddDepartment implements OnInit {
    departmentForm!: FormGroup;
    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.departmentForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            description: [null, [Validators.required]],
            code: [null, [Validators.required]],
        })
    }

    add(departmentForm: FormGroup): void {
        const department = this.departmentForm.value as Department;
        console.log(department);
    }
}
