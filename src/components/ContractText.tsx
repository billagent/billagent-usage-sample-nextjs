'use client';

import { useState, useEffect } from 'react';

interface ContractTextProps {
  contractText: string;
  className?: string;
}

export default function ContractText({ 
  contractText,
  className = ""
}: ContractTextProps) {
  const [formattedText, setFormattedText] = useState('');

  useEffect(() => {
    const formatContractText = () => {
      const today = new Date();3

      const todayPlus1Year = new Date(today);
      todayPlus1Year.setFullYear(today.getFullYear() + 1);

      const todayPluse1Year1Month = new Date(todayPlus1Year);
      todayPluse1Year1Month.setMonth(todayPlus1Year.getMonth() + 1);

      const todayPlus1Month = new Date(today);
      todayPlus1Month.setMonth(today.getMonth() + 1);

      const todayPlus2Months = new Date(today);
      todayPlus2Months.setMonth(today.getMonth() + 2);
      
      // Format dates
      const todayFormatted = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const todayPlus1MonthFormatted = todayPlus1Month.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const todayPlus1YearFormatted = todayPlus1Year.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const todayPluse1Year1MonthFormatted = todayPluse1Year1Month.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const todayPlus2MonthsFormatted = todayPlus2Months.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Replace date placeholders
      let formatted = contractText
        .replace(/{TODAY}/g, todayFormatted)
        .replace(/{TODAY_PLUS_1_MONTH}/g, todayPlus1MonthFormatted)
        .replace(/{TODAY_PLUS_2_MONTHS}/g, todayPlus2MonthsFormatted)
        .replace(/{TODAY_PLUS_1_YEAR}/g, todayPlus1YearFormatted)
        .replace(/{TODAY_PLUS_2_MONTHS}/g, todayPlus2MonthsFormatted)
        .replace(/{TODAY_PLUS_1_YEAR_1_MONTH}/g, todayPluse1Year1MonthFormatted)
        ;

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
