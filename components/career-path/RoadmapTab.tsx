"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Play, ExternalLink, Calendar, PlusCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// Mock Roadmap Data
const PHASES = [
  {
    id: 1,
    title: "Foundation",
    duration: "0-3 months",
    status: "in-progress",
    description: "Build the core technical and theoretical knowledge required for this role.",
    tasks: [
      { id: "t1", title: "Complete 'Introduction to Product Management'", type: "Course", time: "2 weeks", priority: "high", status: "completed", platform: "Coursera" },
      { id: "t2", title: "Read 'Inspired' by Marty Cagan", type: "Reading", time: "1 week", priority: "high", status: "completed" },
      { id: "t3", title: "Learn basics of user research", type: "Course", time: "1 week", priority: "medium", status: "in-progress", platform: "Udemy" },
      { id: "t4", title: "Build a simple product roadmap", type: "Project", time: "1 week", priority: "high", status: "not-started" },
      { id: "t5", title: "Join product management communities", type: "Practice", time: "1 day", priority: "low", status: "not-started" }
    ]
  },
  {
    id: 2,
    title: "Intermediate",
    duration: "3-6 months",
    status: "not-started",
    description: "Apply your knowledge to practical projects and learn advanced frameworks.",
    tasks: [
      { id: "t6", title: "Complete 'Agile Product Management'", type: "Course", time: "2 weeks", priority: "high", status: "not-started" },
      { id: "t7", title: "Conduct 5 user interviews", type: "Project", time: "2 weeks", priority: "high", status: "not-started" },
      { id: "t8", title: "Learn SQL for PMs", type: "Course", time: "3 weeks", priority: "medium", status: "not-started" }
    ]
  },
  {
    id: 3,
    title: "Advanced",
    duration: "6-9 months",
    status: "not-started",
    description: "Master strategic thinking, data analysis, and cross-functional leadership.",
    tasks: [
      { id: "t9", title: "Product Strategy & Go-to-Market", type: "Course", time: "4 weeks", priority: "high", status: "not-started" },
      { id: "t10", title: "Build comprehensive portfolio case study", type: "Project", time: "4 weeks", priority: "high", status: "not-started" }
    ]
  },
  {
    id: 4,
    title: "Career-Ready",
    duration: "9-12 months",
    status: "not-started",
    description: "Prepare for interviews, build your network, and start applying.",
    tasks: [
      { id: "t11", title: "Mock PM interviews (x3)", type: "Practice", time: "2 weeks", priority: "high", status: "not-started" },
      { id: "t12", title: "Apply to 10 internships", type: "Practice", time: "4 weeks", priority: "high", status: "not-started" }
    ]
  }
];

