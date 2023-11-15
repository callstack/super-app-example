import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import {ScriptManager, Federated} from '@callstack/repack/client';

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let containers;

  if (__DEV__) {
    containers = {
      MiniApp: 'http://localhost:9000/[name][ext]',
    };
  } else {
    containers = {
      MiniApp: `http://localhost:9000/${Platform.OS}/remotes/[name][ext]`,
    };
  }

  const resolveURL = Federated.createURLResolver({containers});

  const url = resolveURL(scriptId, caller);
  if (url) {
    return {
      url,
      query: {
        platform: Platform.OS,
      },
      verifyScriptSignature: __DEV__ ? 'off' : 'strict',
    };
  }
});

AppRegistry.registerComponent(appName, () => App);
