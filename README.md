# Teacher's Day Contribution Dashboard

A beautiful, dynamic web application to track and display student contributions, wishes, and statistics for Teacher's Day celebrations. The app reads data in real-time from a published Google Sheet CSV and visualizes it using React and Tailwind CSS.

## Features

- **Live Data**: Fetches and parses contribution data directly from a Google Sheet CSV.
- **Statistics & Progress**: Tracks collection progress against a target amount.
- **Coordinator Breakdown**: Displays a comparative breakdown of collections managed by student coordinators.
- **Wishes Wall**: A masonry layout to display heartfelt messages left by students.
- **Hall of Fame**: A searchable, paginated table of all contributors.

## Tech Stack

- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PapaParse](https://www.papaparse.com/) (CSV Parsing)
- [Lucide React](https://lucide.dev/) (Icons)

## Setup & Running Locally

**Prerequisites:** Node.js installed on your machine.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root of the project and set your Google Sheet CSV URL:
   ```env
   VITE_GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv
   ```
   *(Ensure your Google Sheet is published to the web as a CSV).*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Author
Made by [Jaysmita](https://github.com/leesmiita-glitch)
