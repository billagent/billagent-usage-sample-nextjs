'use client';

import { useState } from 'react';
import CopyButton from '../../components/CopyButton';
import ContractText from '../../components/ContractText';

interface ContractHeaderProps {
  description: string;
  contractText: string;
}

export default function ContractHeader({ description, contractText }: ContractHeaderProps) {
  const [formattedText, setFormattedText] = useState('');

  return (
    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-1">
          {description}
        </p>
        <div className="flex-shrink-0">
          <div className="hidden">
            <ContractText 
              contractText={contractText} 
              onFormattedTextChange={setFormattedText}
            />
          </div>
          {formattedText && <CopyButton textToCopy={formattedText} />}
        </div>
      </div>
    </div>
  );
}
