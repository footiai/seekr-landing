'use client';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-4 bg-gradient-to-b from-black via-gray-950/80 to-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl opacity-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-sm font-medium text-gray-400 tracking-wider uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10">Pricing Plans</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Plan</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Start free and scale as you grow. No hidden fees, transparent pricing for every search request.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {/* Free Plan */}
          <div className="bg-black/20 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Starter</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  1K API calls/month
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  Basic search indexing
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  REST API access
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  Community docs
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  Email support
                </li>
              </ul>
              <button className="w-full bg-white/10 backdrop-blur-sm text-white py-3 rounded-xl font-semibold border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-black/20 backdrop-blur-2xl rounded-2xl p-8 border-2 border-white/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-semibold text-white">Developer</h3>
                  <span className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/30">Most Popular</span>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  100K API calls/month
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  ML-powered search
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  GraphQL + REST APIs
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  Webhook integrations
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  Real-time analytics
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white py-3 rounded-xl font-semibold border border-white/30 hover:border-white/50 hover:bg-white/25 transition-all duration-300 shadow-xl">
                Start Pro Trial
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-black/20 backdrop-blur-2xl rounded-2xl p-8 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Enterprise</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  Unlimited API calls
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  Custom AI models
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  Multi-region deployment
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  Dedicated infrastructure
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                  SLA guarantees
                </li>
              </ul>
              <button className="w-full bg-white/10 backdrop-blur-sm text-white py-3 rounded-xl font-semibold border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}