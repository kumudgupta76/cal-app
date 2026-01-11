# Calendar App

A mobile-first calendar web application with event management.

## Features

- 📱 **Mobile-first design** - Optimized for touch devices with swipe navigation
- 📅 **Monthly calendar view** - Navigate between months easily
- ✨ **Event management** - Add and delete events for any day
- 💾 **Local storage** - Events persist in your browser
- 🌙 **Dark mode support** - Automatically adapts to system preferences
- ♿ **Accessible** - Built with accessibility in mind

## Usage

### Navigation
- Use the arrow buttons or swipe left/right to change months
- Click "Today" to jump to the current date
- Click on any day to view or add events

### Events
- Click on a day to open the event modal
- Type an event and press Enter or click "Add"
- Click the × button next to an event to delete it

## Deployment

This project is configured to deploy automatically to GitHub Pages.

### Setup GitHub Pages

1. Push this code to a GitHub repository
2. Go to repository **Settings** → **Pages**
3. Under "Build and deployment", select **GitHub Actions** as the source
4. Push to the `main` branch to trigger deployment

### Manual Deployment

You can also trigger a deployment manually:
1. Go to the **Actions** tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

## Tech Stack

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- LocalStorage API

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
