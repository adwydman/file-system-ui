import { createStore } from '../../src/stores/Store';

describe('createStore', () => {
  test('tests the store functionality', () => {
    const store = createStore([
      {
        key: 'test',
        value: 1234,
        onChange: (oldValue, newValue) => {
          expect(oldValue).toEqual(1234)
          expect(newValue).toEqual('test')
        }
      }
    ])

    store.update('test', 'test')
    
    const value = store.get('test')
    expect(value).toEqual('test')
  })

  test('throws an error when a key is not present', () => {
    const store = createStore([
      {
        key: 'test',
        value: 1234
      }
    ])

    const t = () => {
      store.update('another one', 1)
    }

    expect(t).toThrow(Error)
    expect(t).toThrow('Value not set up')
  })

  test('returns null a get is called on a non set up key', () => {
    const store = createStore([])

    const value = store.get('test');
    expect(value).toEqual(null);
  })
})
