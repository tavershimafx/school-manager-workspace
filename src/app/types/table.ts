import { colFromIndex, colToIndex, getColId, getRowId, Point } from "@services/utilities";

export class Workbook{

    worksheets?: Worksheet[]
    constructor (){
        this.createWorksheet(1)
        this.worksheets![0].isActive = true
    }

    createWorksheet(id: number): Workbook{
        this.worksheets = [];
        this.worksheets.push(new Worksheet(id))
        return this
    }

    addColumn(): Workbook{
        return this
    }

    addRow(): Workbook{
        return this
    }

    getActiveSheet(): Worksheet| undefined{
        return this.worksheets?.find(n => n.isActive == true)
    }
}

export class CellExpand{
    mouseDownElement: any
    mouseDownStartX?: number
    mouseDownStartY?: number

    mouseDownStartHeight?: number
    mouseDownStartWidth?: number
}

class MouseDownProp{
    fromX?: number
    fromY?: number

    fromRow?: number
    fromCol?: string
    toRow?: number
    toCol?: string
}

export class TableHeader{
    label: string = ""
    key: string = ""
    isStartCol?: boolean = false
    disabled?: boolean = false
    sort?: "asc" | "des" = "asc"
    inputType?: "text" | "date" | "number" = "text"
    settings?: ColumnSettings
    validator?: (value: any) => boolean
}

export interface ColumnSettings{
    dataType: "number" | "string" | "date",
    minValue?: number
    maxValue?: number
}

export interface DraggingRect{ 
    xTop: number
    yTop: number
    xBottom: number
    yBottom: number
}

export interface DragDirection{
    up: boolean
    left: boolean
    x: number
    y: number
}

export class Worksheet{

    id: number = 0
    isActive: boolean = false
    rows: Row[] = []
    private defaultRowCount = 100;
    activeRow: number = 0
    //rowSelection?: "single" | "multiple"
    private selectedRows: number[] = []
    private highlightedRow: number = 0
    highlightedCol?: string
    hasMouseDown: boolean = false
    private mouseDownProps?: MouseDownProp

    tableHeaders: TableHeader[] = []
    constructor (i: number){
        this.id = i
        this.rows = []
        //this.populateBlank(this.defaultRowCount, this.defaultColumnCount)
    }

    addHeaders(headers: TableHeader[]){
        this.tableHeaders = headers
        this.populateBlank(this.defaultRowCount, headers.length)
    }

    populateBlank(rows: number, cols: number){
        for (let i = 0; i < rows; i++) {
            this.rows.push(new Row(i + 1).addCells(cols));
        }
    }

    activateCell(row: number, cid: string, x: number, y: number){
        // if(this.activeRow != 0){
        //     this.rows![this.activeRow - 1].deActivate()
        // }

        this.unhighlightAll()
        this.activeRow = row
        this.rows![row - 1].activate(cid)
        
        if(!this.mouseDownProps){
            this.mouseDownProps = new MouseDownProp()
        }
        
        this.mouseDownProps.fromX = x
        this.mouseDownProps.fromY = y
    }

    deactivateCell(){
        if(this.activeRow != 0){
            this.rows![this.activeRow - 1].deActivate()
            this.activeRow = 0
        }
        this.unhighlightAll()
    }

    getActiveCell(): Cell | undefined{
        if(this.activeRow != 0){
            return this.rows[this.activeRow - 1].cells.find(n => n.active)
        }

        return undefined
    }

    getColumns(): string[]{
        return this.rows[0].cells.map((n)=> { return n.col })
    }

    getSelectedRows(): number[]{
        return this.selectedRows
    }

    // selectRow(id: number){
    //     if(this.activeRow != 0){
    //         this.rows![this.activeRow - 1].deActivate()
    //         this.activeRow = 0
    //     }

    //     if (this.highlightedRow != 0){
    //         this.rows?.find(n => n.isHighlighted)?.highlight()
    //     }

    //     this.unhighlightAll()
    //     this.highlightedRow = id
    //     this.rows![id - 1].highlight()
    // }

    highlightRow(id: number){
        // if(this.activeRow != 0){
        //     this.rows![this.activeRow - 1].deActivate()
        //     this.activeRow = 0
        // }

        // if (this.highlightedRow != 0){
        //     this.rows?.find(n => n.isHighlighted)?.highlight()
        // }

        //this.unhighlightAll()
        this.selectedRows.push(id)
        this.highlightedRow = id
        this.rows![id - 1].highlight()
    }

    highlightCol(col: string){
        // if(this.activeRow != 0){
        //     this.rows![this.activeRow - 1].deActivate()
        //     this.activeRow = 0
        // }

        if(this.highlightedRow != 0){
            this.unhighlightAll()
        }

        this.highlightedCol = col
    }

    /**
     * 
     * @param start 
     * @param end 
     */
    highlightRows(start: number, end: number) {
        this.selectedRows = []
        for (let i = start; i <= end; i++) {
            this.highlightRow(i);
        }
    }

