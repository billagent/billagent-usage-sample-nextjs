import { ReactNode } from 'react';
import Image from "next/image";
import Navigation from "./Navigation";
interface PageStandardProps {
  children: ReactNode;
  className?: string;
}

export default function PageStandard({ children, className = "" }: PageStandardProps) {
  return (
    <div className={`font-sans flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 ${className}`}>
     
      <main className="flex flex-col gap-[32px] items-center w-full flex-1">
       <Image
           src="/billagent-logo.svg"
           alt="BillAgent logo"
           width={300}
           height={132}
           priority
         />
        <Navigation />
        {children}
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          href="https://billagent.ai"
        >
          <svg
            aria-hidden
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="invert"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
          Features
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          href="https://billagent.ai"
        >
          <svg
            aria-hidden
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="invert"
          >
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8"/>
            <path d="M12 8v8"/>
          </svg>
          Contact Us →
        </a>
      </footer>
    </div>
  );
}
