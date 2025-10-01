# BillAgent Sample Application Setup

This application integrates with BillAgent using the `@billagent/usage-events` node typescript SDK integrated with server side routes in this application. We have SDKs and other sample applications written in Python, Java, and Go available on our Github page. 

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# BillAgent Configuration
# Get your API key from https://billagent.ai
BILLAGENT_API_KEY=your_api_key_here
BILLAGENT_BASE_URL=https://us-public.billagent.io
```

## Requirements

1. **Node.js** - Version 18.17 or later (recommended: 20.x LTS)
2. **Package Manager** - npm, yarn, or pnpm
3. **BillAgent API Key** - Get your free API key from [billagent.ai](https://billagent.ai)
4. **Internet Connection** - Required for BillAgent API communication

### Steps to configure and run this application locally

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd billagent-usage-sample-nextjs
   ```
2. **Get your API key** from [billagent.ai](https://billagent.ai)

3. **Add the API key to `.env`** file with your API key
   
4. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

5. **Start the development server** by running:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your web browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

The Usage Event Simulator page allows you to test sending events to BillAgent:

- Navigate to `/getting-started` and read the instructions on how to take in new contracts and send usage events.

## API Endpoint

The server-side API endpoint is available at:
- `POST /product/usage-events` - Send usage events to BillAgent

This api was created using OpenAPI and the specification is available to download from our developer documentation site.

## Security

- API key is kept on the server side only
- No sensitive data is exposed to the client
- All BillAgent communication happens server-side
