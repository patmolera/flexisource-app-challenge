import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports.js';
import awsAmplifyConfig from './amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import App from './App.tsx';
import './index.css';

Amplify.configure(awsAmplifyConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
