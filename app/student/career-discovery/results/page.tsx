"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMockData } from "@/context/MockDataContext";
import { CheckCircle2, Sparkles, ArrowRight, Info, Copy, Share, Download, TrendingUp, BarChart2, Shield } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

const RECOMMENDED_CAREERS = [
  {
    id: "c1",
    title: "Software Engineer",
    subtitle: "Build and optimize software systems",
    match: 94,
    description: "Design, develop, and maintain software applications. Solve technical challenges, write clean code, and collaborate with teams to ship products.",
    whyFits: "Matches your: analytical thinking, technical skills, love for problem-solving, preference for measurable impact",
    skillsHave: ["Python", "Data Structures", "Problem-solving"],
    skillsNeed: ["System Design", "Cloud Computing"],
    salary: "₹6-15 LPA (entry-level)",
    growth: 3
  },
  {
    id: "c2",
    title: "Data Scientist",
    subtitle: "Extract insights from complex data",
    match: 89,
    description: "Analyze large datasets to find patterns and trends. Build predictive models and algorithms to help businesses make data-driven decisions.",
    whyFits: "Matches your: analytical thinking, technical aptitude, attention to detail, logic-driven approach",
    skillsHave: ["Python", "Problem-solving", "Statistics basics"],
    skillsNeed: ["Machine Learning", "Data Visualization", "SQL"],
    salary: "₹8-18 LPA (entry-level)",
    growth: 3
  },
  {
    id: "c3",
    title: "Product Manager",
    subtitle: "Lead the strategy and development of products",
    match: 84,
    description: "Identify customer needs and business objectives. Define product vision, prioritize features, and work with engineering to deliver solutions.",
    whyFits: "Matches your: systems thinking, desire for ownership, strategic mindset, big-picture perspective",
    skillsHave: ["Problem-solving", "Communication", "Logic"],
    skillsNeed: ["Agile/Scrum", "User Research", "Business Strategy"],
    salary: "₹10-20 LPA (entry-level)",
    growth: 3
  }
];

