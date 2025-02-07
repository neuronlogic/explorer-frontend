import { useLayoutEffect, useState } from 'react';
import history from '@history';
import { Router } from 'react-router-dom';

function BrowserRouter({ basename, children, window }) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    const unsubscribe = history.listen(setState);
    return unsubscribe;
  }, []);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default BrowserRouter;
