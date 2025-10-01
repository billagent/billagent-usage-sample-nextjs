import ContractText from "../../components/ContractText";
import PageStandard from "../../components/PageStandard";
import fs from 'fs';
import path from 'path';

export default function SampleAddendumPage() {
  // Read the addendum markdown file
  const addendumPath = path.join(process.cwd(), 'src', 'component-data', 'Addendum.md');
  const addendumText = fs.readFileSync(addendumPath, 'utf8');

  return (
    <PageStandard>
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Sample Addendum
        </h1>
        <div className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          <ol className="list-decimal list-outside pl-6">
            <li className="pl-2">While on the Contract Details page for the newly created contract, copy the addendum text from below and paste it into the AI Chat Interface on the right side of the screen. </li>
            
          </ol>
          <div className="pt-4"><span className="text-green-600">Congratulations!</span>, you have now added an addendum to your contract! The contract now has additional terms that will be used for billing.</div>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row pb-4">
           Go backto the <a className="text-blue-600" href="/usage-event-simulator">Usage Event Simulator</a> to send usage events to the appended contract.
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sample Addendum
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This addendum adds new billing terms to the existing contract.
            </p>
          </div>
          <div className="p-6">
            <ContractText contractText={addendumText} />
          </div>
        </div>
      </div>
    </PageStandard>
  );
}
