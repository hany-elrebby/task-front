import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {Employee} from '../model/Employee';
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {filter, switchMap} from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-employee-detail',
    standalone: true,
    imports: [
        MatCardModule,
        MatDividerModule,
        DecimalPipe,
        DatePipe,
        MatIcon,
        MatIconButton
    ],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail implements OnInit {
    employee!: Employee
    imageSource?: string;

    constructor(private changeDetection: ChangeDetectorRef, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    }

    updateEmployee(id: number) {
        console.log('Update', id);
        this.router.navigate(['employees/edit/'+id]);
    }

    deleteEmployee(id: number) {
        console.log('Delete', id);
        this.http.delete(`employees/${id}`).subscribe(() => {
            console.log('Deleting employee-detail with ', id);
        })
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                filter(params => params.has('id')),
                switchMap(params => {
                    const id = Number(params.get('id'));
                    return this.http.get<Employee>(`http://localhost:8080/employees/${id}`);
                })
            )
            .subscribe(res => {
                this.employee = res;
                this.imageSource = res.image
                    ? `data:image/jpeg;base64,${res.image}`
                    : undefined;

                this.changeDetection.detectChanges();
            });
    }
}
