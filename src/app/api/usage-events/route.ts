import { NextRequest, NextResponse } from 'next/server';
import * as UsageEvents from '@billagent/usage-events';

// Configure the BillAgent API client - you can set these using the .env file
const configuration = new UsageEvents.Configuration({
  basePath: process.env.BILLAGENT_BASE_URL || 'https://us-public.billagent.io',
  apiKey: process.env.BILLAGENT_API_KEY || '',
});

// Create the API instance
const usageEventsApi = new UsageEvents.UsageEventsApi(configuration);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sku_id, contract_uuid, event_time, request_type, count } = body;

    // Validate required fields
    if (!sku_id) {
      return NextResponse.json(
        { error: 'sku_id is required' },
        { status: 400 }
      );
    }

    if (!contract_uuid) {
      return NextResponse.json(
        { error: 'contract_uuid is required' },
        { status: 400 }
      );
    }

    if (!request_type) {
      return NextResponse.json(
        { error: 'request_type is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.BILLAGENT_API_KEY) {
      return NextResponse.json(
        { error: 'BillAgent API key not configured. Please set BILLAGENT_API_KEY environment variable.' },
        { status: 400 }
      );
    }

    // Prepare the usage event request
    const usageEventRequest: UsageEvents.V1IntakeUsageEventRequest = {
      sku_id,
      contract_uuid,
      event_time: event_time || new Date().toISOString(),
      request_type,
      count: count || '1'
    };

    // Send the usage event to BillAgent
    const response = await usageEventsApi.usageTermMatcherServiceIntakeUsageEvent(usageEventRequest);

    return NextResponse.json({
      success: true,
      message: 'Usage event processed successfully',
      data: {
        term_matches: response.data.term_matches,
        term_match_errors: response.data.term_match_errors
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing usage event:', error);
    
    // Handle specific API errors
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as any;
      const status = axiosError.response?.status;
      
      // Handle 403 Unauthorized specifically
      if (status === 403) {
        return NextResponse.json(
          { 
            error: 'Unauthorized',
            details: 'Check your api key, this key is not valid or is not authorized to use the usage events api',
            status: 403
          },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'BillAgent API error',
          details: axiosError.response?.data?.message || axiosError.message,
          status: status
        },
        { status: status || 500 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to process usage event',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'BillAgent Usage Events API',
    status: 'active',
    version: '1.0.0'
  });
}
