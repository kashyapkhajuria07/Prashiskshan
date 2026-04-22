"use client";

import { useState } from "react";
import { useMockData, Internship, Company } from "@/context/MockDataContext";
import { Badge } from "@/components/ui/Badge";
import { Search, X, MapPin, Briefcase, Calendar, ChevronRight, CornerDownRight, FileText } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DiscoverInternships() {
  const { internships, companies, addApplication, currentUserId } = useMockData();
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applyStep, setApplyStep] = useState(1);
  const router = useRouter();

  const handleApply = () => {
    if(!selectedInternship) return;
    addApplication({
      id: Math.random().toString(36).substring(7),
      studentId: currentUserId,
      internshipId: selectedInternship.id,
      appliedOn: new Date().toISOString().split('T')[0],
      status: 'Pending',
      timeline: [{ stage: 'Submitted', date: new Date().toISOString().split('T')[0], status: 'completed' }]
    });
    toast.success("Application submitted successfully!");
    setIsApplying(false);
    setSelectedInternship(null);
    setApplyStep(1);
    router.push('/student/applications');
  };

  const companyMap = new Map<string, Company>();
  companies.forEach(c => companyMap.set(c.id, c));

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col gap-4 shrink-0">
        <h1 className="font-instrument text-[32px]">Discover Internships</h1>
        
        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-[12px] border border-[#E5E5E5] shadow-sm flex flex-col gap-4 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#F7F6F3] rounded-lg border border-[#E5E5E5] focus-within:border-[#111111] transition-colors">
            <Search size={18} className="text-[#666]" />
            <input type="text" placeholder="Search roles, companies, locations..." className="bg-transparent border-none outline-none w-full text-base" />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center text-sm font-medium">
            <select className="px-3 py-1.5 border border-[#E5E5E5] rounded-md bg-white hover:border-[#111111] outline-none transition-colors">
              <option>Location</option>
              <option>Remote</option>
              <option>Bangalore</option>
            </select>
            <select className="px-3 py-1.5 border border-[#E5E5E5] rounded-md bg-white hover:border-[#111111] outline-none transition-colors">
              <option>Duration</option>
              <option>1-3 months</option>
              <option>3-6 months</option>
            </select>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="accent-[#111111]" />
              Remote Only
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="accent-[#111111]" />
              Verified Only
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Sidebar Facets */}
        <div className="w-60 shrink-0 overflow-y-auto hidden md:block space-y-6 pr-2">
          <div>
            <h4 className="font-medium mb-3 text-sm">Industry</h4>
            <div className="space-y-2 text-sm text-[#666]">
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#111111]"/> IT & Software</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#111111]"/> Finance</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#111111]"/> Design</label>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-3 text-sm">Skills Required</h4>
            <div className="space-y-2 text-sm text-[#666]">
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#111111]"/> React</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#111111]"/> Figma</label>
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#111111]"/> Python</label>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-12">
            {internships.map(internship => {
              const company = companyMap.get(internship.companyId);
              return (
                <div key={internship.id} className="bg-white p-5 rounded-[12px] border border-[#E5E5E5] flex flex-col justify-between hover:border-[#111111] hover:shadow-sm transition-all group">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 rounded bg-[#F3F4F6] flex items-center justify-center font-inter font-medium shrink-0">
                          {company?.name.substring(0, 2).toUpperCase() || 'C'}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg leading-tight group-hover:underline">{internship.title}</h3>
                          <p className="text-sm text-[#666]">{company?.name} {company?.verified && '✓'}</p>
                        </div>
                      </div>
                      {internship.matchScore && (
                        <Badge variant="success">{internship.matchScore}% match</Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="neutral">{internship.workMode}</Badge>
                      <Badge variant="neutral">{internship.location}</Badge>
                      <Badge variant="neutral">{internship.stipend}</Badge>
                      <Badge variant="neutral">{internship.duration}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-2 pt-4 border-t border-[#E5E5E5]/50">
                    <button 
                      onClick={() => setSelectedInternship(internship)}
                      className="flex-1 text-sm font-medium border border-[#E5E5E5] py-2 rounded-lg hover:border-[#111111] hover:bg-[#F3F4F6] transition-colors"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => { setSelectedInternship(internship); setIsApplying(true); setApplyStep(1); }}
                      className="flex-1 text-sm font-medium bg-[#111111] text-white py-2 rounded-lg hover:bg-black/90 transition-colors flex items-center justify-center gap-1"
                    >
                      Quick Apply <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedInternship && !isApplying && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-[720px] w-full rounded-[16px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white/80 backdrop-blur border-b border-[#E5E5E5] px-6 py-4 flex justify-between items-center z-10">
              <div className="font-instrument text-2xl">Role Details</div>
              <button onClick={() => setSelectedInternship(null)} className="p-2 hover:bg-[#F3F4F6] rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              {/* Header */}
              <div className="flex gap-4 items-center">
                 <div className="w-16 h-16 rounded-lg bg-[#F3F4F6] flex items-center justify-center font-inter font-medium text-xl shrink-0">
                    {companyMap.get(selectedInternship.companyId)?.name.substring(0, 2).toUpperCase()}
                 </div>
                 <div>
                   <h2 className="font-instrument text-[32px] leading-tight mb-1">{selectedInternship.title}</h2>
                   <div className="text-lg text-[#666]">{companyMap.get(selectedInternship.companyId)?.name}</div>
                 </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E5E5]">
                 <div>
                   <div className="flex items-center gap-1.5 text-xs text-[#666] mb-1 font-medium"><MapPin size={14}/> Location</div>
                   <div className="text-sm font-medium">{selectedInternship.location}</div>
                 </div>
                 <div>
                   <div className="flex items-center gap-1.5 text-xs text-[#666] mb-1 font-medium"><Briefcase size={14}/> Duration</div>
                   <div className="text-sm font-medium">{selectedInternship.duration}</div>
                 </div>
                 <div>
                   <div className="flex items-center gap-1.5 text-xs text-[#666] mb-1 font-medium"><CornerDownRight size={14}/> Stipend</div>
                   <div className="text-sm font-medium">{selectedInternship.stipend}</div>
                 </div>
                 <div>
                   <div className="flex items-center gap-1.5 text-xs text-[#666] mb-1 font-medium"><Calendar size={14}/> Start Date</div>
                   <div className="text-sm font-medium">Immediate</div>
                 </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <section>
                    <h3 className="font-medium text-lg mb-2">Description</h3>
                    <p className="text-[15px] leading-relaxed text-[#444]">
                      Join our team as a {selectedInternship.title} and work on real-world projects that impact millions of users. 
                      You will be mentored by senior engineers and get hands-on experience with modern tech stacks.
                    </p>
                  </section>
                  <section>
                    <h3 className="font-medium text-lg mb-2">Requirements</h3>
                    <ul className="list-disc list-inside text-[15px] space-y-1 text-[#444]">
                      <li>Strong understanding of basic computer science principles</li>
                      <li>Familiarity with web technologies (HTML, CSS, JS)</li>
                      <li>Problem-solving mindset and eagerness to learn</li>
                    </ul>
                  </section>
                </div>
                
                <div className="space-y-6">
                  <section>
                    <h3 className="font-medium text-lg mb-2">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                       {selectedInternship.skillsRequired.map(skill => (
                         <Badge key={skill} variant="info">{skill}</Badge>
                       ))}
                    </div>
                  </section>
                  <section>
                    <h3 className="font-medium text-lg mb-2">About Company</h3>
                    <p className="text-[14px] leading-relaxed text-[#666]">
                      {companyMap.get(selectedInternship.companyId)?.about}
                    </p>
                  </section>
                </div>
              </div>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="sticky bottom-0 bg-white border-t border-[#E5E5E5] p-4 px-6 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedInternship(null)}
                className="px-6 py-2.5 rounded-lg border border-[#E5E5E5] font-medium text-sm hover:bg-[#F3F4F6] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => { setIsApplying(true); setApplyStep(1); }}
                className="px-6 py-2.5 rounded-lg bg-[#111111] text-white font-medium text-sm hover:bg-black/90 transition-colors"
              >
                Apply Now →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-step Application Modal */}
      {selectedInternship && isApplying && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-[600px] w-full rounded-[16px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-[#E5E5E5] px-6 py-4 flex justify-between items-center bg-[#FAFAFA]">
              <div className="font-medium flex items-center gap-2">
                Apply for {selectedInternship.title}
                <span className="text-[#999] text-sm font-normal">at {companyMap.get(selectedInternship.companyId)?.name}</span>
              </div>
              <button onClick={() => { setIsApplying(false); setSelectedInternship(null); }} className="p-1 hover:bg-[#E5E5E5] rounded">
                <X size={18} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex h-1 bg-[#E5E5E5]">
              <div className="bg-[#111111] transition-all duration-300" style={{ width: `${(applyStep / 4) * 100}%` }}></div>
            </div>

            <div className="p-6 md:p-8 min-h-[300px]">
              {applyStep === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right-4">
                  <h3 className="font-instrument text-2xl">Why this role?</h3>
                  <p className="text-sm text-[#666]">Explain why you are a good fit for this internship.</p>
                  <textarea 
                    className="w-full h-32 p-3 border border-[#E5E5E5] rounded-lg outline-none focus:border-[#111111] font-inter text-sm resize-none"
                    placeholder="I am applying to this role because..."
                  ></textarea>
                  <div className="text-right text-[11px] font-jetbrains-mono text-[#999]">0 / 300 min chars</div>
                </div>
              )}

              {applyStep === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right-4">
                  <h3 className="font-instrument text-2xl">Relevant Skills</h3>
                  <p className="text-sm text-[#666]">Here are the skills required for this role. Check the ones you are confident in.</p>
                  <div className="space-y-2 mt-4">
                    {selectedInternship.skillsRequired.map(skill => (
                      <label key={skill} className="flex items-center gap-3 p-3 border border-[#E5E5E5] rounded-lg cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                        <input type="checkbox" className="accent-[#111111] w-4 h-4" defaultChecked />
                        <span className="font-medium text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {applyStep === 3 && (
                <div className="space-y-4 animate-in slide-in-from-right-4">
                  <h3 className="font-instrument text-2xl">Documents</h3>
                  <p className="text-sm text-[#666]">Upload your latest resume and an optional cover letter.</p>
                  
                  <div className="border-2 border-dashed border-[#E5E5E5] rounded-[12px] p-8 text-center hover:bg-[#FAFAFA] hover:border-[#111111] transition-colors cursor-pointer group">
                    <FileText className="mx-auto text-[#999] group-hover:text-[#111111] mb-2" size={32} />
                    <div className="font-medium text-sm">Click to upload Resume (PDF)</div>
                    <div className="text-xs text-[#666] mt-1">Or drag and drop here</div>
                  </div>
                </div>
              )}

              {applyStep === 4 && (
                <div className="space-y-6 animate-in slide-in-from-right-4">
                  <h3 className="font-instrument text-2xl">Review & Submit</h3>
                  <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-2">
                      <span className="text-sm text-[#666]">Role</span>
                      <span className="font-medium text-sm">{selectedInternship.title}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-2">
                      <span className="text-sm text-[#666]">Company</span>
                      <span className="font-medium text-sm">{companyMap.get(selectedInternship.companyId)?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#666]">Resume attached</span>
                      <span className="font-medium text-sm flex items-center text-[#16A34A]"><CheckSquare size={14} className="mr-1"/> Yes</span>
                    </div>
                  </div>
                  <Badge variant="warning">This will use 1 of your pending application slots.</Badge>
                </div>
              )}
            </div>

            <div className="bg-[#FAFAFA] border-t border-[#E5E5E5] p-4 px-6 flex justify-between items-center">
              <button 
                onClick={() => setIsApplying(false)}
                className="text-sm font-medium text-[#666] hover:text-[#111111] transition-colors"
              >
                Save as Draft
              </button>
              
              <div className="flex gap-3">
                {applyStep > 1 && (
                  <button 
                    onClick={() => setApplyStep(s => s - 1)}
                    className="px-4 py-2 rounded-lg border border-[#E5E5E5] font-medium text-sm hover:bg-[#F3F4F6] transition-colors"
                  >
                    Back
                  </button>
                )}
                <button 
                  onClick={() => {
                    if (applyStep < 4) setApplyStep(s => s + 1);
                    else handleApply();
                  }}
                  className="px-6 py-2 rounded-lg bg-[#111111] text-white font-medium text-sm hover:bg-black/90 transition-colors"
                >
                  {applyStep < 4 ? 'Next →' : 'Submit Application →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckSquare({ size, className }: { size: number, className: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
}
