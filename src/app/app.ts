import { Component, OnInit, signal } from '@angular/core';

declare const cloudinary: any;

interface UploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly cloudName = 'hzxyensd5';
  private readonly uploadPreset = 'aoh4fpwm';

  private widget: any;

  uploads = signal<UploadResult[]>([]);
  isOpen = signal(false);

  ngOnInit(): void {
    this.widget = cloudinary.createUploadWidget(
      {
        cloudName: this.cloudName,
        uploadPreset: this.uploadPreset,
        sources: ['local', 'url', 'camera'],
        multiple: true,
        // cropping: true,                          // add a cropping step
        // showAdvancedOptions: true,               // add advanced options (public_id and tag)
        // folder: 'user_images',                   // upload files to the specified folder
        // tags: ['users', 'profile'],              // add the given tags to the uploaded files
        // context: { alt: 'user_uploaded' },       // add the given context data to the uploaded files
        // clientAllowedFormats: ['images'],        // restrict uploading to image files only
        // maxImageFileSize: 2000000,               // restrict file size to less than 2MB
        // maxImageWidth: 2000,                     // scales the image down to a width of 2000 pixels before uploading
        // theme: 'purple',                         // change to a purple theme
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1'
          }
        }
      },
      (error: any, result: any) => {
        this.isOpen.set(false);
        if (error) {
          console.error('Upload error:', error);
          return;
        }
        if (result?.event === 'success') {
          this.uploads.update(prev => [result.info as UploadResult, ...prev]);
        }
      }
    );
  }

  openWidget(): void {
    this.isOpen.set(true);
    this.widget.open();
  }

  formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