export default function ResultsPage() {
  const router = useRouter();
  const { currentUserId, students, updateStudent } = useMockData();
  const student = students.find(s => s.id === currentUserId);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  if (!student) return <div>Loading...</div>;

  const setTargetCareer = (careerTitle: string) => {
    updateStudent(currentUserId, { targetCareer: careerTitle, targetCareerProgress: 0 });
    router.push("/student/career-path");
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0FDF4] text-[#16A34A] rounded-full border border-[#BBF7D0] font-jetbrains-mono text-[11px] font-medium tracking-wide">
            <Sparkles size={12} /> YOUR CAREER TYPE
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="font-instrument text-[42px] md:text-[56px] leading-tight mb-4"
        >
          The Problem Solver
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="font-inter text-[16px] text-[#666666] max-w-xl mb-6"
        >
          You thrive on tackling complex challenges and creating systematic solutions.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F6F3] text-[#111111] rounded font-jetbrains-mono text-[13px]"
        >
          <Shield size={14} className="text-[#666]" /> 92% confidence match
        </motion.div>
      </div>

      {/* Personality Profile Card */}
      <Card className="max-w-3xl mx-auto border-[#E5E5E5] p-8 md:p-10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="space-y-8">
            <section>
              <h3 className="font-instrument text-[24px] mb-3">What drives you</h3>
              <ul className="space-y-2 text-[15px] text-[#111111]">
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
                  Deconstructing complex issues into manageable parts
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
                  Independent work with clear objectives
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
                  Continuous learning and intellectual stimulation
                </li>
              </ul>
            </section>
            
            <section>
              <h3 className="font-instrument text-[24px] mb-3">Your ideal environment</h3>
              <p className="text-[15px] text-[#666] leading-relaxed">
                You excel in environments that value innovation, provide autonomy, and reward deep, focused thinking over constant collaboration.
              </p>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="font-instrument text-[24px] mb-3">Your superpowers</h3>
              <div className="flex flex-wrap gap-2">
                {["Systems thinking", "Technical aptitude", "Attention to detail", "Persistence"].map(skill => (
                  <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F6F3] border border-[#E5E5E5] rounded-lg text-[13px] font-medium">
                    <CheckCircle2 size={14} className="text-[#111]" /> {skill}
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h3 className="font-instrument text-[24px] mb-3 text-[#B91C1C]">Growth areas</h3>
              <p className="text-[14px] text-[#666] leading-relaxed mb-2">
                Based on your profile, you may need to focus on:
              </p>
              <ul className="space-y-1.5 text-[14px] text-[#666]">
                <li className="flex gap-2"><span className="text-[#B91C1C]">•</span> Stakeholder communication</li>
                <li className="flex gap-2"><span className="text-[#B91C1C]">•</span> Delegating tasks to others</li>
                <li className="flex gap-2"><span className="text-[#B91C1C]">•</span> Balancing perfectionism with deadlines</li>
              </ul>
            </section>
          </div>

        </div>
      </Card>

      {/* Recommended Careers */}
      <div className="space-y-8">
        <div className="flex items-end justify-between">
          <h2 className="font-instrument text-[32px]">Top career matches for you</h2>
          <button className="text-[14px] font-medium text-[#666] hover:text-[#111] transition-colors flex items-center">
            Compare Careers <BarChart2 size={16} className="ml-1.5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RECOMMENDED_CAREERS.map((career) => (
            <Card key={career.id} className="p-6 md:p-8 flex flex-col justify-between border-[#E5E5E5] hover:border-[#111111] transition-colors relative group">
              <div className="absolute top-6 right-6 bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] px-2 py-1 rounded font-jetbrains-mono text-[11px] font-medium">
                {career.match}% match
              </div>
              
              <div>
                <h3 className="font-instrument text-[24px] md:text-[28px] mb-1">{career.title}</h3>
                <div className="text-[13px] text-[#666] mb-4">{career.subtitle}</div>
                <p className="text-[14px] text-[#111] leading-relaxed mb-6">
                  {career.description}
                </p>
                
                <div className="bg-[#F7F6F3] rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Sparkles size={16} className="text-[#111] mt-0.5 shrink-0" />
                    <p className="text-[13px] text-[#111] leading-relaxed">
                      {career.whyFits}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-[#666] font-medium mb-2">You have</div>
                    <div className="flex flex-wrap gap-1.5">
                      {career.skillsHave.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded text-[12px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] uppercase tracking-wider text-[#666] font-medium mb-2">To develop</div>
                    <div className="flex flex-wrap gap-1.5">
                      {career.skillsNeed.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] rounded text-[12px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between py-4 border-t border-[#E5E5E5] mb-6">
                  <div>
                    <div className="flex items-center gap-1.5 text-[12px] text-[#666] mb-1">
                      Salary Range <Info size={12} />
                    </div>
                    <div className="font-jetbrains-mono text-[14px]">{career.salary}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] text-[#666] mb-1">Growth Potential</div>
                    <div className="flex items-center justify-end gap-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i <= career.growth ? 'bg-[#111]' : 'bg-[#E5E5E5]'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setTargetCareer(career.title)}
                    className="flex-1 bg-[#111111] text-white py-3 rounded-lg font-medium hover:bg-black/90 transition-colors flex items-center justify-center"
                  >
                    Explore Path <ArrowRight size={16} className="ml-2" />
                  </button>
                  <button 
                    className="flex-1 bg-white border border-[#E5E5E5] text-[#111111] py-3 rounded-lg font-medium hover:border-[#111111] transition-colors"
                    onClick={() => setSelectedCareer(career.id)} // Simulating modal open
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-center gap-4 pt-10 border-t border-[#E5E5E5]">
        <button className="px-6 py-3 border border-[#E5E5E5] rounded-lg text-[14px] font-medium hover:border-[#111] transition-colors flex items-center">
          <Download size={16} className="mr-2" /> Save Results
        </button>
        <button className="px-6 py-3 border border-[#E5E5E5] rounded-lg text-[14px] font-medium hover:border-[#111] transition-colors flex items-center">
          <Share size={16} className="mr-2" /> Share with Mentor
        </button>
      </div>

    </div>
  );
}
