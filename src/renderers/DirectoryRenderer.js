const TAGS = {
  DIV: 'div',
  I: 'i'
}

function createHtmlElement({
  tagName,
  cssClasses,
  text,
  children,
  node
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
  newHtmlElement.__node__ = node;

  newHtmlElement.__getTreeNode__ = function() {
    const closestHtmlNode = this.closest('.node');
    return closestHtmlNode.__node__
  };

  return newHtmlElement;
}

function onChevronClick(dependencies) {
  const { childContainer } = dependencies

  return function(event) {
    event.stopPropagation();
    const displayStatus = childContainer.style.display;

    if (displayStatus === 'none') {
      this.classList.remove('fa-caret-right');
      this.classList.add('fa-caret-down')
      childContainer.style.display = 'block';
    } else {
      this.classList.add('fa-caret-right')
      this.classList.remove('fa-caret-down');
      childContainer.style.display = 'none';
    }
  }
}

function createTreeElement(parentEl, node) {
  const childContainer = createHtmlElement({ tagName: TAGS.DIV, cssClasses: ['children'] })
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
    chevron.addEventListener('click', onChevronClick({ childContainer }));

    textContainer.appendChild(chevron);
  }
  textContainer.appendChild(folderIcon);
  textContainer.appendChild(text);


  const htmlNode = createHtmlElement({
    tagName: TAGS.DIV,
    cssClasses: ['node'],
    children: [
      textContainer,
      childContainer
    ],
    node: node
  })

  if (node.isRoot) {
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
    tagName: TAGS.DIV, 
    text: node.name,
  })

  const documentNameWrapper = createHtmlElement({ 
    tagName: TAGS.DIV, 
    cssClasses: [ 
      'node',
      'cell',
      'cell-3',
      'document-wrapper'
    ],
    children: [
      documentIcon,
      documentName
    ],
    node: node
  })

  const dateModified = createHtmlElement({ 
    tagName: TAGS.DIV, 
    text: node.dateModified,
    cssClasses: [
      'cell',
      'cell-1'
    ]
  })

  const size = createHtmlElement({ 
    tagName: TAGS.DIV,  
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

const renderTreeRecursive = (treeNode, htmlElement) => {
  if (!treeNode.isFolder) {
    return;
  }
  
  const newElement = createTreeElement(htmlElement, treeNode);
  
  for (let i = 0; i < treeNode.children.length; i++) {
    const child = treeNode.children[i];
    renderTreeRecursive(child, newElement)
  }
}

export const renderTree = (treeNode, htmlElement) => {
  const treeFragment = document.createDocumentFragment();

  renderTreeRecursive(treeNode, treeFragment);

  htmlElement.appendChild(treeFragment);
}

export const renderList = (treeNode, htmlElement) => {
  while (htmlElement.firstChild) {
    htmlElement.removeChild(htmlElement.lastChild);
  }

  const listFragment = document.createDocumentFragment();

  if (!treeNode.isRoot) {
    const documentName = createHtmlElement({ 
      tagName: TAGS.DIV, 
      text: '..',
      cssClasses: [
        'node',
        'cell',
        'cell-3',
        'document-wrapper'
      ],
      node: null
    })
  
    const row = createHtmlElement({ 
      tagName: TAGS.DIV, 
      cssClasses: [ 'row' ], 
      children: [
        documentName
      ]
    })

    listFragment.appendChild(row)
  }

  for (let i = 0; i < treeNode.children.length; i++) {
    const child = treeNode.children[i];
    createListElement(listFragment, child)
  }

  htmlElement.appendChild(listFragment);
}

export const setupRenderCurrentPath = (currentPathElement) => (path) => {
  currentPathElement.textContent = `/${path.join('/')}`;
}