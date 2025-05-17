import React from 'react';
import { AppRegistry } from 'react-native';
import App from '../App';

// Register the app
AppRegistry.registerComponent('phillboards', () => App);

// Register the web version
if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root');
  if (rootTag) {
    AppRegistry.runApplication('phillboards', {
      rootTag,
    });
  }
} 