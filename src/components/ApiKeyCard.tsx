"use client";

import { useState } from "react";

interface ApiKey {
  id: number;
  token: string;
  requests_used: number;
  is_active: boolean;
  created_at: string;
  package: {
    name: string;
    request_limit: number;
  };
}

interface ApiKeyCardProps {
  apiKey: ApiKey;
  onDelete: (keyId: number) => void;
}

export default function ApiKeyCard({ apiKey, onDelete }: ApiKeyCardProps) {
  const [copiedKey, setCopiedKey] = useState<number | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Record<number, boolean>>({});

  const usage = (apiKey.requests_used / apiKey.package.request_limit) * 100;

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return "bg-red-500";
    if (usage >= 60) return "bg-orange-500";
    if (usage >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const copyToClipboard = async (text: string, keyId: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const toggleKeyVisibility = (keyId: number) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  return (
    <div className="bg-black/20 backdrop-blur-2xl rounded-lg border border-white/20 p-4 relative overflow-hidden group hover:border-white/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-medium text-white">
                Token #{apiKey.id}
              </h3>
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  apiKey.is_active
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                }`}
              >
                {apiKey.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Created on {new Date(apiKey.created_at).toLocaleDateString()} • {apiKey.requests_used.toLocaleString()} / {apiKey.package.request_limit.toLocaleString()} requests
            </div>
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400">Quota usage:</span>
                <span className="text-xs text-white font-medium">{usage.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${getUsageColor(usage)}`}
                  style={{ width: `${usage}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(apiKey.token, apiKey.id)}
              className="p-1.5 bg-black/30 border border-gray-700 rounded-md text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 relative"
            >
              {copiedKey === apiKey.id ? (
                <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => onDelete(apiKey.id)}
              className="p-1.5 bg-black/30 border border-gray-700 rounded-md text-gray-400 hover:text-red-400 hover:border-red-500/50 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-black/40 border border-gray-700 rounded-lg p-3 font-mono text-sm relative">
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-300 flex-1 pr-8">
              {visibleKeys[apiKey.id] ? apiKey.token : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleKeyVisibility(apiKey.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {visibleKeys[apiKey.id] ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {copiedKey === apiKey.id && (
                <span className="text-green-400 text-xs whitespace-nowrap animate-pulse">Copied!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
