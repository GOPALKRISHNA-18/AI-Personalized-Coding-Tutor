import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Flame,
  Award,
  TrendingUp,
  Clock,
  Play,
  ArrowRight,
  Code2,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { getCurrentUser } from '../services/authService';
import { getDashboardStats } from '../services/progressService';
import { getRecommendedExercises } from '../services/exerciseService';
import { getSubmissions } from '../services/submissionService';
import {
  initialSummaryStats,
  initialCourses,
  initialTopicSkills,
  defaultRecommended
} from '../data/statsData';
import { initialActivities } from '../data/activityData';
import AnimatedCounter from '../components/AnimatedCounter';
import ProgressRing from '../components/ProgressRing';
import './Dashboard.css';

const iconMap = {
  CheckCircle2,
  Flame,
  Award,
  TrendingUp
};

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userName = currentUser?.name || 'Gopal Krishna';
  const userId = currentUser?.id || 1;

  const [summaryStats, setSummaryStats] = useState(initialSummaryStats);
  const [courses, setCourses] = useState(initialCourses);
  const [topicSkills] = useState(initialTopicSkills);
  const [recentActivities, setRecentActivities] = useState(initialActivities);
  const [recommended, setRecommended] = useState(defaultRecommended);

  useEffect(() => {
    loadLiveBackendData();
  }, [userId]);

  const loadLiveBackendData = async () => {
    try {
      const stats = await getDashboardStats(userId);
      if (stats && (stats.completedChallenges !== undefined || stats.streak !== undefined)) {
        setSummaryStats([
          {
            id: 'exercises',
            label: 'Exercises Completed',
            value: String(stats.completedChallenges ?? 1),
            subtext: 'challenges solved',
            iconName: 'CheckCircle2',
            color: '#10b981'
          },
          {
            id: 'streak',
            label: 'Current Streak',
            value: `${stats.streak ?? 1} Day`,
            subtext: 'Active streak',
            iconName: 'Flame',
            color: '#f59e0b'
          },
          {
            id: 'quizzes',
            label: 'Quizzes Taken',
            value: '1',
            subtext: 'Baseline assessment',
            iconName: 'Award',
            color: '#6366f1'
          },
          {
            id: 'score',
            label: 'Average Score',
            value: `${stats.averageScore ?? 85}%`,
            subtext: 'Verified accuracy',
            iconName: 'TrendingUp',
            color: '#06b6d4'
          }
        ]);

        if (Array.isArray(stats.skillByLanguage) && stats.skillByLanguage.length > 0) {
          const mapped = stats.skillByLanguage.map((item) => ({
            language: item.language,
            percentage: Math.min(100, (item.challenges || 0) * 5),
            modules: `${item.challenges || 0} / 20 Modules`,
            color: item.language === 'Python' ? '#3572A5' : item.language === 'Java' ? '#b07219' : item.language === 'JavaScript' ? '#f1e05a' : '#555555'
          }));
          setCourses(mapped);
        }
      }
    } catch (e) {}

    try {
      const recList = await getRecommendedExercises(userId);
      if (Array.isArray(recList) && recList.length > 0) {
        const topRec = recList[0];
        setRecommended({
          id: topRec.id,
          title: topRec.title,
          description: topRec.description,
          difficulty: topRec.difficulty || 'Easy',
          topic: topRec.topic || topRec.language,
          estimatedTime: '15 mins'
        });
      }
    } catch (e) {}

    try {
      const subs = await getSubmissions(userId);
      if (Array.isArray(subs) && subs.length > 0) {
        const mappedActs = subs.slice(0, 3).map((s, index) => ({
          id: s.id || index,
          name: s.exerciseTitle || `Exercise #${s.exerciseId || index + 1}`,
          status: s.status || 'Completed',
          time: s.submittedAt || 'Today',
          language: s.language || 'Python'
        }));
        setRecentActivities(mappedActs);
      }
    } catch (e) {}
  };

  const overallCompletion = 12;

  return (
    <main className='dashboard-container'>
      <section className='dashboard-welcome-card'>
        <div className='welcome-text-side'>
          <div className='welcome-badge'>
            <span>Personalized AI Learning Platform</span>
          </div>
          <h1 className='welcome-heading'>Welcome back, {userName}!</h1>
          <p className='welcome-subtext'>
            Continue your algorithmic mastery path. Practice tailored challenges, review AI-guided hints, and track your milestone achievements.
          </p>
          <div className='welcome-action-buttons'>
            <button
              type='button'
              className='welcome-btn primary'
              onClick={() => navigate('/exercises')}
            >
              <span>Browse Exercises</span>
              <ArrowRight size={15} />
            </button>
            <button
              type='button'
              className='welcome-btn secondary'
              onClick={() => navigate('/code-editor')}
            >
              <Code2 size={15} />
              <span>Open Code Editor</span>
            </button>
          </div>
        </div>
        <div className='welcome-streak-side'>
          <div className='streak-circle'>
            <Flame size={36} className='streak-flame-icon streak-flame-anim' />
            <span className='streak-num'>
              <AnimatedCounter value='1' />
            </span>
            <span className='streak-text'>Day Streak</span>
          </div>
        </div>
      </section>
      <section className='summary-cards-grid'>
        {summaryStats.map((stat, idx) => {
          const Icon = iconMap[stat.iconName] || stat.icon || CheckCircle2;
          return (
            <div
              key={stat.id}
              className='summary-card'
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className='summary-card-top'>
                <span className='summary-label'>{stat.label}</span>
                <div
                  className='summary-icon-box'
                  style={{ color: stat.color, backgroundColor: `${stat.color}1c` }}
                >
                  <Icon size={19} />
                </div>
              </div>
              <div className='summary-val'>
                <AnimatedCounter value={stat.value} />
              </div>
              <div className='summary-subtext'>{stat.subtext}</div>
            </div>
          );
        })}
      </section>
      <section className='dashboard-middle-grid'>
        <div className='course-progress-card'>
          <div className='card-section-header'>
            <div>
              <h3 className='section-title'>Learning Progress</h3>
              <p className='section-subtitle'>Curriculum completion across active languages</p>
            </div>
            <div className='ring-header-wrap'>
              <ProgressRing
                progress={overallCompletion}
                size={54}
                strokeWidth={5}
                color='#6366f1'
                gradientEnd='#06b6d4'
              >
                <span className='ring-text'>{overallCompletion}%</span>
              </ProgressRing>
            </div>
          </div>
          <div className='courses-progress-stack'>
            {courses.map((course) => (
              <div key={course.language} className='course-progress-item'>
                <div className='course-progress-meta'>
                  <div className='course-name-wrap'>
                    <span
                      className='course-color-dot'
                      style={{ backgroundColor: course.color }}
                    />
                    <span className='course-name'>{course.language}</span>
                  </div>
                  <div className='course-numbers'>
                    <span className='course-modules'>{course.modules}</span>
                    <span className='course-pct'>{course.percentage}%</span>
                  </div>
                </div>
                <div className='course-bar-track'>
                  <div
                    className='course-bar-fill'
                    style={{
                      width: `${course.percentage}%`,
                      backgroundColor: course.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='recommended-card'>
          <div className='recommended-badge'>
            <span>Recommended Next Exercise</span>
          </div>
          <h3 className='recommended-title'>{recommended.title}</h3>
          <p className='recommended-desc'>{recommended.description}</p>
          <div className='recommended-meta-row'>
            <span className={`diff-pill ${(recommended.difficulty || 'easy').toLowerCase()}`}>
              {recommended.difficulty}
            </span>
            <span className='rec-topic-pill'>{recommended.topic}</span>
            <span className='rec-time-pill'>
              <Clock size={12} />
              {recommended.estimatedTime}
            </span>
          </div>
          <div className='recommended-action-box'>
            <button
              type='button'
              className='start-exercise-btn'
              onClick={() => navigate(`/code-editor?id=${recommended.id}`)}
            >
              <Play size={15} fill='currentColor' />
              <span>Start Exercise</span>
            </button>
          </div>
        </div>
      </section>
      <section className='dashboard-bottom-grid'>
        <div className='skill-chart-card'>
          <div className='card-section-header'>
            <div>
              <h3 className='section-title'>Topic-wise Skill Proficiency</h3>
              <p className='section-subtitle'>Evaluated through practice challenges and quiz assessments</p>
            </div>
            <BarChart3 size={18} className='header-icon-muted' />
          </div>
          <div className='skills-bars-stack'>
            {topicSkills.map((skill) => (
              <div key={skill.topic} className='skill-bar-item'>
                <div className='skill-meta-line'>
                  <span className='skill-topic-name'>{skill.topic}</span>
                  <div className='skill-tags'>
                    <span className={`skill-level-tag ${skill.level.toLowerCase()}`}>
                      {skill.level}
                    </span>
                    <span className='skill-score-num'>{skill.score}%</span>
                  </div>
                </div>
                <div className='skill-track'>
                  <div
                    className='skill-fill'
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='recent-activity-card'>
          <div className='card-section-header'>
            <div>
              <h3 className='section-title'>Recent Activity</h3>
              <p className='section-subtitle'>Your latest learning checkpoints and submissions</p>
            </div>
            <Clock size={18} className='header-icon-muted' />
          </div>
          <div className='activities-list'>
            {recentActivities.map((act) => (
              <div key={act.id} className='activity-item-row'>
                <div className='activity-icon-bullet'>
                  {act.status === 'Completed' ? (
                    <CheckCircle2 size={16} className='act-icon-completed' />
                  ) : act.status === 'In Progress' ? (
                    <Clock size={16} className='act-icon-progress' />
                  ) : (
                    <BookOpen size={16} className='act-icon-reviewed' />
                  )}
                </div>
                <div className='activity-info'>
                  <div className='activity-title-line'>
                    <span className='act-name'>{act.name}</span>
                    <span className='act-lang-tag'>{act.language}</span>
                  </div>
                  <div className='activity-time-line'>
                    <span className='act-time'>{act.time}</span>
                  </div>
                </div>
                <div className='activity-status-col'>
                  <span className={`status-pill ${act.status.toLowerCase().replace(' ', '-')}`}>
                    {act.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;