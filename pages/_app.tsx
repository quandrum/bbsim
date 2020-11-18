import { AppProps } from 'next/app';
import '../styles/globals.css';
import { HasuraProvider } from '../util/hasuraProvider';
import { AuthProvider } from '../util/provider';

function BBSim({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <HasuraProvider>
        <div className="h-screen bg-black">
          <Component {...pageProps} />
        </div>
      </HasuraProvider>
    </AuthProvider>
  );
}

export default BBSim;
