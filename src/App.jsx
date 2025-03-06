import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GameInterface from './components/Game/GameInterface';
import LandingPage from './components/LandingPage';
import StoryInformation from './components/StoryInformation';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/story-info/:type" element={<StoryInformation />} />
                <Route path="/game" element={<GameInterface />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;