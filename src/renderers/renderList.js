import { 
  TAGS,
  createHtmlElement
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
      'node',
      'cell',
      'cell-3',
      'document-wrapper',
      'clickable'
    ],
    children: [
      documentIcon,
      documentName
    ],
    node: node
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
    cssClasses: [ 'row' ], 
    children: [
      documentNameWrapper,
      dateModified,
      size
    ]
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
      'document-wrapper',
      'clickable'
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

  parentEl.appendChild(row)
}

const clearList = (htmlElement) => {
  while (htmlElement.firstChild) {
    let lastChild = htmlElement.lastChild;
    htmlElement.removeChild(lastChild);
    lastChild = null;
  }
}

export const renderList = (treeNode, htmlElement) => {
  clearList(htmlElement);

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