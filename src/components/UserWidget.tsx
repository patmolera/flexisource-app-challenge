import { useAuthenticator } from '@aws-amplify/ui-react';

const UserWidget = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      {user ? (
        <div>
          <p>Welcome, {user.username}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : null}
    </div>
  );
};

export default UserWidget;
