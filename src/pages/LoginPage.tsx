import React from 'react';

import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <h2>Login</h2>
      <Authenticator>
        {({ signOut }) => (
          <main>
            <button
              onClick={() => {
                signOut();
                navigate('/students');
              }}
            >
              Sign Out
            </button>
          </main>
        )}
      </Authenticator>
    </div>
  );
};

export default LoginPage;
