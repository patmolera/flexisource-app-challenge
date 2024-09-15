import React from 'react';

import { Authenticator } from '@aws-amplify/ui-react';
// import Auth from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // const onSubmit = async (data: LoginFormInputs) => {
  //   try {
  //     await Amplify.signIn(data.email);
  //     alert('Login successful!');
  //     navigate('/students'); // Redirect to students list after successful login
  //   } catch (error) {
  //     console.log('Error logging in', error);
  //     alert('Login failed. Please check your credentials.');
  //   }
  // };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Authenticator>
        {({ signOut }) => (
          <main>
            {/* <h1>Welcome {user.username}</h1> */}
            <button onClick={signOut}>Sign Out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
};

export default LoginPage;
