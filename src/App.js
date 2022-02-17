import React from 'react';
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
      <div style={{ width: "20px", marginLeft: "80%" }} ><AmplifySignOut /></div>
      <div>Hello, {user.username}</div>
      <div style={{ width: "80%", margin: "0 auto" }} ><BasicTable /></div>
    </div>
  ) : (
    <AmplifyAuthenticator />
  );
}

export default AuthStateApp;