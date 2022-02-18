import React from 'react';
import stylesheeet from './styles.module.css';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
import BasicTable from './components/Table';

Amplify.configure(awsconfig);

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <div className={stylesheeet.buttonA} ><AmplifySignOut /></div>
      <div>Hello, {user.username}</div>
      <div className={stylesheeet.tableA} ><BasicTable /></div>
      <button className={stylesheeet.blue}>This is blue</button>
    </div>


  ) : (
    <AmplifyAuthenticator />
  );
}

export default AuthStateApp;