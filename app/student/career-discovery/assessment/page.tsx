"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Brain, Briefcase, Lightbulb, Users, SlidersHorizontal, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// MOCK QUESTIONS
const QUESTIONS = [
  {
    id: 1,
    type: "single_choice",
    category: "Interests",
    text: "What drives you most in your work?",
    options: [
      { id: "opt1", label: "Solving complex problems", desc: "Analyzing data, fixing bugs, finding efficiencies", icon: Brain },
      { id: "opt2", label: "Creating something new", desc: "Designing, writing, building from scratch", icon: Lightbulb },
      { id: "opt3", label: "Helping people directly", desc: "Mentoring, customer support, healthcare", icon: Users },
      { id: "opt4", label: "Leading and organizing teams", desc: "Managing projects, setting strategy", icon: Briefcase },
    ]
  },
  {
    id: 2,
    type: "multi_select",
    category: "Skills",
    text: "Which skills do you enjoy using? (Select all that apply)",
    options: [
      { id: "sk1", label: "Writing & Communication" },
      { id: "sk2", label: "Data Analysis" },
      { id: "sk3", label: "Coding & Programming" },
      { id: "sk4", label: "Visual Design" },
      { id: "sk5", label: "Public Speaking" },
      { id: "sk6", label: "Strategic Thinking" },
    ]
  },
  {
    id: 3,
    type: "slider",
    category: "Work Style",
    text: "How important is work-life balance to you?",
    minLabel: "Not important",
    maxLabel: "Extremely important",
    min: 1,
    max: 10
  },
  {
    id: 4,
    type: "ranking",
    category: "Environment",
    text: "Rank these work environments by preference (drag to reorder)",
    options: [
      { id: "env1", label: "Corporate office" },
      { id: "env2", label: "Startup environment" },
      { id: "env3", label: "Remote/flexible" },
      { id: "env4", label: "Field work/travel" },
      { id: "env5", label: "Creative studio" },
    ]
  },
  {
    id: 5,
    type: "open_ended",
    category: "Values",
    text: "Describe a project or achievement you're proud of (optional)",
    helper: "This helps us understand your interests better"
  }
];

