"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CRMResult from "../components/CRMResult";

const formatContactLink = (
  crmType: "pipedrive" | "hubspot" | null,
  contactId: string | null
) => {
  if (!contactId || !crmType) return null;

  switch (crmType) {
    case "hubspot":
      // Extract just the ID from the full URL if it's provided
      const hubspotId = contactId.split("/").pop() || contactId;
      return `${process.env.NEXT_PUBLIC_HUBSPOT_BASE_URL}/contacts/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}/record/0-1/${hubspotId}`;
    case "pipedrive":
      // Extract just the ID from the full URL if it's provided
      const pipedriveId = contactId.split("/").pop() || contactId;
      return `${process.env.NEXT_PUBLIC_PIPEDRIVE_BASE_URL}/person/${pipedriveId}`;
    default:
      return null;
  }
};

const ResultContent = () => {
  const searchParams = useSearchParams();

  // Get and decode parameters, handle empty values
  const error = searchParams.get("error");
  const contactId = searchParams.get("contactLink");
  const crmType = searchParams.get("crmType") as "pipedrive" | "hubspot" | null;

  // Format the contact link based on CRM type
  const contactLink = formatContactLink(crmType, contactId);

  // Only pass non-empty values to CRMResult
  return (
    <CRMResult
      error={
        error && error !== "null" && error !== ""
          ? decodeURIComponent(error)
          : null
      }
      contactLink={contactLink}
      crmType={crmType || null}
    />
  );
};

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
