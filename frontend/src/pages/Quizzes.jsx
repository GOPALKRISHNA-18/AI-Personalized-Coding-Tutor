import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Users,
  Zap,
  Play
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { quizzesData, leaderboardData } from '../data/quizzesData';
import { submitQuizResult } from '../services/quizService';
import ProgressRing from '../components/ProgressRing';
import './Quizzes.css';

const Quizzes = () => {
  const [activeTab, setActiveTab] = useState('contests');
  const [selectedContest, setSelectedContest] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let timer;
    if (selectedContest && !isSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedContest, isSubmitted, timeLeft]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartContest = (contest) => {
    setSelectedContest(contest);
    setCurrentQIndex(0);
    setAnswers({});
    setTimeLeft(contest.timeLimit);
    setIsSubmitted(false);
  };

  const handleSelectOption = (optIdx) => {
    setAnswers({
      ...answers,
      [currentQIndex]: optIdx
    });
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitted(true);
    const score = calculateScore();
    try {
      await submitQuizResult(selectedContest?.id, answers);
    } catch (e) {}
    if (score.percent >= 40) {
      setTimeout(() => triggerConfetti(0.5, 0.4), 250);
    }
  };

  const handleResetContest = () => {
    setSelectedContest(null);
    setIsSubmitted(false);
    setAnswers({});
    setCurrentQIndex(0);
  };

  const calculateScore = () => {
    if (!selectedContest) return { correct: 0, total: 0, percent: 0 };
    let correct = 0;
    selectedContest.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        correct++;
      }
    });
    const total = selectedContest.questions.length;
    const percent = Math.round((correct / total) * 100);
    return { correct, total, percent };
  };

  return (
    <main className='quizzes-container'>
      <section className='quizzes-header-card'>
        <div className='quizzes-header-info'>
          <div className='contest-badge'>
            <Trophy size={16} />
            <span>LeetCode Contest Arena</span>
          </div>
          <h1 className='quizzes-title'>Contests & Speed Quizzes</h1>
          <p className='quizzes-subtitle'>
            Compete in timed algorithmic assessments, simulate LeetCode weekly contests, and evaluate your ranking on global leaderboards.
          </p>
        </div>
        <div className='contest-tabs-switch'>
          <button
            type='button'
            className={`tab-switch-btn ${activeTab === 'contests' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('contests');
              setSelectedContest(null);
            }}
          >
            Contest Cards
          </button>
          <button
            type='button'
            className={`tab-switch-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('leaderboard');
              setSelectedContest(null);
            }}
          >
            Global Leaderboard
          </button>
        </div>
      </section>
      {activeTab === 'leaderboard' && (
        <section className='leaderboard-card'>
          <div className='lb-header'>
            <h2 className='lb-title'>Global Contest Leaderboard</h2>
            <span className='lb-sub'>Updated dynamically across recent weekly rounds</span>
          </div>
          <table className='lb-table'>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Participant</th>
                <th>Country</th>
                <th>Score</th>
                <th>Finish Time</th>
                <th>Contest Rating</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((row) => (
                <tr key={row.rank} className={row.isUser ? 'user-rank-row' : ''}>
                  <td>
                    <div className='rank-cell'>
                      {row.rank === 1 && <span className='rank-icon gold'>🥇</span>}
                      {row.rank === 2 && <span className='rank-icon silver'>🥈</span>}
                      {row.rank === 3 && <span className='rank-icon bronze'>🥉</span>}
                      <span className='rank-num'>#{row.rank}</span>
                    </div>
                  </td>
                  <td>
                    <span className='participant-name'>
                      {row.name} {row.isUser && '(You)'}
                    </span>
                  </td>
                  <td>
                    <span className='country-badge'>{row.country}</span>
                  </td>
                  <td>
                    <span className='score-badge'>{row.score}</span>
                  </td>
                  <td className='finish-time'>{row.time}</td>
                  <td>
                    <span className='rating-num'>{row.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      {activeTab === 'contests' && !selectedContest && (
        <section className='contests-grid'>
          {quizzesData.map((contest) => (
            <div key={contest.id} className='contest-card'>
              <div className='contest-card-header'>
                <span className='contest-topic'>{contest.topic}</span>
                <span className={`diff-pill ${contest.difficulty.toLowerCase()}`}>
                  {contest.difficulty}
                </span>
              </div>
              <h3 className='contest-card-title'>{contest.title}</h3>
              <div className='contest-meta-row'>
                <div className='meta-block'>
                  <Clock size={14} />
                  <span>{contest.timeDisplay}</span>
                </div>
                <div className='meta-block'>
                  <Zap size={14} />
                  <span>{contest.questionsCount} Questions</span>
                </div>
                <div className='meta-block'>
                  <Users size={14} />
                  <span>{contest.participants} Joined</span>
                </div>
              </div>
              <div className='contest-card-footer'>
                <button
                  type='button'
                  className='start-contest-btn'
                  onClick={() => handleStartContest(contest)}
                >
                  <Play size={14} />
                  Enter Contest
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
      {activeTab === 'contests' && selectedContest && !isSubmitted && (
        <section className='quiz-active-card'>
          <div className='quiz-active-header'>
            <div>
              <span className='active-contest-tag'>{selectedContest.title}</span>
              <h2 className='active-question-num'>
                Question {currentQIndex + 1} of {selectedContest.questions.length}
              </h2>
            </div>
            <div className='active-timer-ring-wrap'>
              <ProgressRing
                progress={(timeLeft / selectedContest.timeLimit) * 100}
                size={58}
                strokeWidth={5}
                color={timeLeft < 120 ? '#ef4444' : '#6366f1'}
                gradientEnd={timeLeft < 120 ? '#f59e0b' : '#06b6d4'}
              >
                <div className={`active-timer-content ${timeLeft < 120 ? 'urgent' : ''}`}>
                  <span className='timer-ring-text'>{formatTimer(timeLeft)}</span>
                </div>
              </ProgressRing>
            </div>
          </div>
          <div className='quiz-track-bar'>
            <div
              className='quiz-track-fill'
              style={{
                width: `${((currentQIndex + 1) / selectedContest.questions.length) * 100}%`
              }}
            />
          </div>
          <div className='question-content-box'>
            <h3 className='active-question-text'>
              {selectedContest.questions[currentQIndex].question}
            </h3>
            <div className='active-options-list'>
              {selectedContest.questions[currentQIndex].options.map((opt, idx) => {
                const isSelected = answers[currentQIndex] === idx;
                return (
                  <button
                    key={idx}
                    type='button'
                    className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(idx)}
                  >
                    <span className='opt-char'>{String.fromCharCode(65 + idx)}</span>
                    <span className='opt-text'>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className='quiz-active-actions'>
            <button
              type='button'
              className='quiz-nav-btn'
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex((prev) => prev - 1)}
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            {currentQIndex < selectedContest.questions.length - 1 ? (
              <button
                type='button'
                className='quiz-nav-btn primary'
                onClick={() => setCurrentQIndex((prev) => prev + 1)}
              >
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type='button'
                className='quiz-finish-btn'
                onClick={handleSubmitQuiz}
              >
                Submit Contest
              </button>
            )}
          </div>
        </section>
      )}
      {activeTab === 'contests' && selectedContest && isSubmitted && (
        <section className='review-screen-card'>
          {(() => {
            const { correct, total, percent } = calculateScore();
            return (
              <>
                <div className='review-score-hero'>
                  <div className='review-trophy-wrap'>
                    <Trophy size={48} />
                  </div>
                  <h2 className='review-title'>Contest Finished!</h2>
                  <div className='review-score-pill'>
                    Score: {percent}% ({correct} / {total} Correct)
                  </div>
                  <p className='review-subtext'>
                    Review your answers and detailed step-by-step solutions below.
                  </p>
                </div>
                <div className='review-questions-list'>
                  {selectedContest.questions.map((q, qIdx) => {
                    const userAns = answers[qIdx];
                    const isCorrect = userAns === q.answer;
                    return (
                      <div
                        key={q.id}
                        className={`review-question-card ${isCorrect ? 'correct' : 'wrong'}`}
                      >
                        <div className='review-q-header'>
                          <span className='review-q-num'>Question {qIdx + 1}</span>
                          <span className={`review-status-tag ${isCorrect ? 'tag-correct' : 'tag-wrong'}`}>
                            {isCorrect ? (
                              <>
                                <CheckCircle2 size={14} /> Correct
                              </>
                            ) : (
                              <>
                                <XCircle size={14} /> Incorrect
                              </>
                            )}
                          </span>
                        </div>
                        <h4 className='review-q-title'>{q.question}</h4>
                        <div className='review-answers-breakdown'>
                          <div className='ans-line'>
                            <span className='ans-label'>Your Answer:</span>
                            <span className={`ans-val ${isCorrect ? 'correct' : 'wrong'}`}>
                              {userAns !== undefined ? q.options[userAns] : 'Not Answered'}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className='ans-line'>
                              <span className='ans-label'>Correct Answer:</span>
                              <span className='ans-val correct'>{q.options[q.answer]}</span>
                            </div>
                          )}
                        </div>
                        <div className='review-explanation-box'>
                          <span className='exp-label'>Explanation:</span>
                          <p className='exp-text'>{q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className='review-actions-row'>
                  <button
                    type='button'
                    className='review-btn primary'
                    onClick={handleResetContest}
                  >
                    <RotateCcw size={16} />
                    Try Another Contest
                  </button>
                  <button
                    type='button'
                    className='review-btn secondary'
                    onClick={() => setActiveTab('leaderboard')}
                  >
                    View Leaderboard
                  </button>
                </div>
              </>
            );
          })()}
        </section>
      )}
    </main>
  );
};

export default Quizzes;