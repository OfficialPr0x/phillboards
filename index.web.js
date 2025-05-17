import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

// Register the app for web rendering
AppRegistry.registerComponent('Phillboards', () => App);

// Web-specific setup
if (typeof document !== 'undefined') {
  // Add global styles for web
  const style = document.createElement('style');
  style.textContent = `
    html, body, #root {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    /* Force all flex to work properly on web */
    #root {
      display: flex;
      flex-direction: column;
    }

    /* Fix scrolling inside components */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 3px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;
  document.head.appendChild(style);

  const rootTag = document.getElementById('root');
  AppRegistry.runApplication('Phillboards', {
    rootTag,
    initialProps: {
      isWeb: true
    }
  });
} 