import { AppProps } from 'next/app';
import Nav from '../components/nav';
import '../styles/globals.css';
import { HasuraProvider } from '../util/hasuraProvider';
import { AuthProvider } from '../util/provider';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { ReactElement } from 'react';

// only initialize when in the browser
if (typeof window !== 'undefined') {
  LogRocket.init('ffljx6/bbsim');
  // plugins should also only be initialized when in the browser
  setupLogRocketReact(LogRocket);
}

function BBSim({ Component, pageProps }: AppProps): ReactElement {
  return (
    <AuthProvider>
      <HasuraProvider>
        <div>
          <Nav />

          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <Component {...pageProps} />
              </div>
            </div>
          </main>
        </div>
      </HasuraProvider>
    </AuthProvider>
  );
}

export default BBSim;
