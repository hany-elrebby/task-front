import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Department} from '../model/Department';

@Component({
    selector: 'app-department',
    imports: [
        DatePipe,
        MatCard,
        MatCardAvatar,
        MatCardContent,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
        MatDivider
    ],
    templateUrl: './department.html',
    styleUrl: './department.css',
})
export class DepartmentDetail implements OnInit {
    department?: Department

    constructor(private route: ActivatedRoute, private http: HttpClient) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        this.http.get<any>(`http://localhost:8080/departments/${id}`)
            .subscribe(res => {
                this.department = res as Department;
            });
    }

}