function SortableItem({ id, label, index }: { id: string, label: string, index: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 bg-white border rounded-lg mb-2 ${
        isDragging ? 'border-[#111111] shadow-md opacity-90' : 'border-[#E5E5E5]'
      }`}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="text-[#999999] hover:text-[#111111] cursor-grab active:cursor-grabbing p-1"
      >
        <GripVertical size={20} />
      </div>
      <div className="w-6 h-6 rounded-full bg-[#F7F6F3] flex items-center justify-center font-jetbrains-mono text-[12px] text-[#666]">
        {index + 1}
      </div>
      <div className="font-inter font-medium text-[15px]">{label}</div>
    </div>
  );
}

export default function AssessmentFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  
  const question = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  // Answer handlers
  const handleSingleChoice = (optId: string) => {
    setAnswers({ ...answers, [question.id]: optId });
  };

  const handleMultiSelect = (optId: string) => {
    const current = answers[question.id] || [];
    if (current.includes(optId)) {
      setAnswers({ ...answers, [question.id]: current.filter((id: string) => id !== optId) });
    } else {
      setAnswers({ ...answers, [question.id]: [...current, optId] });
    }
  };

  const handleSlider = (val: number) => {
    setAnswers({ ...answers, [question.id]: val });
  };

  const handleText = (val: string) => {
    setAnswers({ ...answers, [question.id]: val });
  };

  // Ranking setup
  const [rankingItems, setRankingItems] = useState(
    QUESTIONS.find(q => q.type === 'ranking')?.options || []
  );

  useEffect(() => {
    if (question.type === 'ranking' && !answers[question.id]) {
      setAnswers({ ...answers, [question.id]: rankingItems.map(i => i.id) });
    }
  }, [currentStep]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = rankingItems.findIndex((item) => item.id === active.id);
      const newIndex = rankingItems.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(rankingItems, oldIndex, newIndex);
      setRankingItems(newItems);
      setAnswers({ ...answers, [question.id]: newItems.map(i => i.id) });
    }
  };

  // Navigation
  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      router.push('/student/career-discovery/processing');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.push('/student/career-discovery');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F7F6F3] flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full bg-white border-b border-[#E5E5E5] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="font-jetbrains-mono text-[13px] text-[#666]">
          Question {currentStep + 1} of {QUESTIONS.length}
        </div>
        <button className="text-[13px] font-medium text-[#666] hover:text-[#111] hover:underline transition-colors">
          Save & Continue Later
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-[3px] bg-[#E5E5E5]">
        <div 
          className="h-full bg-[#111111] transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-3xl px-4 py-12 flex flex-col">
        
        {/* Question Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-8 h-8 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center font-jetbrains-mono text-[12px] font-medium text-[#111] mb-6">
            {currentStep + 1}
          </div>
          <h2 className="font-instrument text-[32px] md:text-[40px] leading-tight max-w-[640px]">
            {question.text}
          </h2>
        </div>

        {/* Options Container */}
        <div className="flex-1 w-full max-w-2xl mx-auto">
          
          {/* TYPE 1: SINGLE CHOICE */}
          {question.type === 'single_choice' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options?.map((opt: any) => {
                const isSelected = answers[question.id] === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSingleChoice(opt.id)}
                    className={`
                      text-left p-5 rounded-xl border-2 transition-all duration-200
                      ${isSelected 
                        ? 'border-[#111111] bg-[#FAFAFA]' 
                        : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#111111] text-white' : 'bg-[#F7F6F3] text-[#666]'}`}>
                        <Icon size={20} />
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${isSelected ? 'border-[#111111]' : 'border-[#CCCCCC]'}
                      `}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-[#111111] rounded-full" />}
                      </div>
                    </div>
                    <div className="font-inter font-medium text-[16px] text-[#111111] mb-1">{opt.label}</div>
                    <div className="font-inter text-[13px] text-[#666666] leading-relaxed">{opt.desc}</div>
                  </button>
                )
              })}
            </div>
          )}

          {/* TYPE 2: MULTI SELECT */}
          {question.type === 'multi_select' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options?.map((opt: any) => {
                const isSelected = (answers[question.id] || []).includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleMultiSelect(opt.id)}
                    className={`
                      flex items-center gap-3 p-4 rounded-lg border transition-colors
                      ${isSelected 
                        ? 'border-[#111111] bg-[#FAFAFA]' 
                        : 'border-[#E5E5E5] bg-white hover:border-[#CCCCCC]'
                      }
                    `}
                  >
                    <div className={`
                      w-5 h-5 rounded flex items-center justify-center border
                      ${isSelected ? 'bg-[#111111] border-[#111111]' : 'border-[#CCCCCC]'}
                    `}>
                      {isSelected && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="font-inter font-medium text-[15px]">{opt.label}</span>
                  </button>
                )
              })}
            </div>
          )}

          {/* TYPE 3: SLIDER */}
          {question.type === 'slider' && (
            <div className="bg-white p-8 rounded-xl border border-[#E5E5E5] mt-8">
              <div className="flex justify-center mb-8">
                <div className="font-jetbrains-mono text-[24px] font-medium w-16 h-16 rounded-full bg-[#F7F6F3] flex items-center justify-center border border-[#E5E5E5]">
                  {answers[question.id] || 5}
                </div>
              </div>
              
              <input 
                type="range" 
                min={question.min} 
                max={question.max} 
                value={answers[question.id] || 5}
                onChange={(e) => handleSlider(parseInt(e.target.value))}
                className="w-full accent-[#111111] h-2 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer"
              />
              
              <div className="flex justify-between mt-4">
                <span className="text-[13px] text-[#666] font-medium">{question.minLabel}</span>
                <span className="text-[13px] text-[#666] font-medium">{question.maxLabel}</span>
              </div>
            </div>
          )}

          {/* TYPE 4: RANKING */}
          {question.type === 'ranking' && (
            <div className="mt-4">
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={rankingItems.map(i => i.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {rankingItems.map((item, index) => (
                    <SortableItem key={item.id} id={item.id} label={item.label} index={index} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* TYPE 5: OPEN ENDED */}
          {question.type === 'open_ended' && (
            <div className="mt-4">
              <textarea
                value={answers[question.id] || ""}
                onChange={(e) => handleText(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-40 p-4 rounded-xl border border-[#E5E5E5] bg-white focus:outline-none focus:border-[#111111] resize-none font-inter text-[15px]"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2 px-1">
                <span className="text-[13px] text-[#666]">{question.helper}</span>
                <span className="font-jetbrains-mono text-[12px] text-[#999]">
                  {(answers[question.id] || "").length} / 500
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-16 pt-8 border-t border-[#E5E5E5] flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="px-6 py-3 rounded-lg text-[#111] font-medium hover:bg-[#E5E5E5] transition-colors flex items-center"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
          
          <div className="flex items-center gap-4">
            {question.type === 'open_ended' && (
              <button 
                onClick={handleNext}
                className="text-[14px] font-medium text-[#666] hover:text-[#111] transition-colors"
              >
                Skip
              </button>
            )}
            <button 
              onClick={handleNext}
              disabled={question.type !== 'open_ended' && !answers[question.id] && question.type !== 'slider' && question.type !== 'ranking'}
              className="px-8 py-3 rounded-lg bg-[#111111] text-white font-medium hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {currentStep === QUESTIONS.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
