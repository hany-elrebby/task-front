import {Component, OnInit} from '@angular/core';
import {MatTableDataSource
} from '@angular/material/table';
import {MatFormFieldModule, MatPrefix} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {Department} from '../model/Department';

@Component({
  selector: 'app-department-list',
    imports: [
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        RouterLink
    ],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
})
export class DepartmentList implements OnInit {
    departments = new MatTableDataSource<Department>();

    displayedColumns: string[] = ['id', 'name', 'code', 'description', 'actions'];
    constructor(private http: HttpClient, private router: Router) {
    }

    updateDepartment(id: number) {
        console.log('Update', id);
        this.router.navigate(['/departments/'+id]);
    }

    deleteDepartment(id: number) {
        console.log('Delete', id);
        this.http.delete(`http://localhost:8080/departments/${id}`).subscribe(() => {
            console.log('Deleting department with ', id);
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.departments.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit(): void {
        this.http.get<any>('http://localhost:8080/departments').subscribe((res) => {
            console.log(res);
            this.departments.data = res
        })
    }


}
