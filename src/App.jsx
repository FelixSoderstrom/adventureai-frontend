import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import GameInterface from './components/Game/GameInterface';
import LandingPage from './components/LandingPage';
import StoryInformation from './components/StoryInformation';
import SignupLogin from './components/SignupLogin';

// Create a wrapper component to conditionally render the header and footer
const AppContent = () => {
    const location = useLocation();
    const isGamePage = location.pathname === '/game';
    
    return (
        <>
            {!isGamePage && <Header />}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupLogin />} />
                <Route path="/story-info/:type" element={<StoryInformation />} />
                <Route path="/game" element={<GameInterface />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {!isGamePage && <Footer />}
        </>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;