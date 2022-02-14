import Tree from '../../src/models/Tree';
import * as TreeService from '../../src/services/TreeService';

const tree = {
  type: 'folder',
  name: 'Files',
  modified: '2022-02-13T06:00:13.000Z',
  size: null,
  children: [
    {
      type: 'folder',
      name: 'Documents',
      modified: '2022-02-13T06:00:13.000Z',
      size: null,
      children: [
        {
          type: 'file',
          name: 'text.txt',
          modified: '2022-02-13T06:00:13.000Z',
          size: 11565,
          children: null
        }
      ]
    }
  ]
}

TreeService.fetchTree = jest.fn(() => Promise.resolve(tree))

describe('Tree', () => {
  test('parsing the tree should work', () => {
    const tree = new Tree();

    tree.fetchTreeData()
      .then((result) => {
        expect(result.name).toEqual('Files')

        return tree.constructTreeNodes();
      })
      .then((root) => {
        expect(root.name).toEqual('Files')
        expect(root.children[0].name).toEqual('Documents')
        expect(root.children[0].children[0].name).toEqual('text.txt')
      })
  })
})
