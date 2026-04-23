"use client";

import { useState } from "react";
import { 
  BarChart, Filter, Download, Calendar, TrendingUp, RefreshCw 
} from "lucide-react";
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AnalyticsReporting() {
  const [timeRange, setTimeRange] = useState('YTD');
  const [isExporting, setIsExporting] = useState(false);

  // Line Chart Data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        label: 'Placement Rate 2026',
        data: [45, 52, 58, 65, 72, 78, 80, 82, 85, 85, 87, 88],
        borderColor: '#111',
        backgroundColor: 'rgba(17, 17, 17, 0.05)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        fill: true,
        label: 'Placement Rate 2025',
        data: [40, 45, 50, 58, 62, 65, 70, 72, 75, 78, 80, 82],
        borderColor: '#999',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, align: 'end' as const, labels: { usePointStyle: true, boxWidth: 6, font: { family: 'inter' } } },
      tooltip: { backgroundColor: '#111', padding: 12, cornerRadius: 8, titleFont: { family: 'inter' }, bodyFont: { family: 'inter' } }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#F3F4F6' }, min: 0, max: 100, ticks: { callback: (val: any) => val + '%' } }
    },
    interaction: { mode: 'index' as const, intersect: false },
  };

  const simulateExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
           <div className="flex items-center gap-3 mb-1">
             <div className="w-10 h-10 bg-[#111] text-white rounded-lg flex items-center justify-center">
               <BarChart size={20} />
             </div>
             <h1 className="font-instrument text-[32px] leading-none">Advanced Analytics</h1>
           </div>
          <p className="text-[#666] text-[14px] mt-2">Correlation modeling and multi-year comparative analysis.</p>
        </div>
        
        <div className="flex gap-2">
           <button onClick={simulateExport} className="flex items-center gap-2 bg-white border border-[#E5E5E5] text-[#111] px-4 py-2 rounded-lg text-[13px] font-medium hover:border-[#111] transition-colors shadow-sm">
             {isExporting ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16}/>} 
             Export Dataset (.csv)
           </button>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm overflow-hidden">
         <div className="p-6 border-b border-[#E5E5E5] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#FAFAFA]">
            <div>
               <h3 className="font-medium text-[16px] flex items-center gap-2">Placement Trajectory <TrendingUp size={16} className="text-green-500" /></h3>
               <p className="text-[12px] text-[#666]">Comparing current year cohort vs previous year</p>
            </div>
            
            <div className="flex bg-white border border-[#E5E5E5] rounded-lg p-1 shadow-sm">
               {['Q1', 'Q2', 'Q3', 'YTD', 'All Time'].map(range => (
                 <button 
                   key={range}
                   onClick={() => setTimeRange(range)}
                   className={`px-4 py-1.5 text-[12px] font-medium rounded-md transition-colors ${
                     timeRange === range ? 'bg-[#111] text-white' : 'text-[#666] hover:bg-[#F3F4F6]'
                   }`}
                 >
                   {range}
                 </button>
               ))}
            </div>
         </div>

         <div className="p-6 h-[400px]">
            <Line data={lineChartData} options={chartOptions} />
         </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
         {/* Correlation Analysis Stub */}
         <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6">
            <h3 className="font-instrument text-[22px] mb-4">Correlation Analysis</h3>
            <p className="text-[13px] text-[#666] mb-6">Our model analyzes variables that most strongly influence student placement and readiness scores.</p>
            
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-[13px] font-medium mb-1">
                    <span>Mentorship Sessions vs Placement</span>
                    <span className="text-green-600">Strong (+0.82)</span>
                  </div>
                  <div className="h-2 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[82%]"></div>
                  </div>
               </div>

               <div>
                  <div className="flex justify-between text-[13px] font-medium mb-1">
                    <span>Attendance Rate vs Readiness</span>
                    <span className="text-green-600">Moderate (+0.65)</span>
                  </div>
                  <div className="h-2 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 w-[65%]"></div>
                  </div>
               </div>

               <div>
                  <div className="flex justify-between text-[13px] font-medium mb-1">
                    <span>Extracurriculars vs Technical Score</span>
                    <span className="text-[#999]">Neutral (+0.12)</span>
                  </div>
                  <div className="h-2 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 w-[12%]"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Detailed Filters (For custom report generation) */}
         <div className="bg-white border border-[#E5E5E5] border-dashed rounded-[16px] p-6 bg-[#FAFAFA] flex flex-col items-center justify-center text-center">
            <Filter size={32} className="text-[#E5E5E5] mb-4" />
            <h3 className="font-medium text-[#111] mb-2">Build Custom Query</h3>
            <p className="text-[13px] text-[#666] max-w-sm mb-6">Compare any multiple variables across departments, years, and specific assessment scores.</p>
            <button className="bg-white border border-[#E5E5E5] text-[#111] px-5 py-2.5 rounded-lg text-[13px] font-medium hover:border-[#111] transition-colors shadow-sm focus:outline-none focus:ring-2 ring-black/5">
              Launch Query Builder Builder
            </button>
         </div>

      </div>

    </div>
  );
}
