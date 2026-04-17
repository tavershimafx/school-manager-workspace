import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(private http: HttpClient) { }

    downloadFromUrl(url: string) {
        this.dFile(url).subscribe((blob) => {
            const a = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.target = "_blank"
            a.click();
            URL.revokeObjectURL(objectUrl);
        });
    }

    downloadFile(response: HttpResponse<Blob>) {
        const blob = response.body;
        if (!blob) return;

        const contentDisposition = response.headers.get('Content-Disposition')?? response.headers.get('content-disposition');
        // Try to get filename from Content-Disposition header
        let filename = this.extractFilename(contentDisposition);
        
        // Create a temporary URL
        const url = window.URL.createObjectURL(blob);

        // Trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Revoke URL
        window.URL.revokeObjectURL(url);
    }

    downloadLocalFile(url: string) {
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank"
        a.click();
    }

    downloadCsv(data: string[], filename: string) {
        const csvContent = data.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', `${filename}.csv`);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }


    private dFile(url: string): Observable<Blob> {
        return this.http.get(url, { responseType: 'blob' });
    }

    private extractFilename(contentDisposition: string | null): string {
        if (!contentDisposition) return "downloaded-file";

        // Check for RFC5987 format: filename*=UTF-8''student-list.pdf
        const filenameStarMatch = contentDisposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
        if (filenameStarMatch && filenameStarMatch[1]) {
            return decodeURIComponent(filenameStarMatch[1]);
        }

        //Fallback to regular filename="student-list.pdf"
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
        if (filenameMatch && filenameMatch[1]) {
            return filenameMatch[1];
        }

        return "downloaded-file";
    }

}