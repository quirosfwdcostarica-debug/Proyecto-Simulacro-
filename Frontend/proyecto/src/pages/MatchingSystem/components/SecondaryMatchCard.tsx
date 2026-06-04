import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '../../../components/ui/Button/Button';
import styles from './SecondaryMatchCard.module.css';

interface SecondaryMatchProps {
  name: string;
  role: string;
  imageUrl: string;
  score: number;
  quote?: string;
  matchingReason?: string;
  sharedInterest?: string;
  location?: string;
  primaryAction: string;
  hasHeartBtn?: boolean;
}

export const SecondaryMatchCard: React.FC<{ match: SecondaryMatchProps }> = ({ match }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.profileSection}>
          <img src={match.imageUrl} alt={match.name} className={styles.avatar} />
          <div>
            <h3 className={styles.name}>{match.name}</h3>
            <p className={styles.role}>{match.role}</p>
          </div>
        </div>
        <div className={styles.scoreSection}>
          <span className={styles.score}>{match.score}%</span>
          <span className={styles.scoreLabel}>Affinity</span>
        </div>
      </div>

      <div className={styles.body}>
        {match.quote && (
          <div className={styles.quoteBox}>
            <p>"{match.quote}"</p>
          </div>
        )}

        {match.matchingReason && (
          <div className={styles.reasonSection}>
            <h4 className={styles.reasonTitle}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
              MATCHING REASON
            </h4>
            <p className={styles.reasonText}>{match.matchingReason}</p>
          </div>
        )}

        {(match.sharedInterest || match.location) && (
          <div className={styles.boxesRow}>
            {match.sharedInterest && (
              <div className={styles.infoBox}>
                <span className={styles.boxLabel}>Shared Interest</span>
                <span className={styles.boxValue}>{match.sharedInterest}</span>
              </div>
            )}
            {match.location && (
              <div className={styles.infoBox}>
                <span className={styles.boxLabel}>Location</span>
                <span className={styles.boxValue}>{match.location}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" className={styles.viewBtn}>View Details</Button>
        {match.hasHeartBtn ? (
          <button className={styles.iconBtn}>
            <Heart size={20} />
          </button>
        ) : (
          <Button variant="primary">{match.primaryAction}</Button>
        )}
      </div>
    </div>
  );
};
