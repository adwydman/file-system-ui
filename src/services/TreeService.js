const tree = {
  type: 'folder',
  name: 'Files',
  dateModified: '2022-02-13T06:00:13.000Z',
  size: null,
  children: [
    {
      type: 'folder',
      name: 'Documents',
      dateModified: '2022-02-13T06:00:13.000Z',
      size: null,
      children: [
        {
          type: 'file',
          name: 'text.txt',
          dateModified: '2022-02-13T06:00:13.000Z',
          size: 11565,
          children: null
        }
      ]
    },
    {
      type: 'folder',
      name: 'Images',
      dateModified: '2022-02-13T06:00:13.000Z',
      size: null,
      children: [
        {
          type: 'folder',
          name: 'Files',
          dateModified: '2022-02-13T06:00:13.000Z',
          size: null,
          children: [
            {
              type: 'file',
              name: 'text.txt',
              dateModified: '2022-02-13T06:00:13.000Z',
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
      dateModified: '2022-02-13T06:00:13.000Z',
      size: null,
      children: []
    },
    {
      type: 'file',
      name: 'Description.rtf',
      dateModified: '2022-02-13T06:00:13.000Z',
      size: 76623,
      children: null
    },
    {
      type: 'file',
      name: 'Description.txt',
      dateModified: '2022-02-13T06:00:13.000Z',
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
