import { Routes } from '@angular/router';
import {AddDepartment} from './add-department/add-department';
import {DepartmentDetail} from './department/department';
import {DepartmentList} from './department-list/department-list';
import {AddEmployee} from './add-employee/add-employee';
import {EmployeeList} from './employee-list/employee-list';
import {EmployeeDetail} from './employee-detail/employee-detail';
import {EmployeeEdit} from './employee-edit/employee-edit';
import {Home} from './home/home';

export const routes: Routes = [
    {
        component: Home,
        path: '',
    },
    {
        component: AddDepartment,
        path: 'departments/add',
    },
    {
        component: DepartmentDetail,
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
        component: EmployeeDetail,
        path: 'employees/:id',
    },
    {
        component: EmployeeList,
        path: 'employees',
    },
    {
        component: EmployeeEdit,
        path: 'employees/edit/:id',
    },
];
