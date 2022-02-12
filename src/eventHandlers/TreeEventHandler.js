function getNodePathToRoot(initialNode) {
  const nodePath = [];
  let currentNode = initialNode;

  do {
    const htmlNode = currentNode.closest('.node');
    const nodeNameSelector = htmlNode.querySelector('.tree-text');
    const currentNodeName = nodeNameSelector.textContent;

    nodePath.unshift(currentNodeName);

    currentNode = htmlNode.parentElement;
  } while (currentNode.getAttribute('class') !== 'left-panel')

  return nodePath;
}

export const leftPanelEventHandler = (callback) => (event) => {
  const nodePath = getNodePathToRoot(event.target);

  callback(nodePath);
};

export const rightPanelEventHandler = (callback) => (event) => {
  const targetName = event.target.textContent;

  callback(targetName);
}

