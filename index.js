import { AppRegistry } from 'react-native';
import App from './App';

// Register the app with the correct name from app.json "expo.name" field
AppRegistry.registerComponent('Phillboards', () => App);

// Web specific setup
if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication('Phillboards', {
    rootTag,
  });
} 