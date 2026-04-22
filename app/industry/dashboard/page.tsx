"use client";

import { useMockData } from "@/context/MockDataContext";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Video, CheckCircle2 } from "lucide-react";

export default function IndustryDashboard() {
  const { applications, internships } = useMockData();
  
  const activeInternships = internships.filter(i => i.status === 'active');
  const pendingApps = applications.filter(a => a.status === 'Pending' || a.status === 'Shortlisted');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-instrument text-[32px]">Razorpay Dashboard</h1>
        <Badge variant="success" className="flex items-center gap-1"><CheckCircle2 size={12}/> Verified Partner</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Active Internship Openings</div>
            <div className="font-jetbrains-mono text-[28px]">{activeInternships.length}</div>
          </div>
        </Card>
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Applications Received</div>
            <div className="font-jetbrains-mono text-[28px]">{applications.length}</div>
          </div>
        </Card>
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Current Interns</div>
            <div className="font-jetbrains-mono text-[28px]">1</div>
          </div>
        </Card>
        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-sm text-[#666] mb-1">Avg. Intern Performance</div>
            <div className="font-jetbrains-mono text-[28px]">4.5 <span className="text-sm text-[#999]">/ 5</span></div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
               <CardTitle className="mb-0">Recent Applications</CardTitle>
               <Link href="/industry/applications" className="text-sm text-[#666] hover:text-[#111] hover:underline">View Kanban</Link>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-[#E5E5E5]">
                        <th className="pb-3 text-xs font-medium text-[#666] uppercase">Candidate</th>
                        <th className="pb-3 text-xs font-medium text-[#666] uppercase">Applied For</th>
                        <th className="pb-3 text-xs font-medium text-[#666] uppercase">Readiness</th>
                        <th className="pb-3 text-xs font-medium text-[#666] uppercase text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E5]">
                     {pendingApps.map(a => {
                        const internship = internships.find(i=>i.id === a.internshipId);
                        return (
                           <tr key={a.id} className="hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                              <td className="py-3 pr-4">
                                 <div className="font-medium text-[15px] text-[#111]">Arjun Kumar</div>
                                 <div className="text-[13px] text-[#666]">DY Patil COE</div>
                              </td>
                              <td className="py-3 px-4">
                                 <div className="text-sm">{internship?.title}</div>
                                 <div className="text-[12px] font-jetbrains-mono text-[#999]">{a.appliedOn}</div>
                              </td>
                              <td className="py-3 px-4">
                                 <span className="font-jetbrains-mono font-medium">74/100</span>
                              </td>
                              <td className="py-3 pl-4 text-right">
                                 {a.status === 'Pending' ? <Badge variant="info">New</Badge> : <Badge variant="warning">Reviewing</Badge>}
                              </td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardTitle>Upcoming Interviews</CardTitle>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-lg">
                  <div>
                     <div className="font-medium text-sm mb-1">Arjun Kumar</div>
                     <div className="text-xs text-[#666]">Frontend Intern</div>
                     <div className="text-xs font-jetbrains-mono text-[#444] mt-1">Today, 4:00 PM</div>
                  </div>
                  <button className="bg-[#111] text-white p-2 rounded-md hover:bg-black/90 transition-colors" title="Join Video Call">
                     <Video size={16} />
                  </button>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
