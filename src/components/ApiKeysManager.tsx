"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";

interface ApiKey {
  id: number;
  name: string;
  key: string;
  status: "active" | "inactive";
  usage: number;
  lastUsed: string;
  requests: number;
  createdAt: string;
}

interface VisibleKeys {
  [keyId: number]: boolean;
}

export default function ApiKeysManager() {
  const [keys, setKeys] = useState<ApiKey[]>([
    {
      id: 1,
      name: "Production Web App",
      key: "ak_live_7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6i7j8k9l0m",
      status: "active",
      usage: 85,
      lastUsed: "2 hours ago",
      requests: 15420,
      createdAt: "Jan 15, 2025",
    },
    {
      id: 2,
      name: "Local Testing",
      key: "ak_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0",
      status: "inactive",
      usage: 12,
      lastUsed: "3 days ago",
      requests: 234,
      createdAt: "Jan 10, 2025",
    },
    {
      id: 3,
      name: "Mobile App v2",
      key: "ak_live_z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4z3y2x1w0v9u8t7s6r5q4p3o2n1m0",
      status: "active",
      usage: 67,
      lastUsed: "1 hour ago",
      requests: 8967,
      createdAt: "Jan 08, 2025",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [keysPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatingKey, setGeneratingKey] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<number | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<VisibleKeys>({});

  // Toggle key visibility
  const toggleKeyVisibility = (keyId: number) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  // Filter keys
  const filteredKeys = keys.filter((key) => {
    const matchesSearch =
      key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.key.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || key.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastKey = currentPage * keysPerPage;
  const indexOfFirstKey = indexOfLastKey - keysPerPage;
  const currentKeys = filteredKeys.slice(indexOfFirstKey, indexOfLastKey);
  const totalPages = Math.ceil(filteredKeys.length / keysPerPage);

  // Generate random API key
  const generateApiKey = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "ak_live_";
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Create new key
  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;

    setGeneratingKey(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newKey: ApiKey = {
      id: keys.length + 1,
      name: newKeyName,
      key: generateApiKey(),
      status: "active" as const,
      usage: 0,
      lastUsed: "Never",
      requests: 0,
      createdAt: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setKeys([newKey, ...keys]);
    setNewKeyName("");
    setShowNewKeyModal(false);
    setGeneratingKey(false);
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, keyId: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Delete key
  const handleDeleteKey = (keyId: number) => {
    setKeys(keys.filter((key) => key.id !== keyId));
    setShowDeleteModal(null);
  };

  // Update key name
  const handleUpdateKeyName = (keyId: number, newName: string) => {
    setKeys(
      keys.map((key) => (key.id === keyId ? { ...key, name: newName } : key)),
    );
    setEditingKey(null);
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return "bg-red-500";
    if (usage >= 60) return "bg-orange-500";
    if (usage >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden p-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/2 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:50px_50px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
            API{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Keys
            </span>
          </h1>
          <p className="text-gray-400">
            Manage your access keys for integration with our services
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { title: "Total Keys", value: keys.length },
            {
              title: "Active Keys",
              value: keys.filter((k) => k.status === "active").length,
            },
            {
              title: "Total Requests",
              value: keys
                .reduce((acc, k) => acc + k.requests, 0)
                .toLocaleString(),
            },
            {
              title: "Average Usage",
              value:
                Math.round(
                  keys.reduce((acc, k) => acc + k.usage, 0) / keys.length,
                ) + "%",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-black/20 backdrop-blur-2xl rounded-lg border border-white/20 p-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <div className="text-lg font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-black/20 backdrop-blur-2xl rounded-lg border border-white/20 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Search keys..."
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 pl-9 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 outline-none focus:border-gray-400 transition-all text-sm"
                />
                <svg
                  className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white outline-none focus:border-gray-400 transition-all text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Create Button */}
            <button
              onClick={() => setShowNewKeyModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white rounded-lg font-medium border border-white/30 hover:border-white/50 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap text-sm"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Key
            </button>
          </div>
        </div>

        {/* API Keys List */}
        <div className="space-y-3 mb-6">
          {currentKeys.map((key) => (
            <div
              key={key.id}
              className="bg-black/20 backdrop-blur-2xl rounded-lg border border-white/20 p-4 relative overflow-hidden group hover:border-white/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                  {/* Key Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {editingKey === key.id ? (
                        <input
                          type="text"
                          defaultValue={key.name}
                          onBlur={(e: ChangeEvent<HTMLInputElement>) =>
                            handleUpdateKeyName(key.id, e.target.value)
                          }
                          onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter") {
                              handleUpdateKeyName(key.id, (e.target as HTMLInputElement).value);
                            }
                          }}
                          className="text-lg font-medium text-white bg-transparent border-b border-gray-400 outline-none"
                          autoFocus
                        />
                      ) : (
                        <h3
                          className="text-lg font-medium text-white cursor-pointer hover:text-gray-300 transition-colors"
                          onClick={() => setEditingKey(key.id)}
                        >
                          {key.name}
                        </h3>
                      )}

                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          key.status === "active"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                        }`}
                      >
                        {key.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="text-xs text-gray-400 mb-2">
                      Created on {key.createdAt} • Last used: {key.lastUsed} •{" "}
                      {key.requests.toLocaleString()} requests
                    </div>

                    {/* Usage Bar */}
                    <div className="mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">
                          Quota usage:
                        </span>
                        <span className="text-xs text-white font-medium">
                          {key.usage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full transition-all duration-300 ${getUsageColor(
                            key.usage,
                          )}`}
                          style={{ width: `${key.usage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(key.key, key.id)}
                      className="p-1.5 bg-black/30 border border-gray-700 rounded-md text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 relative"
                    >
                      {copiedKey === key.id ? (
                        <svg
                          className="w-3.5 h-3.5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </button>

                    <button
                      onClick={() => setEditingKey(key.id)}
                      className="p-1.5 bg-black/30 border border-gray-700 rounded-md text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => setShowDeleteModal(key.id)}
                      className="p-1.5 bg-black/30 border border-gray-700 rounded-md text-gray-400 hover:text-red-400 hover:border-red-500/50 transition-all duration-200"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* API Key Display */}
                <div className="bg-black/40 border border-gray-700 rounded-lg p-3 font-mono text-sm relative">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-300 flex-1 pr-8">
                      {visibleKeys[key.id]
                        ? key.key
                        : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {visibleKeys[key.id] ? (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                      {copiedKey === key.id && (
                        <span className="text-green-400 text-xs whitespace-nowrap animate-pulse">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1.5 bg-black/30 border border-gray-700 rounded-md text-gray-400 hover:text-white hover:border-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2.5 py-1.5 rounded-md transition-all text-sm ${
                  currentPage === i + 1
                    ? "bg-white/20 border border-white/30 text-white"
                    : "bg-black/30 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1.5 bg-black/30 border border-gray-700 rounded-md text-gray-400 hover:text-white hover:border-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* New Key Modal */}
        {showNewKeyModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-black/40 backdrop-blur-2xl rounded-xl border border-white/20 p-6 max-w-md w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white mb-4">
                  New API Key
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Key Name
                    </label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production Mobile App"
                      className="w-full px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 outline-none focus:border-gray-400 transition-all text-sm"
                      disabled={generatingKey}
                    />
                  </div>

                  {generatingKey && (
                    <div className="bg-black/40 border border-gray-700 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-gray-300 text-sm">
                          Generating secure key...
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        setShowNewKeyModal(false);
                        setNewKeyName("");
                      }}
                      disabled={generatingKey}
                      className="flex-1 px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-all disabled:opacity-50 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateKey}
                      disabled={!newKeyName.trim() || generatingKey}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white rounded-lg font-medium border border-white/30 hover:border-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {generatingKey ? "Generating..." : "Create Key"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-black/40 backdrop-blur-2xl rounded-xl border border-white/20 p-6 max-w-md w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

              <div className="relative z-10">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2">
                    Delete API Key
                  </h2>
                  <p className="text-gray-400 mb-4 text-sm">
                    This action cannot be undone. The key will be permanently
                    removed.
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowDeleteModal(null)}
                      className="flex-1 px-3 py-2 bg-black/30 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-all text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteKey(showDeleteModal)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 hover:border-red-400/50 transition-all font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
