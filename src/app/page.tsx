"use client";

import { useState, useEffect, Suspense } from "react";
import { integrationApp } from "@/lib/integration";
import type { FormData, CRMType } from "./types/crm";
import CRMSelector from "./components/CRMSelector";
import CRMForm from "./components/CRMForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    pronouns: "",
  });
  const [selectedCRM, setSelectedCRM] = useState<CRMType | null>(null);
  const [step, setStep] = useState<"select" | "form">("select");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const stepParam = searchParams.get("step");
    const crmParam = searchParams.get("crm");
    if (
      stepParam === "form" &&
      (crmParam === "pipedrive" || crmParam === "hubspot")
    ) {
      setSelectedCRM(crmParam as CRMType);
      setStep("form");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        pronouns: "",
      });
    } else if (stepParam === "select") {
      setStep("select");
      setSelectedCRM(null);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        pronouns: "",
      });
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectCRM = (crm: CRMType) => {
    setSelectedCRM(crm);
    setStep("form");
  };

  const handleBackToSelect = () => {
    setStep("select");
    setSelectedCRM(null);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      pronouns: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let resultId = null;
    let errorMsg = null;

    try {
      if (!selectedCRM) return;
      const result = await integrationApp
        .connection(selectedCRM)
        .action("create-contact")
        .run({
          name: formData.name,
          email: formData.email,
          phone: formData.phoneNumber,
          company: formData.companyName,
          pronouns: formData.pronouns,
        });

      resultId = result.output?.id;
    } catch (err) {
      errorMsg =
        err instanceof Error ? err.message : "Failed to create contact";
    } finally {
      setIsLoading(false);
      // Navigate to result page with query params
      router.push(
        `/result?crmType=${selectedCRM}&contactLink=${encodeURIComponent(
          resultId || ""
        )}&error=${encodeURIComponent(errorMsg || "")}`
      );
    }
  };

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-10 tracking-tight">
              Create CRM Contact
            </h1>
            {step === "select" && <CRMSelector onSelect={handleSelectCRM} />}
            {step === "form" && selectedCRM && (
              <CRMForm
                formData={formData}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onBack={handleBackToSelect}
                selectedCRM={selectedCRM}
              />
            )}
            {/* Result is now shown only on the /result page */}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