export default function RoadmapTab() {
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1]); // Phase 1 open by default
  const [tasks, setTasks] = useState(PHASES);

  const togglePhase = (id: number) => {
    setExpandedPhases(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleTaskStatus = (phaseId: number, taskId: string) => {
    setTasks(prev => prev.map(phase => {
      if (phase.id !== phaseId) return phase;
      return {
        ...phase,
        tasks: phase.tasks.map(task => {
          if (task.id !== taskId) return task;
          return { ...task, status: task.status === 'completed' ? 'not-started' : 'completed' };
        })
      };
    }));
  };

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'Course': return <Badge variant="info">{type}</Badge>;
      case 'Reading': return <Badge variant="warning">{type}</Badge>;
      case 'Project': return <Badge variant="success">{type}</Badge>;
      default: return <Badge variant="neutral">{type}</Badge>;
    }
  };

  const getPriorityDots = (priority: string) => {
    let color = '';
    switch(priority) {
      case 'high': color = 'bg-[#DC2626]'; break;
      case 'medium': color = 'bg-[#D97706]'; break;
      case 'low': color = 'bg-[#16A34A]'; break;
    }
    return (
      <div className="flex gap-0.5">
        <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
        <div className={`w-1.5 h-1.5 rounded-full ${priority !== 'low' ? color : 'bg-[#E5E5E5]'}`} />
        <div className={`w-1.5 h-1.5 rounded-full ${priority === 'high' ? color : 'bg-[#E5E5E5]'}`} />
      </div>
    );
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      {/* Header Info */}
      <div className="flex items-start gap-4 p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl">
        <div className="mt-1"><CheckCircle2 size={20} className="text-[#16A34A]" /></div>
        <div>
          <h3 className="font-medium text-[#111] mb-1">AI-Generated Roadmap</h3>
          <p className="text-[13px] text-[#166534] leading-relaxed">
            This path is personalized based on your current skills. We skipped the "Python Basics" course since you're already proficient.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-[#E5E5E5] ml-4 md:ml-6 space-y-8 pb-8">
        {tasks.map((phase) => {
          const isExpanded = expandedPhases.includes(phase.id);
          const completedTasks = phase.tasks.filter(t => t.status === 'completed').length;
          const progress = (completedTasks / phase.tasks.length) * 100;

          return (
            <div key={phase.id} className="relative pl-8 md:pl-10">
              {/* Phase Node */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-white border-2 border-[#111111] flex items-center justify-center font-jetbrains-mono text-[13px] font-medium z-10">
                {phase.id}
              </div>

              {/* Phase Header */}
              <div 
                className={`cursor-pointer group ${isExpanded ? 'mb-4' : ''}`}
                onClick={() => togglePhase(phase.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="font-instrument text-[24px] md:text-[28px] group-hover:underline">Phase {phase.id}: {phase.title}</h2>
                    {phase.status === 'in-progress' && <Badge variant="info">In Progress</Badge>}
                    {phase.status === 'completed' && <Badge variant="success">Completed</Badge>}
                  </div>
                  {isExpanded ? <ChevronUp size={20} className="text-[#999]" /> : <ChevronDown size={20} className="text-[#999]" />}
                </div>
                
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-jetbrains-mono text-[13px] text-[#666]">{phase.duration}</span>
                  <div className="w-32 h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#111111]" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="font-jetbrains-mono text-[12px] text-[#999]">{completedTasks} / {phase.tasks.length} tasks</span>
                </div>
              </div>

              {/* Phase Content */}
              {isExpanded && (
                <div className="space-y-4">
                  <p className="text-[14px] text-[#666]">{phase.description}</p>
                  
                  <div className="space-y-3">
                    {phase.tasks.map(task => {
                      const isCompleted = task.status === 'completed';
                      return (
                        <div key={task.id} className={`p-4 rounded-xl border transition-colors ${isCompleted ? 'bg-[#FAFAFA] border-[#E5E5E5]' : 'bg-white border-[#E5E5E5] hover:border-[#111111]'}`}>
                          <div className="flex items-start gap-3">
                            
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleTaskStatus(phase.id, task.id); }}
                              className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isCompleted ? 'bg-[#16A34A] border-[#16A34A] text-white' : 'border-[#CCCCCC] hover:border-[#111111]'}`}
                            >
                              {isCompleted && <CheckCircle2 size={14} />}
                            </button>

                            <div className="flex-1">
                              <div className="flex flex-wrap gap-2 items-center mb-1">
                                <h4 className={`font-medium text-[15px] ${isCompleted ? 'text-[#999] line-through' : 'text-[#111]'}`}>
                                  {task.title}
                                </h4>
                                {!isCompleted && getTypeBadge(task.type)}
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#666]">
                                <span className="font-jetbrains-mono">Time: {task.time}</span>
                                <div className="flex items-center gap-1.5">
                                  <span>Priority:</span> {getPriorityDots(task.priority)}
                                </div>
                                {task.platform && <span>Platform: {task.platform}</span>}
                              </div>

                              {!isCompleted && (
                                <div className="mt-4 flex gap-3">
                                  {task.type === 'Course' || task.type === 'Reading' ? (
                                    <button className="text-[13px] font-medium text-[#111] hover:underline flex items-center">
                                      Start {task.type} <ExternalLink size={14} className="ml-1" />
                                    </button>
                                  ) : (
                                    <button className="text-[13px] font-medium text-[#111] hover:underline flex items-center">
                                      View Details <ExternalLink size={14} className="ml-1" />
                                    </button>
                                  )}
                                  <button className="text-[13px] font-medium text-[#666] hover:text-[#111] transition-colors flex items-center">
                                    <Calendar size={14} className="mr-1" /> Schedule
                                  </button>
                                </div>
                              )}
                              
                              {isCompleted && (
                                <div className="mt-2 text-[11px] font-jetbrains-mono text-[#999]">
                                  Completed on {new Date().toLocaleDateString()}
                                </div>
                              )}
                            </div>

                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <button className="w-full py-3 border border-dashed border-[#CCCCCC] rounded-xl text-[13px] font-medium text-[#666] hover:text-[#111] hover:border-[#111] transition-colors flex items-center justify-center gap-2">
                    <PlusCircle size={16} /> Add Custom Task
                  </button>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
