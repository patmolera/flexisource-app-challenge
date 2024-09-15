import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports.js';

import LoginPage from './pages/LoginPage';
import CreateStudent from './pages/CreateStudent';
import DisplayStudent from './pages/DisplayStudent';
import UserWidget from './components/UserWidget';

Amplify.configure(awsExports);

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { route } = useAuthenticator((context) => [context.route]);

  if (route !== 'authenticated') {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <Authenticator>
      <Router>
        <UserWidget />
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <DisplayStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-student"
            element={
              <ProtectedRoute>
                <CreateStudent />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/students" />} />
        </Routes>
      </Router>
    </Authenticator>
  );
};

export default App;
