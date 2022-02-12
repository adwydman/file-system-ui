export const createStore = (options = []) => {
  const store = {};

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    store[option.key] = {
      value: option.value,
      onChange: option.onChange
    }
  }

  return {
    add: (key, value) => {
      if (!(key in store)) {
        throw Error('value not set up')
      }

      store[key].value = value;
      if (store[key].onChange) {
        store[key].onChange(value);
      }
      return true;
    },
    get: (key) => {
      if (!(key in store)) {
        return null;
      }

      return store[key].value;
    }
  }
}