import React from "react";

interface CRMResultProps {
  error: string | null;
  contactLink: string | null;
}

const CRMResult: React.FC<CRMResultProps> = ({ error, contactLink }) => {
  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md" role="alert">
        {error}
      </div>
    );
  }
  if (contactLink) {
    return (
      <div
        className="mt-4 p-4 bg-green-50 text-green-700 rounded-md"
        role="status"
      >
        <p>Contact created successfully!</p>
        <a
          href={contactLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-500 underline"
        >
          View Contact in CRM
        </a>
      </div>
    );
  }
  return null;
};

export default CRMResult;
