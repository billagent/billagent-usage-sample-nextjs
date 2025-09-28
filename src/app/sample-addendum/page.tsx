import ContractText from "../../components/ContractText";
import PageStandard from "../../components/PageStandard";

export default function SampleContractPage() {
  return (
    <PageStandard>
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sample Contract
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This contract demonstrates automatic date updating functionality
            </p>
          </div>
          <div className="p-6">
            <ContractText />
          </div>
        </div>
      </div>
    </PageStandard>
  );
}
