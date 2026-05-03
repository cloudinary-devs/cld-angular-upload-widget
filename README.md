# Cloudinary Upload Widget — Angular Example

A minimal Angular 21 app demonstrating how to integrate the [Cloudinary Upload Widget](https://cloudinary.com/documentation/upload_widget) using plain JavaScript (no Angular SDK required).

## What this demo covers

- Loading the Upload Widget from Cloudinary's CDN
- Creating the widget once in `ngOnInit` with `cloudinary.createUploadWidget()`
- Opening the widget on button click with `widget.open()`
- Handling the result callback to capture successful uploads
- Displaying uploaded files in a reactive gallery using Angular signals

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- Angular CLI (`npm install -g @angular/cli`)
- A Cloudinary account — [sign up free](https://cloudinary.com/users/register_free)

## Getting started

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-org/cld-angular-upload-widget.git
   cd cld-angular-upload-widget
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the demo as-is, or use your own credentials**

   The app is pre-configured with a working cloud name and unsigned upload preset so it runs immediately out of the box. When you're ready to use your own Cloudinary account, open `src/app/app.ts` and update the two constants at the top of the class:

   ```typescript
   private readonly cloudName = 'your_cloud_name';
   private readonly uploadPreset = 'your_upload_preset';
   ```

   > Your upload preset must be set to **unsigned** in your Cloudinary console under **Settings → Upload → Upload presets**.

4. **Run the app**

   ```bash
   npm start
   ```

   Open [http://localhost:4200](http://localhost:4200) in your browser.

## How it works

The Upload Widget script is loaded globally in `src/index.html`:

```html
<script src="https://upload-widget.cloudinary.com/latest/global/all.js" type="text/javascript"></script>
```

The widget is created once in `ngOnInit` and reused on every button click:

```typescript
this.widget = cloudinary.createUploadWidget(
  { cloudName: this.cloudName, uploadPreset: this.uploadPreset },
  (error, result) => {
    if (!error && result?.event === 'success') {
      this.uploads.update(prev => [result.info, ...prev]);
    }
  }
);
```

## Configuration options

`src/app/app.ts` includes a set of commented-out options you can uncomment to explore widget features:

| Option | Description |
|---|---|
| `cropping: true` | Adds an interactive crop step before upload |
| `showAdvancedOptions: true` | Exposes public ID and tag fields |
| `folder: 'user_images'` | Uploads into a specific folder |
| `tags: ['users', 'profile']` | Applies tags to every uploaded asset |
| `context: { alt: 'user_uploaded' }` | Attaches structured context metadata |
| `clientAllowedFormats: ['images']` | Restricts uploads to image files |
| `maxImageFileSize: 2000000` | Rejects files larger than 2 MB |
| `maxImageWidth: 2000` | Downscales images to 2000 px before upload |
| `theme: 'purple'` | Switches to the built-in purple theme |

Full configuration reference: [Upload Widget parameters](https://cloudinary.com/documentation/upload_widget_reference)

## Project structure

```
src/
├── index.html          # Loads the Upload Widget script from CDN
├── styles.css          # Global reset
└── app/
    ├── app.ts          # Widget creation, upload callback, signals
    ├── app.html        # Template with upload button and results gallery
    └── app.css         # Component styles
```

## Resources

- [Upload Widget documentation](https://cloudinary.com/documentation/upload_widget)
- [Upload Widget reference](https://cloudinary.com/documentation/upload_widget_reference)
- [Angular integration guide](https://cloudinary.com/documentation/angular_image_and_video_upload)
- [Cloudinary Console](https://console.cloudinary.com/)
