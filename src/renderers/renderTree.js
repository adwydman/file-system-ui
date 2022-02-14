import { 
  TAGS,
  createHtmlElement
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

const createTreeElement = (parentEl, node) => {
  const childContainer = createHtmlElement({ tagName: TAGS.DIV, cssClasses: ['children'] })
  const textContainer = createHtmlElement({ tagName: TAGS.DIV, cssClasses: ['text-container', 'clickable'] }) 
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
