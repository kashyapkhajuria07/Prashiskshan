"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";
import { useMockData } from "@/context/MockDataContext";
import { Edit2 } from "lucide-react";

export default function PostInternship() {
  const { register, handleSubmit } = useForm();
  const { addInternship, companies } = useMockData();
  const router = useRouter();

  const onSubmit = (data: any) => {
    addInternship({
      id: Math.random().toString(36).substring(7),
      companyId: companies[0].id,
      title: data.title,
      location: data.location,
      workMode: data.workMode,
      duration: data.duration,
      stipend: data.stipend,
      skillsRequired: ['React', 'Node.js'], // Mapped from UI
      status: 'active'
    });
    toast.success("Internship posted successfully");
    router.push('/industry/dashboard');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-instrument text-[32px] leading-tight">Post New Internship</h1>
        <p className="text-[#666] text-sm mt-1">Create a detailed role description to attract the best talent.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm overflow-hidden">
         <div className="p-6 md:p-8 space-y-8">
            <section>
               <h3 className="font-medium text-lg border-b border-[#E5E5E5] pb-2 mb-4">Role Details</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                     <label className="block text-sm font-medium mb-1.5">Job Title</label>
                     <input {...register("title")} required type="text" placeholder="e.g., Frontend Developer Intern" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-md outline-none focus:border-[#111111]" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-1.5">Department</label>
                     <select {...register("department")} className="w-full px-3 py-2 border border-[#E5E5E5] rounded-md outline-none focus:border-[#111111] bg-white">
                        <option>Engineering</option>
                        <option>Design</option>
                        <option>Marketing</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-1.5">Role Type</label>
                     <select {...register("roleType")} className="w-full px-3 py-2 border border-[#E5E5E5] rounded-md outline-none focus:border-[#111111] bg-white">
                        <option>Full-time Intern</option>
                        <option>Part-time Intern</option>
                     </select>
                  </div>
               </div>
            </section>

            <section>
               <h3 className="font-medium text-lg border-b border-[#E5E5E5] pb-2 mb-4">Logistics & Compensation</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                     <label className="block text-sm font-medium mb-1.5">Work Mode</label>
                     <select {...register("workMode")} className="w-full px-3 py-2 border border-[#E5E5E5] rounded-md outline-none focus:border-[#111111] bg-white">
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>On-site</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-1.5">Location</label>
                     <input {...register("location")} type="text" placeholder="e.g., Bangalore" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-md outline-none focus:border-[#111111]" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-1.5">Duration</label>
                     <select {...register("duration")} className="w-full px-3 py-2 border border-[#E5E5E5] rounded-md outline-none focus:border-[#111111] bg-white">
                        <option>3 months</option>
                        <option>6 months</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-1.5">Stipend Amount</label>
                     <input {...register("stipend")} type="text" placeholder="e.g., ₹20k/month" className="w-full px-3 py-2 border border-[#E5E5E5] rounded-md outline-none focus:border-[#111111]" />
                  </div>
               </div>
            </section>
            
            <section>
               <h3 className="font-medium text-lg border-b border-[#E5E5E5] pb-2 mb-4">Description</h3>
               <div className="border border-[#E5E5E5] rounded-md overflow-hidden focus-within:border-[#111111] transition-colors">
                  <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] p-2 flex gap-1 items-center">
                     <span className="text-[#999] text-xs font-jetbrains-mono pl-2">Rich Text Placeholder</span>
                  </div>
                  <textarea {...register("description")} className="w-full h-32 p-3 outline-none resize-y" placeholder="Describe the day-to-day responsibilities..."></textarea>
               </div>
            </section>
         </div>

         <div className="bg-[#FAFAFA] border-t border-[#E5E5E5] p-6 flex justify-end gap-3">
            <button type="button" className="px-6 py-2 rounded-lg font-medium text-[#666] hover:bg-[#E5E5E5] transition-colors text-sm">Save as Draft</button>
            <button type="submit" className="bg-[#111111] text-white px-6 py-2 rounded-lg font-medium hover:bg-black/90 transition-colors text-sm shadow-sm flex items-center gap-2">
               Publish Internship →
            </button>
         </div>
      </form>
    </div>
  );
}
