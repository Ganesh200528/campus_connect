
# CampusConnect

A B2B recruitment coordination platform where company HR teams and college TPOs communicate and plan campus recruitment drives.

## Prerequisites
- Node.js (v20+)

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open the app in your browser (usually `http://localhost:5173`).

## Backend Integration
Currently, the application uses mock data persisted in `localStorage`. 
All data operations are centralized in `src/api/index.js`. 

To integrate with a real backend (e.g., FastAPI + PostgreSQL):
1. Navigate to `src/api/index.js`.
2. Replace the local state mutations with `fetch` or `axios` calls to your FastAPI endpoints.
3. Remove the `localStorage` setup in `src/context/DataContext.jsx`.

## Authentication (Mock)
The login screen provides a mock authentication flow. You can select your role (Company, College, or Admin) and use any email/password to log in.

## Features
- **Company Dashboard**: Track sent requests, view scheduled drives.
- **College Dashboard**: Review incoming requests from companies.
- **Profiles**: View and edit detailed company and college profiles.
- **Drive Scheduling**: Coordinate interview dates and assessment rounds.
- **Contextual Chat**: Secure 2-pane chat tied to specific recruitment requests.
- **Admin Verification**: Built-in panel for verifying or rejecting profiles.

