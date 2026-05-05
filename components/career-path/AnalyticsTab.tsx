"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { TrendingUp, Clock, Zap, Download, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";

const PROGRESS_DATA = [
  { name: 'Week 1', progress: 5 },
  { name: 'Week 2', progress: 12 },
  { name: 'Week 3', progress: 15 },
  { name: 'Week 4', progress: 22 },
  { name: 'Week 5', progress: 34 },
];

const SKILL_DATA = [
  { name: 'Technical', acquired: 4, remaining: 6 },
  { name: 'Business', acquired: 2, remaining: 3 },
  { name: 'Soft Skills', acquired: 3, remaining: 1 },
];

// Mock heatmap data (last 3 months)
const today = new Date();
const HEATMAP_DATA = Array.from({ length: 90 }).map((_, i) => {
  const date = new Date(today);
  date.setDate(date.getDate() - i);
  // Random count between 0 and 4, weighted towards 0
  const count = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0;
  return { date, count };
});

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 border-[#E5E5E5]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#1D4ED8]">
              <TrendingUp size={20} />
            </div>
            <div className="text-[14px] text-[#666] font-medium uppercase tracking-wide">Velocity</div>
          </div>
          <div className="font-jetbrains-mono text-[32px] mb-2">3.2 <span className="text-[14px] text-[#666]">tasks/wk</span></div>
          <div className="text-[13px] text-[#16A34A] flex items-center gap-1 font-medium">
            ↑ 15% faster than average
          </div>
        </Card>

        <Card className="p-6 border-[#E5E5E5]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#DC2626]">
              <Clock size={20} />
            </div>
            <div className="text-[14px] text-[#666] font-medium uppercase tracking-wide">Time Invested</div>
          </div>
          <div className="font-jetbrains-mono text-[32px] mb-2">48 <span className="text-[14px] text-[#666]">hours</span></div>
          <div className="text-[13px] text-[#666]">
            12 hours this week
          </div>
        </Card>

        <Card className="p-6 border-[#E5E5E5]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#D97706]">
              <Zap size={20} />
            </div>
            <div className="text-[14px] text-[#666] font-medium uppercase tracking-wide">Current Streak</div>
          </div>
          <div className="font-jetbrains-mono text-[32px] mb-2">7 <span className="text-[14px] text-[#666]">days 🔥</span></div>
          <div className="text-[13px] text-[#666]">
            Longest streak: 21 days
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="p-6 border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="flex items-start gap-4">
          <div className="mt-1"><Sparkles size={20} className="text-[#111]" /></div>
          <div>
            <h3 className="font-medium text-[#111] mb-2 text-[16px]">AI Progress Analysis</h3>
            <p className="text-[14px] text-[#666] leading-relaxed mb-4">
              You excel at completing courses quickly (top 10%), but could improve consistency in project work. 
              You have 2 projects pending for over 3 weeks.
            </p>
            <div className="bg-white p-3 border border-[#E5E5E5] rounded-lg inline-block">
              <span className="text-[13px] font-medium">Actionable suggestion:</span>
              <span className="text-[13px] text-[#666] ml-2">Try blocking 2 hours this weekend specifically for project work.</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Progress Over Time */}
        <Card className="p-6 border-[#E5E5E5]">
          <h3 className="font-instrument text-[24px] mb-6">Progress Over Time</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E5E5', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                  itemStyle={{ color: '#111', fontSize: '13px', fontWeight: 500 }}
                  formatter={(value: any) => [`${value}%`, 'Completion']}
                />
                <Line type="monotone" dataKey="progress" stroke="#111111" strokeWidth={3} dot={{ r: 4, fill: '#111' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Skill Acquisition */}
        <Card className="p-6 border-[#E5E5E5]">
          <h3 className="font-instrument text-[24px] mb-6">Skill Acquisition</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILL_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E5E5" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#111' }} />
                <RechartsTooltip 
                  cursor={{ fill: '#F7F6F3' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E5E5' }}
                />
                <Bar dataKey="acquired" name="Acquired" stackId="a" fill="#111111" radius={[0, 0, 0, 0]} />
                <Bar dataKey="remaining" name="To Learn" stackId="a" fill="#E5E5E5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Completion Patterns */}
      <Card className="p-6 border-[#E5E5E5] overflow-x-auto">
        <div className="flex items-center justify-between mb-8 min-w-[600px]">
          <h3 className="font-instrument text-[24px]">Completion Patterns</h3>
          <div className="flex items-center gap-2 text-[12px] text-[#666]">
            Less
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-[#F7F6F3]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#D1D5DB]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#9CA3AF]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#4B5563]"></div>
              <div className="w-3 h-3 rounded-sm bg-[#111111]"></div>
            </div>
            More
          </div>
        </div>
        
        <div className="min-w-[600px]">
          <CalendarHeatmap
            startDate={new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)}
            endDate={today}
            values={HEATMAP_DATA}
            classForValue={(value) => {
              if (!value || value.count === 0) return 'color-empty';
              return `color-scale-${Math.min(value.count, 4)}`;
            }}
            showWeekdayLabels={true}
            tooltipDataAttrs={((value: any) => {
              return {
                'title': `${value && value.date ? value.date.toISOString().slice(0, 10) : ''}: ${value && value.count ? value.count : 0} tasks completed`,
              };
            }) as any}
          />
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .react-calendar-heatmap text { font-size: 10px; fill: #999; }
          .react-calendar-heatmap .color-empty { fill: #F7F6F3; }
          .react-calendar-heatmap .color-scale-1 { fill: #D1D5DB; }
          .react-calendar-heatmap .color-scale-2 { fill: #9CA3AF; }
          .react-calendar-heatmap .color-scale-3 { fill: #4B5563; }
          .react-calendar-heatmap .color-scale-4 { fill: #111111; }
          .react-calendar-heatmap rect { rx: 2; ry: 2; }
        `}} />
      </Card>

      {/* Export */}
      <div className="flex justify-end pt-4">
        <button className="flex items-center px-6 py-3 bg-white border border-[#E5E5E5] rounded-lg font-medium text-[14px] hover:border-[#111] transition-colors">
          <Download size={18} className="mr-2" /> Download Progress Report
        </button>
      </div>

    </div>
  );
}
