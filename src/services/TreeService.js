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
    },
    {
      type: 'folder',
      name: 'Images',
      modified: '2022-02-13T06:00:13.000Z',
      size: null,
      children: [
        {
          type: 'folder',
          name: 'Files',
          modified: '2022-02-13T06:00:13.000Z',
          size: null,
          children: [
            {
              type: 'file',
              name: 'text.txt',
              modified: '2022-02-13T06:00:13.000Z',
              size: 15363,
              children: null
            }
          ]
        }
      ]
    },
    {
      type: 'folder',
      name: 'System',
      modified: '2022-02-13T06:00:13.000Z',
      size: null,
      children: []
    },
    {
      type: 'file',
      name: 'Description.rtf',
      modified: '2022-02-13T06:00:13.000Z',
      size: 76623,
      children: null
    },
    {
      type: 'file',
      name: 'Description.txt',
      modified: '2022-02-13T06:00:13.000Z',
      size: 83442,
      children: null
    }
  ]
}

export const fetchTree = () => {
  return new Promise((resolve) => {
    resolve(tree);
  })
}
