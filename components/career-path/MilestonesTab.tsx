"use client";

import { Trophy, CheckCircle2, ChevronRight, Download, Share, Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";

const MILESTONES = [
  {
    id: "m1",
    num: 1,
    title: "Foundation Complete",
    targetDate: "Completed on Oct 12, 2026",
    status: "achieved",
    description: "Built the core theoretical knowledge required for product management.",
    requirements: [
      "Complete 4 foundation courses",
      "Read 2 essential books",
      "Finish 1 practice project"
    ]
  },
  {
    id: "m2",
    num: 2,
    title: "First Certification",
    targetDate: "Target: Month 4",
    status: "in-progress",
    progress: 67,
    description: "Earn your first industry-recognized certification.",
    requirements: [
      "Pass 'Certified Product Manager' exam"
    ]
  },
  {
    id: "m3",
    num: 3,
    title: "Portfolio Project",
    targetDate: "Target: Month 6",
    status: "upcoming",
    description: "Build and document a complete product case study from scratch.",
    requirements: [
      "Conduct user research",
      "Define PRD and roadmap",
      "Create wireframes and prototypes"
    ]
  },
  {
    id: "m4",
    num: 4,
    title: "Career Launch",
    targetDate: "Target: Month 12",
    status: "upcoming",
    description: "Ready to apply for full-time roles or premium internships.",
    requirements: [
      "Complete all advanced skills",
      "Pass 3 mock interviews",
      "Apply to 10 roles"
    ]
  }
];

export default function MilestonesTab() {
  return (
    <div className="max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-6 bg-[#111] text-white rounded-2xl">
        <div>
          <h2 className="font-instrument text-[32px] mb-2 text-white">Your Milestone Journey</h2>
          <p className="text-[#A3A3A3] text-[15px] max-w-xl">
            Major checkpoints in your career path. Achieving milestones unlocks certificates and proves your readiness to employers.
          </p>
        </div>
        <div className="shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-white/10 border border-white/20">
          <Trophy size={40} className="text-[#FBBF24]" />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-[#E5E5E5] ml-6 md:ml-8 space-y-12 pb-12">
        {MILESTONES.map((milestone, index) => {
          const isAchieved = milestone.status === 'achieved';
          const isInProgress = milestone.status === 'in-progress';
          const isUpcoming = milestone.status === 'upcoming';
          
          return (
            <div key={milestone.id} className="relative pl-8 md:pl-12">
              
              {/* Node */}
              <div className={`absolute -left-[25px] top-0 w-12 h-12 rounded-full border-[3px] flex items-center justify-center bg-white z-10 transition-colors ${
                isAchieved ? 'border-[#16A34A] text-[#16A34A]' :
                isInProgress ? 'border-[#3B82F6] text-[#3B82F6]' :
                'border-[#E5E5E5] text-[#999]'
              }`}>
                {isAchieved ? <CheckCircle2 size={24} /> : <span className="font-jetbrains-mono font-medium">{milestone.num}</span>}
              </div>

              {/* Content Card */}
              <div className={`p-6 md:p-8 rounded-2xl border transition-all ${
                isAchieved ? 'bg-[#FAFAFA] border-[#E5E5E5]' :
                isInProgress ? 'bg-white border-[#111] shadow-sm' :
                'bg-white border-[#E5E5E5] opacity-80'
              }`}>
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-instrument text-[28px]">{milestone.title}</h3>
                      {isAchieved && <Badge variant="success">Achieved</Badge>}
                      {isInProgress && <Badge variant="info">In Progress</Badge>}
                      {isUpcoming && <Badge variant="neutral">Upcoming</Badge>}
                    </div>
                    <div className="font-jetbrains-mono text-[13px] text-[#666]">
                      {milestone.targetDate}
                    </div>
                  </div>
                  
                  {isAchieved && (
                    <div className="flex gap-2">
                      <button className="p-2 border border-[#E5E5E5] rounded-lg hover:border-[#111] transition-colors tooltip-trigger" title="Download Certificate">
                        <Download size={18} className="text-[#111]" />
                      </button>
                      <button className="p-2 border border-[#E5E5E5] rounded-lg hover:border-[#111] transition-colors tooltip-trigger" title="Share Achievement">
                        <Share size={18} className="text-[#111]" />
                      </button>
                    </div>
                  )}
                  {isUpcoming && (
                    <Lock size={20} className="text-[#CCC]" />
                  )}
                </div>

                <p className="text-[15px] text-[#666] mb-6 max-w-2xl">
                  {milestone.description}
                </p>

                {isInProgress && milestone.progress !== undefined && (
                  <div className="mb-6">
                    <div className="flex justify-between text-[12px] font-medium mb-2 text-[#666]">
                      <span>Progress</span>
                      <span>{milestone.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#EFF6FF] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${milestone.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-[#3B82F6]" 
                      />
                    </div>
                  </div>
                )}

                <div className="bg-[#F7F6F3] rounded-xl p-5 border border-[#E5E5E5]">
                  <h4 className="text-[13px] uppercase tracking-wider text-[#111] font-medium mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {milestone.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-[14px] text-[#666]">
                        <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${isAchieved ? 'bg-[#16A34A]' : 'bg-[#111]'}`} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {!isAchieved && (
                  <button className="mt-6 text-[14px] font-medium text-[#111] hover:underline flex items-center transition-colors">
                    View full details <ChevronRight size={16} className="ml-1" />
                  </button>
                )}

              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
