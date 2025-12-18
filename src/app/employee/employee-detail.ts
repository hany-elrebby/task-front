import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {Employee} from '../model/Employee';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-employee',
    imports: [
        MatCardModule,
        MatDividerModule,
        DecimalPipe,
        DatePipe
    ],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetails implements OnInit {
    employee?: Employee
    imageSource?: string;

    constructor(private route: ActivatedRoute, private http: HttpClient) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        this.http.get<any>(`http://localhost:8080/employees/${id}`)
            .subscribe(res => {
                this.employee = res as Employee;

                if (res.image) {
                    this.imageSource = `data:image/jpeg;base64,${res.image}`;
                }
            });
    }
}
