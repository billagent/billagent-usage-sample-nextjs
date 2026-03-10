'use client';

import { useState } from 'react';
import PageStandard from "../../components/PageStandard";

type EventType = 'usage' | 'milestone';

export default function UsageEventSimulator() {
  const [eventType, setEventType] = useState<EventType>('usage');
  const [formData, setFormData] = useState({
    contract_uuid: '',
    sku_id: 'US-PRD-001',
    event_time: new Date().toISOString().slice(0, 16),
    count: '1',
    phase: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
    details?: string;
    status?: number;
    statusText?: string;
    fullError?: Record<string, unknown>;
    api_response?: unknown;
    data?: {
      term_matches?: Array<{
        sku_id: string;
        description: string;
        price: number;
        count: number;
      }>;
      term_match_errors?: unknown[];
    };
    message?: string;
    timestamp?: string;
  } | null>(null);
  const [showJsonView, setShowJsonView] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const event_time = formData.event_time ? new Date(formData.event_time).toISOString() : new Date().toISOString();
      const body = eventType === 'milestone'
        ? {
            event_type: 'milestone' as const,
            contract_uuid: formData.contract_uuid,
            phase: formData.phase,
            event_time,
          }
        : {
            event_type: 'usage' as const,
            contract_uuid: formData.contract_uuid,
            sku_id: formData.sku_id,
            count: formData.count || '1',
            event_time,
          };
      const response = await fetch('/api/usage-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      
      // Check if the response is not ok (status 200-299)
      if (!response.ok) {
        setResult({
          success: false,
          error: data.error || 'Request failed',
          details: data.details || data.message || 'No additional details available',
          status: response.status,
          statusText: response.statusText,
          api_response: data.api_response,
          fullError: data,
        });
      } else {
        setResult(data);
      }
    } catch (error) {
      // This catches network errors, JSON parsing errors, etc.
      setResult({
        success: false,
        error: 'Network or parsing error',
        details: error instanceof Error ? error.message : 'Unknown error',
        fullError: {
          name: error instanceof Error ? error.name : 'UnknownError',
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageStandard>
      <div className="w-full max-w-4xl">
        <div className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          This application will demonstrate the following features:
          <ol className="list-decimal list-outside pl-6">
            <li className="pl-2">Cut and paste the contract UUID into the Contract UUID field.</li>
            <li className="pl-2">Choose <strong>Usage event</strong> (sku + count + date) or <strong>Milestone event</strong> (phase + date).</li>
            <li className="pl-2">For usage events: use the SKU ID from the contract; event time and count default to now and 1.</li>
            <li className="pl-2">For milestone events: enter the phase and optional event time.</li>
          </ol>
          <div className="pt-4"><span className="text-green-600">Congratulations!</span> You can send both usage and milestone events and experiment with pricing models, tiers, and addendums.</div>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row pb-4">
          After you create the contract, go to the <a className="text-blue-600" href="/sample-addendum">Sample Addendum</a> step to add an addendum to the contract.
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Usage Event Simulator
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Test BillAgent usage events by sending simulated events through the server-side API
            </p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event type
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="event_type"
                      checked={eventType === 'usage'}
                      onChange={() => setEventType('usage')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Usage event (sku + count + date)</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="event_type"
                      checked={eventType === 'milestone'}
                      onChange={() => setEventType('milestone')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Milestone event (phase + date)</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="contract_uuid" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contract UUID *
                </label>
                <input
                  type="text"
                  id="contract_uuid"
                  name="contract_uuid"
                  value={formData.contract_uuid}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="<enter contract uuid here>"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Contract UUID associated with this event</p>
              </div>

              {eventType === 'milestone' ? (
                <div>
                  <label htmlFor="phase" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phase *
                  </label>
                  <input
                    type="text"
                    id="phase"
                    name="phase"
                    value={formData.phase}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g. implementation_complete"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">Milestone phase for term matching</p>
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="sku_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      SKU ID *
                    </label>
                    <input
                      type="text"
                      id="sku_id"
                      name="sku_id"
                      value={formData.sku_id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="<enter the sku id here>"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">SKU ID that matches contract terms</p>
                  </div>

                  <div>
                    <label htmlFor="count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Count
                    </label>
                    <input
                      type="text"
                      id="count"
                      name="count"
                      value={formData.count}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="1"
                    />
                    <p className="mt-1 text-xs text-gray-500">Defaults to &quot;1&quot; if not provided</p>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="event_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event time
                </label>
                <input
                  type="datetime-local"
                  id="event_time"
                  name="event_time"
                  value={formData.event_time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <p className="mt-1 text-xs text-gray-500">Defaults to now if not provided</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending Event...' : eventType === 'milestone' ? 'Send Milestone Event' : 'Send Usage Event'}
              </button>
            </form>

            {result && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {result.success ? 'Success!' : 'Error'}
                  </h3>
                  {result.success && result.data?.term_matches && (
                    <button
                      onClick={() => setShowJsonView(!showJsonView)}
                      className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      {showJsonView ? 'Table View' : 'JSON View'}
                    </button>
                  )}
                </div>
                {result.success && !result.data?.term_matches && !result.error ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{result.message}</p>
                    {result.data && Object.keys(result.data).length > 0 && (
                      <pre className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-3 rounded border">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Processed at: {result.timestamp ? new Date(result.timestamp).toLocaleString() : 'Unknown'}
                    </div>
                  </div>
                ) : result.success && result.data?.term_matches && !showJsonView ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {result.message}
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              SKU ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Count
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                          {result.data.term_matches.map((match: {
                            sku_id: string;
                            description: string;
                            price: number;
                            count: number;
                          }, index: number) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                {match.sku_id}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                {match.description}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                                ${((match.price ?? 0) / 100).toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                {match.count ?? 0}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Processed at: {result.timestamp ? new Date(result.timestamp).toLocaleString() : 'Unknown'}
                    </div>
                  </div>
                ) : result.success && result.data?.term_matches && showJsonView ? (
                  <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                      <div className="flex items-center mb-2">
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          {result.error || 'Error'}
                        </span>
                        {result.status && (
                          <span className="ml-2 px-2 py-1 text-xs bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded">
                            {result.status} {result.statusText}
                          </span>
                        )}
                      </div>
                      {result.details && (
                        <p className="text-sm text-red-600 dark:text-red-400 mb-2">
                          {result.details}
                        </p>
                      )}
                    </div>

                    {/* Richer validation/API error from BillAgent */}
                    {result.api_response != null && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Validation / API response
                        </h4>
                        {Array.isArray(result.api_response) ? (
                          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            {result.api_response.map((item: unknown, i: number) => (
                              <li key={i}>
                                {typeof item === 'object' && item !== null && 'message' in item
                                  ? String((item as { message?: unknown }).message)
                                  : String(item)}
                              </li>
                            ))}
                          </ul>
                        ) : typeof result.api_response === 'object' && result.api_response !== null && 'errors' in result.api_response && Array.isArray((result.api_response as { errors: unknown[] }).errors) ? (
                          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            {(result.api_response as { errors: unknown[] }).errors.map((item: unknown, i: number) => (
                              <li key={i}>
                                {typeof item === 'object' && item !== null && 'message' in item
                                  ? String((item as { message?: unknown }).message)
                                  : String(item)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <pre className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-3 rounded border overflow-auto max-h-96">
                            {JSON.stringify(result.api_response, null, 2)}
                          </pre>
                        )}
                      </div>
                    )}

                    {result.fullError && !result.api_response && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full error payload
                        </h4>
                        <pre className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-3 rounded border overflow-auto max-h-96">
                          {JSON.stringify(result.fullError, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <details className="cursor-pointer">
                        <summary className="hover:text-gray-700 dark:hover:text-gray-300">
                          Show complete response
                        </summary>
                        <pre className="mt-2 text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-3 rounded border overflow-auto max-h-96">
                          {JSON.stringify(result, null, 2)}
                        </pre>
                      </details>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageStandard>
  );
}