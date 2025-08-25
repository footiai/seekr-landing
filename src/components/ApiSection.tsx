'use client';

export default function ApiSection() {
  return (
    <section id="api" className="py-32 px-4 bg-gradient-to-b from-black via-gray-950/80 to-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-2xl opacity-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-sm font-medium text-gray-400 tracking-wider uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10">Search API Platform</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Powerful Search <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Monetization</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform your search queries into revenue streams. Create, sell, and monetize custom search requests through our advanced API marketplace.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features */}
          <div className="space-y-6">
            <div className="group bg-black/20 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500 hover:bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">Intelligent Search</h3>
                  <p className="text-gray-300 leading-relaxed">Advanced algorithms process complex queries and deliver precise results in real-time with machine learning optimization.</p>
                </div>
              </div>
            </div>

            <div className="group bg-black/20 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500 hover:bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">Revenue Generation</h3>
                  <p className="text-gray-300 leading-relaxed">Set custom pricing for your search requests and receive automatic payments for every query executed through your API.</p>
                </div>
              </div>
            </div>

            <div className="group bg-black/20 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500 hover:bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">Enterprise Performance</h3>
                  <p className="text-gray-300 leading-relaxed">Optimized infrastructure ensures lightning-fast responses and 99.9% uptime for your most demanding clients.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-black/30 backdrop-blur-2xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
            <div className="bg-white/10 px-8 py-4 border-b border-white/20 flex items-center justify-between">
              <h4 className="text-white font-semibold text-lg">API Request Example</h4>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="p-8">
              <pre className="text-sm text-gray-300 overflow-x-auto leading-relaxed">
                <code className="language-json">{`POST /api/search
{
  "query": "best restaurants NYC",
  "filters": {
    "location": "New York City",
    "category": "dining",
    "rating": ">= 4.5",
    "price_range": "$$-$$$"
  },
  "limit": 25,
  "sort": "relevance"
}

// Response
{
  "results": [...],
  "total_found": 1,247,
  "cost": 0.08,
  "execution_time": "89ms",
  "cache_hit": false
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <button className="group relative bg-gradient-to-r from-white/10 via-white/5 to-transparent backdrop-blur-sm text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/10 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 border border-white/20 hover:border-white/40 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              Start Monetizing
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  );
}