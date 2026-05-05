"use client";

import { useState } from "react";
import { Search, Bookmark, ExternalLink, Filter, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const RESOURCES = [
  {
    id: "r1",
    title: "Product Management 101",
    type: "Course",
    platform: "Coursera",
    duration: "4 weeks",
    price: "Free",
    status: "completed",
    saved: true,
    aiInsight: "Essential for understanding core PM frameworks."
  },
  {
    id: "r2",
    title: "Inspired: How to Create Tech Products",
    type: "Book",
    platform: "Amazon",
    duration: "300 pages",
    price: "Paid",
    status: "in-progress",
    saved: true,
    aiInsight: "Industry standard reading. Focus on the 'Product Discovery' chapters."
  },
  {
    id: "r3",
    title: "Data for PMs Masterclass",
    type: "Course",
    platform: "Maven",
    duration: "2 weeks",
    price: "Paid",
    status: "not-started",
    saved: false,
    aiInsight: "Directly addresses your skill gap in Data Analysis."
  },
  {
    id: "r4",
    title: "Conducting Effective User Interviews",
    type: "Article",
    platform: "Medium",
    duration: "15 min read",
    price: "Free",
    status: "not-started",
    saved: false,
    aiInsight: "Quick read to prepare for your upcoming Phase 2 project."
  },
  {
    id: "r5",
    title: "Product School Community",
    type: "Community",
    platform: "Slack",
    duration: "Ongoing",
    price: "Free",
    status: "completed",
    saved: true,
    aiInsight: "Great place to network and find study buddies."
  },
  {
    id: "r6",
    title: "Build a PRD from scratch",
    type: "Project",
    platform: "Prashikshan",
    duration: "1 week",
    price: "Free",
    status: "not-started",
    saved: true,
    aiInsight: "Perfect portfolio piece. Includes template and peer review."
  }
];

export default function ResourcesTab() {
  const [filterType, setFilterType] = useState('All');
  const [savedOnly, setSavedOnly] = useState(false);

  const filteredResources = RESOURCES.filter(r => {
    if (filterType !== 'All' && r.type !== filterType) return false;
    if (savedOnly && !r.saved) return false;
    return true;
  });

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'Course': return <Badge variant="info">{type}</Badge>;
      case 'Book': return <Badge variant="warning">{type}</Badge>;
      case 'Project': return <Badge variant="success">{type}</Badge>;
      case 'Article': return <Badge variant="neutral">{type}</Badge>;
      case 'Community': return <Badge variant="neutral">{type}</Badge>;
      default: return <Badge variant="neutral">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* AI Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-[#111]" />
          <h3 className="font-instrument text-[24px]">Recommended for you this week</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RESOURCES.slice(2, 5).map(r => (
            <div key={`ai-${r.id}`} className="p-4 bg-[#F7F6F3] border border-[#E5E5E5] rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  {getTypeBadge(r.type)}
                  <div className="text-[11px] font-medium px-2 py-0.5 bg-white border border-[#E5E5E5] rounded text-[#111]">
                    {r.price}
                  </div>
                </div>
                <h4 className="font-medium text-[15px] mb-1">{r.title}</h4>
                <div className="text-[12px] text-[#666] mb-3">{r.platform} • {r.duration}</div>
                <p className="text-[13px] text-[#111] italic leading-relaxed">
                  "{r.aiInsight}"
                </p>
              </div>
              <button className="w-full mt-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-[13px] font-medium hover:border-[#111] transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Library */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="font-instrument text-[24px]">Resource Library</h3>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 w-full sm:w-64">
              <Search size={16} className="text-[#999] mr-2" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none outline-none w-full text-[13px]"
              />
            </div>
            <button className="p-2 border border-[#E5E5E5] rounded-lg bg-white hover:bg-[#F7F6F3] transition-colors">
              <Filter size={18} className="text-[#111]" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {['All', 'Course', 'Book', 'Project', 'Article', 'Community'].map(type => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
                filterType === type 
                  ? 'bg-[#111] text-white border-[#111]' 
                  : 'bg-white text-[#666] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]'
              }`}
            >
              {type}
            </button>
          ))}
          <div className="w-px h-6 bg-[#E5E5E5] mx-2"></div>
          <button 
            onClick={() => setSavedOnly(!savedOnly)}
            className={`px-3 py-1.5 rounded-full text-[13px] font-medium border transition-colors flex items-center gap-1.5 ${
              savedOnly 
                ? 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]' 
                : 'bg-white text-[#666] border-[#E5E5E5] hover:border-[#111] hover:text-[#111]'
            }`}
          >
            <Bookmark size={14} className={savedOnly ? 'fill-[#1D4ED8]' : ''} /> Saved
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(r => (
            <div key={r.id} className="bg-white border border-[#E5E5E5] rounded-xl overflow-hidden hover:border-[#111] transition-colors group flex flex-col">
              <div className="h-24 bg-[#F7F6F3] flex items-center justify-center p-4">
                {/* Mock Thumbnail */}
                <div className="w-full h-full bg-white rounded border border-[#E5E5E5] flex items-center justify-center">
                  <span className="font-instrument text-[20px] text-[#999] opacity-50">{r.title.substring(0, 15)}...</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  {getTypeBadge(r.type)}
                  <button className="text-[#999] hover:text-[#111] transition-colors">
                    <Bookmark size={18} className={r.saved ? 'fill-[#111] text-[#111]' : ''} />
                  </button>
                </div>
                <h4 className="font-medium text-[16px] mb-1 line-clamp-2">{r.title}</h4>
                <div className="text-[13px] text-[#666] mb-4">{r.platform} • {r.duration}</div>
                
                <div className="mt-auto pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                  <div className="text-[12px] font-medium px-2 py-0.5 bg-[#F7F6F3] rounded text-[#111]">
                    {r.price}
                  </div>
                  {r.status === 'completed' ? (
                    <div className="flex items-center text-[13px] font-medium text-[#16A34A]">
                      <CheckCircle2 size={16} className="mr-1" /> Completed
                    </div>
                  ) : (
                    <button className="text-[13px] font-medium text-[#111] hover:underline flex items-center">
                      Start <ExternalLink size={14} className="ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
