'use client';

import { useState, useEffect } from 'react';

interface ContractTextProps {
  contractText?: string;
  className?: string;
}

export default function ContractText({ 
  contractText = `AGREEMENT

This Agreement is entered into on {TODAY} between the parties.

TERMS AND CONDITIONS

1. Effective Date: This agreement shall be effective as of {TODAY}.

2. Duration: This agreement shall remain in effect until {TODAY_PLUS_30} unless terminated earlier in accordance with the terms herein.

3. Payment Terms: All payments are due within 30 days of {TODAY}.

4. Governing Law: This agreement shall be governed by the laws in effect as of {TODAY}.

IN WITNESS WHEREOF, the parties have executed this agreement on {TODAY}.

_________________________    _________________________
Party A Signature              Party B Signature
Date: {TODAY}                  Date: {TODAY}`, 
  className = ""
}: ContractTextProps) {
  const [formattedText, setFormattedText] = useState('');

  useEffect(() => {
    const formatContractText = () => {
      const today = new Date();
      const todayPlus30 = new Date(today);
      todayPlus30.setDate(today.getDate() + 30);

      // Format dates
      const todayFormatted = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const todayPlus30Formatted = todayPlus30.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Replace date placeholders
      let formatted = contractText
        .replace(/{TODAY}/g, todayFormatted)
        .replace(/{TODAY_PLUS_30}/g, todayPlus30Formatted);

      setFormattedText(formatted);
    };

    formatContractText();
    
    // Update every minute to ensure dates stay current
    const interval = setInterval(formatContractText, 60000);
    
    return () => clearInterval(interval);
  }, [contractText]);

  return (
    <div className={`contract-text ${className}`}>
      <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        {formattedText}
      </pre>
    </div>
  );
}
