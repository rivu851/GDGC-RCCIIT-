/**
 * Excel Integration Guide for Leaderboard
 * 
 * To integrate with an actual Excel sheet, you can use the following approaches:
 * 
 * 1. Using xlsx library:
 *    npm install xlsx
 *    
 *    import * as XLSX from 'xlsx';
 *    
 *    const loadExcelData = async () => {
 *      const response = await fetch('/path/to/leaderboard.xlsx');
 *      const arrayBuffer = await response.arrayBuffer();
 *      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
 *      const sheetName = workbook.SheetNames[0];
 *      const worksheet = workbook.Sheets[sheetName];
 *      const data = XLSX.utils.sheet_to_json(worksheet);
 *      return data;
 *    };
 * 
 * 2. Using Google Sheets API:
 *    - Store data in Google Sheets
 *    - Use Google Sheets API to fetch data
 *    - More dynamic and real-time updates
 * 
 * 3. Using a backend API:
 *    - Upload Excel to backend
 *    - Backend parses and serves JSON
 *    - More secure and controlled
 * 
 * Current implementation uses sample data.
 * Replace the setTimeout in LeaderboardModal.tsx with actual data fetching.
 */

export interface LeaderboardEntry {
  rank: number;
  name: string;
  badges: number;
  quests: number;
  points: number;
}

export const loadLeaderboardData = async (): Promise<LeaderboardEntry[]> => {
  // TODO: Implement actual Excel file reading
  // For now, returns sample data
  return [
    { rank: 1, name: 'Arjun Sharma', badges: 15, quests: 8, points: 950 },
    { rank: 2, name: 'Priya Das', badges: 14, quests: 7, points: 920 },
    { rank: 3, name: 'Rahul Kumar', badges: 13, quests: 7, points: 890 },
    { rank: 4, name: 'Sneha Gupta', badges: 12, quests: 6, points: 850 },
    { rank: 5, name: 'Amit Singh', badges: 11, quests: 6, points: 820 },
    { rank: 6, name: 'Riya Patel', badges: 10, quests: 5, points: 780 },
    { rank: 7, name: 'Vikram Rao', badges: 9, quests: 5, points: 750 },
    { rank: 8, name: 'Anjali Verma', badges: 8, quests: 4, points: 710 },
    { rank: 9, name: 'Karan Mehta', badges: 7, quests: 4, points: 670 },
    { rank: 10, name: 'Pooja Reddy', badges: 6, quests: 3, points: 630 },
  ];
};
