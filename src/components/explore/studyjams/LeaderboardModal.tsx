'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardEntry {
  rank: number;
  name: string;
  badges: number;
  quests: number;
  points: number;
  profileUrl: string;
}

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);

    (async () => {
      try {
        const response = await fetch('/leaderboard-data.csv');
        if (!response.ok) throw new Error('Failed to load leaderboard data');

        // Try to read Last-Modified header, fall back to now
        const lastMod = response.headers.get('last-modified');
        setLastUpdated(lastMod ? new Date(lastMod) : new Date());

        const csvText = await response.text();
        const lines = csvText.split('\n');
        const entries: LeaderboardEntry[] = [];

        // Skip header row (index 0) and parse data
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          // Parse CSV line (handle commas in quoted fields)
          const fields: string[] = [];
          let currentField = '';
          let inQuotes = false;

          for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              fields.push(currentField.trim());
              currentField = '';
            } else {
              currentField += char;
            }
          }
          fields.push(currentField.trim());

          if (fields.length >= 9) {
            const name = fields[0];
            const profileUrl = fields[2]; // Profile URL is in column 3
            const badges = parseInt(fields[6]) || 0;
            const quests = parseInt(fields[8]) || 0;
            const points = (badges * 100) + (quests * 150); // Calculate points

            // Only include entries with at least some activity
            if (badges > 0 || quests > 0) {
              entries.push({
                rank: 0, // Will be assigned after sorting
                name,
                badges,
                quests,
                points,
                profileUrl
              });
            }
          }
        }

        // Sort by points (descending) and assign ranks
        entries.sort((a, b) => b.points - a.points);
        entries.forEach((entry, index) => {
          entry.rank = index + 1;
        });

        console.log('Loaded entries:', entries.length);
        setLeaderboardData(entries);
        setLoading(false);
      } catch (error) {
        console.error('Error loading leaderboard data:', error);
        setLeaderboardData([]);
        setLoading(false);
        setLastUpdated(new Date());
      }
    })();
  }, [isOpen]);

  const getRankColor = (rank: number, isCompleted = false) => {
    if (isCompleted) return 'bg-green-600 text-white';
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRankIcon = (rank: number) => {
    // Return a numeric rank (no medal emojis)
    return String(rank);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90%] md:max-w-4xl z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full md:h-auto md:max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="bg-linear-to-r from-[#4285F4] to-[#34A853] p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
                  🏆 Study Jam Leaderboard
                </h2>
                <p className="text-white/90 text-center mt-2">
                  Top performers of the season
                </p>
                {lastUpdated && (
                  <div className="absolute right-4 bottom-2 text-sm text-white/80">
                    Last updated: 3rd November 2025 at 9:30PM
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#4285F4] border-t-transparent" />
                  </div>
                ) : leaderboardData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Yet</h3>
                    <p className="text-gray-500">
                      Complete badges and quests to appear on the leaderboard!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-100 rounded-lg font-semibold text-gray-700 text-sm">
                      <div className="col-span-1 text-center">Rank</div>
                      <div className="col-span-4">Name</div>
                      <div className="col-span-2 text-center">Badges</div>
                      <div className="col-span-2 text-center">Arcade</div>
                      <div className="col-span-3 text-center">Profile</div>
                    </div>

                    {/* Leaderboard Entries */}
                    {leaderboardData.map((entry, index) => {
                      const isCompleted = entry.badges >= 19 && entry.quests >= 1;
                      return (
                      <motion.div
                        key={entry.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-4 rounded-xl border-2 ${
                          isCompleted
                            ? 'border-green-300 bg-green-50'
                            : entry.rank <= 3
                            ? 'border-yellow-300 bg-linear-to-r from-yellow-50 to-orange-50'
                            : 'border-gray-200 bg-white'
                        } hover:shadow-lg transition-shadow`}
                      >
                        {/* Rank */}
                        <div className="md:col-span-1 flex md:flex-col items-center justify-center">
                          <span className="md:hidden font-semibold mr-2 text-gray-600">Rank:</span>
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor(
                              entry.rank,
                              isCompleted
                            )}`}
                          >
                            {getRankIcon(entry.rank)}
                          </div>
                        </div>

                        {/* Name */}
                        <div className="md:col-span-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="md:hidden font-semibold mr-2 text-gray-600">Name:</span>
                            <span className="font-semibold text-gray-800 text-lg">
                              {entry.name}
                            </span>
                            {/* small pill on mobile next to name */}
                            {isCompleted && (
                              <span className="md:hidden inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-600 text-white">
                                ✅
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="md:col-span-2 flex md:flex-col items-center md:justify-center">
                          <span className="md:hidden font-semibold mr-2 text-gray-600">Badges:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#4285F4] text-lg">
                              {entry.badges}
                            </span>
                          </div>
                        </div>

                        {/* Quests */}
                        <div className="md:col-span-2 flex md:flex-col items-center md:justify-center">
                          <span className="md:hidden font-semibold mr-2 text-gray-600">Quests:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🎯</span>
                            <span className="font-bold text-[#EA4335] text-lg">
                              {entry.quests}
                            </span>
                          </div>
                        </div>

                        {/* Profile Button */}
                        <div className="md:col-span-3 flex md:flex-col items-center md:justify-center">
                          <span className="md:hidden font-semibold mr-2 text-gray-600">Profile:</span>
                          <a
                            href={entry.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#4285F4] to-[#34A853] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
                          >
                            <span>View Profile</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                          {/* Completed pill for qualifying users (desktop) */}
                          {isCompleted && (
                            <div className="hidden md:block mt-3">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-600 text-white">
                                ✅ Completed
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )})}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <p className="text-sm text-gray-600 text-center">
                  💡 Keep completing badges and quests to climb the leaderboard!
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeaderboardModal;
