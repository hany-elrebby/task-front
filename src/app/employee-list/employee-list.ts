import {Component, OnInit} from '@angular/core';
import {Employee} from '../model/Employee';
import {MatTableModule} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  imports: [
      MatTableModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
    employees!: Employee[]
    displayedColumns: string[] = ['id', 'name', 'code', 'department', 'address', 'mobile', 'salary', 'dateOfBirth'];
    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.http.get<any>('http://localhost:8080/employees').subscribe((res) => {
            console.log(res.content);
            this.employees = res.content as Employee []
        })
    }


}
