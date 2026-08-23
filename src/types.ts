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
  receiver?: string;
  status?: string;
  isLocal?: boolean;
}

export interface ReceiverStats {
  name: string;
  displayName: string;
  totalAmount: number;
  count: number;
  percentage: number;
  recentContributions: Contribution[];
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
  receiverBreakdown: {
    khushi: ReceiverStats;
    aditya: ReceiverStats;
    others: ReceiverStats;
    allReceivers: ReceiverStats[];
  };
  latestDate: string;
}

export type ViewTab = 'home' | 'contributions' | 'hall-of-fame' | 'wishes';

