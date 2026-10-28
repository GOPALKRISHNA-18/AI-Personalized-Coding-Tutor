import React, { useState } from 'react';
import {
  Flame
} from 'lucide-react';
import {
  difficultyData,
  topicProgressData,
  badgesData,
  ratingHistoryData
} from '../data/statsData';
import AnimatedCounter from '../components/AnimatedCounter';
import ProgressRing from '../components/ProgressRing';
import './ProgressPage.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ProgressPage = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const totalSolved = difficultyData.reduce((acc, curr) => acc + curr.solved, 0);
  const totalProblems = difficultyData.reduce((acc, curr) => acc + curr.total, 0);

  const calendarDays = Array.from({ length: 364 }, (_, i) => {
    if (i === 363) return 1;
    return 0;
  });

  return (
    <main className='progress-container'>
      <section className='progress-header-banner'>
        <div className='banner-left'>
          <div className='progress-pill'>
            <span>LeetCode Lifetime Statistics</span>
          </div>
          <h1 className='progress-h1'>Progress & Performance</h1>
          <p className='progress-sub'>
            Track your algorithmic growth, contest rating trajectory, submission heatmaps, and earned achievements.
          </p>
        </div>
        <div className='summary-stat-capsules'>
          <div className='capsule-item'>
            <span className='capsule-label'>Global Rank</span>
            <span className='capsule-num'>Novice</span>
          </div>
          <div className='capsule-item'>
            <span className='capsule-label'>Acceptance</span>
            <span className='capsule-num'>
              <AnimatedCounter value='100%' />
            </span>
          </div>
          <div className='capsule-item'>
            <span className='capsule-label'>Daily Streak</span>
            <span className='capsule-num streak'>
              <Flame size={16} className='streak-flame-anim' />
              <AnimatedCounter value='1 Day' />
            </span>
          </div>
        </div>
      </section>
      <section className='stats-top-grid'>
        <div className='difficulty-card'>
          <h3 className='section-title'>Difficulty Breakdown</h3>
          <div className='diff-summary-row'>
            <div className='total-solved-dial'>
              <ProgressRing
                progress={(totalSolved / totalProblems) * 100}
                size={110}
                strokeWidth={8}
                color='#10b981'
                gradientEnd='#06b6d4'
              >
                <div className='dial-content'>
                  <span className='dial-num'>
                    <AnimatedCounter value={totalSolved} />
                  </span>
                  <span className='dial-label'>/ {totalProblems}</span>
                </div>
              </ProgressRing>
            </div>
            <div className='diff-bars-stack'>
              {difficultyData.map((d) => (
                <div key={d.level} className='diff-bar-item'>
                  <div className='diff-bar-meta'>
                    <span className='diff-name'>{d.level}</span>
                    <span className='diff-fraction'>
                      <strong><AnimatedCounter value={d.solved} /></strong> / {d.total}
                    </span>
                  </div>
                  <div className='diff-track'>
                    <div
                      className='diff-fill'
                      style={{
                        width: `${(d.solved / d.total) * 100}%`,
                        backgroundColor: d.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='rating-chart-card'>
          <div className='chart-header'>
            <div>
              <h3 className='section-title'>Contest Rating Trajectory</h3>
              <span className='chart-sub'>Current: 1,200 (Novice Tier)</span>
            </div>
            <span className='chart-delta'>Baseline Rating</span>
          </div>
          <div className='svg-chart-wrapper'>
            <svg viewBox='0 0 500 160' className='rating-line-svg'>
              <defs>
                <linearGradient id='chartGradient' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.4' />
                  <stop offset='100%' stopColor='#3b82f6' stopOpacity='0.0' />
                </linearGradient>
              </defs>
              <line x1='40' y1='20' x2='480' y2='20' stroke='#e2e8f0' strokeDasharray='3 3' />
              <line x1='40' y1='70' x2='480' y2='70' stroke='#e2e8f0' strokeDasharray='3 3' />
              <line x1='40' y1='120' x2='480' y2='120' stroke='#e2e8f0' strokeDasharray='3 3' />
              <polygon
                points='40,120 472,120 472,130 40,130'
                fill='url(#chartGradient)'
              />
              <polyline
                fill='none'
                stroke='#6366f1'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
                points='40,120 88,120 136,120 184,120 232,120 280,120 328,120 376,120 424,120 472,120'
              />
              {ratingHistoryData.map((pt, idx) => {
                const x = 40 + idx * 48;
                const y = 120;
                return (
                  <circle
                    key={pt.month}
                    cx={x}
                    cy={y}
                    r='4'
                    fill='#ffffff'
                    stroke='#6366f1'
                    strokeWidth='2.5'
                  />
                );
              })}
              {ratingHistoryData.map((pt, idx) => (
                <text
                  key={idx}
                  x={40 + idx * 48}
                  y='150'
                  textAnchor='middle'
                  fontSize='10'
                  fill='#64748b'
                >
                  {pt.month}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </section>
      <section className='heatmap-card'>
        <div className='heatmap-header'>
          <div>
            <h3 className='section-title'>Submission Calendar</h3>
            <span className='heatmap-sub'>1 submission in the past 12 months</span>
          </div>
          <div className='heatmap-legend'>
            <span className='legend-txt'>Less</span>
            <div className='legend-cell lvl-0' />
            <div className='legend-cell lvl-1' />
            <div className='legend-cell lvl-2' />
            <div className='legend-cell lvl-3' />
            <span className='legend-txt'>More</span>
          </div>
        </div>
        <div className='heatmap-months-row'>
          {months.map((m) => (
            <span key={m} className='heatmap-m-label'>{m}</span>
          ))}
        </div>
        <div className='heatmap-grid-scroll'>
          <div className='heatmap-days-matrix'>
            {calendarDays.map((lvl, idx) => (
              <div
                key={idx}
                className={`heat-cell lvl-${lvl}`}
                title={`Day ${idx + 1}: ${lvl} submission`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className='stats-bottom-grid'>
        <div className='topics-card'>
          <h3 className='section-title'>Topic-wise Mastery</h3>
          <div className='topics-list-stack'>
            {topicProgressData.map((t) => (
              <div key={t.topic} className='topic-mastery-row'>
                <div className='topic-meta-line'>
                  <span className='topic-name'>{t.topic}</span>
                  <span className='topic-count'>
                    <strong>{t.solved}</strong> / {t.total} ({t.pct}%)
                  </span>
                </div>
                <div className='topic-track'>
                  <div
                    className='topic-fill'
                    style={{ width: `${t.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='badges-card'>
          <div className='badges-header'>
            <h3 className='section-title'>Badges & Achievements</h3>
            <span className='badge-count-pill'>
              {badgesData.filter((b) => b.unlocked).length} / {badgesData.length} Unlocked
            </span>
          </div>
          <div className='badges-grid'>
            {badgesData.map((badge) => (
              <div
                key={badge.id}
                className={`badge-box ${badge.unlocked ? 'unlocked badge-shine-effect' : 'locked'}`}
                onClick={() => setSelectedBadge(badge)}
              >
                <div className='badge-symbol'>{badge.icon}</div>
                <span className='badge-card-title'>{badge.title}</span>
                <span className='badge-card-year'>{badge.year}</span>
                {!badge.unlocked && <span className='locked-pill'>Locked</span>}
              </div>
            ))}
          </div>
          {selectedBadge && (
            <div className='badge-detail-notice'>
              <strong>{selectedBadge.title} ({selectedBadge.year})</strong>: {selectedBadge.desc}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProgressPage;