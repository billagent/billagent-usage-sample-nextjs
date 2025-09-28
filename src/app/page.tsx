
import PageStandard from "../components/PageStandard";
import Image from "next/image";
export default function Home() {
  return (
    <PageStandard>
        
        <div className="text-center sm:text-left max-w-2xl pb-4 " >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Sample Customer Application
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            This is is designed to demonstrate the BillAgent platform using an example contract. The application is also directly integrated with BillAgent, you will need to log into Billagent.ai to create your api key.
          </p>
          <div className="flex gap-4 items-center flex-col sm:flex-row pb-4">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              href="/getting-started"
            >
              Get Started
            </a>

          </div>
          <div className="max-w-2xl pt-15 font-mono text-xs">
            <ul className="list-outside list-disc pl-4">
              <li className="mb-2 tracking-[-.01em] pl-2">
                This full stack application was created using <span className="font-mono text-xs text-yellow-600">npx create-next-app</span>
              </li>
              <li className="mb-2 tracking-[-.01em] pl-2">
                This application is integrated with BillAgent using the BillAgent usage events typescript sdk, published on npmjs.com, click <a className="text-blue-600" href="https://www.npmjs.com/package/@billagent/usage-events">here</a>.
              </li>
              <li className="mb-2 tracking-[-.01em] pl-2">
                BillAgent apis are intended to be integrated into serverside applications and is integrated into this application on server side api routes.
              </li>
            </ul>
          </div>
        </div>
    </PageStandard>
  );
}
