// src/pages/Documentation.jsx
import React, { useContext } from 'react';
import { DarkModeContext } from '../App';

const resources = [
  {
    category: 'Online Judges',
    items: [
      { title: 'Codeforces', url: 'https://codeforces.com', description: 'Weekly contests, problem sets, and editorial community.' },
      { title: 'AtCoder', url: 'https://atcoder.jp', description: 'Regular contests and high-quality challenge problems.' },
      { title: 'HackerRank', url: 'https://www.hackerrank.com', description: 'Interview prep and coding competitions.' },
      { title: 'LeetCode', url: 'https://leetcode.com', description: 'Coding problems crafted for interview success.' },
      { title: 'CSES Problemset', url: 'https://cses.fi/problemset/', description: 'Structured collection of standard algorithmic problems.' },
    ],
  },
  {
    category: 'Learning Platforms',
    items: [
      { title: 'USACO Guide', url: 'https://usaco.guide', description: 'Comprehensive tutorials and problem walkthroughs.' },
      { title: 'GeeksforGeeks CP Resources', url: 'https://www.geeksforgeeks.org/what-are-the-best-resources-for-competitive-programming/', description: 'Curated list of top CP platforms and guides.' },
    ],
  },
  {
    category: 'Algorithm References',
    items: [
      { title: 'CP‑Algorithms', url: 'https://cp-algorithms.com', description: 'In-depth algorithm tutorials across core topics.' },
      { title: 'Everything for CP (GitHub)', url: 'https://github.com/utkarsh512/Everything-for-CP', description: 'Curated repo of CP resources and tools.' },
    ],
  },
  {
    category: 'Books & Guides',
    items: [
      { title: "Competitive Programmer's Handbook (Laaksonen)", url: 'https://cses.fi/book.html', description: 'Free thorough guide to CP algorithms and DS.' },
      { title: 'Guide to Competitive Programming', url: 'https://www.springer.com/gp/book/9783030546871', description: 'Classic training manual by Laaksonen & Revilla.' },
    ],
  },
];

export default function Documentation() {
  const { darkMode } = useContext(DarkModeContext);

  // Page background
  const pageBg = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';

  // Card background & border based on mode
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const cardBorder = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`${pageBg} min-h-screen py-12 transition-colors`}>
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-8 text-center">
          Documentation & Resources
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map(section => (
            <div key={section.category} className="space-y-4">
              <h2 className="text-2xl font-bold border-b pb-2">
                {section.category}
              </h2>
              <ul className="space-y-2">
                {section.items.map(item => (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        block p-4 rounded-lg hover:shadow-lg transition
                        ${cardBg} border ${cardBorder}
                      `}
                    >
                      <h3 className="text-lg font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm">
                        {item.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
