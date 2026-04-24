"use client";

import { INDUSTRY_MOCK_DATA } from "@/lib/mock/industry";
import { 
  Building, UserCheck, TrendingUp, Search, Calendar, Star, Send, 
  MapPin, PlusCircle, Inbox, Users, Plus, X, Eye, Sparkles, Building2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function IndustryOverview() {
  const { openings, candidates, interns, colleges } = INDUSTRY_MOCK_DATA;
  const activeOpenings = openings.filter(o => o.status === 'Active');
  const recentApps = candidates.slice(0, 10);
  const topCandidates = [...candidates].sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  const upcomingInterviews = candidates.filter(c => c.stage === 'Interview Scheduled').slice(0, 5);
  const currentInterns = interns.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header is handled by layout but we can put stats right away */}
      
      {/* 1. Hero Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Active Openings */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:border-[#CCCCCC] transition-colors">
          <div className="text-sm font-inter text-[#666] mb-2">Active Openings</div>
          <div className="font-jetbrains-mono text-[32px] text-[#111] leading-none mb-2">
            {activeOpenings.length}
          </div>
          <div className="text-[13px] text-[#666] mb-3">Roles across 4 locations</div>
          <div className="inline-flex items-center px-2 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] font-mono text-[11px] border border-[#BFDBFE]">
            ↑ 3 new this week
          </div>
        </div>

        {/* Total Applications */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:border-[#CCCCCC] transition-colors">
          <div className="text-sm font-inter text-[#666] mb-2">Total Applications</div>
          <div className="font-jetbrains-mono text-[32px] text-[#111] leading-none mb-2">
            {candidates.length}
          </div>
          <div className="text-[13px] text-[#666] mb-3">
            <span className="text-[#B45309] font-medium">42 unreviewed</span>
          </div>
          <Link href="/industry/pipeline" className="text-[12px] text-[#666] hover:text-[#111] underline underline-offset-2">
            Filter pipeline →
          </Link>
        </div>

        {/* Current Interns */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:border-[#CCCCCC] transition-colors">
          <div className="text-sm font-inter text-[#666] mb-2">Current Interns</div>
          <div className="font-jetbrains-mono text-[32px] text-[#111] leading-none mb-2">
            {interns.length}
          </div>
          <div className="text-[13px] text-[#666] mb-3">12 completing this month</div>
          <div className="flex items-center gap-1 text-[12px] text-[#111] font-medium">
            <Star size={12} className="fill-current" /> 4.2/5 avg. rating
          </div>
        </div>

        {/* Placement Success */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:border-[#CCCCCC] transition-colors">
          <div className="text-sm font-inter text-[#666] mb-2">Placement Success</div>
          <div className="font-jetbrains-mono text-[32px] text-[#111] leading-none mb-2">
            68%
          </div>
          <div className="text-[13px] text-[#666] mb-3">24 hired in last 12 months</div>
          <div className="inline-flex items-center px-2 py-0.5 rounded bg-[#ECFDF5] text-[#059669] font-mono text-[11px] border border-[#A7F3D0]">
            ↑ 12% YoY
          </div>
        </div>

        {/* Talent Pool Size */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:border-[#CCCCCC] transition-colors">
          <div className="text-sm font-inter text-[#666] mb-2">Talent Pool Size</div>
          <div className="font-jetbrains-mono text-[32px] text-[#111] leading-none mb-2">
            184
          </div>
          <div className="text-[13px] text-[#666] mb-3">14 new this week</div>
          <Link href="/industry/pool" className="text-[12px] text-[#111] font-medium hover:underline underline-offset-2 flex items-center gap-1">
            Explore Pool → 
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          {/* Application Funnel Mock */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-instrument text-[22px] text-[#111]">Application Funnel</h2>
              <select className="text-sm border border-[#E5E5E5] rounded-md px-2 py-1 outline-none">
                <option>All roles (Active)</option>
                <option>Engineering</option>
              </select>
            </div>
            
            <div className="w-full flex items-center justify-between gap-1 overflow-hidden">
              <div className="flex-1 min-w-[70px] flex flex-col items-center">
                <div className="w-full h-8 bg-[#F3F4F6] rounded flex items-center justify-center font-jetbrains-mono text-sm mb-2">{candidates.length}</div>
                <div className="text-[11px] text-[#666] text-center font-medium">Applied</div>
              </div>
              <div className="h-4 w-4 shrink-0 text-[#CCC]">→</div>
              <div className="flex-1 min-w-[70px] flex flex-col items-center">
                <div className="w-full h-8 bg-[#EFF6FF] rounded flex items-center justify-center font-jetbrains-mono text-sm mb-2 text-[#1D4ED8]">180</div>
                <div className="text-[11px] text-[#666] text-center font-medium">Reviewed</div>
              </div>
              <div className="h-4 w-4 shrink-0 text-[#CCC]">→</div>
              <div className="flex-1 min-w-[70px] flex flex-col items-center">
                <div className="w-full h-8 bg-[#EFF6FF] rounded flex items-center justify-center font-jetbrains-mono text-sm mb-2 text-[#1D4ED8]">45</div>
                <div className="text-[11px] text-[#666] text-center font-medium">Shortlist</div>
              </div>
              <div className="h-4 w-4 shrink-0 text-[#CCC]">→</div>
              <div className="flex-1 min-w-[70px] flex flex-col items-center">
                <div className="w-full h-8 bg-[#EFF6FF] rounded flex items-center justify-center font-jetbrains-mono text-sm mb-2 text-[#1D4ED8]">21</div>
                <div className="text-[11px] text-[#666] text-center font-medium">Interview</div>
              </div>
              <div className="h-4 w-4 shrink-0 text-[#CCC]">→</div>
              <div className="flex-1 min-w-[70px] flex flex-col items-center">
                <div className="w-full h-8 bg-[#ECFDF5] rounded flex items-center justify-center font-jetbrains-mono text-sm mb-2 text-[#059669]">8</div>
                <div className="text-[11px] text-[#666] text-center font-medium">Offer</div>
              </div>
              <div className="h-4 w-4 shrink-0 text-[#CCC]">→</div>
              <div className="flex-1 min-w-[70px] flex flex-col items-center">
                <div className="w-full h-8 bg-[#ECFDF5] rounded flex items-center justify-center font-jetbrains-mono text-sm mb-2 text-[#059669]">6</div>
                <div className="text-[11px] text-[#666] text-center font-medium">Accepted</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#E5E5E5] text-[12px] text-[#666] flex justify-between">
              <div>Conversion: <strong>25%</strong> Screening</div>
              <div><strong>38%</strong> Interview to Offer</div>
              <div><strong>75%</strong> Offer Acceptance</div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-instrument text-[22px] text-[#111]">Recent Applications</h2>
              <Link href="/industry/pipeline" className="text-sm text-[#111] font-medium hover:underline">View All →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E5E5]">
                    <th className="pb-3 text-[12px] font-medium text-[#666] uppercase tracking-wider">Candidate</th>
                    <th className="pb-3 text-[12px] font-medium text-[#666] uppercase tracking-wider">Applied For</th>
                    <th className="pb-3 text-[12px] font-medium text-[#666] uppercase tracking-wider">Readiness</th>
                    <th className="pb-3 text-[12px] font-medium text-[#666] uppercase tracking-wider">Date</th>
                    <th className="pb-3 text-[12px] font-medium text-[#666] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {recentApps.map((app) => (
                    <tr key={app.id} className="hover:bg-[#F9F9F9] transition-colors group">
                      <td className="py-3 pr-4">
                        <div className="font-medium text-[14px] text-[#111]">{app.name}</div>
                        <div className="text-[12px] text-[#666] truncate max-w-[120px]">{app.college}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-[13px] text-[#111]">{app.roleTitle}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono border ${
                          app.readinessScore > 75 ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]' : 
                          app.readinessScore > 60 ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]' : 
                          'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]'
                        }`}>
                          {app.readinessScore}/100
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-jetbrains-mono text-[12px] text-[#666]">{app.appliedAgo}</span>
                      </td>
                      <td className="py-3 pl-4 text-right">
                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-[#666] hover:text-[#111] hover:bg-[#E5E5E5] rounded"><Eye size={16}/></button>
                          <button className="p-1.5 text-[#666] hover:text-[#059669] hover:bg-[#ECFDF5] rounded"><Star size={16}/></button>
                          <button className="p-1.5 text-[#666] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded"><X size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Candidates This Week */}
          <div className="space-y-4">
            <h2 className="font-instrument text-[22px] text-[#111]">Top Candidates This Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topCandidates.map(c => (
                <div key={c.id} className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center font-medium font-inter">
                      {c.name.substring(0,2).toUpperCase()}
                    </div>
                    <div className="px-2 py-0.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded font-mono text-[11px] text-[#059669]">
                      {c.matchScore}% Match
                    </div>
                  </div>
                  <div className="font-medium text-[15px] text-[#111]">{c.name}</div>
                  <div className="text-[13px] text-[#666]">{c.roleTitle}</div>
                  <div className="text-[12px] text-[#999] mt-1 mb-4">{c.college} • {c.year}</div>
                  
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <button className="text-[12px] border border-[#E5E5E5] rounded-md py-1.5 font-medium hover:bg-[#F9F9F9] transition-colors">
                      Profile
                    </button>
                    <button className="text-[12px] bg-[#111] text-white rounded-md py-1.5 font-medium hover:bg-[#333] transition-colors">
                      Interview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h2 className="font-instrument text-[22px] text-[#111]">Upcoming Interviews</h2>
               <Link href="/industry/pipeline?view=interviews" className="text-[13px] font-medium hover:underline">View Calendar →</Link>
            </div>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-[#E5E5E5]">
              {upcomingInterviews.map((ui, idx) => (
                <div key={ui.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#F7F6F3] text-[#666] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <Calendar size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-[12px] border border-[#E5E5E5] bg-white shadow-sm hover:border-[#111] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-[14px]">{ui.name}</div>
                      <div className="font-jetbrains-mono text-[12px] text-[#666]">1{idx+2}:00 PM</div>
                    </div>
                    <div className="text-[13px] text-[#666] mb-3">{ui.roleTitle}</div>
                    <div className="flex items-center gap-2">
                       <span className="text-[11px] px-2 py-0.5 bg-[#F3F4F6] rounded text-[#4B5563]">Technical Round</span>
                       <button className="ml-auto text-[12px] font-medium text-[#1D4ED8] hover:underline">Join Call</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-8">
          
          {/* AI Hiring Insights */}
          <div className="bg-[#111] text-white rounded-[12px] p-6 shadow-md relative overflow-hidden">
             {/* Decorative subtle background pattern */}
             <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={120}/></div>
             
             <div className="flex items-center gap-2 mb-6">
                <Sparkles size={20} className="text-[#E5E5E5]" />
                <h2 className="font-instrument text-[22px]">Smart Insights</h2>
             </div>
             
             <div className="space-y-6 relative z-10">
                <div className="border-l-2 border-white/20 pl-4">
                   <p className="text-[14px] leading-relaxed mb-2 opacity-90">Candidates from IIT Delhi show 31% higher task completion rates in your engineering roles.</p>
                   <Link href="/industry/network" className="text-[13px] font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors">
                      Target recruitment there →
                   </Link>
                </div>
                <div className="border-l-2 border-white/20 pl-4">
                   <p className="text-[14px] leading-relaxed mb-2 opacity-90">Your frontend roles take avg. 12 days to fill vs. industry avg. 8 days.</p>
                   <Link href="/industry/openings" className="text-[13px] font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors">
                      Optimize screening process →
                   </Link>
                </div>
                <div className="border-l-2 border-white/20 pl-4">
                   <p className="text-[14px] leading-relaxed mb-2 opacity-90">87% of top performers had cloud certifications before joining.</p>
                   <Link href="/industry/post" className="text-[13px] font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors">
                      Add to requirements →
                   </Link>
                </div>
             </div>
             <button className="w-full mt-6 py-2 border border-white/20 rounded-md text-[13px] font-medium hover:bg-white/10 transition-colors">
                View All Insights
             </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
             <Link href="/industry/post" className="bg-white border border-[#E5E5E5] rounded-[10px] p-4 flex flex-col items-center justify-center gap-3 hover:border-[#111] hover:shadow-sm transition-all group">
                <div className="w-12 h-12 rounded-full bg-[#F7F6F3] group-hover:bg-[#111] group-hover:text-white flex items-center justify-center transition-colors">
                   <Plus size={24} />
                </div>
                <span className="text-[13px] font-medium text-center">Post New Role</span>
             </Link>
             <Link href="/industry/pipeline" className="bg-white border border-[#E5E5E5] rounded-[10px] p-4 flex flex-col items-center justify-center gap-3 hover:border-[#111] hover:shadow-sm transition-all group">
                <div className="w-12 h-12 rounded-full bg-[#F7F6F3] group-hover:bg-[#111] group-hover:text-white flex items-center justify-center transition-colors">
                   <Inbox size={24} />
                </div>
                <span className="text-[13px] font-medium text-center">Review Apps</span>
             </Link>
             <Link href="/industry/pipeline?view=interviews" className="bg-white border border-[#E5E5E5] rounded-[10px] p-4 flex flex-col items-center justify-center gap-3 hover:border-[#111] hover:shadow-sm transition-all group">
                <div className="w-12 h-12 rounded-full bg-[#F7F6F3] group-hover:bg-[#111] group-hover:text-white flex items-center justify-center transition-colors">
                   <Calendar size={24} />
                </div>
                <span className="text-[13px] font-medium text-center">Schedule</span>
             </Link>
             <button className="bg-white border border-[#E5E5E5] rounded-[10px] p-4 flex flex-col items-center justify-center gap-3 hover:border-[#111] hover:shadow-sm transition-all group">
                <div className="w-12 h-12 rounded-full bg-[#F7F6F3] group-hover:bg-[#111] group-hover:text-white flex items-center justify-center transition-colors">
                   <Send size={24} />
                </div>
                <span className="text-[13px] font-medium text-center">Send Offer</span>
             </button>
          </div>

          {/* Intern Performance Snapshot */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h2 className="font-instrument text-[20px] text-[#111]">Intern Snapshot</h2>
                <Link href="/industry/interns" className="text-[12px] font-medium hover:underline">See All</Link>
             </div>
             <div className="space-y-4">
                {currentInterns.map(inv => (
                   <div key={inv.id} className="flex items-center justify-between border-b last:border-0 border-[#E5E5E5] pb-3 last:pb-0">
                      <div>
                         <div className="font-medium text-[14px] text-[#111]">{inv.name}</div>
                         <div className="text-[12px] text-[#666] mb-1">{inv.role}</div>
                         <div className="w-32 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                            <div className={`h-full ${inv.status === 'On Track' ? 'bg-[#10B981]' : inv.status === 'Needs Attention' ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`} style={{ width: `${(inv.weekOut/inv.totalWeeks)*100}%`}}></div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="font-jetbrains-mono text-[11px] text-[#999] mb-1">Wk {inv.weekOut}/{inv.totalWeeks}</div>
                         <div className="flex items-center gap-0.5 justify-end">
                            <div className={`w-1.5 h-1.5 rounded-full ${inv.performance >= 1 ? 'bg-[#10B981]' : 'bg-[#E5E5E5]'}`}></div>
                            <div className={`w-1.5 h-1.5 rounded-full ${inv.performance >= 2 ? 'bg-[#10B981]' : 'bg-[#E5E5E5]'}`}></div>
                            <div className={`w-1.5 h-1.5 rounded-full ${inv.performance === 3 ? 'bg-[#10B981]' : 'bg-[#E5E5E5]'}`}></div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* College Partnerships */}
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h2 className="font-instrument text-[20px] text-[#111]">Top Partners</h2>
                <Link href="/industry/network" className="text-[12px] font-medium hover:underline">Network →</Link>
             </div>
             <div className="space-y-3">
                {colleges.slice(0, 3).map(col => (
                   <div key={col.id} className="flex items-center p-3 border border-[#E5E5E5] rounded-lg hover:border-[#CCC] transition-colors bg-[#FAFAFA]">
                      <div className="w-10 h-10 bg-[#E5E5E5] rounded flex items-center justify-center shrink-0 mr-3">
                         <Building2 size={18} className="text-[#666]" />
                      </div>
                      <div className="flex-1">
                         <div className="text-[14px] font-medium text-[#111]">{col.name}</div>
                         <div className="flex items-center text-[11px] text-[#666] gap-3 mt-1">
                            <span className="flex items-center gap-1"><Inbox size={10}/> {col.applicationsReceived}</span>
                            <span className="flex items-center gap-1"><UserCheck size={10}/> {col.internsHired} Placed</span>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
