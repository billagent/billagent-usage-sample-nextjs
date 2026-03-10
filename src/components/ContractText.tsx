'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { addDays, addMonths, addYears } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

interface ContractTextProps {
  contractText: string;
  className?: string;
  timezone?: string;
  buyer?: string;
  seller?: string;
  startDate?: Date;
  onFormattedTextChange?: (formattedText: string) => void;
}

export default function ContractText({ 
  contractText,
  className = "",
  timezone = 'Etc/UTC',
  buyer = '',
  seller = '',
  startDate,
  onFormattedTextChange
}: ContractTextProps) {
  const [formattedText, setFormattedText] = useState('');

  useEffect(() => {
    const formatContractText = () => {
      // Use start date from props or current date/time
      const now = startDate ?? new Date();
      
      // Calculate future dates (these are Date objects representing the moment in time)
      const todayPlus1Month = addMonths(now, 1);
      const todayPlus2Months = addMonths(now, 2);
      const todayPlus10Days = addDays(now, 10);
      const todayPlus15Days = addDays(now, 15);
      const todayPlus1Year = addYears(now, 1);
      const todayPlus1YearMinusOneDay = addDays(todayPlus1Year, -1);
      const todayPlus1Year1Month = addMonths(todayPlus1Year, 1);
      
      // Helper function to add ordinal suffix to day
      const addOrdinalSuffix = (day: number): string => {
        const j = day % 10;
        const k = day % 100;
        if (j === 1 && k !== 11) {
          return day + "st";
        }
        if (j === 2 && k !== 12) {
          return day + "nd";
        }
        if (j === 3 && k !== 13) {
          return day + "rd";
        }
        return day + "th";
      };

      // Helper to format a date with ordinal suffix in the selected timezone
      const formatDateWithOrdinal = (date: Date) => {
        const month = formatInTimeZone(date, timezone, 'MMMM');
        const day = parseInt(formatInTimeZone(date, timezone, 'd'));
        const year = parseInt(formatInTimeZone(date, timezone, 'yyyy'));
        return `${month} ${addOrdinalSuffix(day)}, ${year}`;
      };

      // Format dates in the selected timezone with ordinal suffixes
      const todayFormatted = formatDateWithOrdinal(now);
      const todayPlus1MonthFormatted = formatDateWithOrdinal(todayPlus1Month);
      const todayPlus2MonthsFormatted = formatDateWithOrdinal(todayPlus2Months);
      const todayPlus10DaysFormatted = formatDateWithOrdinal(todayPlus10Days);
      const todayPlus15DaysFormatted = formatDateWithOrdinal(todayPlus15Days);
      const todayPlus1YearFormatted = formatDateWithOrdinal(todayPlus1Year);
      const todayPlus1YearMinusOneDayFormatted = formatDateWithOrdinal(todayPlus1YearMinusOneDay);
      const todayPluse1Year1MonthFormatted = formatDateWithOrdinal(todayPlus1Year1Month);

      // Format today's day of the month with ordinal suffix
      const todaysDayOfTheMonthFormatted = addOrdinalSuffix(parseInt(formatInTimeZone(now, timezone, 'd')));
      // Replace date placeholders
      const formatted = contractText
        .replace(/\$\{TODAY\}/g, todayFormatted)
        .replace(/\$\{TODAY_PLUS_1_MONTH\}/g, todayPlus1MonthFormatted)
        .replace(/\$\{TODAY_PLUS_2_MONTHS\}/g, todayPlus2MonthsFormatted)
        .replace(/\$\{TODAY_PLUS_1_YEAR\}/g, todayPlus1YearFormatted)
        .replace(/\$\{TODAY_PLUS_1_YEAR_MINUS_ONE_DAY\}/g, todayPlus1YearMinusOneDayFormatted)
        .replace(/\$\{TODAY_PLUS_1_YEAR_1_MONTH\}/g, todayPluse1Year1MonthFormatted)
        .replace(/\$\{TODAYS_DAY_OF_THE_MONTH\}/g, todaysDayOfTheMonthFormatted)
        .replace(/\$\{TODAY_PLUS_10_DAYS\}/g, todayPlus10DaysFormatted)
        .replace(/\$\{TODAY_PLUS_15_DAYS\}/g, todayPlus15DaysFormatted)
        .replace(/\$\{BUYER\}/g, buyer)
        .replace(/\$\{SELLER\}/g, seller)
        ;

      setFormattedText(formatted);
      if (onFormattedTextChange) {
        onFormattedTextChange(formatted);
      }
    };

    formatContractText();
    
    // Update every minute to ensure dates stay current
    const interval = setInterval(formatContractText, 60000);
    
    return () => clearInterval(interval);
  }, [contractText, timezone, buyer, seller, startDate]);

  return (
    <div className={`contract-text ${className}`}>
      <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom styling for headers
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6 first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-5 first:mt-0">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 mt-4 first:mt-0">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2 mt-3 first:mt-0">
                {children}
              </h4>
            ),
            // Custom styling for paragraphs
            p: ({ children }) => (
              <p className="mb-3 text-gray-800 dark:text-gray-200 leading-relaxed">
                {children}
              </p>
            ),
            // Custom styling for lists
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-3 text-gray-800 dark:text-gray-200 space-y-1">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-3 text-gray-800 dark:text-gray-200 space-y-1">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-800 dark:text-gray-200">
                {children}
              </li>
            ),
            // Custom styling for tables
            table: ({ children }) => (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-100 dark:bg-gray-700">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                {children}
              </td>
            ),
            // Custom styling for blockquotes
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 italic">
                {children}
              </blockquote>
            ),
            // Custom styling for code blocks to maintain the monospace look
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            code: ({ className, children, ...props }: any) => {
              const isInline = !className?.includes('language-');
              return isInline ? (
                <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              ) : (
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-gray-100 dark:bg-gray-800 p-4 rounded border overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            },
            // Custom styling for pre blocks
            pre: ({ children }) => {
              return (
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-gray-100 dark:bg-gray-800 p-4 rounded border overflow-x-auto">
                  {children}
                </pre>
              );
            }
          }}
        >
          {formattedText}
        </ReactMarkdown>
      </div>
    </div>
  );
}
