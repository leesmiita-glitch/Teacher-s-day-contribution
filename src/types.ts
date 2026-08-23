export interface Contribution {
  id: string;
  sNo: number;
  name: string;
  rollNo?: string;
  branch: string;
  year: string | number;
  amount: number;
  date: string;
  quote: string;
  isLocal?: boolean;
}

export interface SheetStats {
  totalAmount: number;
  todayAmount: number;
  totalContributors: number;
  targetAmount: number;
  progressPercent: number;
  totalClassStrength: number;
  paidStudentsCount: number;
  participationPercent: number;
  branchBreakdown: Record<string, number>;
  latestDate: string;
}

export type ViewTab = 'home' | 'contributions' | 'hall-of-fame' | 'wishes';
