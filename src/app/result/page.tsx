"use client";
import { useSearchParams } from "next/navigation";
import CRMResult from "../components/CRMResult";

export default function ResultPage() {
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
}
