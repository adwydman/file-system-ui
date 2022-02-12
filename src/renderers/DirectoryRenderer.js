const TAGS = {
  DIV: 'div'
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
  const text = createHtmlElement({ tagName: TAGS.DIV, cssClasses: ['tree-text'], text: node.name })
  const childContaner = createHtmlElement({ tagName: TAGS.DIV, cssClasses: ['children'] })

  const htmlNode = createHtmlElement({
    tagName: TAGS.DIV,
    cssClasses: ['node'],
    children: [
      text,
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
  const documentName = createHtmlElement({ 
    tagName: 'div', 
    text: node.name, 
    cssClasses: [ 
      'node',
      'cell',
      'cell-3'
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
      documentName,
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
  for (let i = 0; i < treeNode.children.length; i++) {
    const child = treeNode.children[i];
    createListElement(htmlElement, child)
  }
}
