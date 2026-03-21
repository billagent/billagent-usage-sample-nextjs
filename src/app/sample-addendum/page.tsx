import ContractText from "../../components/ContractText";
import CopyButton from "../../components/CopyButton";
import PageStandard from "../../components/PageStandard";
import AddendumHeader from "./AddendumHeader";
import fs from 'fs';
import path from 'path';

export default function SampleAddendumPage() {
  // Read the addendum markdown file
  const addendumPath = path.join(process.cwd(), 'src', 'component-data', 'PeriodicBillingAddenda.md');
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
           Go back to the <a className="text-blue-600" href="/usage-event-simulator">Usage Event Simulator</a> to send usage events to the appended contract.
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <AddendumHeader 
            description="This addendum adds new billing terms to the existing contract."
            addendumText={addendumText}
          />
          <div className="p-6">
            <ContractText contractText={addendumText} />
          </div>
        </div>
      </div>
    </PageStandard>
  );
}
