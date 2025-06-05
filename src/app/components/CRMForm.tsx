import React from "react";
import type { FormData, CRMType } from "../types/crm";

interface CRMFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onBack: () => void;
  selectedCRM: CRMType;
}

const CRMForm: React.FC<CRMFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
  onBack,
  selectedCRM,
}) => (
  <>
    <div className="flex items-center mb-8">
      <button
        type="button"
        onClick={onBack}
        className="mr-4 text-indigo-600 hover:text-indigo-800 focus:outline-none focus:underline text-sm font-medium"
        aria-label="Back to CRM selection"
      >
        &larr; Back
      </button>
      <span className="flex items-center gap-2 text-base font-semibold text-gray-700">
        {selectedCRM === "pipedrive" ? (
          <span
            className="w-5 h-5 inline-block bg-green-600 rounded-full"
            aria-label="Pipedrive"
          />
        ) : (
          <span
            className="w-5 h-5 inline-block bg-orange-500 rounded-full"
            aria-label="HubSpot"
          />
        )}
        {selectedCRM.charAt(0).toUpperCase() + selectedCRM.slice(1)}
      </span>
    </div>
    <form
      onSubmit={onSubmit}
      className="space-y-7 bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200"
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-base font-medium text-gray-800"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={onChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none sm:text-base text-gray-900 px-4 py-2 bg-white transition"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-base font-medium text-gray-800"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={onChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none sm:text-base text-gray-900 px-4 py-2 bg-white transition"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="phoneNumber"
          className="block text-base font-medium text-gray-800"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          required
          value={formData.phoneNumber}
          onChange={onChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none sm:text-base text-gray-900 px-4 py-2 bg-white transition"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="companyName"
          className="block text-base font-medium text-gray-800"
        >
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          required
          value={formData.companyName}
          onChange={onChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none sm:text-base text-gray-900 px-4 py-2 bg-white transition"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="pronouns"
          className="block text-base font-medium text-gray-800"
        >
          Pronouns
        </label>
        <input
          type="text"
          id="pronouns"
          name="pronouns"
          required
          value={formData.pronouns}
          onChange={onChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none sm:text-base text-gray-900 px-4 py-2 bg-white transition"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
      >
        {isLoading ? "Creating Contact..." : "Create Contact"}
      </button>
    </form>
  </>
);

export default CRMForm;
