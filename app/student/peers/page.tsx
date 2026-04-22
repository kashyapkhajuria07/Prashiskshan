"use client";

import { useState } from "react";
import { useMockData } from "@/context/MockDataContext";
import { Badge } from "@/components/ui/Badge";
import { Users, Loader2, Video, Star, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function PeerExchange() {
  const { currentUserId, students, peerSessions } = useMockData();
  const [activeTab, setActiveTab] = useState('find');
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);

  const student = students.find(s => s.id === currentUserId);

  const handleMatch = () => {
    setIsMatching(true);
    // Simulate AI matching delay
    setTimeout(() => {
      setIsMatching(false);
      setMatches([
        { id: '1', name: 'Sophia L.', avatar: 'SL', course: 'B.Tech CS, IITB', matchScore: 94, offers: ['Python', 'Django'], wants: ['React'] },
        { id: '2', name: 'Rahul M.', avatar: 'RM', course: 'B.Des, NID', matchScore: 88, offers: ['Figma', 'UI Design'], wants: ['CSS'] },
      ]);
    }, 2000);
  };

  const handleRequest = (name: string) => {
    toast.success(`Session request sent to ${name}`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-[32px] leading-tight">Peer Exchange</h1>
          <p className="text-[#666] text-sm mt-1">Teach what you know. Learn what you don't.</p>
        </div>
        
        <div className="flex bg-[#E5E5E5]/50 p-1 rounded-lg overflow-x-auto shrink-0 hide-scrollbar">
          {['find', 'matches', 'sessions'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap capitalize transition-colors ${
                activeTab === tab ? 'bg-white text-[#111111] shadow-sm' : 'text-[#666] hover:text-[#111111]'
              }`}
            >
              {tab === 'find' ? 'Find Peers' : tab === 'matches' ? 'My Matches' : 'Sessions'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'find' && (
        <div className="space-y-6 animate-in fade-in">
           {/* Self Profile Card */}
           <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex-1 space-y-4">
                 <div>
                    <h3 className="font-medium text-lg mb-2">My Exchange Profile</h3>
                    <p className="text-sm text-[#666]">Keep your skills updated for better matching accuracy.</p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1 bg-[#FAFAFA] rounded-xl p-4 border border-[#E5E5E5]">
                       <div className="text-xs font-medium text-[#666] uppercase tracking-wider mb-3">Skills I Offer</div>
                       <div className="flex flex-wrap gap-2">
                          <Badge variant="info" className="pr-1 cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-200">React <span className="ml-1 opacity-50">×</span></Badge>
                          <Badge variant="info" className="pr-1 cursor-pointer">Tailwind <span className="ml-1 opacity-50">×</span></Badge>
                          <button className="text-[11px] font-jetbrains-mono bg-white border border-dashed border-[#999] text-[#666] px-2 py-0.5 rounded hover:border-[#111111] hover:text-[#111111]">+ Add</button>
                       </div>
                    </div>
                    <div className="flex-1 bg-[#FAFAFA] rounded-xl p-4 border border-[#E5E5E5]">
                       <div className="text-xs font-medium text-[#666] uppercase tracking-wider mb-3">Skills I Want</div>
                       <div className="flex flex-wrap gap-2">
                          <Badge variant="warning" className="pr-1 cursor-pointer">Python <span className="ml-1 opacity-50">×</span></Badge>
                          <Badge variant="warning" className="pr-1 cursor-pointer">UI Design <span className="ml-1 opacity-50">×</span></Badge>
                          <button className="text-[11px] font-jetbrains-mono bg-white border border-dashed border-[#999] text-[#666] px-2 py-0.5 rounded hover:border-[#111111] hover:text-[#111111]">+ Add</button>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="shrink-0 w-full md:w-auto bg-[#F7F6F3] p-5 rounded-xl border border-[#E5E5E5] text-center">
                 <div className="text-[11px] font-medium text-[#666] uppercase tracking-wider mb-1">Career Readiness</div>
                 <div className="font-jetbrains-mono text-[32px] text-[#111111]">{student?.readinessScore}<span className="text-base text-[#999]">/100</span></div>
              </div>
           </div>

           <div className="flex justify-center py-4">
              <button 
                 onClick={handleMatch}
                 disabled={isMatching}
                 className="bg-[#111111] text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-black/90 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                 {isMatching ? (
                    <><Loader2 size={18} className="animate-spin" /> <span className="font-jetbrains-mono text-sm">Analyzing profile...</span></>
                 ) : (
                    <>Find Matches ✨</>
                 )}
              </button>
           </div>

           {matches.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4">
                 {matches.map(m => (
                    <div key={m.id} className="bg-white border border-[#E5E5E5] rounded-[12px] p-5 flex flex-col justify-between hover:border-[#111111] transition-colors group">
                       <div>
                          <div className="flex justify-between items-start mb-4">
                             <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center font-medium font-inter group-hover:bg-[#111111] group-hover:text-white group-hover:border-[#111111] transition-all">{m.avatar}</div>
                                <div>
                                   <div className="font-medium text-lg leading-tight">{m.name}</div>
                                   <div className="text-xs text-[#666] mt-0.5">{m.course}</div>
                                </div>
                             </div>
                             <Badge variant="success">{m.matchScore}% Match</Badge>
                          </div>

                          <div className="space-y-3 mb-6">
                             <div className="flex gap-2 items-center">
                                <span className="text-[11px] text-[#666] w-14">Offers:</span>
                                <div className="flex gap-1.5 flex-wrap">
                                   {m.offers.map((s:string) => <Badge key={s} variant="info">{s}</Badge>)}
                                </div>
                             </div>
                             <div className="flex gap-2 items-center">
                                <span className="text-[11px] text-[#666] w-14">Wants:</span>
                                <div className="flex gap-1.5 flex-wrap">
                                   {m.wants.map((s:string) => <Badge key={s} variant="warning">{s}</Badge>)}
                                </div>
                             </div>
                          </div>
                       </div>
                       
                       <button onClick={() => handleRequest(m.name)} className="w-full bg-[#FAFAFA] border border-[#E5E5E5] text-[#111111] py-2 rounded-lg text-sm font-medium hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors">
                          Request Session →
                       </button>
                    </div>
                 ))}
              </div>
           )}
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-8 animate-in fade-in">
           <div>
              <h3 className="font-medium text-lg mb-4">Upcoming Sessions</h3>
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                       <div className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center font-medium">PK</div>
                       <div>
                          <div className="font-medium text-base">Priya K.</div>
                          <div className="text-sm text-[#666]">Skill Exchange: You teach <strong className="text-[#111]">React</strong>, Priya teaches <strong className="text-[#111]">Python</strong></div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                       <div className="text-sm font-jetbrains-mono bg-[#FAFAFA] px-3 py-1.5 rounded border border-[#E5E5E5] flex items-center gap-2">
                          <Calendar size={14} className="text-[#666]"/> Today, 4 PM
                       </div>
                       <button className="bg-[#111111] text-white px-4 py-2 rounded text-sm font-medium hover:bg-black/90 transition-colors flex items-center gap-2">
                          Join Call <Video size={14}/>
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           <div>
              <h3 className="font-medium text-lg mb-4">Completed Sessions</h3>
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] overflow-hidden">
                 <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FAFAFA]/50 group">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-[#E5E5E5] text-[#666] flex items-center justify-center font-medium">AK</div>
                       <div>
                          <div className="font-medium text-sm text-[#444]">Ankit Kumar</div>
                          <div className="text-xs text-[#999]">Learned: UI Design</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="text-xs font-jetbrains-mono text-[#999] hidden md:block">Apr 15, 2026</div>
                       <div className="flex items-center gap-1 text-[#D97706]">
                          <Star size={14} className="fill-[#D97706]" /><Star size={14} className="fill-[#D97706]" /><Star size={14} className="fill-[#D97706]" /><Star size={14} className="fill-[#D97706]" /><Star size={14} className="fill-[#D97706]" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
