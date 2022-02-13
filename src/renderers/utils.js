export const TAGS = {
  DIV: 'div',
  I: 'i'
};

export const createHtmlElement = ({
  tagName,
  cssClasses,
  text,
  children,
  node
}) => {
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
    if (closestHtmlNode) {
      return closestHtmlNode.__node__;
    }
  };

  return newHtmlElement;
}

export const setupRenderCurrentPath = (currentPathElement) => (path) => {
  currentPathElement.textContent = `/${path.join('/')}`;
}