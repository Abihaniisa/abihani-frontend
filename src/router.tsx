import { useEffect, useState } from 'react';
import Splash from './screens/Splash';
import Signup from './screens/Signup';
import Otp from './screens/Otp';
import Recovery from './screens/Recovery';
import Feed from './screens/Feed';
import Discover from './screens/Discover';
import Orders from './screens/Orders';
import Thread from './screens/Thread';
import Profile from './screens/Profile';
import Create from './screens/Create';
import Settings from './screens/Settings';
import Admin from './screens/Admin';
import Support from './screens/Support';
import BottomNav, { type NavKey } from './components/common/BottomNav';
import FeedChrome from './components/common/FeedChrome';

type Route =
  | 'splash'
  | 'signup'
  | 'otp'
  | 'recovery'
  | 'feed'
  | 'discover'
  | 'orders'
  | 'thread'
  | 'profile'
  | 'create'
  | 'settings'
  | 'admin'
  | 'support';

export default function Router() {
  const [route, setRoute] = useState<Route>('splash');
  const [stack, setStack] = useState<Route[]>([]);
  const [feedTab, setFeedTab] = useState<'foryou' | 'following'>('foryou');
  const [email, setEmail] = useState('');
  const [recoveryCode] = useState(() =>
    Math.floor(10000000 + Math.random() * 90000000).toString(),
  );

  const navForRoute: Record<Route, NavKey | null> = {
    splash: null,
    signup: null,
    otp: null,
    recovery: null,
    feed: 'feed',
    discover: 'discover',
    orders: 'orders',
    thread: null,
    profile: 'you',
    create: 'create',
    settings: null,
    admin: null,
    support: null,
  };

  const showNav = navForRoute[route] !== null;

  function push(next: Route) {
    setStack((s) => [...s, route]);
    setRoute(next);
  }

  function replace(next: Route) {
    setRoute(next);
  }

  function goTab(key: NavKey) {
    if (key === 'feed') replace('feed');
    else if (key === 'discover') replace('discover');
    else if (key === 'orders') replace('orders');
    else if (key === 'you') replace('profile');
    else if (key === 'create') push('create');
  }

  function back() {
    setStack((s) => {
      if (s.length === 0) {
        return s;
      }
      const copy = [...s];
      const prev = copy.pop() as Route;
      setRoute(prev);
      return copy;
    });
  }

  useEffect(() => {
    function onPopState() {
      back();
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  function renderScreen() {
    switch (route) {
      case 'splash':
        return <Splash onDone={() => replace('signup')} />;
      case 'signup':
        return (
          <Signup
            onContinue={(e) => {
              setEmail(e);
              push('otp');
            }}
          />
        );
      case 'otp':
        return (
          <Otp
            email={email}
            onBack={back}
            onVerify={() => push('recovery')}
          />
        );
      case 'recovery':
        return (
          <Recovery
            code={`${recoveryCode.slice(0, 4)} ${recoveryCode.slice(4)}`}
            onDone={() => replace('feed')}
          />
        );
      case 'feed':
        return <Feed tab={feedTab} />;
      case 'discover':
        return <Discover />;
      case 'orders':
        return <Orders />;
      case 'thread':
        return <Thread />;
      case 'profile':
        return <Profile />;
      case 'create':
        return <Create />;
      case 'settings':
        return <Settings />;
      case 'admin':
        return <Admin />;
      case 'support':
        return <Support />;
      default:
        return null;
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 460,
        margin: '0 auto',
        minHeight: '100dvh',
        background: 'var(--ink)',
        overflow: 'hidden',
      }}
    >
      {route === 'feed' && (
        <FeedChrome
          tab={feedTab}
          onTabChange={setFeedTab}
          onSearch={() => push('discover')}
          onWordmark={() => push('support')}
        />
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          paddingBottom: showNav ? 'calc(var(--safe-bottom) + 92px)' : 0,
          overflowY: 'auto',
        }}
      >
        {renderScreen()}
      </div>

      {showNav && (
        <BottomNav
          current={navForRoute[route] as NavKey}
          onNavigate={goTab}
        />
      )}
    </div>
  );
}