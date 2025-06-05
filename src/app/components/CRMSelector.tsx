import React from "react";
import { FaHubspot } from "react-icons/fa";
import { SiPiped } from "react-icons/si";
import type { CRMType } from "../types/crm";

const crmOptions: {
  key: CRMType;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    key: "pipedrive",
    label: "Pipedrive",
    icon: <SiPiped className="w-8 h-8 text-green-600" aria-hidden="true" />,
    color: "bg-green-50 border-green-600",
  },
  {
    key: "hubspot",
    label: "HubSpot",
    icon: <FaHubspot className="w-8 h-8 text-orange-500" aria-hidden="true" />,
    color: "bg-orange-50 border-orange-500",
  },
];

type CRMSelectorProps = {
  onSelect: (crm: CRMType) => void;
};

const CRMSelector: React.FC<CRMSelectorProps> = ({ onSelect }) => (
  <div className="flex flex-col items-center">
    <p className="mb-6 text-lg text-gray-700 font-medium">
      Select CRM Platform
    </p>
    <div className="flex gap-8 w-full justify-center">
      {crmOptions.map((crm) => (
        <button
          key={crm.key}
          type="button"
          onClick={() => onSelect(crm.key)}
          className={`flex flex-col items-center justify-center border-2 ${crm.color} rounded-xl px-8 py-6 shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-200 hover:scale-105 hover:shadow-lg cursor-pointer w-40 h-40 group`}
          aria-label={`Select ${crm.label}`}
          tabIndex={0}
        >
          {crm.icon}
          <span className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-indigo-700">
            {crm.label}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default CRMSelector;
