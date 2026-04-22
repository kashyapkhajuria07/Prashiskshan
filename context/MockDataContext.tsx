import { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type UserRole = 'student' | 'faculty' | 'industry';

export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  college: string;
  readinessScore: number;
  profileCompletion: number;
  skills: { name: string; level: number }[];
  avatar?: string;
  internshipStatus: 'searching' | 'active' | 'completed';
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  verified: boolean;
  logoUrl?: string;
  about: string;
}

export interface Internship {
  id: string;
  companyId: string;
  title: string;
  location: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  duration: string;
  stipend: string;
  matchScore?: number;
  skillsRequired: string[];
  status: 'active' | 'draft' | 'closed';
}

export interface Application {
  id: string;
  studentId: string;
  internshipId: string;
  appliedOn: string;
  status: 'Pending' | 'Shortlisted' | 'Rejected' | 'Accepted';
  timeline: { stage: string; date: string; status: 'completed' | 'current' | 'upcoming' }[];
}

export interface PeerSession {
  id: string;
  studentIdA: string;
  studentIdB: string;
  skillIdA: string;
  skillIdB: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  zoomLink?: string;
}

interface MockDataState {
  currentUserRole: UserRole;
  currentUserId: string;
  students: Student[];
  companies: Company[];
  internships: Internship[];
  applications: Application[];
  peerSessions: PeerSession[];
  
  // Actions
  addApplication: (app: Application) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  addInternship: (internship: Internship) => void;
}

// Initial Mock Data
const MOCK_STUDENTS: Student[] = [
  {
    id: 's1', name: 'Arjun Kumar', email: 'arjun@example.com', course: 'B.Tech IT', college: 'DY Patil COE',
    readinessScore: 74, profileCompletion: 85, skills: [{ name: 'React', level: 2 }, { name: 'Figma', level: 1 }], internshipStatus: 'searching'
  },
  {
    id: 's2', name: 'Priya Sharma', email: 'priya@example.com', course: 'B.Des', college: 'NID',
    readinessScore: 92, profileCompletion: 100, skills: [{ name: 'UI/UX', level: 3 }], internshipStatus: 'active'
  }
];

const MOCK_COMPANIES: Company[] = [
  { id: 'c1', name: 'Razorpay', industry: 'Fintech', verified: true, about: 'Payment gateway' },
  { id: 'c2', name: 'Swiggy', industry: 'Foodtech', verified: true, about: 'Food delivery' }
];

const MOCK_INTERNSHIPS: Internship[] = [
  { id: 'i1', companyId: 'c1', title: 'Frontend Intern', location: 'Bangalore', workMode: 'Remote', duration: '3 months', stipend: '₹15k/month', matchScore: 92, skillsRequired: ['React', 'TypeScript'], status: 'active' },
  { id: 'i2', companyId: 'c2', title: 'UI/UX Intern', location: 'Bangalore', workMode: 'Hybrid', duration: '6 months', stipend: '₹20k/month', matchScore: 89, skillsRequired: ['Figma', 'Prototyping'], status: 'active' }
];

const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'a1', studentId: 's1', internshipId: 'i1', appliedOn: '2026-04-10', status: 'Shortlisted',
    timeline: [
      { stage: 'Submitted', date: '2026-04-10', status: 'completed' },
      { stage: 'Under Review', date: '2026-04-12', status: 'completed' },
      { stage: 'Interview Scheduled', date: '2026-04-15', status: 'current' },
      { stage: 'Offer Received', date: '', status: 'upcoming' }
    ]
  }
];

const MOCK_PEER_SESSIONS: PeerSession[] = [
  { id: 'ps1', studentIdA: 's1', studentIdB: 's2', skillIdA: 'React', skillIdB: 'UI/UX', date: '2026-04-25T10:00:00Z', status: 'upcoming', zoomLink: 'https://zoom.us/j/123456789' }
];

const MockDataContext = createContext<MockDataState | undefined>(undefined);

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('student');
  const [currentUserId, setCurrentUserId] = useState<string>('s1');
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [internships, setInternships] = useState<Internship[]>(MOCK_INTERNSHIPS);
  
  const addApplication = (app: Application) => {
    setApplications(prev => [app, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  const addInternship = (internship: Internship) => {
    setInternships(prev => [internship, ...prev]);
  };

  return (
    <MockDataContext.Provider value={{
      currentUserRole,
      currentUserId,
      students: MOCK_STUDENTS,
      companies: MOCK_COMPANIES,
      internships,
      applications,
      peerSessions: MOCK_PEER_SESSIONS,
      addApplication,
      updateApplicationStatus,
      addInternship
    }}>
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
}
