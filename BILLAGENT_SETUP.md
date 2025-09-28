# BillAgent Integration Setup

This application integrates with BillAgent using the `@billagent/usage-events` SDK on the server side.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# BillAgent Configuration
# Get your API key from https://billagent.ai
BILLAGENT_API_KEY=your_api_key_here
BILLAGENT_BASE_URL=https://api.billagent.ai
```

## Setup Steps

1. **Get your API key** from [billagent.ai](https://billagent.ai)
2. **Create `.env.local`** file with your API key
3. **Restart the development server** after adding environment variables

## Usage

The Usage Event Simulator page allows you to test sending events to BillAgent:

- Navigate to `/usage-event-simulator`
- Fill out the form with event details
- Click "Send Usage Event" to test the integration

## API Endpoint

The server-side API endpoint is available at:
- `POST /api/usage-events` - Send usage events to BillAgent
- `GET /api/usage-events` - Check API status

## Security

- API key is kept on the server side only
- No sensitive data is exposed to the client
- All BillAgent communication happens server-side
