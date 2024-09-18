// ResponsiveTabs.tsx
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from 'lucide-react';

interface Tab {
  value: string;
  label: string;
}

interface ResponsiveTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ResponsiveTabs: React.FC<ResponsiveTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-8">
      {/* Menú desplegable para móviles */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2 bg-navy-800 opacity-90 text-blue-200 rounded-full"
        >
          {tabs.find(tab => tab.value === activeTab)?.label}
          <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-navy-900 opacity-90 border border-gray-700 rounded-md shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className="block w-full text-left px-4 py-2 text-blue-400 hover:bg-white/20 hover:text-yellow-400"
                onClick={() => {
                  onTabChange(tab.value);
                  setIsOpen(false);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pestañas para pantallas más grandes */}
      <TabsList className="hidden md:flex justify-center space-x-2">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            onClick={() => onTabChange(tab.value)}
            className="px-3 py-1 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full bg-navy-800 text-yellow-400 hover:bg-navy-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all data-[state=active]:bg-blue-700 data-[state=active]:text-white"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default ResponsiveTabs;