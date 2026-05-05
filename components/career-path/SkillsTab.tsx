"use client";

import { useState, useCallback } from "react";
import ReactFlow, { 
  Controls, 
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Lock, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// Custom Node Component
function SkillNode({ data, isConnectable }: any) {
  let bgColor = "bg-white";
  let borderColor = "border-[#E5E5E5]";
  let icon = null;

  if (data.status === 'completed') {
    bgColor = "bg-[#ECFDF5]";
    borderColor = "border-[#A7F3D0]";
    icon = <CheckCircle2 size={14} className="text-[#059669]" />;
  } else if (data.status === 'in-progress') {
    bgColor = "bg-[#EFF6FF]";
    borderColor = "border-[#BFDBFE]";
  } else if (data.status === 'locked') {
    bgColor = "bg-[#F3F4F6]";
    borderColor = "border-[#E5E5E5]";
    icon = <Lock size={12} className="text-[#999]" />;
  }

  return (
    <div className={`px-4 py-2 shadow-sm rounded-lg border-2 ${bgColor} ${borderColor} min-w-[150px]`}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2 h-2 bg-[#999]" />
      <div className="flex items-center justify-between gap-2">
        <div className={`font-inter font-medium text-[13px] ${data.status === 'locked' ? 'text-[#999]' : 'text-[#111]'}`}>
          {data.label}
        </div>
        {icon}
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2 h-2 bg-[#999]" />
    </div>
  );
}

const nodeTypes = {
  skillNode: SkillNode,
};

const initialNodes = [
  { id: '1', type: 'skillNode', position: { x: 250, y: 0 }, data: { label: 'Product Management', status: 'completed' } },
  { id: '2', type: 'skillNode', position: { x: 100, y: 100 }, data: { label: 'User Research', status: 'completed' } },
  { id: '3', type: 'skillNode', position: { x: 400, y: 100 }, data: { label: 'Data Analysis', status: 'in-progress' } },
  { id: '4', type: 'skillNode', position: { x: 0, y: 200 }, data: { label: 'User Interviews', status: 'not-started' } },
  { id: '5', type: 'skillNode', position: { x: 200, y: 200 }, data: { label: 'Usability Testing', status: 'locked' } },
  { id: '6', type: 'skillNode', position: { x: 400, y: 200 }, data: { label: 'SQL Basics', status: 'in-progress' } },
  { id: '7', type: 'skillNode', position: { x: 400, y: 300 }, data: { label: 'A/B Testing', status: 'locked' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#111' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#111' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#111' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#111' } },
  { id: 'e2-4', source: '2', target: '4', style: { stroke: '#999' } },
  { id: 'e2-5', source: '2', target: '5', style: { stroke: '#E5E5E5' } },
  { id: 'e3-6', source: '3', target: '6', animated: true, style: { stroke: '#111' } },
  { id: 'e6-7', source: '6', target: '7', style: { stroke: '#E5E5E5' } },
];

export default function SkillsTab() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setSelectedSkill(node.data);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Top Section: Gap Analysis & Endorsements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-[#E5E5E5] rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="font-instrument text-[24px] mb-4">Skill Gap Analysis</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="text-[12px] uppercase tracking-wider text-[#666] font-medium mb-2">Acquired (8)</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded text-[12px]">Python</span>
                  <span className="px-2 py-1 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded text-[12px]">Product Mgt</span>
                  <span className="px-2 py-1 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded text-[12px]">User Research</span>
                  <span className="text-[12px] text-[#666] px-2 py-1">+5 more</span>
                </div>
              </div>
              <div className="w-px h-16 bg-[#E5E5E5]"></div>
              <div className="flex-1">
                <div className="text-[12px] uppercase tracking-wider text-[#666] font-medium mb-2">To Learn (12)</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] rounded text-[12px]">SQL</span>
                  <span className="px-2 py-1 bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] rounded text-[12px]">A/B Testing</span>
                  <span className="text-[12px] text-[#666] px-2 py-1">+10 more</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#F7F6F3] rounded-lg">
            <span className="text-[13px] font-medium text-[#111]">Focus on critical skills first</span>
            <span className="font-jetbrains-mono text-[16px] font-medium">12 to go</span>
          </div>
        </div>

        <div className="p-6 bg-white border border-[#E5E5E5] rounded-xl">
          <h3 className="font-instrument text-[24px] mb-4">Skill Endorsements</h3>
          <p className="text-[14px] text-[#666] mb-4">
            Peers and mentors can endorse the skills you've acquired. Highly endorsed skills stand out to recruiters.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-lg">
              <div className="font-medium text-[14px]">Python</div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] text-white flex items-center justify-center text-[10px]">A</div>
                  <div className="w-6 h-6 rounded-full bg-[#666] text-white flex items-center justify-center text-[10px]">P</div>
                  <div className="w-6 h-6 rounded-full bg-[#999] text-white flex items-center justify-center text-[10px]">R</div>
                </div>
                <span className="text-[13px] text-[#666] ml-1">5 endorsements</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-[#E5E5E5] rounded-lg">
              <div className="font-medium text-[14px]">User Research</div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] text-white flex items-center justify-center text-[10px]">M</div>
                </div>
                <span className="text-[13px] text-[#666] ml-1">1 endorsement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Skill Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        <div className="lg:col-span-2 border border-[#E5E5E5] rounded-xl overflow-hidden bg-[#FAFAFA] relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-right"
          >
            <Background color="#E5E5E5" gap={16} />
            <Controls />
          </ReactFlow>
          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg border border-[#E5E5E5] shadow-sm flex flex-col gap-2 text-[12px] z-10">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#ECFDF5] border border-[#A7F3D0]"></div> Completed</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#EFF6FF] border border-[#BFDBFE]"></div> In Progress</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-white border border-[#E5E5E5]"></div> Not Started</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#F3F4F6] border border-[#E5E5E5]"></div> Locked</div>
          </div>
        </div>

        {/* Skill Detail Panel */}
        <div className="border border-[#E5E5E5] rounded-xl bg-white p-6 overflow-y-auto">
          {selectedSkill ? (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-instrument text-[24px]">{selectedSkill.label}</h3>
                {selectedSkill.status === 'completed' && <Badge variant="success">Completed</Badge>}
                {selectedSkill.status === 'in-progress' && <Badge variant="info">In Progress</Badge>}
                {selectedSkill.status === 'locked' && <Badge variant="neutral">Locked</Badge>}
              </div>
              <p className="text-[14px] text-[#666] mb-6">
                Essential for analyzing product performance and making data-driven decisions.
              </p>

              {selectedSkill.status === 'locked' ? (
                <div className="bg-[#F7F6F3] p-4 rounded-lg flex items-center gap-3 mb-6">
                  <Lock size={20} className="text-[#999]" />
                  <div className="text-[13px]">
                    <span className="font-medium block text-[#111]">Prerequisites required</span>
                    <span className="text-[#666]">Complete "Data Analysis" first.</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  <div className="font-medium text-[14px]">Recommended Resources</div>
                  
                  <div className="p-3 border border-[#E5E5E5] rounded-lg flex items-start gap-3 hover:border-[#111] transition-colors cursor-pointer group">
                    <div className="w-8 h-8 bg-[#F7F6F3] rounded flex items-center justify-center shrink-0">
                      <BookOpen size={16} className="text-[#111]" />
                    </div>
                    <div>
                      <div className="font-medium text-[13px] group-hover:underline">SQL for Product Managers</div>
                      <div className="text-[12px] text-[#666]">Course • 3 hours</div>
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-[#111] text-white rounded-lg font-medium text-[13px] hover:bg-black/90 transition-colors">
                    Start Learning
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#666]">
              <div className="w-12 h-12 bg-[#F7F6F3] rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <p className="text-[14px]">Click on any skill node in the tree to view details, resources, and prerequisites.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
