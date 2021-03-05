/**
 * Interfaces and enums
 */
import { Location, YourLoan, YourShip } from 'spacetraders-sdk/dist/types';

// export enum LoanType {
//     STARTUP,
//     ENTERPRISE
// }

// export interface Cargo {
//     good: string;
//     quantity: number;
// }

// export interface Loan {
//     due: Date;
//     id: string;
//     repaymentAmount: number;
//     status: string;
//     type: LoanType;
// }

// export interface Ship {
//     cargo: Array<Cargo>;
//     class: string;
//     id: string;
//     location: string;
//     manufacturer: string;
//     maxCargo: number;
//     plating: number;
//     spaceAvailabe: number;
//     speed: number;
//     type: string;
//     weapons: number;
// }

// export interface User {
//     username: string;
//     credits: number;
//     ships: Array<Ship>;
//     loans: Array<Loan>;
// }

export interface State {
    username: string;
    credits: number;
    token: string;
    ships: YourShip[];
    loans: YourLoan[];
    system: Location[];
}
