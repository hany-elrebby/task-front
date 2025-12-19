import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../model/Employee';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HttpClient, HttpParams} from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
    imports: [
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
        MatPaginatorModule,
    ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
    employees = new MatTableDataSource<Employee>();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    displayedColumns: string[] = ['id', 'name', 'code', 'department', 'address', 'mobile', 'salary', 'dateOfBirth', 'actions'];
    constructor(private http: HttpClient, private router: Router) {
    }

    updateEmployee(id: number) {
        console.log('Update', id);
        this.router.navigate(['employees/edit/'+id]);
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

    totalElements = 0;
    pageSize = 10;
    pageIndex = 0;
    searchValue = '';

    onPageChange(event: PageEvent): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadEmployees();
    }

    loadEmployees(): void {
        const params = new HttpParams()
            .set('page', this.pageIndex)
            .set('size', this.pageSize)
            .set('search', this.searchValue);

        this.http.get<any>('http://localhost:8080/employees', { params })
            .subscribe(res => {
                this.employees.data = res.content;
                this.totalElements = res.totalElements;
            });
    }

    ngOnInit(): void {
        this.loadEmployees()
    }

}
