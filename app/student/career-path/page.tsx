"use client";

import { useState } from "react";
import { useMockData } from "@/context/MockDataContext";
import { Search, Target, LayoutGrid, CheckCircle2, Award } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import RoadmapTab from "@/components/career-path/RoadmapTab";
import SkillsTab from "@/components/career-path/SkillsTab";
import ResourcesTab from "@/components/career-path/ResourcesTab";
import MilestonesTab from "@/components/career-path/MilestonesTab";
import AnalyticsTab from "@/components/career-path/AnalyticsTab";

const CAREER_CATEGORIES = [
  "Technology", "Business", "Creative", "Healthcare", "Finance", "Education", "Social Impact", "Engineering"
];

const MOCK_CAREERS = [
  { id: "c1", category: "Technology", title: "Software Engineer", match: 94 },
  { id: "c2", category: "Technology", title: "Data Scientist", match: 89 },
  { id: "c3", category: "Business", title: "Product Manager", match: 84 },
  { id: "c4", category: "Creative", title: "UX Designer", match: 91 },
  { id: "c5", category: "Finance", title: "Investment Analyst", match: 65 },
];

export default function CareerPathPage() {
  const { currentUserId, students, updateStudent } = useMockData();
  const student = students.find(s => s.id === currentUserId);
  const [activeTab, setActiveTab] = useState('roadmap');
  const [activeCategory, setActiveCategory] = useState("Technology");

  if (!student) return <div>Loading...</div>;

  const handleSetTarget = (title: string) => {
    updateStudent(currentUserId, { targetCareer: title, targetCareerProgress: 0 });
  };

  const progress = student.targetCareerProgress || 0;
  const progressColor = progress < 33 ? '#D97706' : progress < 66 ? '#1D4ED8' : '#16A34A';

  // State: No target set
  if (!student.targetCareer) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#F7F6F3] flex items-center justify-center mb-8 text-[#111111]">
          <Target size={32} strokeWidth={1.5} />
        </div>
        <h1 className="font-instrument text-[36px] md:text-[48px] leading-tight mb-4 text-center">
          Set your target career
        </h1>
        <p className="font-inter text-[16px] text-[#666666] max-w-[560px] mb-10 text-center">
          Tell us your dream role and we'll create a personalized roadmap with resources, courses, and milestones to get you there.
        </p>

        {/* Search Input */}
        <div className="w-full max-w-[480px] mb-12 relative">
          <div className="flex items-center w-full bg-white rounded-xl px-4 py-3 border-2 border-[#E5E5E5] focus-within:border-[#111111] transition-colors shadow-sm">
            <Search size={20} className="text-[#999999] mr-3" />
            <input 
              type="text" 
              placeholder="e.g., Product Manager, Data Scientist..." 
              className="bg-transparent border-none outline-none w-full text-[16px] font-inter placeholder:text-[#999999]"
            />
          </div>
        </div>

        {/* Career Directory */}
        <div className="w-full space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid size={20} />
            <h2 className="font-instrument text-[24px]">Browse Careers</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 border-b border-[#E5E5E5] pb-4">
            {CAREER_CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${
                  activeCategory === cat ? 'bg-[#111] text-white' : 'bg-[#F7F6F3] text-[#666] hover:bg-[#E5E5E5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {MOCK_CAREERS.filter(c => c.category === activeCategory).map(career => (
              <div key={career.id} onClick={() => handleSetTarget(career.title)} className="cursor-pointer group">
                <Card className="p-6 border-[#E5E5E5] hover:border-[#111] transition-colors h-full">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant={career.match > 85 ? 'success' : 'warning'}>{career.match}% match</Badge>
                    <div className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Target size={14} className="text-[#111]" />
                    </div>
                  </div>
                  <h3 className="font-instrument text-[22px] mb-2">{career.title}</h3>
                  <p className="text-[13px] text-[#666]">Click to select as target career and generate roadmap.</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // State: Target set
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFF6FF] text-[#1D4ED8] rounded-full border border-[#BFDBFE] font-jetbrains-mono text-[11px] font-medium tracking-wide mb-3">
            <Target size={12} /> TARGET CAREER
          </div>
          <h1 className="font-instrument text-[36px] md:text-[42px] mb-2">{student.targetCareer}</h1>
          <button 
            onClick={() => updateStudent(currentUserId, { targetCareer: undefined })}
            className="text-[13px] text-[#666] hover:text-[#111] hover:underline transition-colors"
          >
            Change target →
          </button>
        </div>

        <div className="flex items-center gap-6">
          {/* Progress Ring */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center w-32 h-32 mb-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#E5E5E5]"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  style={{ color: progressColor }}
                  strokeDasharray={`${progress}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-jetbrains-mono text-[28px] font-medium leading-none mb-1">{progress}%</span>
              </div>
            </div>
            <span className="text-[14px] text-[#666]">Path completion</span>
          </div>

          {/* Quick Stats */}
          <div className="hidden sm:flex gap-4">
            <Card className="p-4 border-[#E5E5E5] w-32">
              <div className="text-[12px] text-[#666] mb-1 uppercase tracking-wide">Skills</div>
              <div className="font-jetbrains-mono text-[24px]">8<span className="text-[14px] text-[#999]">/15</span></div>
            </Card>
            <Card className="p-4 border-[#E5E5E5] w-32">
              <div className="text-[12px] text-[#666] mb-1 uppercase tracking-wide">Time Est.</div>
              <div className="font-jetbrains-mono text-[24px]">4<span className="text-[14px] text-[#999]">mo</span></div>
            </Card>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E5E5E5]">
        <div className="flex overflow-x-auto hide-scrollbar gap-8">
          {[
            { id: 'roadmap', label: 'Roadmap' },
            { id: 'skills', label: 'Skills' },
            { id: 'resources', label: 'Resources' },
            { id: 'milestones', label: 'Milestones' },
            { id: 'analytics', label: 'Analytics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-[15px] font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab.id ? 'text-[#111]' : 'text-[#666] hover:text-[#111]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'roadmap' && <RoadmapTab />}
        {activeTab === 'skills' && <SkillsTab />}
        {activeTab === 'resources' && <ResourcesTab />}
        {activeTab === 'milestones' && <MilestonesTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </div>

    </div>
  );
}
