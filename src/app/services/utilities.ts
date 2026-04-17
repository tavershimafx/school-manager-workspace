
import { FormGroup } from "@angular/forms";
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


export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${size} ${units[i]}`;
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


export function startCountdown(durationInSeconds: number): Observable<{h: string, m: string, s: string}> {
  let remaining = durationInSeconds;
  let h = "00";
  let m = "00";
  let s = "00";
  return new Observable<{h: string, m: string, s: string}>(sub => {

    const interval = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(interval);
        h = "00";
        m = "00";
        s = "00";
        sub.next({h: h, m: m, s: s})
        sub.complete();
        return
      }

      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;

      h = (hours < 0 ? 0 : hours).toString().padStart(2, "0");
      m = (minutes < 0 ? 0 : minutes).toString().padStart(2, "0");
      s = (seconds < 0 ? 0 : seconds).toString().padStart(2, "0");

      sub.next({h: h, m: m, s: s})
      remaining--;
    }, 1000);
  })
}

export function getValidationMessages(errors:any): string[] {
    let messages: string[] = [];
    if (errors) {
      for (let errorName in errors) {
        switch (errorName) {
          case "required":
          case "email":
            messages.push(`Please enter a value`);
            break;
          case "min":
            messages.push(`Value must be at least ${errors['minlength'].requiredLength} characters long`);
            break;
          case "minlength":
            messages.push(`Value must be at least ${errors['minlength'].requiredLength} characters long`);
            break;
          case "max":
            messages.push(`Value must be not more than ${errors['maxlength'].requiredLength} characters long`);
            break;
          case "maxlength":
            messages.push(`Value must be not more than ${errors['maxlength'].requiredLength} characters long`);
            break;
          case "pattern":
            messages.push(`The input contains unwanted characters`);
            break;
          case "comparison":
            messages.push(`The input does not match with the previous value`);
            break;
          case "number":
            messages.push(`Value must be a number`);
            break;
          default:
            messages.push(`Invalid control value`);
        }
      }
    }
    return messages;
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

export function formatMoney(x: string | Number): string{
  return Number(x).toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}