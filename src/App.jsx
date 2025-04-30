import { onAuthStateChanged, getAuth } from 'firebase/auth';
import LoginSignin from './components/LoginSignin';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import { app } from '../config/firebase';

const App = () => {
  const auth = getAuth(app);
  const [isLogedin, setIsLogedin] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogedin(true);
      } else {
        setIsLogedin(false);
      }
    });
  }, []);

  return <>{isLogedin ? <Profile /> : <LoginSignin />}</>;
};

export default App;
