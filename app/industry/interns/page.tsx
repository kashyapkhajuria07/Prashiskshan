"use client";

import { useMockData } from "@/context/MockDataContext";
import { Badge } from "@/components/ui/Badge";
import { Search, FileText, CheckSquare, XCircle, AlertCircle } from "lucide-react";

export default function ActiveInterns() {
  const { students, internships } = useMockData();
  const activeInterns = students.filter(s => s.internshipStatus === 'active');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-[32px] leading-tight">Active Interns</h1>
          <p className="text-[#666] text-sm mt-1">Monitor progress and evaluate your current interns.</p>
        </div>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm overflow-hidden flex flex-col">
         {/* Toolbar */}
         <div className="p-4 border-b border-[#E5E5E5] flex flex-col md:flex-row justify-between gap-4 bg-[#FAFAFA]/50">
            <div className="flex-1 max-w-md flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#E5E5E5] focus-within:border-[#111111] transition-colors">
               <Search size={16} className="text-[#999]" />
               <input 
                  type="text" 
                  placeholder="Search interns by name or role..." 
                  className="bg-transparent border-none outline-none w-full text-sm"
               />
            </div>
         </div>

         {/* Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-[#E5E5E5]">
                     <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase">Intern Info</th>
                     <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase">Role & Duration</th>
                     <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase">Progress (Logbook)</th>
                     <th className="px-6 py-4 text-xs font-medium text-[#666] uppercase text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#E5E5E5]">
                  {activeInterns.map(intern => (
                     <tr key={intern.id} className="hover:bg-[#FAFAFA] transition-colors group">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center font-medium font-inter">
                                 {intern.name.split(' ').map(n=>n[0]).join('')}
                              </div>
                              <div>
                                 <div className="font-medium text-[15px]">{intern.name}</div>
                                 <div className="text-[13px] text-[#666]">{intern.college}</div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="text-sm font-medium">Frontend Intern</div>
                           <div className="text-[13px] text-[#666] mt-0.5">Apr 1 - Jun 30 (3 Months)</div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="w-full max-w-[200px]">
                              <div className="flex justify-between items-center text-xs mb-1">
                                 <span className="text-[#666]">4 weeks done</span>
                                 <span className="font-medium text-[#16A34A]">33%</span>
                              </div>
                              <div className="h-1.5 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                                 <div className="h-full bg-[#16A34A]" style={{ width: `33%` }}></div>
                              </div>
                              <div className="text-xs text-[#999] mt-1.5 flex items-center gap-1">
                                 <FileText size={10} /> Last entry: Today
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                              <button className="px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] rounded hover:bg-[#FAFAFA] hover:text-[#111] transition-colors flex items-center gap-1">
                                 <FileText size={14}/> View Logbook
                              </button>
                              <button className="px-3 py-1.5 text-xs font-medium bg-[#111] text-white rounded hover:bg-black/90 transition-colors flex items-center gap-1">
                                 <CheckSquare size={14}/> Evaluate
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {activeInterns.length === 0 && (
                     <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-[#666]">
                           <AlertCircle className="mx-auto text-[#999] mb-2" size={24} />
                           No active interns found.
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
