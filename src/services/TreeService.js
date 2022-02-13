const tree = {
  type: 'folder',
  name: 'Files',
  dateModified: '7/6/2020',
  size: null,
  children: [
    {
      type: 'folder',
      name: 'Documents',
      dateModified: '7/6/2020',
      size: null,
      children: [
        {
          type: 'file',
          name: 'text.txt',
          dateModified: '7/6/2020',
          size: 1,
          children: null
        }
      ]
    },
    {
      type: 'folder',
      name: 'Images',
      dateModified: '7/6/2020',
      size: null,
      children: [
        {
          type: 'folder',
          name: 'Files',
          dateModified: '7/6/2020',
          size: null,
          children: [
            {
              type: 'file',
              name: 'text.txt',
              dateModified: '7/6/2020',
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
      dateModified: '7/6/2020',
      size: null,
      children: []
    },
    {
      type: 'file',
      name: 'Description.rtf',
      dateModified: '7/6/2020',
      size: 1,
      children: null
    },
    {
      type: 'file',
      name: 'Description.txt',
      dateModified: '7/6/2020',
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
