'use client';

import { useState } from 'react';
import PageStandard from "../../components/PageStandard";

export default function UsageEventSimulator() {
  const [formData, setFormData] = useState({
    sku_id: 'BAP-PREMIUM-01',
    event_time: new Date().toISOString().slice(0, 16), // Format for datetime-local input
    request_type: 'usage_event',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showJsonView, setShowJsonView] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/usage-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          event_time: formData.event_time ? new Date(formData.event_time).toISOString() : new Date().toISOString()
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        error: 'Failed to send event',
        details: error instanceof Error ? error.message : 'Unknown error'
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
            <li className="pl-2">Cut and Paste the contract uuid into the Contract UUID input field in the Usage Event Simulator. </li>
            <li className="pl-2">Notice that the SKU ID is populated with the sku id from the contract. If you had changed it, you will need to change the value in the SKU ID field.</li>
            <li className="pl-2">The time defaults to now. You can change it to any time you want. Same with the count.</li>
          </ol>
          <div className="pt-4"><span className="text-green-600">Congratulations!</span>, you have sent in usage events! you can experiment with different pricing models and tiers and see how BillAgent handles them. You can also add and addendum to the contract and see how BillAgent handles events after the addendum has been added.</div>
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
                <label htmlFor="contract_uuid" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contract UUID *
                </label>
                <input
                  type="text"
                  id="contract_uuid"
                  name="contract_uuid"
               
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="<enter contract uuid here>"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Contract UUID associated with this event</p>
              </div>

              <div>
                <label htmlFor="request_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Request Type *
                </label>
                <input
                  type="text"
                  id="request_type"
                  name="request_type"
                  value={formData.request_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="usage_event"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Request type for term matching</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="event_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Event Time
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

                <div>
                  <label htmlFor="count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Count
                  </label>
                  <input
                    type="text"
                    id="count"
                    name="count"
                  
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="1"
                  />
                  <p className="mt-1 text-xs text-gray-500">Defaults to "1" if not provided</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending Event...' : 'Send Usage Event'}
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
                {result.success && result.data?.term_matches && !showJsonView ? (
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
                          {result.data.term_matches.map((match: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                {match.sku_id}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                {match.description}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                                ${(match.price / 100).toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                {match.count}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Processed at: {new Date(result.timestamp).toLocaleString()}
                    </div>
                  </div>
                ) : result.success && result.data?.term_matches && showJsonView ? (
                  <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                ) : (
                  <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageStandard>
  );
}