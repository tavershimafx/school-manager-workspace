
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { Pagination, SmartTableResult } from "@models/app.models";
import { Observable } from "rxjs";

/**
   * Determines if a point @param px @param py is within the area of the points
   * given in the parameters. Area for calculating if a point is in bound is
   * given by
   * @param top 
   * @param left 
   * @param bottom 
   * @param right 
   * @param px The x point of interest in the cartesian plane
   * @param py The y point of interest in the cartesian plane
   * @returns 
   */
export function isInbound(top: number, left: number, bottom: number, right: number, px: number, py: number) {
  let p1: Point = { x: left, y: top }
  let p2: Point = { x: right, y: top }
  let p3: Point = { x: right, y: bottom }
  let p4: Point = { x: left, y: bottom }

  // p1---------------p2
  // |                |
  // |                |
  // |                |
  // p4---------------p3
  return (px >= p1.x && px <= p2.x && px <= p3.x && px >= p4.x) &&
    (py >= p1.y && py >= p2.y && py <= p3.y && py <= p4.y)
}

export interface Point {
  x: number
  y: number
}

export function generateBrightColors(count: number): string[] {
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    const hue = Math.floor(Math.random() * 360);     // 0–360
    const saturation = 70 + Math.random() * 30;      // 70–100%
    const lightness = 45 + Math.random() * 20;       // 45–65%

    colors.push(hslToHex(hue, saturation, lightness));
  }

  return colors;
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));

  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}


export function addMinutesToDate(dateStr: Date | undefined, minutes: number): string {
  if (dateStr == undefined)
    return ""

  // Parse the input date string into a Date object
  const date = new Date(dateStr);

  // Add the minutes
  date.setMinutes(date.getMinutes() + minutes);

  // Extract hours and minutes
  let hours = date.getHours();
  const mins = date.getMinutes();

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  if (hours === 0) hours = 12;

  // Pad minutes with leading zero if needed
  const minsStr = mins.toString().padStart(2, "0");

  return `${hours}:${minsStr} ${ampm}`;
}


export function startCountdown(durationInSeconds: number): Observable<{ h: string, m: string, s: string }> {
  let remaining = durationInSeconds;
  let h = "00";
  let m = "00";
  let s = "00";
  return new Observable<{ h: string, m: string, s: string }>(sub => {

    const interval = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(interval);
        h = "00";
        m = "00";
        s = "00";
        sub.next({ h: h, m: m, s: s })
        sub.complete();
        return
      }

      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;

      h = (hours < 0 ? 0 : hours).toString().padStart(2, "0");
      m = (minutes < 0 ? 0 : minutes).toString().padStart(2, "0");
      s = (seconds < 0 ? 0 : seconds).toString().padStart(2, "0");

      sub.next({ h: h, m: m, s: s })
      remaining--;
    }, 1000);
  })
}

export function getValidationMessages(errors: any): string {
  if (errors) {
    for (let errorName in errors) {
      switch (errorName) {
        case "required":
        case "email":
          return `Please enter a value`
        case "min":
          return `Value must be at least ${errors['minlength'].requiredLength} characters long`
        case "minlength":
          return `Value must be at least ${errors['minlength'].requiredLength} characters long`
        case "max":
          return `Value must be not more than ${errors['maxlength'].requiredLength} characters long`
        case "maxlength":
          return `Value must be not more than ${errors['maxlength'].requiredLength} characters long`
        case "pattern":
          return `The input contains unwanted characters`
        case "comparison":
          return `The input value does not match with the confirmation value`
        case "number":
          return `Value must be a number`
        case "hasNumber":
          return `Value must have at least one number`
        case "hasUpperCase":
          return `Value must have at least one upper case letter`
        case "hasLowerCase":
          return `Value must have at least one lower case letter`
        case "hasSymbol":
          return `Value must have at least one special character`
        default:
          return `Invalid control value`
      }
    }
  }
  return ""
}


export function toFormData(formGroup: FormGroup): FormData {
  const formData = new FormData();
  const raw = formGroup.getRawValue();//

  Object.entries(raw).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value); // file upload
    } else if (Array.isArray(value) || typeof value === 'object') {
      formData.append(key, JSON.stringify(value)); // complex type
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  });

  return formData;
}

