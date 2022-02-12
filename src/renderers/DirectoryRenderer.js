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
  const text = createHtmlElement({ tagName: TAGS.DIV, text: node.name })
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
