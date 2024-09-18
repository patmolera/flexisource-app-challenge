import React from 'react';

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="w-full max-w-7xl p-6 bg-white rounded-lg border border-gray-200 drop-shadow-lg">
      {children}
    </div>
  );
};

export default PageWrapper;
