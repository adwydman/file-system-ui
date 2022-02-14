import { 
  TAGS,
  createHtmlElement,
  clearChildrenElements
} from './utils';

const createListElement = (parentEl, node) => {
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
    tagName: TAGS.DIV, 
    text: node.modified,
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
    cssClasses: [ 'row', 'clickable', 'node' ], 
    children: [
      documentNameWrapper,
      dateModified,
      size
    ],
    node: node
  })

  parentEl.appendChild(row);
}

const createGoUpEntry = (parentEl) => {
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
    cssClasses: [ 'row', 'clickable' ], 
    children: [
      documentName
    ]
  })

  parentEl.appendChild(row)
}

export const renderList = (treeNode, htmlElement) => {
  clearChildrenElements(htmlElement);

  const listFragment = document.createDocumentFragment();

  if (!treeNode.isRoot) {
    createGoUpEntry(listFragment)
  }

  for (let i = 0; i < treeNode.children.length; i++) {
    const child = treeNode.children[i];
    createListElement(listFragment, child)
  }

  htmlElement.appendChild(listFragment);
}
