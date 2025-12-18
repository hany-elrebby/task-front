import {Component, OnInit} from '@angular/core';
import {Employee} from '../model/Employee';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
    employees = new MatTableDataSource<Employee>();

    displayedColumns: string[] = ['id', 'name', 'code', 'department', 'address', 'mobile', 'salary', 'dateOfBirth', 'actions'];
    constructor(private http: HttpClient, private router: Router) {
    }

    updateEmployee(id: number) {
        console.log('Update', id);
        this.router.navigate(['/employees/'+id]);
    }

    deleteEmployee(id: number) {
        console.log('Delete', id);
        this.http.delete(`employees/${id}`).subscribe(() => {
            console.log('Deleting employee with ', id);
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.employees.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit(): void {
        this.http.get<any>('http://localhost:8080/employees').subscribe((res) => {
            console.log(res.content);
            this.employees.data = res.content
        })
    }


}
