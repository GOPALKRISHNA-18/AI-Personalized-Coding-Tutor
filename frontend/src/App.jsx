import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import SkillAssessment from './pages/SkillAssessment';
import Exercises from './pages/Exercises';
import CodeEditorPage from './pages/CodeEditorPage';
import AiTutorChat from './pages/AiTutorChat';
import Quizzes from './pages/Quizzes';
import LearningPath from './pages/LearningPath';
import ProgressPage from './pages/ProgressPage';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.className = savedTheme;
    document.body.className = savedTheme;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/contact' element={<Contact />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/assessment' element={<SkillAssessment />} />
          <Route path='/learning-path' element={<LearningPath />} />
          <Route path='/exercises' element={<Exercises />} />
          <Route path='/editor' element={<CodeEditorPage />} />
          <Route path='/code-editor' element={<CodeEditorPage />} />
          <Route path='/chat' element={<AiTutorChat />} />
          <Route path='/ai-tutor' element={<AiTutorChat />} />
          <Route path='/quizzes' element={<Quizzes />} />
          <Route path='/progress' element={<ProgressPage />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;