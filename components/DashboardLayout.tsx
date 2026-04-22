"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMockData } from "@/context/MockDataContext";
import { 
  Home, Search, FileText, BookOpen, Users, Edit3, User,
  Briefcase, CheckSquare, BarChart, Settings, Mail, Bell, Menu
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const STUDENT_NAV: NavItem[] = [
  { label: "Dashboard", href: "/student/dashboard", icon: Home },
  { label: "Discover Internships", href: "/student/discover", icon: Search },
  { label: "My Applications", href: "/student/applications", icon: FileText },
  { label: "Skill Hub", href: "/student/skills", icon: BookOpen },
  { label: "Peer Exchange", href: "/student/peers", icon: Users },
  { label: "Logbook", href: "/student/logbook", icon: Edit3 },
  { label: "Profile", href: "/student/profile", icon: User },
];

const FACULTY_NAV: NavItem[] = [
  { label: "Dashboard", href: "/faculty/dashboard", icon: Home },
  { label: "Students", href: "/faculty/students", icon: Users },
  { label: "Internships", href: "/faculty/internships", icon: Briefcase },
  { label: "Mentorship", href: "/faculty/mentorship", icon: User },
  { label: "Evaluations", href: "/faculty/evaluations", icon: CheckSquare },
  { label: "Analytics", href: "/faculty/analytics", icon: BarChart },
  { label: "Reports", href: "/faculty/reports", icon: FileText },
  { label: "Settings", href: "/faculty/settings", icon: Settings },
];

const INDUSTRY_NAV: NavItem[] = [
  { label: "Dashboard", href: "/industry/dashboard", icon: Home },
  { label: "Post Internship", href: "/industry/post", icon: Edit3 },
  { label: "Applications", href: "/industry/applications", icon: FileText },
  { label: "Active Interns", href: "/industry/interns", icon: Users },
  { label: "Evaluations", href: "/industry/evaluations", icon: CheckSquare },
  { label: "Company Profile", href: "/industry/profile", icon: Briefcase },
  { label: "Analytics", href: "/industry/analytics", icon: BarChart },
];

export function DashboardLayout({ children, role }: { children: ReactNode, role: 'student' | 'faculty' | 'industry' }) {
  const pathname = usePathname();
  const { students, companies, currentUserId, currentUserRole } = useMockData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let navItems = STUDENT_NAV;
  if (role === 'faculty') navItems = FACULTY_NAV;
  if (role === 'industry') navItems = INDUSTRY_NAV;

  // Find user data
  let userName = "User";
  let userInitials = "U";
  if (role === 'student') {
    const student = students.find(s => s.id === currentUserId);
    if(student) {
      userName = student.name;
      userInitials = student.name.split(' ').map(n => n[0]).join('');
    }
  } else if(role === 'industry') {
    const company = companies[0];
    if(company) {
      userName = company.name;
      userInitials = company.name.substring(0, 2).toUpperCase();
    }
  }

  return (
    <div className="flex h-screen bg-[#F7F6F3] overflow-hidden">
      {/* Mobile Header (visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E5E5] flex items-center justify-between px-4 z-20">
        <div className="font-instrument text-2xl tracking-tight">Prashikshan</div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Nav */}
      <nav className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-white border-r border-[#E5E5E5] flex flex-col z-30 transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="p-6 pb-2 flex items-center justify-between md:block">
          <Link href="/" className="font-instrument text-3xl tracking-tight block">Prashikshan</Link>
          <button className="md:hidden p-1" onClick={() => setMobileMenuOpen(false)}>✕</button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive ? 'bg-[#111111] text-white' : 'text-[#666666] hover:bg-[#F3F4F6] hover:text-[#111111]'}
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={18} className={isActive ? 'opacity-100' : 'opacity-70'} />
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Profile Dropdown Area */}
        <div className="p-4 border-t border-[#E5E5E5]">
          <div className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-[#F3F4F6] cursor-pointer transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E5E5E5] flex items-center justify-center font-inter font-medium text-[#111111]">
              {userInitials}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium text-[#111111] truncate">{userName}</div>
              <div className="text-xs text-[#666666] capitalize truncate">{role}</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full h-full md:pt-0 pt-16">
        {/* Top Navbar items like Search and Notifications */}
        <header className="h-16 px-8 flex items-center justify-between bg-[#F7F6F3] border-b border-[#E5E5E5]/50 shrink-0">
          <div className="flex items-center w-full max-w-md bg-white rounded-full px-4 py-2 border border-[#E5E5E5] focus-within:border-[#111111] transition-colors">
            <Search size={16} className="text-[#999999] mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none w-full text-sm font-inter placeholder:text-[#999999]"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 relative rounded-full hover:bg-white transition-colors">
              <Mail size={20} className="text-[#666666]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F87171] rounded-full"></span>
            </button>
            <button className="p-2 relative rounded-full hover:bg-white transition-colors">
              <Bell size={20} className="text-[#666666]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F87171] rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-20 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </div>
  );
}
