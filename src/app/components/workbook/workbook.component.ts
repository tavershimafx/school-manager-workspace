import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CellExpand, DragDirection, DraggingRect, Row, TableHeader, Workbook } from '@models/table';
import { FileService } from '@services/file-download';
import { colFromIndex, colToIndex, isValidISODate } from '@services/utilities';

  const minCellWidth = 60; //px
  const borderSize = 2;
  const minCellHeight = 22

@Component({
  selector: 'workbook',
  standalone: false,
  templateUrl: './workbook.component.html',
  styleUrls: ['./workbook.component.css']
})
export class WorkbookComponent implements OnInit, AfterViewInit{
  private mData:any[] = []
  @Input() title: string = "Sheet 1"

  @Input() set hasChanges(ds:boolean){
    if(ds) this.workbook.getActiveSheet()!.clearChangesFlags()
    this.hasEdit = !ds

  }

  @Input() get data(): any[]{
    return this.mData
  }

  set data(ds:any[]){
    if(!ds) return
    this.mData = ds
    this.workbook.getActiveSheet()?.clear()

    //setTimeout(() => {
      this.workbook.getActiveSheet()?.populateBlank(this.mData!.length, this.sheetHeaders.length)
      for (let m = 0; m < this.mData!.length; m++) {
        for (let n = 0; n < this.sheetHeaders.length; n++){
          this.workbook.getActiveSheet()!.rows[m].cells[n].value = this.data[m][this.sheetHeaders[n].key]
          this.data[m].vId = this.workbook.getActiveSheet()!.rows[m].id
        }
      }
      this.hasEdit = false
    //}, 100)
  }

  @Output() dataChange: EventEmitter<any[]> = new EventEmitter<any[]>()
  @Output() selectedRows: EventEmitter<any[]> = new EventEmitter<any[]>()

  @Input() sheetHeaders: TableHeader[] = []
  @ViewChild("lighter", { static: true }) lighter!: ElementRef
  @ViewChild("container", { static: true }) container!: ElementRef
  workbook: Workbook = new Workbook()
  mouseDown = false
  cellExpansion?: CellExpand
  inputEl!: HTMLInputElement;
  lastSelectedRow?: number
  hasEdit:boolean = false

  @HostListener('keydown', ['$event'])onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      e.preventDefault(); // prevent browser tabbing out

