import TreeNode from '../../src/models/TreeNode';

describe('TreeNode', () => {
  test('creates a new instance', () => {
    const treeNode = new TreeNode('file', 'Test', 1, 1)

    expect(treeNode.type).toEqual('file')
    expect(treeNode.name).toEqual('Test')
    expect(treeNode.modified).toEqual(1)
    expect(treeNode.size).toEqual(1)
  })

  test('throws an error when an incorrect type is passed', () => {
    const t = () => {
      new TreeNode('test', 'Test', 1, 1)
    }

    expect(t).toThrow(Error)
    expect(t).toThrow("Incorrect type: test")
  })

  describe('addChild', () => {
    test('throws an error when not TreeNode is passed', () => {
      const treeNode = new TreeNode('folder', 'Test', 1, 1)

      const t1 = () => { treeNode.addChild() }
      const t2 = () => { treeNode.addChild(1) }
      const t3 = () => { treeNode.addChild('test') }
      const t4 = () => { treeNode.addChild({test: 1}) }

      expect(t1).toThrow(Error)
      expect(t1).toThrow('Child has to be a TreeNode instance')
      expect(t2).toThrow(Error)
      expect(t2).toThrow('Child has to be a TreeNode instance')
      expect(t3).toThrow(Error)
      expect(t3).toThrow('Child has to be a TreeNode instance')
      expect(t4).toThrow(Error)
      expect(t4).toThrow('Child has to be a TreeNode instance')
    })

    test('throws an error when trying to add a child to a file', () => {
      const treeNode1 = new TreeNode('file', 'Test', 1, 1)
      const treeNode2 = new TreeNode('file', 'Another Test', 1, 1)
      
      const t = () => {
        treeNode1.addChild(treeNode2)
      }

      expect(t).toThrow(Error)
      expect(t).toThrow('Cannot add child to a file')
    })
  })

  describe('children', () => {
    test('returns null for children when the type is file', () => {
      const treeNode = new TreeNode('file', 'Test', 1, 1)
  
      expect(treeNode.children).toEqual(null);
    })
  
    test('returns an empty array for children when the type is folder', () => {
      const treeNode = new TreeNode('folder', 'Test', 1, 1)
  
      expect(treeNode.children).toEqual([]);
    })
  })

  describe('getters', () => {
    test('correctly returns isFile and isFolder values', () => {
      const treeNode1 = new TreeNode('file', 'Test', 1, 1)
      expect(treeNode1.isFile).toEqual(true);
      expect(treeNode1.isFolder).toEqual(false);

      const treeNode2 = new TreeNode('folder', 'Test', 1, 1)
      expect(treeNode2.isFile).toEqual(false);
      expect(treeNode2.isFolder).toEqual(true);
    })

    test('correct returns hasChildFolders values', () => {

    })
  })
})
