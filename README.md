# B2B Sales Cycle Flowchart Application

An interactive web application that visualizes your B2B sales cycle data from Coda as a beautiful, navigable flowchart.

## Features

- ?? **Interactive Flowchart**: Visual representation of your sales cycle steps
- ?? **High-Level Overview**: Key information visible at a glance
- ?? **Detailed View**: Click any step to see complete details
- ?? **Modern UI**: Beautiful, responsive design with smooth animations
- ? **Real-time Data**: Fetches data directly from your Coda database
- ?? **Responsive**: Works on desktop and mobile devices

## Setup

### 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
CODA_API_KEY=your_coda_api_key_here
CODA_DOC_ID=your_document_id_here
CODA_TABLE_ID=your_table_id_here
```

**How to get these values:**

- **CODA_API_KEY**: Go to https://coda.io/account and generate an API token
- **CODA_DOC_ID**: Found in your Coda document URL: `https://coda.io/d/_d{DOC_ID}`
- **CODA_TABLE_ID**: Found in the table settings or URL when viewing the table

### 2. Coda Table Structure

Your Coda table should include columns for your sales cycle steps. The app will automatically detect and use common field names:

**Recommended column names** (the app looks for these):
- **Name/Title/Step/Stage**: The name of the sales cycle step
- **Description/Details/Summary**: Brief description of the step
- **Step/Order/Number/Sequence**: The order/sequence number of the step

**Additional columns**: Any additional columns in your table will be displayed in the detail panel when you click on a step.

### 3. Deploy

#### Option A: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `CODA_API_KEY`, `CODA_DOC_ID`, and `CODA_TABLE_ID`

#### Option B: Local Development

1. Install a local server (if needed):
   ```bash
   npm install -g http-server
   ```

2. For local development with the API, you'll need to set up environment variables and run a local Vercel dev server:
   ```bash
   vercel dev
   ```

## Usage

1. Open the application in your browser
2. The flowchart will automatically load your sales cycle data
3. Navigate through the steps using the flowchart controls (zoom, pan)
4. Click on any step to view detailed information in the side panel
5. Close the detail panel by clicking the ? button

## Customization

### Styling

Edit the `<style>` section in `index.html` to customize:
- Colors (currently using purple gradient theme)
- Font sizes and families
- Spacing and layout
- Node appearance

### Data Mapping

The app automatically detects field names, but you can customize the mapping in the `transformDataToFlowchart` function if your Coda table uses different column names.

### Layout

The flowchart uses an automatic vertical layout by default. You can customize node positions in the `transformDataToFlowchart` function.

## Troubleshooting

### No data showing
- Check that environment variables are set correctly
- Verify your Coda API key has access to the document
- Check browser console for error messages

### Flowchart not rendering
- Ensure you have an internet connection (CDN resources needed)
- Check browser console for JavaScript errors
- Verify the table has data

### API errors
- Check that the document and table IDs are correct
- Verify the API key is valid and has proper permissions
- Check Vercel function logs for detailed error messages

## Technology Stack

- **Frontend**: React 18, ReactFlow 11
- **Backend**: Vercel Serverless Functions
- **API**: Coda API v1
- **Styling**: Custom CSS with modern design

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
