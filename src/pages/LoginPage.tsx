import React from 'react';

import { Authenticator } from '@aws-amplify/ui-react';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <Authenticator>
        {({ signOut }) => (
          <main>
            <button onClick={signOut}>Sign Out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
};

export default LoginPage;
