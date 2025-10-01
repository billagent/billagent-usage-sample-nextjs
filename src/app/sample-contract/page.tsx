import ContractText from "../../components/ContractText";
import PageStandard from "../../components/PageStandard";
import Image from "next/image";
import fs from 'fs';
import path from 'path';

export default function SampleContractPage() {
  // Read the contract markdown file
  const contractPath = path.join(process.cwd(), 'src', 'component-data', 'Contract.md');
  const contractText = fs.readFileSync(contractPath, 'utf8');

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
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This is a sample contract for a company like yours that is selling to large enterprise customers.
            </p>
          </div>
          <div className="p-6">
            <ContractText contractText={contractText} />
          </div>
        </div>
      </div>
    </PageStandard>
  );
}
