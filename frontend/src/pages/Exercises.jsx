import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  Circle,
  RotateCcw,
  ArrowRight,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { getExercises } from '../services/exerciseService';
import {
  exercisesData,
  exerciseTopics,
  exerciseDifficulties,
  exerciseStatuses
} from '../data/exercisesData';
import './Exercises.css';

const Exercises = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [exercisesList, setExercisesList] = useState(exercisesData);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(() => searchParams.get('search') || '');
  const [topicFilter, setTopicFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('cards');

  useEffect(() => {
    fetchBackendExercises();
  }, [topicFilter, difficultyFilter, search]);

  const fetchBackendExercises = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (topicFilter !== 'All') filters.topic = topicFilter;
      if (difficultyFilter !== 'All') filters.difficulty = difficultyFilter;
      if (search.trim()) filters.search = search.trim();

      const data = await getExercises(filters);
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map((item) => ({
          id: item.id,
          title: item.title,
          topic: item.topic || 'General',
          language: item.language || 'Python',
          difficulty: item.difficulty || 'Easy',
          estimatedTime: item.estimatedTime || (item.difficulty === 'Hard' ? '35 mins' : item.difficulty === 'Medium' ? '25 mins' : '15 mins'),
          status: item.status || 'Not Started'
        }));
        setExercisesList(mapped.slice(0, 3));
      } else {
        applyClientFilters();
      }
    } catch (err) {
      applyClientFilters();
    } finally {
      setLoading(false);
    }
  };

  const applyClientFilters = () => {
    const filtered = exercisesData.filter((ex) => {
      const matchSearch =
        ex.title.toLowerCase().includes(search.toLowerCase()) ||
        ex.topic.toLowerCase().includes(search.toLowerCase()) ||
        ex.language.toLowerCase().includes(search.toLowerCase());
      const matchTopic = topicFilter === 'All' || ex.topic === topicFilter;
      const matchDifficulty = difficultyFilter === 'All' || ex.difficulty === difficultyFilter;
      const matchStatus = statusFilter === 'All' || ex.status === statusFilter;
      return matchSearch && matchTopic && matchDifficulty && matchStatus;
    });
    setExercisesList(filtered);
  };

  const handleExerciseClick = (id, lang) => {
    navigate(`/code-editor?id=${id}${lang ? `&lang=${encodeURIComponent(lang)}` : ''}`);
  };

  return (
    <main className='exercises-container'>
      <section className='exercises-header-card'>
        <div className='exercises-header-text'>
          <div className='header-badge'>
            <span>Interactive Problem Set</span>
          </div>
          <h1 className='exercises-page-title'>Practice Exercises</h1>
          <p className='exercises-page-subtitle'>
            Solve curated coding problems across Python, Java, JavaScript, and C to sharpen your core algorithmic techniques and technical interview readiness.
          </p>
        </div>
      </section>
      <section className='exercises-controls-card'>
        <div className='controls-main-row'>
          <div className='search-box-wrap'>
            <Search size={18} className='search-icon' />
            <input
              type='text'
              className='search-input'
              placeholder='Search exercises by title, topic, or language...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className='view-mode-toggle'>
            <button
              type='button'
              className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              title='Cards view'
              aria-label='Cards view'
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type='button'
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title='Table view'
              aria-label='Table view'
            >
              <TableIcon size={16} />
            </button>
          </div>
        </div>
        <div className='filters-row'>
          <select
            className='filter-dropdown'
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
          >
            {exerciseTopics.map((t) => (
              <option key={t} value={t}>
                {t === 'All' ? 'All Topics' : t}
              </option>
            ))}
          </select>
          <select
            className='filter-dropdown'
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            {exerciseDifficulties.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Difficulties' : d}
              </option>
            ))}
          </select>
          <select
            className='filter-dropdown'
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {exerciseStatuses.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Statuses' : s}
              </option>
            ))}
          </select>
          {(search || topicFilter !== 'All' || difficultyFilter !== 'All' || statusFilter !== 'All') && (
            <button
              type='button'
              className='clear-filters-btn'
              onClick={() => {
                setSearch('');
                setTopicFilter('All');
                setDifficultyFilter('All');
                setStatusFilter('All');
              }}
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </section>
      {loading ? (
        <section className='exercises-grid'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className='exercise-card skeleton-card'>
              <div className='skeleton-line skeleton-shimmer title-line' />
              <div className='skeleton-line skeleton-shimmer desc-line' />
              <div className='skeleton-line skeleton-shimmer footer-line' />
            </div>
          ))}
        </section>
      ) : exercisesList.length === 0 ? (
        <section className='exercises-empty-card'>
          <Search size={36} className='empty-icon' />
          <h3>No matching exercises found</h3>
          <p>Try adjusting your search criteria or resetting filters.</p>
        </section>
      ) : viewMode === 'cards' ? (
        <section className='exercises-grid'>
          {exercisesList.map((ex, idx) => (
            <div
              key={ex.id}
              className='exercise-card'
              style={{ animationDelay: `${idx * 40}ms` }}
              onClick={() => handleExerciseClick(ex.id, ex.language)}
            >
              <div className='card-top-status-row'>
                <div className='status-badge-wrap'>
                  {ex.status === 'Completed' ? (
                    <span className='ex-status completed'>
                      <CheckCircle2 size={14} /> Completed
                    </span>
                  ) : ex.status === 'In Progress' ? (
                    <span className='ex-status in-progress'>
                      <Clock size={14} /> In Progress
                    </span>
                  ) : (
                    <span className='ex-status not-started'>
                      <Circle size={14} /> Ready
                    </span>
                  )}
                </div>
                <span className={`diff-pill ${(ex.difficulty || 'easy').toLowerCase()}`}>
                  {ex.difficulty}
                </span>
              </div>
              <h3 className='card-exercise-title'>{ex.title}</h3>
              <div className='card-meta-chips'>
                <span className='ex-lang-badge'>{ex.language}</span>
                <span className='ex-topic-chip'>{ex.topic}</span>
              </div>
              <div className='card-footer-action-row'>
                <span className='card-time-indicator'>
                  <Clock size={13} />
                  {ex.estimatedTime}
                </span>
                <button
                  type='button'
                  className='card-solve-cta'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExerciseClick(ex.id, ex.language);
                  }}
                >
                  <span>Solve</span>
                  <ArrowRight size={14} className='solve-arrow' />
                </button>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className='exercises-table-card'>
          <table className='exercises-table'>
            <thead>
              <tr>
                <th className='th-status'>Status</th>
                <th className='th-title'>Exercise Title</th>
                <th className='th-language'>Language</th>
                <th className='th-topic'>Topic</th>
                <th className='th-difficulty'>Difficulty</th>
                <th className='th-time'>Est. Time</th>
                <th className='th-action'>Action</th>
              </tr>
            </thead>
            <tbody>
              {exercisesList.map((ex) => (
                <tr
                  key={ex.id}
                  className='exercise-row'
                  onClick={() => handleExerciseClick(ex.id, ex.language)}
                >
                  <td className='td-status'>
                    {ex.status === 'Completed' ? (
                      <span className='status-indicator completed' title='Completed'>
                        <CheckCircle2 size={18} />
                      </span>
                    ) : ex.status === 'In Progress' ? (
                      <span className='status-indicator in-progress' title='In Progress'>
                        <Clock size={18} />
                      </span>
                    ) : (
                      <span className='status-indicator not-started' title='Not Started'>
                        <Circle size={18} />
                      </span>
                    )}
                  </td>
                  <td className='td-title'>
                    <span className='exercise-title-text'>{ex.title}</span>
                  </td>
                  <td className='td-language'>
                    <span className='lang-tag'>{ex.language}</span>
                  </td>
                  <td className='td-topic'>
                    <span className='topic-text'>{ex.topic}</span>
                  </td>
                  <td className='td-difficulty'>
                    <span className={`diff-pill ${(ex.difficulty || 'easy').toLowerCase()}`}>
                      {ex.difficulty}
                    </span>
                  </td>
                  <td className='td-time'>
                    <span className='time-text'>
                      <Clock size={13} />
                      {ex.estimatedTime}
                    </span>
                  </td>
                  <td className='td-action'>
                    <button
                      type='button'
                      className='solve-btn'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExerciseClick(ex.id, ex.language);
                      }}
                    >
                      <span>Solve</span>
                      <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='table-footer-bar'>
            <span>Showing {exercisesList.length} exercises</span>
          </div>
        </section>
      )}
    </main>
  );
};

export default Exercises;