"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CRMResult from "../components/CRMResult";

const ResultContent = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || null;
  const contactLink = searchParams.get("contactLink") || null;
  const crmType =
    (searchParams.get("crmType") as "pipedrive" | "hubspot") || null;

  return (
    <CRMResult
      error={error && error !== "null" ? error : null}
      contactLink={contactLink && contactLink !== "null" ? contactLink : null}
      crmType={crmType}
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
