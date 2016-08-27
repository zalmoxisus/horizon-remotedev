import spy from './spy';

export default function dev(store, config) {
  if (
    (!config || !config.remote) && (typeof window === 'undefined' || !window.devToolsExtension)
  ) {
    return store;
  }
  if (typeof store !== 'object') {
    console.warn(`Passed ${typeof store} to horizon-remotedev, it should be "horizon('name')".`);
    return store;
  }

  spy(store, config);

  return store;
}
