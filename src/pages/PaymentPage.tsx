// src/pages/PaymentPage.tsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // adjust path to your AuthContext
// import clsx from "clsx";

type UploadResult = {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
};

export default function PaymentPage() {
  const { user, supabase } = useContext(AuthContext) as any; // adjust typings if you have a custom context
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cloudResp, setCloudResp] = useState<UploadResult | null>(null);
  const [amount, setAmount] = useState<number>(5000);
  const [reference, setReference] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Replace with your Cloudinary unsigned preset name and cloud name
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      setPreviewUrl(URL.createObjectURL(f));
    } else {
      setPreviewUrl(null);
    }
  }

  async function uploadToCloudinary(fileToUpload: File) {
    setUploading(true);
    setMessage(null);
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    // Optionally add folder or tags:
    formData.append("folder", "nicon/payments");

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const txt = await res.text();
      setUploading(false);
      throw new Error("Cloudinary upload failed: " + txt);
    }

    const data = await res.json();
    setUploading(false);
    return data as UploadResult;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!file) {
      setMessage("Please upload a screenshot of your transfer.");
      return;
    }

    if (!user?.id) {
      // fallback: try supabase auth
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser?.user?.id) {
        setMessage("You must be signed in to submit payment.");
        return;
      }
    }

    try {
      setSubmitting(true);

      // 1) Upload to Cloudinary
      const uploaded = await uploadToCloudinary(file);
      setCloudResp(uploaded);

      // 2) Post to backend
      const payload = {
        userId: user?.id ?? (await supabase.auth.getUser()).data?.user?.id,
        amount,
        reference,
        imageUrl: uploaded.secure_url,
        publicId: uploaded.public_id,
      };

      const apiRes = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(await supabase.auth.getSession()).data?.session?.access_token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!apiRes.ok) {
        const err = await apiRes.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(err.message || "Failed to create payment record");
      }

      setMessage("Payment uploaded successfully. Status: pending. An admin will verify soon.");
      setFile(null);
      setPreviewUrl(null);
      setCloudResp(null);
      setReference("");
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Payment Info */}
        <div className="bg-gradient-to-br from-nicon-slate/80 to-nicon-charcoal/80 rounded-2xl p-8 border border-nicon-green/20 shadow-lg">
          <div className="flex flex-col items-center">
            <img src="/NICON-logo.jpg" alt="NICON" className="w-20 h-20 rounded-full mb-4 shadow-inner" />
            <h2 className="text-3xl font-extrabold text-nicon-green">Complete Registration</h2>
            <p className="mt-3 text-gray-300 text-center">
              Pay the registration fee to activate your account and participate in the tournament.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            <div className="rounded-lg p-4 bg-nicon-charcoal border border-nicon-green/10">
              <div className="text-sm text-gray-300">Amount</div>
              <div className="text-2xl font-bold text-nicon-yellow">₦{amount.toLocaleString()}</div>
            </div>

            <div className="rounded-lg p-4 bg-nicon-charcoal border border-nicon-green/10">
              <div className="text-sm text-gray-300">Bank / Wallet</div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-200">OPAY WALLET</span>
                <span className="text-sm text-gray-400">Account name: Allen Joshua Abba</span>
              </div>
              <div className="mt-2 text-lg text-nicon-green font-semibold">7086632473</div>
            </div>

            <div className="rounded-lg p-4 bg-nicon-charcoal border border-nicon-green/10">
              <div className="text-sm text-gray-300">Note</div>
              <div className="text-sm text-gray-400">
                Use your full name as transfer reference or include the reference code. Upload the screenshot on the right after paying.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Upload & Form */}
        <div className="bg-nicon-charcoal/80 rounded-2xl p-6 border border-nicon-green/20 shadow-lg">
          <h3 className="text-xl font-bold text-nicon-green mb-4">Upload Payment Proof</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300">Amount paid (₦)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-1 w-full rounded-lg bg-transparent border border-nicon-green/20 px-3 py-2 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Payment reference</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. TRANS-12345 or Your Full Name"
                className="mt-1 w-full rounded-lg bg-transparent border border-nicon-green/20 px-3 py-2 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Upload screenshot</label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-none file:bg-nicon-green file:text-white cursor-pointer"
                />
              </div>
            </div>

            {previewUrl && (
              <div className="rounded-lg overflow-hidden border border-nicon-green/10">
                <img src={previewUrl} alt="preview" className="w-full h-56 object-cover" />
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={uploading || submitting}
                className={
                  "w-full py-3 rounded-lg font-semibold transition-all"
                  //,
                  // uploading || submitting
                  //   ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  //   : "bg-nicon-green text-white hover:bg-nicon-lime"
                }
              >
                {uploading ? "Uploading..." : submitting ? "Submitting..." : "Submit Payment"}
              </button>
            </div>

            {message && <p className="text-sm text-gray-300 mt-2">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
