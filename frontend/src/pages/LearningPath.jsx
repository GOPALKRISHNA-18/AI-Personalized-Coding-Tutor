import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Check,
  Lock,
  Play,
  Code2,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Target,
  Flame,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import ProgressRing from '../components/ProgressRing';
import ProgressBar from '../components/ProgressBar';
import { learningPathsData, weeklyStudyData, todayGoalData } from '../data/learningPathsData';
import './LearningPath.css';

const LearningPath = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('codetutor_learning_courses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return learningPathsData;
  });
  const [selectedCourseId, setSelectedCourseId] = useState('python');
  const [expandedTopicId, setExpandedTopicId] = useState('py-3');
  const [todayGoal, setTodayGoal] = useState(() => {
    const saved = localStorage.getItem('codetutor_today_goal');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return todayGoalData;
  });

  useEffect(() => {
    localStorage.setItem('codetutor_learning_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('codetutor_today_goal', JSON.stringify(todayGoal));
  }, [todayGoal]);

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const totalTopics = currentCourse.topics.length;
  const completedTopics = currentCourse.topics.filter((t) =>
    t.lessons.length > 0 && t.lessons.every((l) => l.completed)
  ).length;

  const totalLessons = currentCourse.topics.reduce((acc, t) => acc + t.lessons.length, 0);
  const completedLessons = currentCourse.topics.reduce(
    (acc, t) => acc + t.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const currentTopic =
    currentCourse.topics.find((t) => t.status === 'current') ||
    currentCourse.topics.find((t) => !t.lessons.every((l) => l.completed)) ||
    currentCourse.topics[0];

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    const targetCourse = courses.find((c) => c.id === courseId);
    if (targetCourse) {
      const active =
        targetCourse.topics.find((t) => t.status === 'current') ||
        targetCourse.topics.find((t) => !t.lessons.every((l) => l.completed)) ||
        targetCourse.topics[0];
      setExpandedTopicId(active.id);
    }
  };

  const handleToggleLesson = (courseId, topicId, lessonId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id !== courseId) return course;
        const updatedTopics = course.topics.map((topic, topicIdx) => {
          if (topic.id !== topicId) return topic;
          const updatedLessons = topic.lessons.map((lesson) => {
            if (lesson.id !== lessonId) return lesson;
            const newCompleted = !lesson.completed;
            setTodayGoal((prev) => ({
              ...prev,
              completedLessons: newCompleted
                ? Math.min(prev.targetLessons, prev.completedLessons + 1)
                : Math.max(0, prev.completedLessons - 1)
            }));
            return { ...lesson, completed: newCompleted };
          });
          const allDone = updatedLessons.every((l) => l.completed);
          const newStatus = allDone ? 'completed' : 'current';
          return {
            ...topic,
            lessons: updatedLessons,
            status: newStatus
          };
        });
        for (let i = 0; i < updatedTopics.length - 1; i++) {
          if (
            updatedTopics[i].status === 'completed' &&
            updatedTopics[i + 1].status === 'locked'
          ) {
            updatedTopics[i + 1].status = 'current';
          }
        }
        return { ...course, topics: updatedTopics };
      })
    );
  };

  const handleToggleExpand = (topicId) => {
    setExpandedTopicId((prev) => (prev === topicId ? null : topicId));
  };

  const handleContinueLearning = () => {
    if (!currentTopic) return;
    setExpandedTopicId(currentTopic.id);
    const elem = document.getElementById(`topic-node-${currentTopic.id}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleStartLesson = () => {
    navigate('/code-editor');
  };

  const handlePracticeExercises = () => {
    navigate('/exercises');
  };

  const goalPercent = Math.round(
    (todayGoal.completedLessons / todayGoal.targetLessons) * 100
  );

  return (
    <main className='lp-container'>
      <header className='lp-header'>
        <h1 className='lp-title'>Learning Path</h1>
        <p className='lp-subtitle'>
          Master programming concepts step by step through structured interactive roadmaps
        </p>
      </header>
      <section className='lp-progress-card'>
        <div className='lp-progress-ring-col'>
          <ProgressRing
            progress={progressPercent}
            size={116}
            strokeWidth={9}
            color='#6366f1'
            gradientEnd='#06b6d4'
          >
            <span className='lp-ring-percent'>{progressPercent}%</span>
            <span className='lp-ring-label'>Mastery</span>
          </ProgressRing>
        </div>
        <div className='lp-progress-metrics-col'>
          <div className='lp-metric-item'>
            <span className='lp-metric-num'>
              {completedTopics} / {totalTopics}
            </span>
            <span className='lp-metric-label'>Completed Topics</span>
          </div>
          <div className='lp-metric-divider' />
          <div className='lp-metric-item'>
            <span className='lp-metric-num'>
              {completedLessons} / {totalLessons}
            </span>
            <span className='lp-metric-label'>Finished Lessons</span>
          </div>
          <div className='lp-metric-divider' />
          <div className='lp-metric-item'>
            <span className='lp-metric-num'>{currentCourse.estimatedTime}</span>
            <span className='lp-metric-label'>Estimated Left</span>
          </div>
        </div>
        <div className='lp-progress-action-col'>
          <button
            type='button'
            className='lp-btn-continue'
            onClick={handleContinueLearning}
          >
            <span>Continue Learning</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <nav className='lp-course-selector' aria-label='Select programming track'>
        {courses.map((course) => {
          const isActive = course.id === selectedCourseId;
          const courseDoneLessons = course.topics.reduce(
            (acc, t) => acc + t.lessons.filter((l) => l.completed).length,
            0
          );
          const courseAllLessons = course.topics.reduce(
            (acc, t) => acc + t.lessons.length,
            0
          );
          const coursePct =
            courseAllLessons > 0
              ? Math.round((courseDoneLessons / courseAllLessons) * 100)
              : 0;
          return (
            <button
              key={course.id}
              type='button'
              className={`lp-course-chip ${isActive ? 'active' : ''}`}
              onClick={() => handleSelectCourse(course.id)}
            >
              <span className='lp-chip-title'>{course.name}</span>
              <span className='lp-chip-pct'>{coursePct}%</span>
            </button>
          );
        })}
      </nav>
      <div className='lp-main-layout'>
        <section className='lp-roadmap-view'>
          <div className='lp-roadmap-track'>
            {currentCourse.topics.map((topic, index) => {
              const isExpanded = expandedTopicId === topic.id;
              const isTopicDone =
                topic.lessons.length > 0 &&
                topic.lessons.every((l) => l.completed);
              const isCurrent = topic.status === 'current' && !isTopicDone;
              const isLocked = topic.status === 'locked';
              const doneCount = topic.lessons.filter((l) => l.completed).length;
              const prevTopic = index > 0 ? currentCourse.topics[index - 1] : null;
              const lineConnectedDone =
                prevTopic &&
                prevTopic.lessons.length > 0 &&
                prevTopic.lessons.every((l) => l.completed);

              return (
                <div
                  key={topic.id}
                  id={`topic-node-${topic.id}`}
                  className={`lp-node-wrapper ${isTopicDone ? 'node-done' : ''} ${isCurrent ? 'node-current' : ''} ${isLocked ? 'node-locked' : ''}`}
                >
                  {index > 0 && (
                    <div
                      className={`lp-connector-line ${lineConnectedDone ? 'connector-done' : ''}`}
                    />
                  )}
                  <div className='lp-spine-col'>
                    <div className='lp-spine-dot'>
                      {isTopicDone && (
                        <div className='dot-circle done-circle'>
                          <CheckCircle2 size={18} />
                        </div>
                      )}
                      {isCurrent && (
                        <div className='dot-circle current-circle'>
                          <span className='pulse-wave' />
                          <span className='pulse-number'>{topic.topicNumber}</span>
                        </div>
                      )}
                      {isLocked && (
                        <div className='dot-circle locked-circle'>
                          <Lock size={15} />
                        </div>
                      )}
                    </div>
                  </div>
                  <article
                    className={`lp-topic-card ${isExpanded ? 'card-expanded' : ''}`}
                    onClick={() => !isLocked && handleToggleExpand(topic.id)}
                  >
                    <div className='lp-topic-card-header'>
                      <div className='lp-topic-top-meta'>
                        <span className='lp-topic-step-chip'>
                          Topic 0{topic.topicNumber}
                        </span>
                        {isTopicDone && (
                          <span className='lp-status-pill done'>
                            <Check size={12} />
                            Completed
                          </span>
                        )}
                        {isCurrent && (
                          <span className='lp-status-pill in-progress'>
                            In Progress
                          </span>
                        )}
                        {isLocked && (
                          <span className='lp-status-pill locked'>
                            <Lock size={12} />
                            Locked
                          </span>
                        )}
                        {isTopicDone && (
                          <span className='lp-done-badge'>
                            <CheckCircle2 size={12} /> All Lessons Mastered
                          </span>
                        )}
                      </div>
                      <h3 className='lp-topic-title'>{topic.title}</h3>
                      <p className='lp-topic-desc'>{topic.shortDesc}</p>
                      <div className='lp-topic-sub-meta'>
                        <span className='sub-meta-item'>
                          <Clock size={14} />
                          {topic.estimatedTime}
                        </span>
                        <span className='sub-meta-item'>
                          <BookOpen size={14} />
                          {doneCount} of {topic.lessons.length} lessons completed
                        </span>
                        {!isLocked && (
                          <button
                            type='button'
                            className='lp-chevron-btn'
                            aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          >
                            {isExpanded ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    {isExpanded && !isLocked && (
                      <div
                        className='lp-topic-card-body'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className='lp-lessons-list'>
                          {topic.lessons.map((lesson) => (
                            <label
                              key={lesson.id}
                              className={`lp-lesson-item ${lesson.completed ? 'lesson-checked' : ''}`}
                            >
                              <input
                                type='checkbox'
                                className='lp-lesson-checkbox'
                                checked={lesson.completed}
                                onChange={() =>
                                  handleToggleLesson(
                                    currentCourse.id,
                                    topic.id,
                                    lesson.id
                                  )
                                }
                              />
                              <span className='lp-lesson-title'>
                                {lesson.title}
                              </span>
                              <span className='lp-lesson-duration'>
                                {lesson.duration}
                              </span>
                            </label>
                          ))}
                        </div>
                        <div className='lp-topic-actions-row'>
                          <button
                            type='button'
                            className='lp-btn-action primary'
                            onClick={handleStartLesson}
                          >
                            <Play size={14} fill='currentColor' />
                            <span>Start Lesson</span>
                          </button>
                          <button
                            type='button'
                            className='lp-btn-action secondary'
                            onClick={handlePracticeExercises}
                          >
                            <Code2 size={15} />
                            <span>Practice Exercises</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </section>
        <aside className='lp-side-panel'>
          <div className='lp-side-card'>
            <div className='lp-side-header'>
              <div className='side-title-wrap'>
                <Target size={17} className='side-header-icon' />
                <h4 className='side-card-title'>Today&apos;s Goal</h4>
              </div>
              <span className='streak-pill'>
                <Flame size={13} className='streak-flame' />
                {todayGoal.streakDays}d Streak
              </span>
            </div>
            <p className='side-card-desc'>
              Complete {todayGoal.targetLessons} lessons today to keep your streak glowing.
            </p>
            <div className='goal-progress-wrap'>
              <div className='goal-labels'>
                <span>Progress</span>
                <span className='goal-val'>
                  {todayGoal.completedLessons} / {todayGoal.targetLessons} ({goalPercent}%)
                </span>
              </div>
              <ProgressBar percent={goalPercent} height={7} />
            </div>
          </div>
          <div className='lp-side-card'>
            <div className='lp-side-header'>
              <div className='side-title-wrap'>
                <BookOpen size={17} className='side-header-icon' />
                <h4 className='side-card-title'>Recommended Next Topic</h4>
              </div>
            </div>
            <div className='rec-topic-box'>
              <span className='rec-tag'>Topic 0{currentTopic.topicNumber}</span>
              <h5 className='rec-title'>{currentTopic.title}</h5>
              <p className='rec-desc'>{currentTopic.shortDesc}</p>
              <div className='rec-meta-row'>
                <span className='rec-time'>
                  <Clock size={13} />
                  {currentTopic.estimatedTime}
                </span>
                <button
                  type='button'
                  className='rec-start-btn'
                  onClick={handleContinueLearning}
                >
                  <span>Start</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
          <div className='lp-side-card'>
            <div className='lp-side-header'>
              <div className='side-title-wrap'>
                <TrendingUp size={17} className='side-header-icon' />
                <h4 className='side-card-title'>Weekly Study Time</h4>
              </div>
              <span className='side-time-badge'>17.5h Total</span>
            </div>
            <p className='side-card-desc'>
              Dedicated coding time logged this week.
            </p>
            <div className='weekly-chart-bars'>
              {weeklyStudyData.map((item) => (
                <div key={item.day} className='weekly-bar-col'>
                  <div className='weekly-bar-track'>
                    <div
                      className='weekly-bar-fill'
                      style={{ height: `${item.percent}%` }}
                      title={`${item.day}: ${item.hours} hours`}
                    />
                  </div>
                  <span className='weekly-bar-label'>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default LearningPath;