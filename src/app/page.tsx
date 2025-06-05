"use client";

import { useState } from "react";
import { integrationApp } from "@/lib/integration";
import type { FormData, CRMType } from "./types/crm";
import CRMSelector from "./components/CRMSelector";
import CRMForm from "./components/CRMForm";
import CRMResult from "./components/CRMResult";

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
  const [error, setError] = useState<string | null>(null);
  const [contactLink, setContactLink] = useState<string | null>(null);

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
    setError(null);
    setContactLink(null);
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
    setError(null);
    setContactLink(null);

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

      setContactLink(result.output?.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create contact");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <CRMResult error={error} contactLink={contactLink} />
        </div>
      </div>
    </div>
  );
}
