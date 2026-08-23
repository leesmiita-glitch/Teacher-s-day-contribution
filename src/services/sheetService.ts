import Papa from 'papaparse';
import { Contribution, ReceiverStats, SheetStats } from '../types';

// Read Google Sheet CSV URL from environment variable
export const SHEET_CSV_URL: string =
  (import.meta.env.VITE_GOOGLE_SHEET_CSV_URL as string) ||
  (import.meta.env.VITE_SHEET_CSV_URL as string) ||
  '';

const LOCAL_STORAGE_KEY = 'teachers_day_local_contributions_v2';
const CACHE_STORAGE_KEY = 'teachers_day_sheet_cache_v2';

// 1st Year CSE Batch Configuration
export const TOTAL_CSE_STUDENTS = 52;
export const DEFAULT_TARGET_AMOUNT = 8000;

export function normalizeReceiver(receiverRaw: string): string {
  if (!receiverRaw) return 'Unassigned';
  const clean = receiverRaw.trim();
  const lower = clean.toLowerCase();
  if (lower.includes('khushi')) return 'Khushi';
  if (lower.includes('aditya')) return 'Aditya';
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

export function getLocalContributions(): Contribution[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading local contributions:', e);
  }
  return [];
}

export function saveLocalContribution(contrib: Omit<Contribution, 'id' | 'isLocal'>): Contribution {
  const newContrib: Contribution = {
    ...contrib,
    id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    branch: 'CSE',
    year: '1',
    isLocal: true,
  };

  try {
    const current = getLocalContributions();
    const updated = [newContrib, ...current];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving local contribution:', e);
  }

  return newContrib;
}

export async function fetchContributionsFromSheet(): Promise<{
  contributions: Contribution[];
  lastUpdated: Date | null;
  isFromCache: boolean;
  error?: string;
}> {
  if (!SHEET_CSV_URL) {
    console.warn('Google Sheet URL is not defined in .env (VITE_GOOGLE_SHEET_CSV_URL)');
    return {
      contributions: [],
      lastUpdated: null,
      isFromCache: false,
      error: 'Google Sheet URL not configured in .env file',
    };
  }

  try {
    const urlWithCacheBuster = `${SHEET_CSV_URL}${SHEET_CSV_URL.includes('?') ? '&' : '?'}_t=${Date.now()}`;
    const response = await fetch(urlWithCacheBuster, {
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const csvText = await response.text();
    const parsedData = parseCsvData(csvText);

    if (parsedData.length >= 0) {
      try {
        localStorage.setItem(
          CACHE_STORAGE_KEY,
          JSON.stringify({
            data: parsedData,
            timestamp: Date.now(),
          })
        );
      } catch {
        // Ignore cache storage errors
      }
      return {
        contributions: parsedData,
        lastUpdated: new Date(),
        isFromCache: false,
      };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn('Live Google Sheet fetch failed due to network issue:', message);
  }

  // Fallback to cache if network request fails
  try {
    const cached = localStorage.getItem(CACHE_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed.data)) {
        return {
          contributions: parsed.data,
          lastUpdated: new Date(parsed.timestamp),
          isFromCache: true,
        };
      }
    }
  } catch (e) {
    console.error('Error loading cache:', e);
  }

  // Return empty list if network fetch fails and no cache exists (no hardcoded mock data)
  return {
    contributions: [],
    lastUpdated: null,
    isFromCache: false,
    error: 'Network issue: Unable to fetch live data from Google Sheet',
  };
}

export function parseCsvData(csvText: string): Contribution[] {
  const lines = csvText.split(/\r?\n/);
  // Find the real table header row (skips title banners and empty rows at the top)
  const headerIndex = lines.findIndex((line) => {
    const lower = line.toLowerCase();
    return (
      (lower.includes('name') || lower.includes('roll') || lower.includes('amount')) &&
      (lower.includes('s.no') ||
        lower.includes('s.l.no') ||
        lower.includes('sl.no') ||
        lower.includes('branch') ||
        lower.includes('date') ||
        lower.includes('amount') ||
        lower.includes('status') ||
        lower.includes('receiver'))
    );
  });

  const validCsvText = headerIndex >= 0 ? lines.slice(headerIndex).join('\n') : csvText;

  const results = Papa.parse<Record<string, string>>(validCsvText.trim(), {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (header) => header.trim(),
  });

  if (!results.data || results.data.length === 0) {
    return [];
  }

  return results.data
    .map((row, index) => {
      // Flexible key finders
      const getField = (possibleKeys: string[]) => {
        for (const k of possibleKeys) {
          if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') {
            return String(row[k]).trim();
          }
        }
        return '';
      };

      const sNoRaw = getField(['S.L.NO', 'S.L.No', 'SL.NO', 'SL. No', 'S.No', 'S. No', 'SNo', 'Serial', 'Sl No']) || `${index + 1}`;
      
      const colStudentName = getField(['Student Name', 'Student Name ', 'Name', 'Full Name']);
      const colRollNo = getField(['Roll No', 'Roll No.', 'RollNo', 'Roll', 'Reg No', 'RegNo', 'Enrollment']);
      
      // Intelligent Name vs Roll No determination
      // If colStudentName contains an ID format like UCET-... and colRollNo has a person name, swap them
      let name = colStudentName || colRollNo || `Student ${index + 1}`;
      let rollNo = colRollNo;

      const isIdLike = (str: string) => /^[A-Z0-9]+-[0-9]+/i.test(str) || /^[0-9]+$/.test(str);
      const isNameLike = (str: string) => !isIdLike(str) && /^[a-zA-Z\s.]+$/.test(str);

      if (isIdLike(colStudentName) && isNameLike(colRollNo)) {
        name = colRollNo;
        rollNo = colStudentName;
      } else if (isIdLike(colStudentName) && !colRollNo) {
        rollNo = colStudentName;
        name = `Student (${colStudentName})`;
      }

      const branch = getField(['Branch', 'Dept', 'Department']) || 'CSE';
      const rawYear = getField(['Year', 'Batch']) || '1';
      const year = rawYear.replace(/[^0-9]/g, '') || '1';
      
      const amountRaw = getField(['Amount (in ₹)', 'Amount (in Rs)', 'Amount', 'Contribution', 'Amount(Rs)']) || '0';
      const amount = parseFloat(amountRaw.replace(/[^0-9.]/g, '')) || 0;
      
      const date = getField(['Payment date', 'Payment Date', 'Date', 'Paid Date']) || new Date().toISOString().split('T')[0];
      const receiverRaw = getField(['Receiver', 'Received By', 'Collected By', 'Collector', 'ReceivedBy', 'Payment Receiver']);
      const receiver = normalizeReceiver(receiverRaw);
      const status = getField(['Status', 'Payment Status', 'Payment status', 'Payment Status ']) || 'PAID';

      const quote = getField(['Quote', 'Message', 'Wishes']) ||
        (receiver && receiver !== 'Unassigned'
          ? `Contribution confirmed & received by ${receiver}`
          : 'Thank you teachers for guiding and inspiring us!');

      return {
        id: `sheet-${index}-${name.replace(/\s+/g, '')}`,
        sNo: parseInt(sNoRaw, 10) || index + 1,
        name,
        rollNo,
        branch: branch || 'CSE',
        year: year || '1',
        amount,
        date,
        quote,
        receiver,
        status,
        isLocal: false,
      };
    })
    .filter((item) => item.name && item.amount > 0);
}

