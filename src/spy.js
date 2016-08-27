import { connectViaExtension } from 'remotedev';
const actions = {};

function getAction(name) {
  const action = actions[name];
  if (action) delete actions[name];
  return action || '@watched';
}

function subscribeToMethod(name, store, proto, key) {
  const method = proto[key];
  proto[key] = function (...rest) {
    const m = method.apply(store, rest);
    const subscribe = (write, error) => {
      m.subscribe((id, err) => {
        actions[name] = { type: key, payload: rest };
        if (id && write) write(id);
        if (err && error) error(err);
      });
    };
    return Object.assign(proto[key], { subscribe });
  };
}

export default function spy(store, config) {
  const name = store._query.collection;
  if (!config || !config.name) {
    config = Object.assign(config || {}, { name });
  }
  const devTools = connectViaExtension(config);

  const proto = Object.getPrototypeOf(store);
  Object.keys(proto).forEach(key => {
    subscribeToMethod(name, store, proto, key);
  });

  store.watch().subscribe(payload => {
    setTimeout(() => {
      devTools.send(getAction(name), payload);
    }, 100);
  });
}