    toggleRowHighlight(rowId: number) {
        this.selectedRows.push(rowId)
        const row = this.rows[rowId - 1];
        row.toggleHighlight();
    }


    /**
     * 
     * @param row 
     * @param col 
     */
    setHighlightedLimit(row: number, col: string){
        this.hasMouseDown = false
        if(this.mouseDownProps){
            this.mouseDownProps!.toCol = col
            this.mouseDownProps!.toRow = row
        }
    }

    getHighlightPoint(): Point{
        return { 
            x: this.mouseDownProps?.fromX!,
            y:  this.mouseDownProps?.fromY! 
        }
    }

    mouseDown(row: number, col: string, x: number, y: number){
        this.hasMouseDown = true
        this.mouseDownProps = new MouseDownProp()
        this.mouseDownProps.fromRow = row
        this.mouseDownProps.fromCol = col
        this.mouseDownProps.fromX = x
        this.mouseDownProps.fromY = y
    }

    unhighlightAll(){
        this.unhighlightAllRows()
        this.unhighlightAllCols()

        //this.unhighlightRow()
        //this.unhighlightCol()
    }

    getCellValue(row: number, cid: string): string | undefined{
        let value = this.rows![row - 1].cells.find(n => n.id == cid)?.value
        return  value
    }

    setCellValue(row: number, cid: string, value: string){
        if(this.rows![row - 1].cells.find(c => c.id == cid) != undefined){
            this.rows![row - 1].cells.find(c => c.id == cid)!.value = value
        }
    }

    getRow(row: number): Row | undefined{
        return this.rows![row - 1]
    }

    isColDisabled(col: string): boolean{
        return this.tableHeaders[colToIndex(getColId(col))].disabled == true
    }

    isCellDisabled(cid: string): boolean{
        return this.isColDisabled(getColId(cid)) || this.rows![+getRowId(cid)].cells[colToIndex(getColId(cid))].disabled == true
    }

    /**
     * Deletes all the rows in the sheet
     */
    clear(){
        this.rows = []
    }

    /**
     * Empties the contents of all the cells in the sheet
     */
    empty(){
        for (let m = 0; m < this.rows.length; m++) {
            for (let n = 0; n < this.rows[m].cells.length; n++) {
                this.rows[m].cells[n].value = undefined
            }
        }
    }

    getData(){
        let data = []
        for (let m = 0; m < this.rows.length; m++) {
            let ll:any = {}
            for (let n = 0; n < this.rows[m].cells.length; n++) {
                    ll[this.tableHeaders[n].key] = this.rows[m].cells[n].value
            }
            data.push(ll)
        }

        return data
    }

    clearChangesFlags(){
        for (let m = 0; m < this.rows.length; m++) {
            this.rows[m].hasChanges = false
        }
    }

    sortCol(col: number){
        this.tableHeaders[col].sort = this.tableHeaders[col].sort == "asc"? "des" : "asc"
        
        let direction = this.tableHeaders[col].sort == "asc" ? 1 : -1
        this.rows.sort((a, b)=>{

            let valA = a.cells[col].value!
            let valB = b.cells[col].value!

            let numA = +valA
            let numB = +valB
            if(!Number.isNaN(numA) && !Number.isNaN(numB)){
                return (numA - numB) * direction
            }
            return valA.localeCompare(valB) * direction
        })
    }

    // private unhighlightRow(){
    //     let i = this.rows?.findIndex(n => n.isHighlighted)
    //     if(i != -1){
    //         this.rows![i!].highlight()
    //     }
    // }

    private unhighlightAllRows(){
        this.selectedRows = []
        this.rows.forEach(row => {
            row.isHighlighted = false
        });
    }

    // private unhighlightCol(){
    //     this.highlightedCol = undefined
    // }

    private unhighlightAllCols(){
        this.rows.forEach(row => {
            row.cells.forEach(cell => {
             cell.highlighted = false
             cell.active = false
            }); 
        });
    }
}

export class Row{
    id: number
    cells: Cell[] = []
    isActive: boolean = false
    isHighlighted: boolean = false
    hasChanges: boolean = false
    
    constructor(id: number){
        this.id = id
    }

    activate(cid: string){
        this.isActive = true
        this.cells.find(n => n.id == cid)!.active = true
    }

    deActivate(){
        this.isActive = false
        if(this.cells.find(n => n.active) != undefined){
            this.cells.find(n => n.active)!.active = false
        }
    }

    addCells(count: number):Row{
        for (let i = 0; i < count; i++) {
            this.cells.push(new Cell(this.id, colFromIndex(i)));
        }

        return this
    }

    /**
     * Toggles between hightlighted and unhighlighted
     */
    toggleHighlight(){
        this.isHighlighted = !this.isHighlighted
    }

    highlight(){
        this.isHighlighted = true
    }
}

export class Cell{
    
    col: string
    row: number
    value?: string
    disabled?: boolean = false
    active: boolean = false
    highlighted: boolean = false
    get id(){
        return `${this.col}${this.row}`
    }

    constructor(row: number, col: string){
        this.col = col
        this.row = row
    }

}

