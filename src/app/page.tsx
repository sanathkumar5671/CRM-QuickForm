"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { integrationApp } from "@/lib/integration";
import type { FormData, CRMType } from "./types/crm";
import CRMSelector from "./components/CRMSelector";
import CRMForm from "./components/CRMForm";
import { useRouter, useSearchParams } from "next/navigation";

// Separate component for handling search params
const SearchParamsHandler = ({
  onStepChange,
  onCRMChange,
  onFormDataReset,
}: {
  onStepChange: (step: "select" | "form") => void;
  onCRMChange: (crm: CRMType | null) => void;
  onFormDataReset: () => void;
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const stepParam = searchParams.get("step");
    const crmParam = searchParams.get("crm");

    // Only update if the params have actually changed
    if (
      stepParam === "form" &&
      (crmParam === "pipedrive" || crmParam === "hubspot")
    ) {
      onCRMChange(crmParam as CRMType);
      onStepChange("form");
      onFormDataReset();
    } else if (stepParam === "select") {
      onStepChange("select");
      onCRMChange(null);
      onFormDataReset();
    }
  }, [searchParams, onCRMChange, onFormDataReset, onStepChange]);

  return null;
};

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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev: FormData) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSelectCRM = useCallback((crm: CRMType) => {
    setSelectedCRM(crm);
    setStep("form");
  }, []);

  const handleBackToSelect = useCallback(() => {
    setStep("select");
    setSelectedCRM(null);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      pronouns: "",
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
    },
    [selectedCRM, formData, router]
  );

  const resetFormData = useCallback(() => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      pronouns: "",
    });
  }, []);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SearchParamsHandler
        onStepChange={setStep}
        onCRMChange={setSelectedCRM}
        onFormDataReset={resetFormData}
      />
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
          </div>
        </div>
      </div>
    </Suspense>
  );
}
