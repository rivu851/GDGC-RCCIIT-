'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LeaderboardModal from './LeaderboardModal';

const StudyJams = () => {
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#fdfcec] bg-[radial-gradient(#999_1px,transparent_1px)] bg-size-[20px_20px] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-[#4285F4]">Google</span>{' '}
            <span className="text-[#EA4335]">Cloud</span>{' '}
            <span className="text-[#FBBC04]">Study</span>{' '}
            <span className="text-[#34A853]">Jams</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Embark on your cloud journey with hands-on labs and earn badges to showcase your skills!
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-200"
        >
          <div className="p-8 md:p-12">
            {/* Info Section */}
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                What are Study Jams?
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  Google Cloud Study Jams are community-led study groups where you can learn Google Cloud technologies through hands-on experience with Qwiklabs.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Complete skill badges and quests</li>
                  <li>Learn at your own pace</li>
                  <li>Access to free Google Cloud credits</li>
                  <li>Earn certificates and showcase your achievements</li>
                  <li>Get amazing <span className="font-bold rainbow-text">SWAGS</span></li>
                </ul>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <div className="text-4xl font-bold text-[#4285F4] mb-2">200+</div>
                <div className="text-gray-700 font-medium">Participants</div>
              </div>
              <div className="bg-linear-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-200">
                <div className="text-4xl font-bold text-[#EA4335] mb-2">20+</div>
                <div className="text-gray-700 font-medium">Skill Badges</div>
              </div>
              <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                <div className="text-4xl font-bold text-[#34A853] mb-2">20+</div>
                <div className="text-gray-700 font-medium">Quests Completed</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                disabled
                className="relative px-8 py-4 text-lg font-semibold rounded-xl bg-gray-300 text-gray-500 cursor-not-allowed overflow-hidden min-w-[200px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Register</span>
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                  Closed
                </div>
              </motion.button>

              <motion.button
                onClick={() => setIsLeaderboardOpen(true)}
                className="relative px-8 py-4 text-lg font-semibold rounded-xl bg-linear-to-r from-[#4285F4] to-[#34A853] text-white overflow-hidden min-w-[200px] hover:shadow-2xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  View Leaderboard
                </span>
              </motion.button>
            </div>
          </div>

          {/* Decorative Border Bottom */}
          <div className="h-2 bg-linear-to-r from-[#4285F4] to-[#34A853]" />
        </motion.div>
      </div>

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
    </section>
  );
};

export default StudyJams;
