import React from 'react';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { MarketplaceActivity } from './components/MarketplaceActivity';
import { FeaturedMatchCard } from './components/FeaturedMatchCard';
import { SecondaryMatchCard } from './components/SecondaryMatchCard';
import styles from './MatchingSystem.module.css';

const secondaryMatches = [
  {
    id: '1',
    name: 'Marcus Chen',
    role: 'Founder @ GreenVenture',
    imageUrl: 'https://i.pravatar.cc/150?img=11',
    score: 82,
    quote: 'Looking for UCR graduates interested in sustainable tech and venture capital mentorship.',
    matchingReason: 'Shared background in the Faculty of Economics (2005) and current focus on impact investing.',
    primaryAction: 'Connect',
    hasHeartBtn: true
  },
  {
    id: '2',
    name: 'Sofia Mendez',
    role: 'Product Manager @ InnovateX',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
    score: 75,
    sharedInterest: 'Agile Dev',
    location: 'Remote / Madrid',
    primaryAction: 'Connect',
    hasHeartBtn: false
  }
];

export const MatchingSystem: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.mainContainer}>
        <Sidebar />
        
        <main className={styles.content}>
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h1 className={styles.title}>AI Matching System</h1>
              <p className={styles.subtitle}>
                We've analyzed 1,240 alumni profiles to find the most impactful connections for your current project goals.
              </p>
            </div>
            <div className={styles.sortContainer}>
              <span className={styles.sortLabel}>SORT BY:</span>
              <select className={styles.sortSelect}>
                <option>Affinity Score</option>
                <option>Recent</option>
              </select>
            </div>
          </div>

          <div className={styles.contentLayout}>
            <div className={styles.cardsColumn}>
              <FeaturedMatchCard />
              
              <div className={styles.secondaryGrid}>
                {secondaryMatches.map(match => (
                  <SecondaryMatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>

            <div className={styles.sidebarColumn}>
              <MarketplaceActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
