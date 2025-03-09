import React from "react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex flex-col items-center justify-center z-50">
      <svg
        className="animate-spin h-10 w-10 text-white mb-3"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <p className="text-lg text-white">Waiting process...</p>
    </div>
  );
}