export function computeStats(
  sheetContributions: Contribution[],
  localContributions: Contribution[],
  target: number = DEFAULT_TARGET_AMOUNT
): SheetStats {
  const all = [...localContributions, ...sheetContributions];
  const totalAmount = all.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalContributors = all.length;
  const paidStudentsCount = totalContributors;
  const participationPercent = Math.min(
    100,
    parseFloat(((paidStudentsCount / TOTAL_CSE_STUDENTS) * 100).toFixed(1))
  );

  let latestDateStr = '';
  if (all.length > 0) {
    const dates = all.map((c) => c.date).filter(Boolean);
    if (dates.length > 0) {
      latestDateStr = dates[0];
    }
  }

  const todayIso = new Date().toISOString().split('T')[0];
  const todayIndian = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

  let todayAmount = all
    .filter((item) => {
      if (!item.date) return false;
      const d = item.date.trim();
      return (
        d === todayIso ||
        d === todayIndian ||
        d === latestDateStr ||
        item.isLocal
      );
    })
    .reduce((sum, item) => sum + (item.amount || 0), 0);

  if (todayAmount === 0 && all.length > 0) {
    const lastDate = all[all.length - 1]?.date;
    todayAmount = all
      .filter((item) => item.date === lastDate)
      .reduce((sum, item) => sum + (item.amount || 0), 0);
  }

  const branchBreakdown: Record<string, number> = {
    CSE: totalAmount,
  };

  // Compute breakdown for receivers (Khushi, Aditya, etc.)
  const getReceiverStats = (targetName: string, displayName: string): ReceiverStats => {
    const filtered = all.filter((c) => (c.receiver || '').toLowerCase() === targetName.toLowerCase());
    const total = filtered.reduce((sum, item) => sum + (item.amount || 0), 0);
    const count = filtered.length;
    const percentage = totalAmount > 0 ? parseFloat(((total / totalAmount) * 100).toFixed(1)) : 0;
    return {
      name: targetName,
      displayName,
      totalAmount: total,
      count,
      percentage,
      recentContributions: filtered.slice(0, 5),
    };
  };

  const khushiStats = getReceiverStats('Khushi', 'Khushi');
  const adityaStats = getReceiverStats('Aditya', 'Aditya');

  const othersList = all.filter((c) => {
    const r = (c.receiver || '').toLowerCase();
    return r !== 'khushi' && r !== 'aditya';
  });
  const othersTotal = othersList.reduce((sum, item) => sum + (item.amount || 0), 0);
  const othersStats: ReceiverStats = {
    name: 'Others',
    displayName: 'Other Coordinators',
    totalAmount: othersTotal,
    count: othersList.length,
    percentage: totalAmount > 0 ? parseFloat(((othersTotal / totalAmount) * 100).toFixed(1)) : 0,
    recentContributions: othersList.slice(0, 5),
  };

  const allReceivers: ReceiverStats[] = [khushiStats, adityaStats];
  if (othersStats.count > 0) {
    allReceivers.push(othersStats);
  }

  const progressPercent = Math.min(100, parseFloat(((totalAmount / target) * 100).toFixed(1)));

  return {
    totalAmount,
    todayAmount,
    totalContributors,
    targetAmount: target,
    progressPercent,
    totalClassStrength: TOTAL_CSE_STUDENTS,
    paidStudentsCount,
    participationPercent,
    branchBreakdown,
    receiverBreakdown: {
      khushi: khushiStats,
      aditya: adityaStats,
      others: othersStats,
      allReceivers,
    },
    latestDate: latestDateStr || todayIndian,
  };
}

