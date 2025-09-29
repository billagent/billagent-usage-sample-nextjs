import PageStandard from "../../components/PageStandard";
import Image from "next/image";
export default function GettingStarted() {
  return (
    <PageStandard>
        
        <div className="text-center sm:text-left max-w-2xl pb-4 " >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Getting Started
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          If you have not already, log into Billagent.ai to create your api key. The API key management page is located in the  
          <span className=" text-yellow-600"> Integrations</span> section under <span className=" text-yellow-600">Outbound Integrations</span> in the side bar menu in the BillAgent dashboard.
          </p>
          <div className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            This application will demonstrate the following features:
            <ol className="list-decimal list-outside pl-6">
              <li className="pl-2">New Enterprise Customer Setup from the BillAgent Dashboard.</li>
              <li className="pl-2">Usage Event Simulation sent from a BillAgent customer application (this application).</li>
              <li className="pl-2">Addendum creation from the BillAgent Dashboard, adding to the original contract in the first step.</li>
              <li className="pl-2">Usage Event Simulation sent from a BillAgent customer application (this application) <i>after</i> the addendum is added to the contract.</li>
            </ol>
          </div>
          <div className="flex gap-4 items-center flex-col sm:flex-row pb-4">

            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              href="/sample-contract"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
                className="invert"
              /> View Sample Contract
            </a>

          </div>
        </div>
    </PageStandard>
  );
}