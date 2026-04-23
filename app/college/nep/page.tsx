"use client";

import { useCollegeData } from "@/context/CollegeDataContext";
import { 
  CheckCircle, FileText, Download, Target, Users, BookOpen, AlertCircle
} from "lucide-react";
import { useState } from "react";

export default function NEPCompliance() {
  const { stats, courses } = useCollegeData();
  
  const nepCoreCourses = courses.filter(c => c.isComplianceCore).length;
  const totalCourses = courses.length;
  const compliancePercentage = Math.round((nepCoreCourses / totalCourses) * 100);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1240px] mx-auto animate-in fade-in duration-300 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="font-instrument text-[32px] leading-none mb-1">NEP 2020 Compliance</h1>
          <p className="text-[#666] text-[14px]">Track alignment with the National Education Policy and UGC guidelines.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-lg text-[13px] font-medium hover:bg-black/90 transition-colors">
          <Download size={16}/> Generate Compliance Report
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-6 shadow-sm flex flex-col justify-between">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <Target size={20} className="text-blue-500" />
               <h3 className="font-medium text-[15px]">Curriculum Alignment</h3>
             </div>
             <span className="text-[12px] font-jetbrains-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Tier 1</span>
           </div>
           
           <div className="flex items-end gap-3 mb-2">
             <div className="font-jetbrains-mono text-[42px] leading-none text-[#111]">{compliancePercentage}%</div>
             <div className="text-[13px] text-[#666] mb-1">Core mapping</div>
           </div>

           <div className="w-full bg-[#E5E5E5] h-1.5 rounded-full overflow-hidden mt-2">
             <div className="bg-blue-500 h-full" style={{ width: `${compliancePercentage}%` }}></div>
           </div>
         </div>

         <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-6 shadow-sm flex flex-col justify-between">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <BookOpen size={20} className="text-purple-500" />
               <h3 className="font-medium text-[15px]">ABC Framework</h3>
             </div>
             <span className="text-[12px] font-jetbrains-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Active</span>
           </div>
           
           <div className="flex items-end gap-3 mb-2">
             <div className="font-jetbrains-mono text-[42px] leading-none text-[#111]">100%</div>
             <div className="text-[13px] text-[#666] mb-1">Students enrolled</div>
           </div>

           <div className="text-[11px] text-[#666] bg-[#FAFAFA] p-2 border border-[#E5E5E5] rounded flex items-center gap-2">
             <CheckCircle size={12} className="text-green-500 shrink-0"/> All {stats.totalStudents} Academic Bank of Credit IDs generated
           </div>
         </div>

         <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-6 shadow-sm flex flex-col justify-between border-t-4 border-t-amber-500">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <Users size={20} className="text-amber-500" />
               <h3 className="font-medium text-[15px]">Multidisciplinary</h3>
             </div>
             <span className="text-[12px] font-jetbrains-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded">Attention</span>
           </div>
           
           <div className="flex items-end gap-3 mb-2">
             <div className="font-jetbrains-mono text-[42px] leading-none text-[#111]">12%</div>
             <div className="text-[13px] text-[#666] mb-1">Cross-enrollment</div>
           </div>

           <div className="text-[11px] text-[#666] bg-amber-50/50 p-2 border border-amber-100 rounded flex items-start gap-2">
             <AlertCircle size={12} className="text-amber-500 shrink-0 mt-0.5"/> Target is 30%. Increase open elective offerings across departments.
           </div>
         </div>

      </div>

      {/* Master Checklist */}
      <div className="bg-white border border-[#E5E5E5] rounded-[16px] overflow-hidden shadow-sm">
         <div className="p-6 border-b border-[#E5E5E5]">
            <h2 className="font-instrument text-[24px]">Implementation Checklist</h2>
            <p className="text-[#666] text-[13px] mt-1">UGC Guidelines Tracking for Academic Year 2026-27</p>
         </div>

         <div className="divide-y divide-[#E5E5E5]">
            
            {/* ITEM 1 */}
            <div className="p-6 flex gap-4 hover:bg-[#FAFAFA] transition-colors group">
               <div className="mt-1">
                 <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center"><CheckCircle size={12}/></div>
               </div>
               <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                     <h3 className="font-medium text-[15px] text-[#111]">Academic Bank of Credits (ABC) Integration</h3>
                     <span className="text-[11px] font-medium uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded">Completed</span>
                  </div>
                  <p className="text-[13px] text-[#666] mb-3">All student IDs mapped to DigiLocker and ABC portal for direct credit deposition.</p>
                  <button className="text-[12px] font-medium text-[#111] hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FileText size={12}/> View Documentation
                  </button>
               </div>
            </div>

            {/* ITEM 2 */}
            <div className="p-6 flex gap-4 hover:bg-[#FAFAFA] transition-colors group">
               <div className="mt-1">
                 <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                   <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
                 </div>
               </div>
               <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                     <h3 className="font-medium text-[15px] text-[#111]">Multiple Entry & Exit Options</h3>
                     <span className="text-[11px] font-medium uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">In Progress</span>
                  </div>
                  <p className="text-[13px] text-[#666] mb-3">Certificate structure for 1-year exit approved. Diploma structure for 2-year exit under faculty review.</p>
                  <div className="flex flex-col gap-2 w-full max-w-sm mb-3">
                     <div className="flex justify-between text-[11px] font-jetbrains-mono text-[#999]"><span>Faculty Review</span> <span>60%</span></div>
                     <div className="h-1.5 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 w-[60%]"></div>
                     </div>
                  </div>
                  <button className="text-[12px] font-medium bg-white border border-[#E5E5E5] px-3 py-1.5 rounded hover:border-[#111] transition-colors">
                    Review Pending Forms
                  </button>
               </div>
            </div>

            {/* ITEM 3 */}
            <div className="p-6 flex gap-4 hover:bg-[#FAFAFA] transition-colors group">
               <div className="mt-1">
                 <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                   <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
                 </div>
               </div>
               <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                     <h3 className="font-medium text-[15px] text-[#111]">Multidisciplinary & Holistic Education</h3>
                     <span className="text-[11px] font-medium uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">In Progress</span>
                  </div>
                  <p className="text-[13px] text-[#666] mb-3">Requirement: 30% of credits must be available as open pool electives across disciplines.</p>
                  <button className="text-[12px] font-medium text-[#111] hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <BookOpen size={12}/> View Curriculum Map
                  </button>
               </div>
            </div>

            {/* ITEM 4 */}
            <div className="p-6 flex gap-4 hover:bg-[#FAFAFA] transition-colors group">
               <div className="mt-1">
                 <div className="w-5 h-5 rounded-full border-2 border-[#E5E5E5] flex items-center justify-center"></div>
               </div>
               <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                     <h3 className="font-medium text-[15px] text-[#111]">Indian Knowledge Systems (IKS) Integration</h3>
                     <span className="text-[11px] font-medium uppercase tracking-wider text-[#666] bg-[#F7F6F3] px-2 py-0.5 rounded">Pending</span>
                  </div>
                  <p className="text-[13px] text-[#666] mb-3">Mandatory 2-credit course introduction required for absolute NEP certification.</p>
                  <button className="text-[12px] font-medium bg-[#111] text-white px-3 py-1.5 rounded hover:bg-black/90 transition-colors">
                    Assign Task to HOD
                  </button>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
