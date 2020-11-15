import { AppProps } from 'next/app';
import '../styles/globals.css';
import { HasuraProvider } from '../util/hasuraProvider';
import { AuthProvider } from '../util/provider';
import Navigation from '../components/nav';

function BBSim({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <HasuraProvider>
        <Navigation />
        <Component {...pageProps} />
      </HasuraProvider>
    </AuthProvider>
  );
}

export default BBSim;
