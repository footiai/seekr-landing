import { useState, ChangeEvent, KeyboardEvent } from 'react';
import Image from 'next/image';

interface Location {
  code: string;
  name: string;
}

interface Language {
  code: string;
  name: string;
}

interface SearchType {
  code: string;
  name: string;
}

interface TimeFilter {
  code: string;
  name: string;
}

interface Domain {
  code: string;
  name: string;
}

interface OrganicResult {
  position: number;
  title: string;
  link: string;
  snippet: string;
  domain: string;
  date: string;
}

interface AnswerBox {
  answer: string;
  title: string;
  source: string;
}

interface KnowledgeGraph {
  title: string;
  type: string;
  description: string;
  website: string;
  attributes: Record<string, string>;
}

interface ImageResult {
  position: number;
  title: string;
  imageUrl: string;
  source: string;
}

interface NewsResult {
  position: number;
  title: string;
  link: string;
  snippet: string;
  date: string;
  source: string;
  imageUrl: string;
}

interface PlaceResult {
  position: number;
  title: string;
  place_id: string;
  address: string;
  rating: number;
  reviews: number;
  type: string;
  phone: string;
}

interface SearchMetadata {
  status: string;
  query: string;
  location: string;
  language: string;
  search_type: string;
  total_results: string;
  search_time: string;
  page: number;
  results_per_page: number;
}

interface SearchResults {
  searchParameters: Record<string, string | number | boolean>;
  organic_results?: OrganicResult[];
  answerBox?: AnswerBox;
  knowledgeGraph?: KnowledgeGraph;
  images?: ImageResult[];
  news?: NewsResult[];
  places?: PlaceResult[];
  search_metadata: SearchMetadata;
}

interface CodeExamples {
  javascript: string;
  python: string;
  java: string;
  csharp: string;
  ruby: string;
  go: string;
}

interface LanguageTab {
  id: string;
  name: string;
  icon: string;
}

interface CodeExamplesSectionProps {
  generateCurlCommand: () => string;
  generateCodeExamples: () => CodeExamples;
  activeCodeTab: string;
  setActiveCodeTab: (tab: string) => void;
}

