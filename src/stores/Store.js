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
    update: (key, newValue) => {
      if (!(key in store)) {
        throw Error('Value not set up')
      }

      const oldValue = store[key].value;

      store[key].value = newValue;
      if (store[key].onChange) {
        store[key].onChange(oldValue, newValue);
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
