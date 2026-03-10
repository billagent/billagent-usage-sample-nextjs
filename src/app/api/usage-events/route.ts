import { NextRequest, NextResponse } from 'next/server';
import type { V1IntakeEventRequest } from '@billagent/usage-events';
import * as UsageEvents from '@billagent/usage-events';

// Configure the BillAgent API client - you can set these using the .env file
const configuration = new UsageEvents.Configuration({
  basePath: process.env.BILLAGENT_BASE_URL || 'https://us-public.billagent.io',
  apiKey: process.env.BILLAGENT_API_KEY || '',
});

// New unified API (0.11.5+): one intake method for both milestone and usage events
const usageEventsApi = new UsageEvents.UsageEventsApi(configuration);

/** Our request body: milestone or usage event. */
type MilestoneEventBody = {
  event_type: 'milestone';
  contract_uuid: string;
  phase: string;
  event_time?: string;
};

type UsageEventBody = {
  event_type: 'usage';
  contract_uuid: string;
  sku_id: string;
  count?: string;
  event_time?: string;
};

type EventBody = MilestoneEventBody | UsageEventBody;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as EventBody & Record<string, unknown>;

    const event_type = body.event_type ?? 'usage';

    if (!body.contract_uuid) {
      return NextResponse.json(
        { error: 'contract_uuid is required' },
        { status: 400 }
      );
    }

    if (!process.env.BILLAGENT_API_KEY) {
      return NextResponse.json(
        { error: 'BillAgent API key not configured. Please set BILLAGENT_API_KEY environment variable.' },
        { status: 400 }
      );
    }

    const event_time = (body.event_time as string) || new Date().toISOString();

    let intakeRequest: V1IntakeEventRequest;

    if (event_type === 'milestone') {
      const phase = (body as MilestoneEventBody).phase;
      if (!phase || typeof phase !== 'string') {
        return NextResponse.json(
          { error: 'phase is required for milestone events' },
          { status: 400 }
        );
      }
      intakeRequest = {
        contract_uuid: body.contract_uuid,
        event_time,
        milestone_event_match: { phase_id: phase },
      };
    } else {
      const usageBody = body as UsageEventBody;
      const { sku_id, count } = usageBody;
      if (!sku_id) {
        return NextResponse.json(
          { error: 'sku_id is required for usage events' },
          { status: 400 }
        );
      }
      intakeRequest = {
        contract_uuid: usageBody.contract_uuid,
        event_time,
        usage_event_match: {
          sku_id,
          count: count || '1',
        },
      };
    }

    const response = await usageEventsApi.termMatcherServiceIntakeEvent(intakeRequest);

    return NextResponse.json({
      success: true,
      message: event_type === 'milestone' ? 'Milestone event processed successfully' : 'Usage event processed successfully',
      data: {
        term_matches: response.data.term_matches,
        term_match_errors: response.data.term_match_errors,
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error processing usage event:', error);

    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: { status?: number; data?: unknown };
        message?: string;
      };
      const status = axiosError.response?.status ?? 500;
      const apiBody = axiosError.response?.data;

      // Single-line summary for details; full API body for validation reasons etc.
      const detailsSummary =
        typeof apiBody === 'object' && apiBody !== null && 'message' in apiBody
          ? String((apiBody as { message?: unknown }).message)
          : axiosError.message || 'Unknown';

      if (status === 403) {
        return NextResponse.json(
          {
            error: 'Unauthorized',
            details: detailsSummary,
            status: 403,
            api_response: apiBody,
          },
          { status: 403 }
        );
      }

      // Pass through full API error body so the client can show validation reasons
      return NextResponse.json(
        {
          error: 'BillAgent API error',
          details: detailsSummary,
          status,
          api_response: apiBody,
        },
        { status }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to process usage event',
        details: error instanceof Error ? error.message : 'Unknown error',
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
