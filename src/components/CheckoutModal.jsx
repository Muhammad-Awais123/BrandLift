// src/components/CheckoutModal.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const BANK_DETAILS = {
  accountTitle: "BRAND LIFT AGENCY",
  accountNumber: "00430981012749016",
  iban: "PK93BAHL0043098101274901",
  bankName: "Bank Al Habib",
};
const EMAIL = "Brandliftagency2024@gmail.com";
const ACCESS_KEY = "29434e4f-7d15-41f7-826b-e58664b70447";

const SITE_KEY = "2f122a86-6a10-4f80-a874-b10c7b86334c"; // Test key

const CheckoutModal = ({ onClose }) => {
  const { items, clearCart, total } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const copyBank = async () => {
    const text = `Account Title: ${BANK_DETAILS.accountTitle}\nBank: ${BANK_DETAILS.bankName}\nA/C No: ${BANK_DETAILS.accountNumber}\nIBAN: ${BANK_DETAILS.iban}\nEmail: ${EMAIL}`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Bank details copied to clipboard.");
    } catch {
      alert("Unable to copy automatically. Please copy manually.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!captchaToken) {
      alert("Please verify the captcha before submitting.");
      return;
    }

    setSubmitting(true);
    const form = new FormData(e.target);

    form.append("access_key", ACCESS_KEY);
    form.append("h-captcha-response", captchaToken);
    form.append(
      "items",
      JSON.stringify(
        items.map((it) => ({
          title: it.title,
          range: it.price,
          qty: it.qty,
        }))
      )
    );
    form.append("total", total);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.success) {
        alert("Order submitted successfully! We'll contact you soon.");
        clearCart();
        onClose();
      } else {
        alert("Submission failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Submission error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="relative z-50 w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-2xl p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900 max-h-screen overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Payment & Order Details
        </h3>
        <p className="text-sm sm:text-base opacity-70 mb-4">
          Send payment to the bank account below. We’ll notify you by email after verification.
        </p>

        <div className="rounded-lg p-4 bg-white/50 dark:bg-black/40 border mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex-1">
              <p className="text-xs sm:text-sm opacity-80">Bank Transfer Details</p>
              <p className="font-semibold">{BANK_DETAILS.accountTitle}</p>
              <p className="text-sm">{BANK_DETAILS.bankName}</p>
              <p className="text-sm">A/C No: {BANK_DETAILS.accountNumber}</p>
              <p className="text-sm">IBAN: {BANK_DETAILS.iban}</p>
            </div>
            <div className="flex flex-col gap-2 items-start sm:items-end">
              <button onClick={copyBank} className="text-sm underline">
                Copy Details
              </button>
              <a
                className="text-sm underline"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("Order from Website")}`}
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm mb-1 block">Your Name</label>
              <input
                name="name"
                required
                className="w-full rounded border px-3 py-2 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded border px-3 py-2 text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <label className="text-sm mb-1 block">Message (optional)</label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded border px-3 py-2 text-sm sm:text-base"
              placeholder="Any details, reference, or WhatsApp number"
            ></textarea>
          </div>

          {/* hCaptcha Widget */}
          <div className="mt-2">
            <HCaptcha sitekey={SITE_KEY} onVerify={setCaptchaToken} />
          </div>

          <div className="pt-2 border-t">
            <h4 className="font-semibold">Order Summary</h4>
            <div className="max-h-52 sm:max-h-60 overflow-y-auto mt-2">
              {items.map((it, i) => (
                <div key={i} className="flex justify-between text-sm sm:text-base py-1">
                  <div>
                    {it.title} x {it.qty}
                  </div>
                  <div>$ {it.price}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-semibold mt-2 border-t pt-2 text-sm sm:text-base">
              <span>Total</span>
              <span>$ {total}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-lg px-4 py-2 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-primary text-white rounded-lg px-4 py-2 text-sm sm:text-base"
            >
              {submitting ? "Submitting..." : "Submit Order"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
