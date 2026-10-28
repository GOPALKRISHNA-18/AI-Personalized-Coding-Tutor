import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Compass,
  Play,
  BarChart2
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { assessmentQuestions, assessmentPerks } from '../data/assessmentData';
import { submitAssessment } from '../services/assessmentService';
import ProgressRing from '../components/ProgressRing';
import AnimatedCounter from '../components/AnimatedCounter';
import './SkillAssessment.css';

const perkIconMap = {
  Clock,
  CheckCircle2,
  BarChart2
};

const SkillAssessment = () => {
  const navigate = useNavigate();
  const languages = ['Python', 'Java', 'JavaScript'];
  const [selectedLanguage, setSelectedLanguage] = useState('Python');
  const [stage, setStage] = useState('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900);
  const [result, setResult] = useState(null);

  const questions = assessmentQuestions[selectedLanguage] || assessmentQuestions.Python;
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    let timer;
    if (stage === 'quiz' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            finishAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [stage, timeLeft, answers]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setStage('quiz');
    setCurrentIndex(0);
    setAnswers({});
    setTimeLeft(900);
  };

  const handleSelectOption = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentIndex]: optionIndex
    });
  };

  const finishAssessment = async () => {
    let scoreCount = 0;
    const weakTopicSet = new Set();
    const strongTopicSet = new Set();

    questions.forEach((q, idx) => {
      const selected = answers[idx];
      if (selected === q.answer) {
        scoreCount += 1;
        strongTopicSet.add(q.topic);
      } else {
        weakTopicSet.add(q.topic);
      }
    });

    const percent = Math.round((scoreCount / questions.length) * 100);
    let skillLevel = 'Beginner';
    if (percent >= 75) {
      skillLevel = 'Advanced';
    } else if (percent >= 45) {
      skillLevel = 'Intermediate';
    }

    try {
      await submitAssessment(selectedLanguage, percent);
    } catch (e) {}

    setResult({
      score: percent,
      correctCount: scoreCount,
      totalCount: questions.length,
      skillLevel,
      language: selectedLanguage,
      weakTopics: Array.from(weakTopicSet),
      strongTopics: Array.from(strongTopicSet),
      timeSpent: 900 - timeLeft
    });
    if (percent >= 50) {
      setTimeout(() => triggerConfetti(0.5, 0.4), 200);
    }
    setStage('result');
  };

  const handleReset = () => {
    setStage('start');
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setTimeLeft(900);
  };

  if (stage === 'start') {
    return (
      <main className='assessment-container'>
        <section className='assessment-hero-card'>
          <div className='hero-badge'>
            <Compass size={16} />
            <span>Diagnostic Evaluation</span>
          </div>
          <h1 className='assessment-title'>Skill Assessment</h1>
          <p className='assessment-subtitle'>
            Take a 10-question evaluation to diagnose your conceptual depth, identify weak topics, and calibrate your personalized learning curriculum.
          </p>
          <div className='lang-picker-section'>
            <span className='lang-picker-label'>Choose Target Language:</span>
            <div className='lang-button-group'>
              {languages.map((lang) => (
                <button
                  key={lang}
                  type='button'
                  onClick={() => setSelectedLanguage(lang)}
                  className={`lang-choice-btn ${selectedLanguage === lang ? 'active' : ''}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          <div className='assessment-perks-grid'>
            {assessmentPerks.map((perk) => {
              const Icon = perkIconMap[perk.iconName] || Clock;
              return (
                <div key={perk.title} className='perk-card'>
                  <Icon className='perk-icon' size={20} />
                  <div>
                    <h4>{perk.title}</h4>
                    <p>{perk.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='start-btn-row'>
            <button className='assessment-btn-primary' onClick={handleStart}>
              <Play size={18} />
              Start Assessment
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (stage === 'result' && result) {
    return (
      <main className='assessment-container'>
        <section className='result-card'>
          <div className='result-header'>
            <div className='result-icon-circle'>
              <Award size={40} />
            </div>
            <h2 className='result-heading'>Assessment Completed</h2>
            <p className='result-subheading'>
              Evaluation report for <strong>{result.language}</strong>
            </p>
          </div>
          <div className='result-score-circle-row'>
            <ProgressRing
              progress={result.score}
              size={140}
              strokeWidth={10}
              color='#6366f1'
              gradientEnd='#06b6d4'
            >
              <div className='result-ring-content'>
                <span className='result-ring-pct'>
                  <AnimatedCounter value={`${result.score}%`} />
                </span>
                <span className='result-ring-sub'>Score</span>
              </div>
            </ProgressRing>
          </div>
          <div className='result-metrics-grid'>
            <div className='metric-box'>
              <span className='metric-label'>Assessed Level</span>
              <span className={`skill-level-pill level-${result.skillLevel.toLowerCase()}`}>
                {result.skillLevel}
              </span>
            </div>
            <div className='metric-box'>
              <span className='metric-label'>Questions Solved</span>
              <span className='metric-val'>{result.correctCount} / {result.totalCount}</span>
              <span className='metric-sub'>Accuracy verified</span>
            </div>
            <div className='metric-box'>
              <span className='metric-label'>Time Taken</span>
              <span className='metric-val'>{formatTimer(result.timeSpent)}</span>
              <span className='metric-sub'>Pacing on target</span>
            </div>
          </div>
          <div className='result-analysis-section'>
            <h3 className='section-title'>
              <AlertCircle size={18} className='warn-icon' />
              Focus Areas & Weak Topics
            </h3>
            {result.weakTopics.length > 0 ? (
              <div className='topics-pill-wrap'>
                {result.weakTopics.map((topic, i) => (
                  <div key={i} className='weak-topic-pill'>
                    <span className='topic-dot' />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className='no-weak-msg'>Flawless performance! No weak topics detected.</p>
            )}
            <p className='result-guidance'>
              We recommend reviewing the foundational patterns in your weak topics to strengthen your interview readiness.
            </p>
          </div>
          <div className='result-actions-row'>
            <button
              className='assessment-btn-primary'
              onClick={() => navigate('/learning-path')}
            >
              Start Learning Path
              <ArrowRight size={18} />
            </button>
            <button
              className='assessment-btn-secondary'
              onClick={handleReset}
            >
              <RotateCcw size={16} />
              Retake Assessment
            </button>
          </div>
        </section>
      </main>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <main className='assessment-container'>
      <div className='assessment-quiz-layout'>
        <div className='quiz-main-card'>
          <div className='quiz-topbar'>
            <div className='lang-tag'>{selectedLanguage} Track</div>
            <div className={`quiz-timer ${timeLeft < 180 ? 'timer-warning' : ''}`}>
              <Clock size={16} />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>
          <div className='quiz-progress-track'>
            <div
              className='quiz-progress-bar'
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className='quiz-question-header'>
            <span className='question-topic-badge'>{currentQuestion.topic}</span>
            <span className='question-number-text'>
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <div className='quiz-question-body'>
            <h2 className='quiz-question-title'>{currentQuestion.question}</h2>
            <div className='options-stack'>
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentIndex] === idx;
                return (
                  <button
                    key={idx}
                    type='button'
                    onClick={() => handleSelectOption(idx)}
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                  >
                    <span className='option-indicator'>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className='option-text'>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className='quiz-footer-actions'>
            <button
              type='button'
              className='footer-nav-btn'
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            {currentIndex < questions.length - 1 ? (
              <button
                type='button'
                className='footer-nav-btn primary'
                onClick={() => setCurrentIndex((prev) => prev + 1)}
              >
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type='button'
                className='footer-submit-btn'
                onClick={finishAssessment}
              >
                Submit Assessment
              </button>
            )}
          </div>
        </div>
        <div className='quiz-sidebar-card'>
          <h3 className='navigator-title'>Question Navigator</h3>
          <p className='navigator-sub'>
            {answeredCount} of {questions.length} answered
          </p>
          <div className='navigator-grid'>
            {questions.map((q, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCurrent = currentIndex === idx;
              return (
                <button
                  key={q.id}
                  type='button'
                  onClick={() => setCurrentIndex(idx)}
                  className={`nav-bubble ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <div className='navigator-legend'>
            <div className='legend-item'>
              <span className='legend-dot current' />
              <span>Current</span>
            </div>
            <div className='legend-item'>
              <span className='legend-dot answered' />
              <span>Answered</span>
            </div>
            <div className='legend-item'>
              <span className='legend-dot unanswered' />
              <span>Unanswered</span>
            </div>
          </div>
          <div className='early-submit-wrap'>
            <button
              type='button'
              className='sidebar-submit-btn'
              onClick={finishAssessment}
            >
              Finish & See Score
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SkillAssessment;