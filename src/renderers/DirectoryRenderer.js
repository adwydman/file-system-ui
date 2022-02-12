const TAGS = {
  DIV: 'div',
  I: 'i'
}

function createHtmlElement({
  tagName,
  cssClasses,
  text,
  children
}) {
  const newHtmlElement = document.createElement(tagName);
  if (cssClasses) {
    newHtmlElement.classList.add(...cssClasses);
  }
  if (text) {
    newHtmlElement.textContent = text;
  }
  if (children) {
    children.forEach((child) => {
      newHtmlElement.appendChild(child);
    })
  }

  return newHtmlElement;
}

function createTreeElement(parentEl, node) {
  const textContainer = createHtmlElement({ tagName: TAGS.DIV, cssClasses: ['text-container']}) 
  const text = createHtmlElement({ tagName: TAGS.DIV, cssClasses: ['tree-text'], text: node.name })

  const folderIcon = createHtmlElement({ 
    tagName: TAGS.I,
    cssClasses: ['fa-solid', 'fa-folder-open']
  });

  if (node.hasFolders) {
    const chevron = createHtmlElement({
      tagName: TAGS.I,
      cssClasses: ['fa-solid', 'fa-caret-down', 'chevron']
    });
    textContainer.appendChild(chevron);
  }
  textContainer.appendChild(folderIcon);
  textContainer.appendChild(text);

  const childContaner = createHtmlElement({ tagName: TAGS.DIV, cssClasses: ['children'] })

  const htmlNode = createHtmlElement({
    tagName: TAGS.DIV,
    cssClasses: ['node'],
    children: [
      textContainer,
      childContaner
    ]
  })

  if (parentEl.getAttribute('class') === 'left-panel') {
    parentEl.appendChild(htmlNode);
  } else {
    parentEl.querySelector('.children').appendChild(htmlNode)
  }

  return htmlNode;
}

function createListElement(parentEl, node) {
  const documentIcon = createHtmlElement({
    tagName: TAGS.I,
    cssClasses: [
      'fa-solid',
      'document-icon',
      node.isFile ? 'fa-file-lines' : 'fa-folder-open'
    ]
  })

  const documentName = createHtmlElement({ 
    tagName: 'div', 
    text: node.name,
  })

  const documentNameWrapper = createHtmlElement({ 
    tagName: 'div', 
    cssClasses: [ 
      'node',
      'cell',
      'cell-3',
      'document-wrapper'
    ],
    children: [
      documentIcon,
      documentName
    ]
  })

  const dateModified = createHtmlElement({ 
    tagName: 'div', 
    text: node.dateModified,
    cssClasses: [
      'cell',
      'cell-1'
    ]
  })

  const size = createHtmlElement({ 
    tagName: 'div',  
    text: node.isFile ? node.size : null,
    cssClasses: [
      'cell',
      'cell-1',
      'cell-numeric'
    ]
  })

  const row = createHtmlElement({ 
    tagName: TAGS.DIV, 
    cssClasses: [ 'row' ], 
    children: [
      documentNameWrapper,
      dateModified,
      size
    ]
  })

  parentEl.appendChild(row);
}


export const renderTree = (treeNode, htmlElement) => {
  if (!treeNode.isFolder) {
    return;
  }
  
  const newElement = createTreeElement(htmlElement, treeNode);
  
  for (let i = 0; i < treeNode.children.length; i++) {
    const child = treeNode.children[i];
    renderTree(child, newElement)
  }
}

export const renderList = (treeNode, htmlElement) => {
  while (htmlElement.firstChild) {
    htmlElement.removeChild(htmlElement.lastChild);
  }

  for (let i = 0; i < treeNode.children.length; i++) {
    const child = treeNode.children[i];
    createListElement(htmlElement, child)
  }
}