export function formatMoney(x: string | Number): string {
  return Number(x).toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function generatePagination(model: SmartTableResult<any>): Pagination[] {
  const pagination: Pagination[] = [];
  if (!model) return pagination

  const {
    currentPage,
    totalPages
  } = model;

  // Always show first page
  if (currentPage > 3) {
    pagination.push({ label: '1', page: 1, disabled: currentPage != 1 });
  }

  // Add "..." before current window if needed
  if (currentPage > 4) {
    pagination.push({ label: '...', page: null, disabled: true });
  }

  // Show current page range (dynamic window)
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pagination.push({
      label: i.toString(),
      page: i,
      disabled: i === currentPage
    });
  }

  // Add "..." after current window if needed
  if (currentPage < totalPages - 3) {
    pagination.push({ label: '...', page: null, disabled: true });
  }

  // Always show last page
  if (currentPage < totalPages - 2) {
    pagination.push({
      label: totalPages.toString(),
      page: totalPages,
      disabled: false
    });
  }

  return pagination;
}

export function openHtmlInNewWindow(html: string) {
  // TrustedTypePolicyFactory.createPolicy()
  // const policy = trustedType.createPolicy("docPolicy", {
  //   createHTML(str: string) {
  //     return str
  //       .replace("<script", "&lt;script")
  //       .replace("</script", "&lt;/script");
  //   },
  // });

  const newWindow = window.open('', '_blank');

  if (!newWindow) {
    alert("Popup blocked! Allow popups for this site.");
    return;
  }


  newWindow.document.open();
  //newWindow.document.write(policy.createHTML("<p>in with the new!</p>"));
  newWindow.document.write(`${html}`)
  newWindow.document.close();
}



/**
 * Converts the zero based index of a column position to its corresponding column label
 * e.g 27 -> AB
 * @param index The zero based index of the column
 * @returns A column label corresponding to the cell column position in the table
 */
export function colFromIndex(index: number): string {
  index += 1
  let col = ""
  while (index > 0) {
    let remain = (index - 1) % 26
    col = String.fromCharCode(65 + remain) + col
    index = Math.floor((index - 1) / 26)
  }

  return col
}

/**
 * Computes to find the actual column index a row belongs to
 * e.g AA -> 26
 * @param col The alpha column identity
 * @returns a number representing the column index
 */
export function colToIndex(col: string): number {
  let c = 0;
  for (let i = 0; i < col.length; i++) {
    c = c * 26 + (col.charCodeAt(i) - 64); //65-90 A-Z
  }

  return c - 1; // zero based
}

/*
* Returns the column letters (e.g., "A", "AA", "BC")
*/
export function getColId(cid: string): string {
  const match = cid.match(/^[A-Z]+/i);
  return match ? match[0].toUpperCase() : '';
}

/*
 * Returns the row number (e.g., "1", "23", "5")
*/
export function getRowId(cid: string): string {
  const match = cid.match(/\d+$/);
  return match ? match[0] : '';
}


/**
 * Formats and returns a string representing the size of a file
 * @param bytes A number representing the size of the file in bytes
 * @returns 
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${size} ${units[i]}`;
}

/**
 * Parse a raw csv file into a 2D array of the records
 * @param text The csv string read from the file
 * @returns 
 */
export function parseCsvRaw(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      // Handle escaped quotes ("")
      if (insideQuotes && text[i + 1] === '"') {
        currentValue += '"';
        i++; // skip next
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      currentRow.push(currentValue);
      currentValue = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (currentValue || currentRow.length > 0) {
        currentRow.push(currentValue);
        rows.push(currentRow);
        currentRow = [];
        currentValue = "";
      }
    } else {
      currentValue += char;
    }
  }

  // Push last value if any
  if (currentValue || currentRow.length > 0) {
    currentRow.push(currentValue);
    rows.push(currentRow);
  }

  return rows;
}

export function getRootDomain(hostname: string): string {
  const parts = hostname.split('.');

  if (parts.length <= 2) return hostname;

  return parts.slice(-2).join('.');
}

