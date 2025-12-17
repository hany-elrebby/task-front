import { Routes } from '@angular/router';
import {AddDepartment} from './add-department/add-department';
import {Department} from './department/department';
import {DepartmentList} from './department-list/department-list';
import {AddEmployee} from './add-employee/add-employee';
import {EmployeeList} from './employee-list/employee-list';
import {Employee} from './employee/employee';

export const routes: Routes = [
    {
        component: AddDepartment,
        path: 'departments/add',
    },
    {
        component: Department,
        path: 'departments/:id',
    },
    {
        component: DepartmentList,
        path: 'departments',
    },
    {
        component: AddEmployee,
        path: 'employees/add',
    },
    {
        component: Employee,
        path: 'employees/:id',
    },
    {
        component: EmployeeList,
        path: 'employees',
    },
];
