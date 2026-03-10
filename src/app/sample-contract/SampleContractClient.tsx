'use client';

import { useState } from 'react';
import ContractWithTimezone from '../../components/ContractWithTimezone';
import ContractHeader from './ContractHeader';

const DEFAULT_TEMPLATE_KEY = 'Contract 2';

interface SampleContractClientProps {
  description: string;
  /** Map of template label -> markdown content. Should include "Contract 2" (default) and "Contract". */
  contractTemplates: Record<string, string>;
}

export default function SampleContractClient({
  description,
  contractTemplates,
}: SampleContractClientProps) {
  const templateKeys = Object.keys(contractTemplates);
  const defaultKey = templateKeys.includes(DEFAULT_TEMPLATE_KEY) ? DEFAULT_TEMPLATE_KEY : templateKeys[0];
  const [selectedTemplate, setSelectedTemplate] = useState<string>(defaultKey);
  const contractText = contractTemplates[selectedTemplate] ?? '';

  return (
    <>
      <ContractHeader description={description} contractText={contractText} />
      <div className="p-6">
        <ContractWithTimezone
          contractText={contractText}
          contractTemplates={contractTemplates}
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
        />
      </div>
    </>
  );
}
