import PageStandard from "../../components/PageStandard";
import SampleContractClient from "./SampleContractClient";
import fs from 'fs';
import path from 'path';

export default function SampleContractPage() {
  const dataDir = path.join(process.cwd(), 'src', 'component-data');
  const periodicText = fs.readFileSync(path.join(dataDir, 'PeriodicBilling.md'), 'utf8');
  const milestoneText = fs.readFileSync(path.join(dataDir, 'MilestoneBilling.md'), 'utf8');
  const purchaseOrderText = fs.readFileSync(path.join(dataDir, 'PurchaseOrder.md'), 'utf8');

  const contractTemplates: Record<string, string> = {
    'Periodic Billing': periodicText,
    'Milestone Billing': milestoneText,
    'Purchase Order': purchaseOrderText,
  };

  return (
    <PageStandard>
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Sample Contract
        </h1>
        <div className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          <ol className="list-decimal list-outside pl-6">
            <li className="pl-2">Log into BillAgent.ai and navigate to the <span className=" text-yellow-600">Add New</span> page under the <span className=" text-yellow-600">Customer</span> section in the side bar menu.</li>
            <li className="pl-2">Cut and Paste the sample contract into the input area in the AI Chat Interface. If you want to customize the contract before doing so, you can do so in a text editor of your choice.</li>
            <li className="pl-2">Wait for the AI to read and configure the contract. Once it is completed, it will return with the contract uuid and a link to the contract details page.</li>
          </ol>
          <div className="pt-4"><span className="text-green-600">Congratulations!</span>, you have now created a new enterprise customer and a new contract in your BillAgent.ai dashboard! You are now ready to send usage events to BillAgent.ai to simulate usage of the contract.</div>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row pb-4">
          After you create the contract, go to the <a className="text-blue-600" href="/usage-event-simulator">Usage Event Simulator</a> to send usage events to the contract.
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <SampleContractClient
            description="This is a sample contract for a company like yours that is selling to large enterprise customers."
            contractTemplates={contractTemplates}
          />
        </div>
      </div>
    </PageStandard>
  );
}
