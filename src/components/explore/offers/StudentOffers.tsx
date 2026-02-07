"use client"
import React from 'react';
import { motion } from 'framer-motion';
import offers from '../../../data/offers';

/**
 * This component renders a grid of student‑centric offers along with
 * instructions on how to redeem them. Each card uses the official
 * logo for the associated service rather than an emoji.  Logos are
 * stored in the public/logos directory so that they can be served by
 * the static file server without requiring an extra import.  To add
 * new offers, simply extend the offers array with a new object
 * providing an id, title, description, company, gradient colours and
 * the relative path to its logo in the public folder.
 */

const StudentOffers: React.FC = () => {

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
            <span className="text-[#4285F4]">Student</span>{' '}
            <span className="text-[#EA4335]">Offers</span>{' '}
            <span className="text-[#FBBC04]">&amp;</span>{' '}
            <span className="text-[#34A853]">Benefits</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Exclusive deals and free resources for students to supercharge your learning journey
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300"
            >
              {/* Card Header */}
              <div className={`p-6 bg-linear-to-br ${offer.color} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                  {/* Large watermark logo (preserve aspect ratio) */}
                  <img
                    src={offer.logo}
                    alt={`${offer.company} logo watermark`}
                    className="w-32 h-auto object-contain relative top-5"
                  />
                </div>
                <div className="relative z-10 flex flex-col items-start">
                  {/* Small logo icon (preserve aspect ratio) */}
                  <img
                    src={offer.logo}
                    alt={`${offer.company} logo`}
                    className="h-10 w-auto max-w-10 object-contain mb-3"
                  />
                  <h3 className={`text-xl font-bold mb-2 ${offer.textColor === 'dark' ? 'text-gray-900' : 'text-white'}`}>{offer.title}</h3>
                  <p className={`text-sm ${offer.textColor === 'dark' ? 'text-gray-800' : 'text-white/90'}`}>{offer.company}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-700 mb-4 line-clamp-3">{offer.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {offer.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-2">
                  {offer.link && (
                    <a href={offer.link} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-[#4285F4] text-white font-semibold rounded-lg text-center hover:bg-[#EA4335] transition-colors">
                      Get Now
                    </a>
                  )}
                  {offer.secondaryLink && (
                    <a href={offer.secondaryLink} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg text-center hover:bg-gray-300 transition-colors">
                      Alternative
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              >
                <div className={`absolute inset-0 bg-linear-to-r ${offer.color} opacity-10`} />
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${offer.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-linear-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">🎓 How to Access These Offers?</h3>
          <p className="text-gray-700 mb-4">
            Most of these offers require a valid student email address (for example: rcciit.org.in).
            Make sure to verify your student status to unlock these amazing benefits!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Valid Student ID</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Institutional Email</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Enrollment Verification</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentOffers;