/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { initNotifications } from './src/Providers/NotificationController';

AppRegistry.registerComponent(appName, () => App);

initNotifications()
