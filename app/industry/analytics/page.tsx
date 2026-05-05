"use client";

import { useState } from "react";
import { 
  BarChart2, PieChart, TrendingUp, Users, DollarSign, 
  Clock, Download, Filter 
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'hiring' | 'candidate' | 'performance' | 'roi'>('hiring');

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-instrument text-3xl tracking-tight text-[#111111] mb-2">Analytics</h1>
          <p className="text-[#666666] font-inter text-sm">Data-driven insights to optimize your hiring process.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 border border-[#E5E5E5] rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-[#111111]">
            <option>Last 12 Months</option>
            <option>This Year</option>
            <option>Last Quarter</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-black/90">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="flex border-b border-[#E5E5E5] mb-6 overflow-x-auto">
        {[
          { id: 'hiring', label: 'Hiring Analytics' },
          { id: 'candidate', label: 'Candidate Insights' },
          { id: 'performance', label: 'Performance Analytics' },
          { id: 'roi', label: 'ROI Dashboard' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'border-[#111111] text-[#111111]' : 'border-transparent text-[#666666] hover:text-[#111111]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'hiring' && <HiringAnalytics />}
      {activeTab === 'candidate' && <CandidateInsights />}
      {activeTab === 'performance' && <PerformanceAnalytics />}
      {activeTab === 'roi' && <ROIDashboard />}
    </div>
  );
}

function HiringAnalytics() {
  const applicationTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Applications',
      data: [120, 150, 180, 220, 300, 280, 150, 130, 250, 310, 200, 160],
      borderColor: '#111111',
      backgroundColor: 'rgba(17, 17, 17, 0.05)',
      fill: true,
      tension: 0.3
    }]
  };

  const sourceData = {
    labels: ['Prashikshan', 'Referrals', 'Career Fairs', 'Direct'],
    datasets: [{
      data: [55, 20, 15, 10],
      backgroundColor: ['#111111', '#666666', '#999999', '#E5E5E5'],
      borderWidth: 0
    }]
  };

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-[#666666] mb-2"><Clock size={16}/> Avg. Time-to-Hire</div>
          <div className="font-mono text-3xl text-[#111111]">18 <span className="text-sm text-[#666666]">days</span></div>
          <div className="text-xs text-[#059669] mt-2 font-mono">↓ 4 days vs industry avg</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-[#666666] mb-2"><Users size={16}/> Offer Acceptance</div>
          <div className="font-mono text-3xl text-[#111111]">82%</div>
          <div className="text-xs text-[#059669] mt-2 font-mono">↑ 5% vs last year</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-[#666666] mb-2"><TrendingUp size={16}/> Total Hires</div>
          <div className="font-mono text-3xl text-[#111111]">42</div>
          <div className="text-xs text-[#666666] mt-2 font-mono">This year</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="flex items-center gap-2 text-[#666666] mb-2"><BarChart2 size={16}/> Conversion Rate</div>
          <div className="font-mono text-3xl text-[#111111]">2.4%</div>
          <div className="text-xs text-[#666666] mt-2 font-mono">Views to Hires</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E5E5E5]">
          <h3 className="font-instrument text-xl mb-6">Application Volume Trends</h3>
          <div className="h-72">
            <Line 
              data={applicationTrends} 
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: '#F3F4F6' } } }
              }} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] flex flex-col items-center">
          <h3 className="font-instrument text-xl mb-6 w-full">Applications by Source</h3>
          <div className="h-64 w-full max-w-[250px] flex items-center justify-center">
            <Doughnut 
              data={sourceData} 
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                cutout: '70%'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CandidateInsights() {
  const qualityData = {
    labels: ['<60', '60-70', '70-80', '80-90', '>90'],
    datasets: [{
      label: 'Number of Applicants',
      data: [15, 40, 85, 120, 45],
      backgroundColor: '#111111',
      borderRadius: 4
    }]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Avg. Readiness Score</div>
          <div className="font-mono text-3xl text-[#111111]">78</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Avg. CGPA</div>
          <div className="font-mono text-3xl text-[#111111]">8.4</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Application Drop-off</div>
          <div className="font-mono text-3xl text-[#111111]">24%</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E5E5E5]">
          <div className="text-sm text-[#666666] mb-1">Diversity (Women)</div>
          <div className="font-mono text-3xl text-[#111111]">38%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5]">
          <h3 className="font-instrument text-xl mb-6">Readiness Score Distribution</h3>
          <div className="h-64">
            <Bar 
              data={qualityData} 
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { grid: { display: false } }, y: { grid: { color: '#F3F4F6' } } }
              }} 
            />
          </div>
        </div>

        <div className="bg-[#111111] text-white p-6 rounded-2xl border border-[#111111]">
          <h3 className="font-instrument text-xl mb-6">Top Performer DNA</h3>
          <p className="text-white/80 font-inter text-sm mb-6 leading-relaxed">
            AI analysis of your top 20% hired interns reveals common traits to look for in future candidates:
          </p>
          <ul className="space-y-4 font-inter text-sm">
            <li className="flex items-start gap-3 border-b border-white/10 pb-4">
              <span className="font-mono text-[#D1FAE5] shrink-0">80%</span>
              <span className="text-white/90">Had prior internship or freelance experience before applying.</span>
            </li>
            <li className="flex items-start gap-3 border-b border-white/10 pb-4">
              <span className="font-mono text-[#D1FAE5] shrink-0">75%</span>
              <span className="text-white/90">Scored above 85/100 in the Soft Skills readiness module.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-[#D1FAE5] shrink-0">60%</span>
              <span className="text-white/90">Are proficient in both React and Node.js (Full-stack capability).</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PerformanceAnalytics() {
  return (
    <div className="bg-white p-12 rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center text-center h-96">
      <TrendingUp size={48} className="text-[#E5E5E5] mb-4" />
      <h3 className="font-instrument text-2xl text-[#111111] mb-2">Performance Analytics</h3>
      <p className="text-[#666666] text-sm max-w-md mb-6">
        Detailed views on task completion rates, logbook engagement, and skills progression.
      </p>
    </div>
  );
}

function ROIDashboard() {
  return (
    <div className="bg-white p-12 rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center text-center h-96">
      <DollarSign size={48} className="text-[#E5E5E5] mb-4" />
      <h3 className="font-instrument text-2xl text-[#111111] mb-2">ROI Dashboard</h3>
      <p className="text-[#666666] text-sm max-w-md mb-6">
        Calculations for cost per hire, time savings, and overall business impact using Prashikshan.
      </p>
    </div>
  );
}
