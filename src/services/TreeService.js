const tree = {
  type: 'folder',
  name: 'Files',
  modified: '7/6/2020',
  size: null,
  children: [
    {
      type: 'folder',
      name: 'Documents',
      modified: '7/6/2020',
      size: null,
      children: [
        {
          type: 'file',
          name: 'text.txt',
          modified: '7/6/2020',
          size: 1,
          children: null
        }
      ]
    },
    {
      type: 'folder',
      name: 'Images',
      modified: '7/6/2020',
      size: null,
      children: [
        {
          type: 'folder',
          name: 'test1',
          modified: '7/6/2020',
          size: null,
          children: [
            {
              type: 'file',
              name: 'text.txt',
              modified: '7/6/2020',
              size: 1,
              children: null
            }
          ]
        }
      ]
    },
    {
      type: 'folder',
      name: 'System',
      modified: '7/6/2020',
      size: null,
      children: []
    },
    {
      type: 'file',
      name: 'Description.rtf',
      modified: '7/6/2020',
      size: 1,
      children: null
    },
    {
      type: 'file',
      name: 'Description.txt',
      modified: '7/6/2020',
      size: 2,
      children: null
    }
  ]
}

export const fetchTree = () => {
  return new Promise((resolve) => {
    resolve(tree);
  })
}