export function toSentenceCase(text: string): string {
  if (!text) return '';

  // Replace underscores and hyphens with spaces
  let result = text.replace(/[-_]+/g, ' ');

  // Insert spaces before capital letters (for camelCase / PascalCase)
  result = result.replace(/([a-z])([A-Z0-9])/g, '$1 $2');

  // Collapse multiple spaces and trim
  result = result.replace(/\s+/g, ' ').trim();

  // Capitalize first letter
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function toSentenceCase1(word: string): string {
  if (!word) return '';

  return word
    // 1. Add a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // 2. Trim leading space and lowercase everything
    .trim()
    .toLowerCase()
    // 3. Capitalize only the very first letter
    .replace(/^./, (str) => str.toUpperCase());


  // Result: "App setting group"
  //console.log(toSentenceCase('AppSettingGroup')); 

}

// Better for acronyms: UserID -> "User id"
export function toSentenceCase2(word: string): string {
  const result = word.replace(/([A-Z]+)/g, " $1").trim();
  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}

// export function getInitials(name: string): string {
//   if (!name) return '';

//   return name
//     .trim()
//     .split(/\s+/)        
//     .map(word => word[0])
//     .join('')            
//     .toUpperCase();      
// }

export function getInitials(name: string): string {
  if (!name) return ""

  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];

  return (first + last).toUpperCase();
}

// Example: "Jerry Middle Samuel" -> "JS"


/**
 * ISO 8601 with offset
 * @param value 
 * @returns 
 */
export function isValidISODate(value?: string): boolean {
  const ISO_WITH_OFFSET_REGEX =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?([+-]\d{2}:\d{2}|Z)$/;

  if (!value) return false;
  if (!ISO_WITH_OFFSET_REGEX.test(value)) return false;

  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function getMoneyValueWithoutComma(val: string): string {
  return val.replaceAll(',', '')
}

export function isEmail(x: string): boolean {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(x);
}

export function isUrl(x: string): boolean {
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(x);
}

export function hasNumber(x: string): boolean {
  return /[0-9]/g.test(x);
}

export function hasLetter(x: string): boolean {
  return /[a-zA-Z]/g.test(x);
}

export function hasUpperCase(x: string): boolean {
  return /[A-Z]/g.test(x);
}

export function hasLowerCase(x: string): boolean {
  return /[a-z]/g.test(x);
}

export function hasSymbol(x: string): boolean {
  return /[^A-Za-z0-9\s]/.test(x); // \s ignores whitespace
}

declare global{
  interface String{
    hasNumber():boolean
  }
}

declare global{
  interface String{
    hasLetter():boolean
  }
}

declare global{
  interface String{
    hasUpperCase():boolean
  }
}

declare global {
  interface String {
    hasLength(length: number): boolean
  }
}

declare global {
  interface String {
    hasSymbol(): boolean
  }
}

declare global{
  interface String{
    hasLowerCase():boolean
  }
}

declare global {
  interface String {
    toSentenceCase(): string;
  }
}

declare global {
  interface Number {
    formatWithSuffix(): string
  }
}

String.prototype.hasLength = function(length: number):boolean { return (this as string).length >= length};
String.prototype.hasNumber = function():boolean { return hasNumber(this as string)};
String.prototype.hasLetter = function():boolean { return hasLetter(this as string)};
String.prototype.hasUpperCase = function():boolean { return hasUpperCase(this as string)};
String.prototype.hasLowerCase = function():boolean { return hasLowerCase(this as string)};
String.prototype.hasSymbol = function():boolean { return hasSymbol(this as string)};

String.prototype.toSentenceCase = function (): string {
  let text = this as string
  if (!text) return '';

  // Replace underscores and hyphens with spaces
  let result = text.replace(/[-_]+/g, ' ');

  // Insert spaces before capital letters (for camelCase / PascalCase)
  result = result.replace(/([a-z])([A-Z0-9])/g, '$1 $2');

  // Collapse multiple spaces and trim
  result = result.replace(/\s+/g, ' ').trim();

  // Capitalize first letter
  return result.charAt(0).toUpperCase() + result.slice(1);
}


Number.prototype.formatWithSuffix = function (): string {
  let num = this as number
  if (num == 0) return '0'

  if (num >= 1_000_000_000)
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  else if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  else if (num >= 1_000)
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  else
    return num.toFixed(0);
}

/**
 * Example usage:
 * shortenYear("2025/2026") -> "25/26"
 * @param academicYear e.g 2025/2026
 * @returns a short string for the academic year
 */
export function shortenYear(academicYear: string): string {
  return academicYear
    .split('/')
    .map(year => year.slice(-2))
    .join('/');
};

