import React from "react";
import type { CRMType } from "../types/crm";
import { useRouter } from "next/navigation";

interface CRMResultProps {
  error: string | null;
  contactLink: string | null;
  crmType: CRMType | null;
}

const CRMResult: React.FC<CRMResultProps> = ({
  error,
  contactLink,
  crmType,
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Result
        </h1>
        {crmType && (
          <div className="mb-4 text-lg font-semibold text-indigo-700">
            CRM Used:{" "}
            <span
              className={
                crmType === "pipedrive" ? "text-green-600" : "text-orange-500"
              }
            >
              {crmType.charAt(0).toUpperCase() + crmType.slice(1)}
            </span>
          </div>
        )}
        {error && (
          <div
            className="p-4 bg-red-50 text-red-700 rounded-md w-full text-center mb-4"
            role="alert"
          >
            {error}
          </div>
        )}
        {contactLink && (
          <div
            className="p-4 bg-green-50 text-green-700 rounded-md w-full text-center mb-4"
            role="status"
          >
            <p className="mb-2">Contact created successfully!</p>
            <a
              href={contactLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition mb-2"
            >
              View Contact in CRM
            </a>
          </div>
        )}
        <div className="flex flex-col gap-3 w-full mt-4">
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            onClick={() => router.push(`/?step=form&crm=${crmType ?? ""}`)}
          >
            Add Another Contact
          </button>
          <button
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
            onClick={() => router.push("/?step=select")}
          >
            Select Another CRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRMResult;
