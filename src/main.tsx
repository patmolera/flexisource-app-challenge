import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { ToastContainer } from 'react-toastify';

import awsAmplifyConfig from './amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

Amplify.configure(awsAmplifyConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ToastContainer closeOnClick />
  </StrictMode>
);