      const cell = this.workbook.getActiveSheet()?.getActiveCell();
      this.commitEdit()
      if(cell){
        const next = this.getNextCell(cell.row, cell.col, e.shiftKey);
        if(this.workbook.getActiveSheet()!.isColDisabled(`${next.col}${next.row}`)) return

        // Move focus to next cell
        this.focusCell(next.row, next.col);
      }
    }
  }

  constructor(private fileService: FileService) {
   
  }

  ngOnInit(): void {
    if(this.data && this.data?.length > this.workbook.getActiveSheet()!.rows.length){
      for (let i = this.workbook.getActiveSheet()!.rows.length; i < this.data?.length + 1; i++) { // row numbers start at 1
        this.workbook.getActiveSheet()?.rows?.push(new Row(i))
      }
    }
    this.workbook.getActiveSheet()?.addHeaders(this.sheetHeaders)
  }

  ngAfterViewInit() {
    this.inputEl = document.createElement('input');
    Object.assign(this.inputEl.style, {
      position: 'absolute',
      display: 'none',
      zIndex: '1000',
      fontSize: '13px',
      outline: "none",
      //border: '2px solid var(--dark-green)',
      padding: '3px'
    });

    // Object.assign(this.inputEl, {
    //    pattern:"[0-9]*" ,
    //    inputmode:"numeric" ,
    // })

    this.container.nativeElement.appendChild(this.inputEl);
    this.inputEl.addEventListener('blur', () => this.commitEdit());
    this.inputEl.addEventListener('keypress', (e) => this.cellEditing(e));
  }
  
  downloadPage(){
    let sh: string[] = []
    let head = this.sheetHeaders.map((k) => k.key)
    //head.push('\n')
    sh = sh.concat(head.join(','))
    
    this.data.forEach((n) =>{
      let dl: string[] = []
      this.sheetHeaders.forEach((k) =>{
        dl.push(n[k.key])
      })

      //dl.push('\n')
      sh = sh.concat(dl.join(','))
    })
    
    this.fileService.downloadCsv(sh, this.title)
  }

  headerClicked(col: number){
    this.workbook.getActiveSheet()?.sortCol(col)
  }

  /**
   * 
   * @param row the current row
   * @param col the current col
   * @param reverse reverse is usually true if the shift key is held down which should
   * go to the previous col on same row for tab or previous row for enter key
   * @returns 
   */
  getNextCell(row: number, col: string, reverse: boolean = false): { row: number, col: string } {
    const cols = this.workbook.getActiveSheet()!.getColumns(); // e.g., ['A','B','C','D']
    const currentIndex = cols.indexOf(col);

    let nextRow = row;
    let nextColIndex = reverse ? currentIndex - 1 : currentIndex + 1;

    // Wrap around logic
    if (nextColIndex >= cols.length) {
      nextColIndex = 0;
      nextRow++;
    } else if (nextColIndex < 0) {
      nextColIndex = cols.length - 1;
      nextRow--;
    }

    return { row: nextRow, col: cols[nextColIndex] };
  }

  cellEditing(e: KeyboardEvent){
     if (e.key === 'Enter') {
        const ac = this.workbook.getActiveSheet()?.getActiveCell();
        this.commitEdit();
        if(e.shiftKey && ac!.row != 1){
          this.focusCell(ac!.row + - 1, ac!.col); // Move focus to prev row, same col
        }else{
          // Move focus to next row, depending on set startCol
          let str = this.sheetHeaders.findIndex(n => n.isStartCol == true)
          if(str != -1){
            this.focusCell(ac!.row + 1, colFromIndex(str));
          }
        }
      } else if (e.key === 'Escape') {
        this.inputEl.style.display = 'none';
        this.resetHighligter()
        this.workbook.getActiveSheet()?.deactivateCell();
      }else{
        let str = this.sheetHeaders[0]
        if(str.inputType == "number"){
          const charCode = e.which ? e.which : e.keyCode;
          if (e.charCode < 48 || charCode > 57) {
              e.preventDefault();
          }
        }
      }
  }

  // validateScore(val: string, settings?: ColumnSettings): boolean{
  //   if(settings){
  //     let num = +val
  //     return num != Number.NaN && num >= settings.minValue! && num <= settings.maxValue!
  //   }

  //   return true
  // }

  // validateScore(val: string, settings?: ColumnSettings): boolean {
  //   if (!settings) return true;

  //   const num = Number(val);
  //   if (Number.isNaN(num)) return false;

  //   return num >= settings.minValue! && num <= settings.maxValue!;
  // }

  commitEdit() {
    if (!this.workbook.getActiveSheet()!.activeRow) return;
    const ac = this.workbook.getActiveSheet()?.getActiveCell();
    let newValue:any = this.inputEl.value.trim();
    newValue = (newValue == "")? undefined: newValue
    
    let i = colToIndex(ac!.col)
    let prop = this.sheetHeaders[i] 

    if(prop.validator){
      if(prop.validator(newValue)){
        this.workbook.getActiveSheet()!.setCellValue(ac!.row, `${ac?.col}${ac?.row}`,newValue);
        let row = this.workbook.getActiveSheet()!.getRow(ac!.row)
          if(this.data && this.data.length > 0){
            if(this.data.find(n => n.vId == row!.id)![prop.key] != newValue){
              row!.hasChanges = true
              this.hasEdit = true
            }
            this.data.find(n => n.vId == row!.id)![prop.key] = newValue
          }
      }
    }else{
      this.workbook.getActiveSheet()!.setCellValue(ac!.row, `${ac?.col}${ac?.row}`,newValue);
      let row = this.workbook.getActiveSheet()!.getRow(ac!.row)
        if(this.data && this.data.length > 0){
          if(this.data.find(n => n.vId == row!.id)![prop.key] != newValue){
            row!.hasChanges = true
            this.hasEdit = true
          }
          this.data.find(n => n.vId == row!.id)![prop.key] = newValue
        }
    }
  
    this.inputEl.style.display = 'none';
    this.workbook.getActiveSheet()?.deactivateCell();
  }

  focusCell(row: number, col: string) {
    const cell:HTMLElement = document.querySelector(`[id="${col}${row}"]`) as HTMLElement;
    
    if (cell) {
      const rect = cell.getBoundingClientRect();
      const containerRect = this.container.nativeElement.getBoundingClientRect();
      const x = rect.left - containerRect.left;
      const y = rect.top - containerRect.top;

      const cellValue = this.workbook.getActiveSheet()!.getCellValue(row, `${col}${row}`);
      this.moveInput(x, y, cell.clientWidth, cell.clientHeight, cellValue ?? '')
      this.setHighligterTop(y, x, cell.clientWidth, cell.clientHeight);
      this.workbook.getActiveSheet()?.activateCell(row, `${col}${row}`, x, y)
    }
  }

  moveInput(xTop: number, yTop: number, width: number, height: number, cellValue: string){
    //Move and show the input
    this.inputEl.style.left = xTop + 'px';
    this.inputEl.style.top = yTop + 'px';
    this.inputEl.style.width = width + 'px';
    this.inputEl.style.height = height + 'px';
    this.inputEl.style.display = 'block';

    this.inputEl.value = cellValue ?? '';
    this.inputEl.focus();
  }

  cellClicked(e: any, row: number, col: string) {
    if(this.workbook.getActiveSheet()!.isColDisabled(`${col}${row}`)) return

    const el = e.target.getBoundingClientRect();
    const cellValue = this.workbook.getActiveSheet()!.getCellValue(row, `${col}${row}`);

    let bounds = this.getRelativeBounds(e)

    //Move and show the input
    this.moveInput(bounds.xTop, bounds.yTop, el.width, el.height, cellValue ?? '')

    this.resetHighligter()
    this.setHighligterTop(el.left, el.top, el.width, el.height)

    this.workbook.getActiveSheet()?.deactivateCell()
    this.workbook.getActiveSheet()?.activateCell(row, `${col}${row}`, bounds.xTop, bounds.yTop)
    let point = this.workbook.getActiveSheet()?.getHighlightPoint()

    this.setHighligterAll(point!.x, point!.y, bounds.xBottom, bounds.yBottom, true);
  }

  highlightRow(rowId: number, event: MouseEvent) {
    const isCtrl = event.ctrlKey || event.metaKey; // metaKey for Mac
    const isShift = event.shiftKey;

    if (isShift) {
      this.highlightRange(rowId);
    } else if (isCtrl) {
      this.toggleRow(rowId);
    } else {
      this.highlightSingle(rowId);
    }
    this.pushSelectedRowData()
  }

  highlightCol(col: string) {
    this.resetHighligter()
    this.workbook.getActiveSheet()?.highlightCol(col)
  }

  private highlightSingle(rowId: number) {
    this.resetHighligter();
    this.workbook.getActiveSheet()?.unhighlightAll()
    this.workbook.getActiveSheet()?.highlightRow(rowId);
    this.lastSelectedRow = rowId;
  }

  private toggleRow(rowId: number) {
    this.workbook.getActiveSheet()?.toggleRowHighlight(rowId);
    this.lastSelectedRow ??= rowId;
  }

  private highlightRange(rowId: number) {
    if (this.lastSelectedRow == null) {
      this.highlightSingle(rowId);
      return;
    }

    const start = Math.min(this.lastSelectedRow, rowId);
    const end = Math.max(this.lastSelectedRow, rowId);

    this.resetHighligter();
    this.workbook.getActiveSheet()?.highlightRows(start, end);
  }

  private pushSelectedRowData(){
    let rs = this.workbook.getActiveSheet()?.getSelectedRows();
    let dt: any[] = []
    rs?.forEach((i) =>{
      let r = this.workbook.getActiveSheet()?.rows[i - 1]
      dt.push(this.data.find(n => n.vId == r!.id)!)
    })

    this.selectedRows.emit(dt)
  }

  mouseOverCol(e: any){
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; // Distance from left edge of element
    let isOnRightBorder = x >= rect.width - borderSize && x <= rect.width;
    if (isOnRightBorder){
      e.target.style.cursor = "col-resize"
    }else{
      e.target.style.cursor = "default"
    }
  }

  mouseOverRow(e: any){
    let rect = e.target.getBoundingClientRect();
    let x = e.clientY - rect.top; // Distance from top edge of element
    let isBottomBorder = x >= rect.height - borderSize && x <= rect.height;
    if (isBottomBorder){
      e.target.style.cursor = "row-resize"
    }else{
      e.target.style.cursor = "default"
    }
  }

  startColExp(e: any){
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; // Distance from left edge of element
    let isOnRightBorder = x >= rect.width - borderSize && x <= rect.width;


    if (isOnRightBorder) {
      this.mouseDown = true
      this.cellExpansion = new CellExpand()
      this.cellExpansion.mouseDownElement = e.target
      this.cellExpansion.mouseDownStartWidth = e.target.getBoundingClientRect().width
      this.cellExpansion.mouseDownStartX = e.x
    } 
   
  }

  startRowExp(e: any){
  let rect = e.target.getBoundingClientRect();
  let y = e.clientY - rect.top; // Distance from top edge of the element

  let isBottomBorder = y >= rect.height - borderSize && y <= rect.height;
  if (isBottomBorder) {
      this.mouseDown = true
      this.cellExpansion = new CellExpand()
      this.cellExpansion.mouseDownElement = e.target
      this.cellExpansion.mouseDownStartHeight = e.target.getBoundingClientRect().height
      this.cellExpansion.mouseDownStartY = e.y
    } 
  }

  expCol(e: any){
    if (this.mouseDown == true){
      if (e.x > this.cellExpansion!.mouseDownStartX! ){
        let d = e.x - this.cellExpansion!.mouseDownStartX!
        let w = this.cellExpansion!.mouseDownStartWidth! + d
        if(this.cellExpansion!.mouseDownElement.children[0] != undefined){
          this.cellExpansion!.mouseDownElement.children[0].style.width = `${w}px`
        }
        
      }else{
        let d = this.cellExpansion!.mouseDownStartX! - e.x
        let w = this.cellExpansion!.mouseDownStartWidth! - d
        if (w > minCellWidth){
          if(this.cellExpansion!.mouseDownElement.children[0] != undefined){
            this.cellExpansion!.mouseDownElement.children[0].style.width = `${w}px`
          }
        }
      }
    }
  }

  expRow(e: any){
    if (this.mouseDown == true){
      if (e.y > this.cellExpansion!.mouseDownStartY! ){
        let d = e.y - this.cellExpansion!.mouseDownStartY!
        let h = this.cellExpansion!.mouseDownStartHeight! + d

        if(this.cellExpansion!.mouseDownElement.children[0] != undefined){
          this.cellExpansion!.mouseDownElement.children[0].style.height = `${h}px`
        }
      }else{
        let d = this.cellExpansion!.mouseDownStartY! - e.y
        let h = this.cellExpansion!.mouseDownStartHeight! - d
        if (h >= minCellHeight){
          if(this.cellExpansion!.mouseDownElement.children[0] != undefined){
          this.cellExpansion!.mouseDownElement.children[0].style.height = `${h}px`
        }
        }
      }
    }
  }

  stopExpRow(e: any){
      this.mouseDown = false
  }

  stopExpCol(e: any){
    this.mouseDown = false
  }

  startMouseDown(e: any, row: number, col: string) {
    const bounds = this.getRelativeBounds(e);
    this.resetHighligter();

    // Use bottom-right corner as starting point
    const startX = bounds.xBottom;
    const startY = bounds.yBottom;

    this.setHighligterTop(bounds.xTop, bounds.yTop, 0, 0);

    // store this point in sheet for later reference
    this.workbook.getActiveSheet()?.mouseDown(row, col, startX, startY);
  }

  mouseOverCell(e: any) {
    const sheet = this.workbook.getActiveSheet();
    if (!sheet?.hasMouseDown) return;

    const point = sheet.getHighlightPoint(); // {x, y} recorded on mousedown
    if (!point) return;

    const bounds = this.getRelativeBounds(e);

    // Compute bottom-right of current hover cell
    const curX = bounds.xBottom;
    const curY = bounds.yBottom;

    // Determine direction and take appropriate edges
    const x1 = Math.min(point.x, curX);
    const y1 = Math.min(point.y, curY);
    const x2 = Math.max(point.x, curX);
    const y2 = Math.max(point.y, curY);

    this.setHighligterAll(x1, y1, x2, y2, false);
  }

  isValidDate(value?: string): boolean {
    return isValidISODate(value);
  }

  // startMouseDown(e: any, row: number, col: string) {
  //   let bounds = this.getRelativeBounds(e)
  //   this.resetHighligter()
    
  //   let drag = this.dragDirection(bounds);

  //   //this.setHighligterTop(bounds.xTop, bounds.yTop)
  //   this.setHighligterTop(drag.x, drag.y)

  //   //this.workbook.getActiveSheet()?.unhighlightCells()
  //   this.workbook.getActiveSheet()?.mouseDown(row, col, drag.x, drag.y)
  // }

  // mouseOverCell(e: any) {
  //   const sheet = this.workbook.getActiveSheet();
  //   if (!sheet?.hasMouseDown) return;

  //   const point = sheet.getHighlightPoint();
  //   if (!point) return;

  //   const bounds = this.getRelativeBounds(e);

  //   let drag = this.dragDirection(bounds);
  //   this.setHighligterAll(point.x, point.y, drag.up? drag.x : bounds.xTop, drag.left? drag.y : bounds.yTop, false);
  // }

  mouseUp(e: any, row: number, col: string) {
    this.workbook.getActiveSheet()?.setHighlightedLimit(row, col)
  }

  getRelativeBounds(e: any): DraggingRect {
    const cellRect = (e.target as HTMLElement).getBoundingClientRect();
    const containerRect = this.container.nativeElement.getBoundingClientRect();

    // Compute relative positions
    const xTop = cellRect.left - containerRect.left;
    const yTop = cellRect.top - containerRect.top;
    const xBottom = cellRect.right - containerRect.left;
    const yBottom = cellRect.bottom - containerRect.top;
    return { xTop, yTop, xBottom, yBottom }
  }

  dragDirection(bounds: DraggingRect): DragDirection{
    // Determine drag direction
    const draggingUp = (bounds.yBottom - bounds.yTop) < 0;
    const draggingLeft = (bounds.xBottom - bounds.xTop) < 0;

    // Apply direction-aware corrections
    const y = draggingUp ? bounds.yTop - 1 : bounds.yBottom;
    const x = draggingLeft ? bounds.xTop - 1 : bounds.xBottom;

    return { x: x, y: y, up: draggingUp, left: draggingLeft}
  }

  private setHighligterAll(xTop: number, yTop: number, xBottom: number, yBottom: number, isClick: boolean) {
    let left = Math.min(xTop, xBottom);
    let top = Math.min(yTop, yBottom);
    let width = Math.abs(xBottom - xTop + 2);
    let height = Math.abs(yBottom - yTop + 2);

    this.setHighligterTop(top, left, width, height)

    if (isClick){
      this.lighter.nativeElement.style.backgroundColor = `transparent`
    }else{
      this.lighter.nativeElement.style.backgroundColor = `#0000001a`
    }
    this.lighter.nativeElement.style.width = `${width}px`
    this.lighter.nativeElement.style.height = `${height}px`
  }

  private setHighligterTop(xTop: number, yTop: number, width: number, height: number) {
    this.lighter.nativeElement.style.display = "block"
    this.lighter.nativeElement.style.top = `${xTop - 1}px`
    this.lighter.nativeElement.style.left = `${yTop - 1}px`
    this.lighter.nativeElement.style.width = `${width + 2}px`
    this.lighter.nativeElement.style.height = `${height + 2}px`
  }

  private resetHighligter() {
    this.lighter.nativeElement.style.top = 0
    this.lighter.nativeElement.style.display = "none"
    this.lighter.nativeElement.style.left = 0
    this.lighter.nativeElement.style.width = 0
    this.lighter.nativeElement.style.height = 0
  }
}
