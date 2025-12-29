# Status Kitchen Cookbook

A web application for browsing and installing Status Kitchen recipes for GNOME Shell extensions.

## About

Status Kitchen Cookbook is the official web interface for discovering and installing recipes created for [Status Kitchen](https://github.com/keithvassallomt/statuskitchen), a GNOME Shell extension that allows users to customize their top panel with custom widgets and indicators.

## Features

- Browse available recipes with search and tag filtering
- View recipe details including screenshots, author info, and GNOME Shell version compatibility
- One-click installation via the `statuskitchen://` protocol handler
- Responsive design with dark mode support
- Server-side rendering for fast initial page loads

## Tech Stack

- [SvelteKit](https://svelte.dev/docs/kit) - Full-stack web framework
- [Svelte 5](https://svelte.dev) - UI framework with runes
- [Skeleton UI](https://www.skeleton.dev) - UI component library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [SST](https://sst.dev) - Infrastructure as code for AWS deployment

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run check
```

### Building

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Related Projects

- [Status Kitchen](https://github.com/keithvassallomt/statuskitchen) - The GNOME Shell extension
- [Status Kitchen Recipes](https://github.com/keithvassallomt/statuskitchen-recipes) - Community recipe repository

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

To contribute recipes, visit the [statuskitchen-recipes](https://github.com/keithvassallomt/statuskitchen-recipes) repository.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
