import {Address} from './Address';

export interface Employee {
    id: number;
    name: string;
    code: string;
    mobile: string;
    department: string;
    salary: number;
    dateOfBirth: Date;
    image: number[];
    addressDto: Address;
}
