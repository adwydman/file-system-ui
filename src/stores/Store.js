export const createStore = (options = []) => {
  const store = {};

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    store[option.key] = option.value;
  }

  return {
    add: (key, value) => {
      store[key] = value;
      return true;
    },
    get: (key) => {
      if (!(key in store)) {
        return null;
      }

      return store[key];
    }
  }
}