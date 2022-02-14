import TreeNode from '../../src/models/TreeNode';

describe('TreeNode', () => {
  test('creates a new instance', () => {
    const treeNode = new TreeNode({
      type: 'file', 
      name: 'Test', 
      modified: '2022-02-13T06:00:13.000Z', 
      size: 42562
    })

    expect(treeNode.type).toEqual('file')
    expect(treeNode.name).toEqual('Test')
    expect(treeNode.modified).toEqual('2/13/2022')
    expect(treeNode.size).toEqual('41.56 KB')
  })

  test('throws an error when an incorrect type is passed', () => {
    const t = () => {
      new TreeNode({
        type: 'test', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })
    }

    expect(t).toThrow(Error)
    expect(t).toThrow("Incorrect type: test")
  })

  describe('addChild', () => {
    test('throws an error when not TreeNode is passed', () => {
      const treeNode = new TreeNode({
        type: 'folder', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })

      const t1 = () => { treeNode.addChild() }
      const t2 = () => { treeNode.addChild(1) }
      const t3 = () => { treeNode.addChild('test') }
      const t4 = () => { treeNode.addChild({asdf: 1}) }

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
      const treeNode1 = new TreeNode({
        type: 'file', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })
      const treeNode2 = new TreeNode({
        type: 'file', 
        name: 'Another Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })
      
      const t = () => {
        treeNode1.addChild(treeNode2)
      }

      expect(t).toThrow(Error)
      expect(t).toThrow('Cannot add child to a file')
    })
  })

  describe('children', () => {
    test('returns null for children when the type is file', () => {
      const treeNode = new TreeNode({
        type: 'file', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })
  
      expect(treeNode.children).toEqual(null);
    })
  
    test('returns an empty array for children when the type is folder', () => {
      const treeNode = new TreeNode({
        type: 'folder', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })
  
      expect(treeNode.children).toEqual([]);
    })
  })

  describe('getters', () => {
    test('correctly returns isFile and isFolder values', () => {
      const treeNode1 = new TreeNode({
        type: 'file', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })
      expect(treeNode1.isFile).toEqual(true);
      expect(treeNode1.isFolder).toEqual(false);

      const treeNode2 = new TreeNode({
        type: 'folder', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })
      expect(treeNode2.isFile).toEqual(false);
      expect(treeNode2.isFolder).toEqual(true);
    })

    test('correctly returns isRoot values', () => {
      const treeNode1 = new TreeNode({
        type: 'file', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562,
        parent: null
      })

      const treeNode2 = new TreeNode({
        type: 'file', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562,
        parent: treeNode1
      })

      expect(treeNode1.isRoot).toEqual(true);
      expect(treeNode2.isRoot).toEqual(false);
    })
  })

  describe('#addChild', () => {
    test('correctly add the child', () => {
      const treeNode1 = new TreeNode({
        type: 'folder', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })

      const treeNode2 = new TreeNode({
        type: 'folder', 
        name: 'Another Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })

      treeNode2.addChild(treeNode1);

      expect(treeNode2.children).toEqual([treeNode1])
    })
  })

  describe('#hasFolders', () => {
    test('correctly returns the values', () => {
      const treeNode1 = new TreeNode({
        type: 'folder', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })

      expect(treeNode1.hasFolders).toEqual(false);

      const treeNode2 = new TreeNode({
        type: 'folder', 
        name: 'Another Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })

      treeNode2.addChild(treeNode1);

      expect(treeNode2.hasFolders).toEqual(true);
    })

    test('throws an error', () => {
      const t = () => {
        const treeNode1 = new TreeNode({
          type: 'file', 
          name: 'Test', 
          modified: '2022-02-13T06:00:13.000Z', 
          size: 42562
        })
        treeNode1.hasFolders
      }

      expect(t).toThrow(Error)
      expect(t).toThrow('The node is not a folder')
    })
  })

  describe('#getPathFromRoot', () => {
    test('correctly returns the value from root', () => {
      const treeNode1 = new TreeNode({
        type: 'folder', 
        name: 'Root', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562,
        parent: null
      })

      const treeNode2 = new TreeNode({
        type: 'folder', 
        name: 'Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })

      const treeNode3 = new TreeNode({
        type: 'folder', 
        name: 'Another Test', 
        modified: '2022-02-13T06:00:13.000Z', 
        size: 42562
      })

      treeNode1.addChild(treeNode2);
      treeNode2.addChild(treeNode3);

      expect(treeNode3.getPathFromRoot()).toEqual(['Root', 'Test', 'Another Test'])
    })
  })
})
