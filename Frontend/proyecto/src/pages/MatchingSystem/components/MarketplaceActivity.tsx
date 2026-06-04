import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './MarketplaceActivity.module.css';

export const MarketplaceActivity: React.FC = () => {
  return (
    <aside className={styles.activitySidebar}>
      <h3 className={styles.title}>Marketplace Activity</h3>
      
      <div className={styles.statsList}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Daily Matches</span>
          <span className={styles.statValueGreen}>12</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Connections Made</span>
          <span className={styles.statValue}>48</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Response Rate</span>
          <span className={styles.statValueGreen}>94%</span>
        </div>
      </div>

      <div className={styles.premiumBox}>
        <h4 className={styles.premiumTitle}>PREMIUM INSIGHT</h4>
        <p className={styles.premiumText}>
          Profiles with completed "Social Impact" sections receive 3x more connection requests.
        </p>
        <button className={styles.updateBtn}>
          Update your profile <ArrowRight size={14} />
        </button>
      </div>
    </aside>
  );
};
