// /*
//     description： this function is used to get the result set of the query
// */

// type StoredProcedureResponse<T> = [any, T[]];

// export class ResultSet<T> {

//     private _rows: T[] = [];
//     private _fields: any[] = [];
//     private _affectedRows: number = 0;
//     private _insertId: number = 0;
//     private _changedRows: number = 0;

//     constructor(rows: T[], fields: any[], affectedRows: number, insertId: number, changedRows: number) {
//         this._rows = rows;
//         this._fields = fields;
//         this._affectedRows = affectedRows;
//         this._insertId = insertId;
//         this._changedRows = changedRows;
//     }

//     get rows(): T[] {
//         return this._rows;
//     }

//     get fields(): any[] {
//         return this._fields;
//     }

//     get affectedRows(): number {
//         return this._affectedRows;
//     }

//     get insertId(): number {
//         return this._insertId;
//     }

//     get changedRows(): number {
//         return this._changedRows;
//     }

//     static from<T>(rows: T[], fields: any[], affectedRows: number, insertId: number, changedRows: number) {
//         return new ResultSet<T>(rows, fields, affectedRows, insertId, changedRows);
//     }

//     static fromStoredProcedureResponse<T>(response: StoredProcedureResponse<T>) {
//         return new ResultSet<T>(response[1], response[0], 0, 0, 0);
//     }

//     static fromQueryResponse<T>(response: QueryResponse<T>) {
//         return new ResultSet<T>(response[0], response[1], response[2], response[3], response[4]);
//     }
// }