export default function SearchAPIPlayground() {
  const [query, setQuery] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [location, setLocation] = useState('us');
  const [language, setLanguage] = useState('en');
  const [specificLocation, setSpecificLocation] = useState('');
  const [searchType, setSearchType] = useState('search');
  const [numResults, setNumResults] = useState(10);
  const [page, setPage] = useState(1);
  const [autoCorrect, setAutoCorrect] = useState(true);
  const [timeFilter, setTimeFilter] = useState('');
  const [domain, setDomain] = useState('google.com');
  const [outputFormat, setOutputFormat] = useState('json');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('request');
  const [activeCodeTab, setActiveCodeTab] = useState('curl');

  const locations: Location[] = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'au', name: 'Australia' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
    { code: 'it', name: 'Italy' },
    { code: 'es', name: 'Spain' },
    { code: 'br', name: 'Brazil' },
    { code: 'mx', name: 'Mexico' },
    { code: 'jp', name: 'Japan' },
    { code: 'kr', name: 'South Korea' },
    { code: 'in', name: 'India' },
    { code: 'sg', name: 'Singapore' }
  ];

  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' }
  ];

  const searchTypes: SearchType[] = [
    { code: 'search', name: 'Web Search' },
    { code: 'images', name: 'Images' },
    { code: 'news', name: 'News' },
    { code: 'places', name: 'Places' },
    { code: 'videos', name: 'Videos' },
    { code: 'shopping', name: 'Shopping' }
  ];

  const timeFilters: TimeFilter[] = [
    { code: '', name: 'Any time' },
    { code: 'qdr:h', name: 'Past hour' },
    { code: 'qdr:d', name: 'Past 24 hours' },
    { code: 'qdr:w', name: 'Past week' },
    { code: 'qdr:m', name: 'Past month' },
    { code: 'qdr:y', name: 'Past year' }
  ];

  const domains: Domain[] = [
    { code: 'google.com', name: 'Google.com' },
    { code: 'google.co.uk', name: 'Google.co.uk' },
    { code: 'google.ca', name: 'Google.ca' },
    { code: 'google.de', name: 'Google.de' },
    { code: 'google.fr', name: 'Google.fr' },
    { code: 'google.com.br', name: 'Google.com.br' },
    { code: 'google.com.au', name: 'Google.com.au' },
    { code: 'google.co.jp', name: 'Google.co.jp' }
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const mockResults: SearchResults = {
        searchParameters: {
          q: query,
          gl: location,
          hl: language,
          type: searchType,
          num: numResults,
          page: page,
          autocorrect: autoCorrect,
          ...(specificLocation && { location: specificLocation }),
          ...(timeFilter && { tbs: timeFilter }),
          ...(domain !== 'google.com' && { domain: domain })
        },
        organic_results: [
          {
            position: 1,
            title: "Sample Search Result for Your Query",
            link: "https://example.com/result-1",
            snippet: "This is a sample search result snippet that demonstrates how your search API would return organic results for the given query parameters.",
            domain: "example.com",
            date: "2025-08-30"
          },
          {
            position: 2,
            title: "Another Relevant Result",
            link: "https://another-example.com/page",
            snippet: "Another sample result showing how multiple organic results would appear in the API response with proper formatting and structure.",
            domain: "another-example.com",
            date: "2025-08-29"
          },
          {
            position: 3,
            title: "Third Search Result Example",
            link: "https://third-example.com/article",
            snippet: "A third example demonstrating the consistency of result formatting across multiple search results in your API response.",
            domain: "third-example.com",
            date: "2025-08-28"
          }
        ],
        answerBox: searchType === 'search' ? {
          answer: "Sample answer box content that appears for certain queries",
          title: "Direct Answer",
          source: "https://trusted-source.com"
        } : undefined,
        knowledgeGraph: searchType === 'search' ? {
          title: "Sample Knowledge Graph",
          type: "Organization",
          description: "Sample description from knowledge graph",
          website: "https://example.com",
          attributes: {
            "Founded": "2024",
            "Industry": "Technology"
          }
        } : undefined,
        images: searchType === 'images' ? [
          {
            position: 1,
            title: "Sample Image Result",
            imageUrl: "https://via.placeholder.com/300x200/333/fff?text=Sample+Image+1",
            source: "https://example.com"
          },
          {
            position: 2,
            title: "Another Image Result",
            imageUrl: "https://via.placeholder.com/300x200/666/fff?text=Sample+Image+2",
            source: "https://another-example.com"
          }
        ] : undefined,
        news: searchType === 'news' ? [
          {
            position: 1,
            title: "Sample News Article",
            link: "https://news-example.com/article-1",
            snippet: "Sample news article snippet demonstrating news search results",
            date: "2 hours ago",
            source: "News Example",
            imageUrl: "https://via.placeholder.com/150x100/444/fff?text=News"
          }
        ] : undefined,
        places: searchType === 'places' ? [
          {
            position: 1,
            title: "Sample Business",
            place_id: "ChIJsample123456",
            address: "123 Sample Street, Sample City",
            rating: 4.5,
            reviews: 234,
            type: "Restaurant",
            phone: "+1 (555) 123-4567"
          }
        ] : undefined,
        search_metadata: {
          status: "Success",
          query: query,
          location: location,
          language: language,
          search_type: searchType,
          total_results: searchType === 'images' ? "About 2,345 images" : "About 1,234,567 results",
          search_time: "0.45 seconds",
          page: page,
          results_per_page: numResults
        }
      };

      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      setResults(mockResults);
    } catch {
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateCurlCommand = () => {
    const payload = {
      q: query,
      gl: location,
      hl: language,
      type: searchType,
      num: numResults,
      page: page,
      autocorrect: autoCorrect,
      ...(specificLocation && { location: specificLocation }),
      ...(timeFilter && { tbs: timeFilter }),
      ...(domain !== 'google.com' && { domain: domain })
    };

    return `curl -X POST "https://google.serper.dev/${searchType}" \\
-H "Content-Type: application/json" \\
-H "X-API-KEY: ${apiKey || 'YOUR_API_KEY'}" \\
-d '${JSON.stringify(payload, null, 2)}'`;
  };

  const generateCodeExamples = () => {
    const payload = {
      q: query,
      gl: location,
      hl: language,
      type: searchType,
      num: numResults,
      page: page,
      autocorrect: autoCorrect,
      ...(specificLocation && { location: specificLocation }),
      ...(timeFilter && { tbs: timeFilter }),
      ...(domain !== 'google.com' && { domain: domain })
    };

    return {
      javascript: `const response = await fetch('https://google.serper.dev/${searchType}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': '${apiKey || 'YOUR_API_KEY'}'
  },
  body: JSON.stringify(${JSON.stringify(payload, null, 4)})
});

const data = await response.json();
console.log(data);`,

      python: `import requests
import json

url = "https://google.serper.dev/${searchType}"
headers = {
    "X-API-KEY": "${apiKey || 'YOUR_API_KEY'}",
    "Content-Type": "application/json"
}
payload = ${JSON.stringify(payload, null, 4)}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print(data)`,

      java: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

String url = "https://google.serper.dev/${searchType}";
String payload = """
${JSON.stringify(payload, null, 4)}
""";

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("X-API-KEY", "${apiKey || 'YOUR_API_KEY'}")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(payload))
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,

      csharp: `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

var client = new HttpClient();
var url = "https://google.serper.dev/${searchType}";
var payload = @"${JSON.stringify(payload, null, 4)}";

client.DefaultRequestHeaders.Add("X-API-KEY", "${apiKey || 'YOUR_API_KEY'}");

var content = new StringContent(payload, Encoding.UTF8, "application/json");
var response = await client.PostAsync(url, content);
var result = await response.Content.ReadAsStringAsync();

Console.WriteLine(result);`,

      ruby: `require 'net/http'
require 'json'

uri = URI('https://google.serper.dev/${searchType}')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

payload = {
  q: "${query}",
  gl: "${location}",
  hl: "${language}",
  type: "${searchType}",
  num: ${numResults},
  page: ${page},
  autocorrect: ${autoCorrect}
}

request = Net::HTTP::Post.new(uri)
request['X-API-KEY'] = '${apiKey || 'YOUR_API_KEY'}'
request['Content-Type'] = 'application/json'
request.body = payload.to_json

response = http.request(request)
data = JSON.parse(response.body)
puts data`,

      go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    url := "https://google.serper.dev/${searchType}"
    payload := map[string]interface{}{
        "q": "${query}",
        "gl": "${location}",
        "hl": "${language}",
        "type": "${searchType}",
        "num": ${numResults},
        "page": ${page},
        "autocorrect": ${autoCorrect}
    }
    
    jsonPayload, _ := json.Marshal(payload)
    
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonPayload))
    req.Header.Set("X-API-KEY", "${apiKey || 'YOUR_API_KEY'}")
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Println(result)
}`
    };
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent mb-2">
            Hands-on API
          </h1>
          <p className="text-gray-400 text-lg">
            Test and explore our search API with real-time results
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border-2 border-white/40 shadow-2xl shadow-gray-500/30 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none"></div>
              <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-gray-700 to-transparent rounded-3xl opacity-20 blur-xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  API Configuration
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setApiKey(e.target.value)}
                      placeholder="Enter your API key..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Search Query
                    </label>
                    <input
                      type="text"
                      value={query}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                      placeholder="Enter your search query..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                      onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Search Type
                      </label>
                      <select
                        value={searchType}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSearchType(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                      >
                        {searchTypes.map(type => (
                          <option key={type.code} value={type.code} className="bg-gray-800">
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Results Count
                      </label>
                      <select
                        value={numResults}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setNumResults(parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                      >
                        <option value={10} className="bg-gray-800">10 results</option>
                        <option value={20} className="bg-gray-800">20 results</option>
                        <option value={50} className="bg-gray-800">50 results</option>
                        <option value={100} className="bg-gray-800">100 results</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Country (GL)
                      </label>
                      <select
                        value={location}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                      >
                        {locations.map(loc => (
                          <option key={loc.code} value={loc.code} className="bg-gray-800">
                            {loc.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Language (HL)
                      </label>
                      <select
                        value={language}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                      >
                        {languages.map(lang => (
                          <option key={lang.code} value={lang.code} className="bg-gray-800">
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Specific Location (Optional)
                    </label>
                    <input
                      type="text"
                      value={specificLocation}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSpecificLocation(e.target.value)}
                      placeholder="e.g., New York, NY or Paris, France"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Google Domain
                      </label>
                      <select
                        value={domain}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setDomain(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                      >
                        {domains.map(d => (
                          <option key={d.code} value={d.code} className="bg-gray-800">
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Time Filter
                      </label>
                      <select
                        value={timeFilter}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setTimeFilter(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                      >
                        {timeFilters.map(filter => (
                          <option key={filter.code} value={filter.code} className="bg-gray-800">
                            {filter.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Page
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={page}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPage(parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Auto Correct
                      </label>
                      <select
                        value={autoCorrect.toString()}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setAutoCorrect(e.target.value === 'true')}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                      >
                        <option value="true" className="bg-gray-800">Enabled</option>
                        <option value="false" className="bg-gray-800">Disabled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Format
                      </label>
                      <select
                        value={outputFormat}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setOutputFormat(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                      >
                        <option value="json" className="bg-gray-800">JSON</option>
                        <option value="html" className="bg-gray-800">HTML</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleSearch}
                    disabled={isLoading || !query.trim()}
                    className="w-full py-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 hover:from-gray-500 hover:via-gray-600 hover:to-gray-500 disabled:from-gray-800 disabled:via-gray-800 disabled:to-gray-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Searching...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Execute Search
                      </>
                    )}
                  </button>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border-2 border-white/40 shadow-2xl shadow-gray-500/30 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none"></div>
              <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-gray-700 to-transparent rounded-3xl opacity-20 blur-xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Code Examples
                </h2>
                
                <CodeExamplesSection 
                  generateCurlCommand={generateCurlCommand}
                  generateCodeExamples={generateCodeExamples}
                  activeCodeTab={activeCodeTab}
                  setActiveCodeTab={setActiveCodeTab}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border-2 border-white/40 shadow-2xl shadow-gray-500/30 relative overflow-hidden h-[700px] flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none"></div>
              <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-gray-700 to-transparent rounded-3xl opacity-20 blur-xl pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      API Response
                    </h2>
                    
                    <div className="flex bg-white/5 rounded-lg p-1">
                      <button
                        onClick={() => setActiveTab('request')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                          activeTab === 'request' 
                            ? 'bg-white/15 text-white shadow-lg' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Request
                      </button>
                      <button
                        onClick={() => setActiveTab('response')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                          activeTab === 'response' 
                            ? 'bg-white/15 text-white shadow-lg' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Response
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-auto">
                  {activeTab === 'request' && (
                    <div className="space-y-4">
                      <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                        <h3 className="text-white font-medium mb-3">Request Parameters</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Query:</span>
                            <span className="text-white">{query || 'Not set'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Type:</span>
                            <span className="text-white">{searchTypes.find(t => t.code === searchType)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Country (GL):</span>
                            <span className="text-white">{locations.find(l => l.code === location)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Language (HL):</span>
                            <span className="text-white">{languages.find(l => l.code === language)?.name}</span>
                          </div>
                          {specificLocation && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Location:</span>
                              <span className="text-white">{specificLocation}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-400">Results:</span>
                            <span className="text-white">{numResults}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Page:</span>
                            <span className="text-white">{page}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Domain:</span>
                            <span className="text-white">{domain}</span>
                          </div>
                          {timeFilter && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Time Filter:</span>
                              <span className="text-white">{timeFilters.find(t => t.code === timeFilter)?.name}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-400">Auto Correct:</span>
                            <span className="text-white">{autoCorrect ? 'Enabled' : 'Disabled'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'response' && (
                    <div>
                      {!results && !isLoading && (
                        <div className="text-center py-12">
                          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <p className="text-gray-500">Execute a search to see results here</p>
                        </div>
                      )}

                      {isLoading && (
                        <div className="text-center py-12">
                          <svg className="animate-spin w-8 h-8 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <p className="text-gray-400">Fetching search results...</p>
                        </div>
                      )}

                      {results && (
                        <div className="space-y-4">
                          <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                            <h3 className="text-white font-medium mb-3">Search Metadata</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-gray-400">Status:</span>
                                <span className="ml-2 text-green-400">{results.search_metadata.status}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Results:</span>
                                <span className="ml-2 text-white">{results.search_metadata.total_results}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Time:</span>
                                <span className="ml-2 text-white">{results.search_metadata.search_time}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Type:</span>
                                <span className="ml-2 text-white capitalize">{results.search_metadata.search_type}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Page:</span>
                                <span className="ml-2 text-white">{results.search_metadata.page}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Per Page:</span>
                                <span className="ml-2 text-white">{results.search_metadata.results_per_page}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                            <h3 className="text-white font-medium mb-3">Results Preview</h3>
                            <div className="space-y-3 max-h-48 overflow-y-auto">
                              {searchType === 'search' && results.organic_results?.map((result: OrganicResult, index: number) => (
                                <div key={index} className="border-l-2 border-gray-600 pl-3">
                                  <div className="text-blue-400 text-sm font-medium">{result.title}</div>
                                  <div className="text-green-400 text-xs">{result.domain}</div>
                                  <div className="text-gray-400 text-xs mt-1">{result.snippet}</div>
                                </div>
                              ))}
                              
                              {searchType === 'images' && results.images?.map((image: ImageResult, index: number) => (
                                <div key={index} className="flex items-center gap-3 border-l-2 border-gray-600 pl-3">
                                  <Image src={image.imageUrl} alt={image.title} width={48} height={32} className="w-12 h-8 object-cover rounded" />
                                  <div>
                                    <div className="text-blue-400 text-sm">{image.title}</div>
                                    <div className="text-green-400 text-xs">{new URL(image.source).hostname}</div>
                                  </div>
                                </div>
                              ))}
                              
                              {searchType === 'news' && results.news?.map((article: NewsResult, index: number) => (
                                <div key={index} className="border-l-2 border-gray-600 pl-3">
                                  <div className="text-blue-400 text-sm font-medium">{article.title}</div>
                                  <div className="text-green-400 text-xs">{article.source} • {article.date}</div>
                                  <div className="text-gray-400 text-xs mt-1">{article.snippet}</div>
                                </div>
                              ))}
                              
                              {searchType === 'places' && results.places?.map((place: PlaceResult, index: number) => (
                                <div key={index} className="border-l-2 border-gray-600 pl-3">
                                  <div className="text-blue-400 text-sm font-medium">{place.title}</div>
                                  <div className="text-yellow-400 text-xs">★ {place.rating} ({place.reviews} reviews)</div>
                                  <div className="text-gray-400 text-xs">{place.address}</div>
                                  <div className="text-green-400 text-xs">{place.type}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gray-900/50 rounded-xl border border-white/10 overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-white/10">
                              <h3 className="text-white font-medium">JSON Response</h3>
                              <button
                                onClick={() => navigator.clipboard.writeText(JSON.stringify(results, null, 2))}
                                className="px-3 py-1 bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm flex items-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                                Copy
                              </button>
                            </div>
                            <div className="p-4 overflow-auto max-h-80">
                              <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                                {JSON.stringify(results, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeExamplesSection({ generateCurlCommand, generateCodeExamples, activeCodeTab, setActiveCodeTab }: CodeExamplesSectionProps) {
  const codeExamples = generateCodeExamples();
  
  const languages: LanguageTab[] = [
    { id: 'curl', name: 'cURL', icon: '⚡' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'csharp', name: 'C#', icon: '💙' },
    { id: 'ruby', name: 'Ruby', icon: '💎' },
    { id: 'go', name: 'Go', icon: '🔷' }
  ];

  const getCodeContent = (langId: string): string => {
    if (langId === 'curl') return generateCurlCommand();
    return codeExamples[langId as keyof CodeExamples] || '';
  };

  const copyToClipboard = (content: string): void => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div>
      <div className="flex gap-1 mb-4 bg-white/5 rounded-xl p-2 overflow-x-auto">
        {languages.map(lang => (
          <button
            key={lang.id}
            onClick={() => setActiveCodeTab(lang.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
              activeCodeTab === lang.id
                ? 'bg-white/15 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{lang.icon}</span>
            {lang.name}
          </button>
        ))}
      </div>

      <div className="bg-gray-900/50 rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-white font-medium">
            {languages.find(l => l.id === activeCodeTab)?.name} Example
          </h3>
          <button
            onClick={() => copyToClipboard(getCodeContent(activeCodeTab))}
            className="px-3 py-1 bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-96">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
            {getCodeContent(activeCodeTab)}
          </pre>
        </div>
      </div>
    </div>
  );
}