"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { listTokens, createToken, deleteToken } from "@/lib/api";
import ApiKeyCard from "./ApiKeyCard";
import { toast } from "sonner";

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

export default function ApiKeysManager() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [keysPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatingKey, setGeneratingKey] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const fetchedKeys = await listTokens();
        setKeys(fetchedKeys);
      } catch (error) {
        toast.error("Failed to fetch API keys.");
        console.error("Failed to fetch API keys:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKeys();
  }, []);

  // Filter keys
  const filteredKeys = keys.filter((key) => {
    const matchesSearch =
      `Token #${key.id}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.token.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && key.is_active) ||
      (statusFilter === "inactive" && !key.is_active);
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastKey = currentPage * keysPerPage;
  const indexOfFirstKey = indexOfLastKey - keysPerPage;
  const currentKeys = filteredKeys.slice(indexOfFirstKey, indexOfLastKey);
  const totalPages = Math.ceil(filteredKeys.length / keysPerPage);

  // Create new key
  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;

    setGeneratingKey(true);
    try {
      const newKey = await createToken(newKeyName);
      setKeys([newKey, ...keys]);
      toast.success("API key created successfully!");
      setShowNewKeyModal(false);
      setNewKeyName("");
    } catch (error) {
      toast.error("Failed to create API key.");
      console.error("Failed to create API key:", error);
    } finally {
      setGeneratingKey(false);
    }
  };

  // Delete key
  const handleDeleteKey = async (keyId: number) => {
    try {
      await deleteToken(keyId);
      setKeys(keys.filter((key) => key.id !== keyId));
      toast.success("API key deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete API key.");
      console.error("Failed to delete API key:", error);
    } finally {
      setShowDeleteModal(null);
    }
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
              value: keys.filter((k) => k.is_active).length,
            },
            {
              title: "Total Requests",
              value: keys
                .reduce((acc, k) => acc + k.requests_used, 0)
                .toLocaleString(),
            },
            {
              title: "Average Usage",
              value:
                (keys.length > 0
                  ? Math.round(
                      keys.reduce(
                        (acc, k) =>
                          acc +
                          (k.requests_used / k.package.request_limit) * 100,
                        0,
                      ) / keys.length,
                    )
                  : 0) + "%",
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
          {isLoading ? (
            <div className="text-center text-gray-400">Loading keys...</div>
          ) : (
            currentKeys.map((key) => (
              <ApiKeyCard
                key={key.id}
                apiKey={key}
                onDelete={() => setShowDeleteModal(key.id)}
              />
            ))
          )}
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
