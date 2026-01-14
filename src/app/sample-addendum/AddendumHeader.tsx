'use client';

import { useState } from 'react';
import CopyButton from '../../components/CopyButton';
import ContractText from '../../components/ContractText';

interface AddendumHeaderProps {
  description: string;
  addendumText: string;
}

export default function AddendumHeader({ description, addendumText }: AddendumHeaderProps) {
  const [formattedText, setFormattedText] = useState('');

  return (
    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sample Addendum
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <ContractText 
            contractText={addendumText} 
            onFormattedTextChange={setFormattedText}
            className="hidden"
          />
          {formattedText && <CopyButton textToCopy={formattedText} />}
        </div>
      </div>
    </div>
  );
}
