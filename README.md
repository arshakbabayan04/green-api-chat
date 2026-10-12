# GREEN-API Chat

A minimalist responsive chat application built with React and TypeScript, using GREEN-API for messaging.

## Live Demo

[Open the application](YOUR_VERCEL_URL)

## Features

- Send text messages
- Receive incoming text messages
- Responsive chat interface
- Telegram integration through GREEN-API
- User-provided API credentials and recipient chat ID

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- GREEN-API

## Getting Started

### Prerequisites

- Node.js and npm
- GREEN-API instance credentials
- A Telegram chat ID supported by the configured integration

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd YOUR_PROJECT_DIRECTORY
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in the terminal.

## Usage

1. Enter your GREEN-API instance ID.
2. Enter your API token.
3. Enter the recipient's Telegram chat ID.
4. Open the chat and send a text message.

## Known Limitations

### API Availability

During final testing, the GREEN-API returned error 466, and I was unable to access my account to continue testing. The exact cause of the issue could not be confirmed.

Sending and receiving text messages worked during earlier tests, but I could not complete a final end-to-end verification.

### Recipient Identification

The current implementation uses a Telegram chat ID instead of a phone number. Based on the documentation consulted for the initial integration, the phone-number-based approach available to me was limited to Russian and Belarusian numbers. Since I could not use a number from either country, I implemented chat ID-based recipient identification for my Telegram setup.

Replacing chat ID-based identification with phone-number-based identification should be a straightforward extension, provided the selected integration supports the required phone-number format and recipient lookup method.

## Notes

The API credentials are entered by the user in the application. Do not commit real API tokens or other sensitive credentials to the repository.
