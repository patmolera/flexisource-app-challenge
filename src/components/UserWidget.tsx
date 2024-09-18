import { useAuthenticator } from '@aws-amplify/ui-react';

const UserWidget = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      {user ? (
        <div className="bg-white rounded-lg border p-4 drop-shadow-md">
          <p className="text-sm">
            Welcome,{' '}
            <span className="font-semibold">{user.signInDetails?.loginId}</span>
          </p>
          <button className="flex ml-auto text-sm" onClick={signOut}>
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UserWidget;
