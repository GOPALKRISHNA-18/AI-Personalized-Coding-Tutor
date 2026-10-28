import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Code2,
  CheckCircle2,
  Lightbulb,
  Layers,
  HelpCircle,
  GitBranch,
  BarChart3
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { landingFeatures, landingSteps, landingLanguages, landingLevels } from '../data/landingData';
import './Landing.css';

const featureIcons = [
  <MessageSquare size={20} />,
  <Code2 size={20} />,
  <CheckCircle2 size={20} />,
  <Lightbulb size={20} />,
  <Layers size={20} />,
  <HelpCircle size={20} />,
  <GitBranch size={20} />,
  <BarChart3 size={20} />
];

const Landing = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.title = 'AI Personalized Coding Tutor';
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`landing ${theme}`}>
      <Header theme={theme} onThemeChange={handleThemeChange} />
      <main>
        <section id='home' className='section section-normal hero-section'>
          <div className='container hero-container'>
            <div className='hero-left'>
              <div className='hero-tag'>AI powered learning platform</div>
              <h1 className='hero-title'>Learn coding with an AI tutor made for you</h1>
              <p className='hero-desc'>
                Analyze your solving skills, catch syntax mistakes in real time, and progress through hints, targeted exercises, and a personal learning path tailored to your pace.
              </p>
              <div className='hero-actions'>
                <Link to='/register' className='btn btn-primary btn-large'>Get Started</Link>
                <Link to='/login' className='btn btn-outline btn-large'>Login</Link>
              </div>
            </div>
            <div className='hero-right'>
              <div className='code-window'>
                <div className='code-window-bar'>
                  <div className='code-dots'>
                    <span className='dot dot-red'></span>
                    <span className='dot dot-yellow'></span>
                    <span className='dot dot-green'></span>
                  </div>
                  <span className='code-filename'>Main.java</span>
                </div>
                <div className='code-content'>
                  <div className='code-line'><span className='line-num'>1</span><span className='code-kw'>public class</span> <span className='code-cls'>Main</span> &#123;</div>
                  <div className='code-line'><span className='line-num'>2</span>  <span className='code-kw'>public static void</span> <span className='code-fn'>main</span>(String[] args) &#123;</div>
                  <div className='code-line'><span className='line-num'>3</span>    <span className='code-type'>int</span> sum = <span className='code-num'>0</span>;</div>
                  <div className='code-line'><span className='line-num'>4</span>    <span className='code-kw'>for</span> (<span className='code-type'>int</span> i = <span className='code-num'>1</span>; i &lt;= <span className='code-num'>10</span>; i++) &#123;</div>
                  <div className='code-line'><span className='line-num'>5</span>      sum += i;</div>
                  <div className='code-line'><span className='line-num'>6</span>    &#125;</div>
                  <div className='code-line'><span className='line-num'>7</span>    System.out.println(sum);</div>
                  <div className='code-line'><span className='line-num'>8</span>  &#125;</div>
                </div>
                <div className='floating-hint'>
                  <span className='hint-icon-box'>
                    <Lightbulb size={14} />
                  </span>
                  <span className='hint-text'>Hint: check your loop condition</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id='features' className='section section-alt'>
          <div className='container'>
            <div className='section-header'>
              <h2 className='section-heading'>Platform Features</h2>
              <p className='section-subheading'>Everything you need to master programming from fundamentals to advanced concepts</p>
            </div>
            <div className='features-grid'>
              {landingFeatures.map((item, idx) => (
                <div key={item.title} className='feature-card'>
                  <div className='feature-icon-box'>{featureIcons[idx] || <Lightbulb size={20} />}</div>
                  <h3 className='card-title'>{item.title}</h3>
                  <p className='card-text'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id='how-it-works' className='section section-normal'>
          <div className='container'>
            <div className='section-header'>
              <h2 className='section-heading'>How It Works</h2>
              <p className='section-subheading'>Follow four simple steps to begin your personalized learning journey</p>
            </div>
            <div className='steps-row'>
              {landingSteps.map((step) => (
                <div key={step.number} className='step-box'>
                  <div className='step-circle'>{step.number}</div>
                  <h3 className='step-title'>{step.title}</h3>
                  <p className='step-desc'>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id='languages' className='section section-alt'>
          <div className='container'>
            <div className='section-header'>
              <h2 className='section-heading'>Supported Languages</h2>
              <p className='section-subheading'>Practice core concepts and algorithms in your language of choice</p>
            </div>
            <div className='languages-grid'>
              {landingLanguages.map((lang) => (
                <div key={lang.name} className='language-card'>
                  <h3 className='card-title'>{lang.name}</h3>
                  <p className='card-text'>{lang.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id='levels' className='section section-normal'>
          <div className='container'>
            <div className='section-header'>
              <h2 className='section-heading'>Skill Levels</h2>
              <p className='section-subheading'>Curated learning paths designed for every stage of your coding journey</p>
            </div>
            <div className='levels-grid'>
              {landingLevels.map((lvl) => (
                <div key={lvl.name} className='level-card'>
                  <h3 className='card-title'>{lvl.name}</h3>
                  <p className='card-text'>{lvl.desc}</p>
                  <div className='topics-list'>
                    {lvl.topics && lvl.topics.map((t) => (
                      <div key={t} className='topic-item'>
                        <span className='topic-bullet'></span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className='section section-alt cta-section'>
          <div className='container'>
            <div className='cta-band'>
              <div className='cta-content'>
                <h2 className='cta-title'>Start learning today</h2>
                <p className='cta-desc'>Join learners building programming confidence with an intelligent AI tutor.</p>
              </div>
              <Link to='/register' className='btn cta-btn'>Get Started</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default Landing;