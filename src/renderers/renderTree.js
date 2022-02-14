import { 
  TAGS,
  createHtmlElement,
  clearChildrenElements
} from './utils';

const onChevronClick = (dependencies) => {
  const { childContainer, folderIcon } = dependencies

  return function(event) {
    event.stopPropagation();
    const displayStatus = childContainer.style.display;

    if (displayStatus === 'none') {
      this.classList.remove('fa-caret-right');
      this.classList.add('fa-caret-down');
      folderIcon.classList.add('fa-folder-open');
      folderIcon.classList.remove('fa-folder');

      childContainer.style.display = 'block';
    } else {
      this.classList.add('fa-caret-right');
      this.classList.remove('fa-caret-down');
      folderIcon.classList.add('fa-folder');
      folderIcon.classList.remove('fa-folder-open');

      childContainer.style.display = 'none';
    }
  }
}

const createTreeElement = (parentEl, node, currentNode) => {
  const childContainer = createHtmlElement({ tagName: TAGS.DIV, cssClasses: ['children'] })
  const textContainerClasses = [
    'text-container', 
    'clickable'
  ]

  if (node === currentNode) {
    textContainerClasses.push('active-node');
  }

  const textContainer = createHtmlElement({ tagName: TAGS.DIV, cssClasses: textContainerClasses }) 
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
    chevron.addEventListener('click', onChevronClick({ childContainer, folderIcon }));

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

const renderTreeRecursive = (treeNode, htmlElement, currentNode) => {
  if (!treeNode.isFolder) {
    return;
  }
  
  const newElement = createTreeElement(htmlElement, treeNode, currentNode);
  
  for (let i = 0; i < treeNode.children.length; i++) {
    const child = treeNode.children[i];
    renderTreeRecursive(child, newElement, currentNode)
  }
}

export const renderTree = (treeNode, htmlElement, currentNode) => {
  clearChildrenElements(htmlElement);

  const treeFragment = document.createDocumentFragment();

  renderTreeRecursive(treeNode, treeFragment, currentNode);

  htmlElement.appendChild(treeFragment);
}
