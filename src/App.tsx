import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports.js';

import LoginPage from './pages/LoginPage';
import CreateStudent from './pages/CreateStudent';
import DisplayStudent from './pages/DisplayStudent';

Amplify.configure(awsExports);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-student" element={<CreateStudent />} />
        <Route path="/students" element={<DisplayStudent />} />
      </Routes>
    </Router>
  );
};

export default App;
