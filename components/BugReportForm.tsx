"use client";
import React, { useEffect, useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { MdCheckCircle } from "react-icons/md";
import { BugReportFormProps } from "@/types/types";
import { useTheme } from "@/contexts/ThemeContext";

const BugReportForm = ({ onClose }: BugReportFormProps) => {
  const { isDarkMode } = useTheme();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const messageRegex = /^[\s\S]{1,300}$/;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const formValidation = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(form.name)) {
      newErrors.name =
        "Name must be 2-50 letters, spaces, apostrophes or hyphens only.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Description is required";
    } else if (!messageRegex.test(form.message)) {
      newErrors.message = "Message must be between 1 and 300 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValidation()) return;

    console.log("successfully submited bug:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const bgColor = isDarkMode ? "bg-[#29232f]" : "bg-gray-300";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const borderColor = isDarkMode ? "border-gray-600" : "border-gray-500";
  const inputBg = isDarkMode ? "bg-[#1f1b24]" : "bg-gray-100";
  const hoverSendBg = "hover:bg-[#312744]"
  const cancelHoverBg = isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-400";

  const iconColor = isDarkMode ? "text-violet-400" : "text-black";
  const submittedTextColor = isDarkMode ? "text-green-400" : "text-green-600";

  return (
    <div
      className={`
        fixed z-50 bottom-5 right-5
        max-[750px]:inset-0 max-[750px]:flex max-[750px]:items-center max-[750px]:justify-center max-[750px]:bg-black/40
      `}
    >
      <div
        className={`
          ${bgColor} ${textColor} p-6 rounded-xl w-full max-w-[400px] shadow-lg
          max-[750px]:m-4 max-[750px]:max-h-[90vh] max-[750px]:overflow-y-auto
        `}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Report a Bug</h2>
          <BiMailSend className={`text-3xl ${iconColor}`} />
        </div>

        {submitted ? (
          <div
            className={`flex items-center gap-x-[10px] text-md font-medium ${submittedTextColor}`}
          >
            <MdCheckCircle />
            <p>Your bug report has been submitted.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-sm mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                className={`
                  w-full p-2 rounded border ${borderColor} ${inputBg} ${textColor}
                `}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`
                  w-full p-2 rounded border ${borderColor} ${inputBg} ${textColor}
                `}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm mb-1">
                Bug Description
              </label>
              <textarea
                id="message"
                className={`
                  w-full p-2 rounded border ${borderColor} ${inputBg} ${textColor} h-24 resize-none
                `}
                placeholder="What went wrong?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className={`
                  flex-1 py-2 rounded bg-[#403358] ${hoverSendBg} transition-all cursor-pointer
                  ${isDarkMode ? "" : "text-white"}
                `}
              >
                Send
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`
                  flex-1 py-2 rounded border border-gray-700 ${cancelHoverBg} transition-all cursor-pointer
                  ${isDarkMode ? "" : "text-gray-700"}
                `}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BugReportForm;
