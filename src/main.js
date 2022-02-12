import Tree from './models/Tree';
import { createStore } from './stores/Store';
import { renderTree, renderList, getNodePathToRoot, setupRenderCurrentPath } from './renderers/DirectoryRenderer';

const init = () => {
  const tree = new Tree();
  const leftPanel = document.querySelector('.left-panel');
  const rightPanel = document.querySelector('.right-panel .body');
  const currentPathElement = document.querySelector('.current-path');

  const renderCurrentPath = setupRenderCurrentPath(currentPathElement);

  const store = createStore([
    {
      key: 'currentPath',
      value: [],
      onChange: (newValue) => {
        renderCurrentPath(newValue)
      }
    },
    {
      key: 'currentNode',
      value: null
    }
  ]);

  return {
    store,
    tree,
    leftPanel,
    rightPanel
  };
}

window.addEventListener('load', () => {
  const {
    store,
    tree,
    leftPanel,
    rightPanel
  } = init();

  const onLeftPanelClick = (event) => {
    const nodePath = getNodePathToRoot(event.target, leftPanel);
    const desiredNode = tree.findNode(nodePath.slice(1));

    store.add('currentPath', nodePath)
    store.add('currentNode', desiredNode);

    renderList(desiredNode, rightPanel)
  }

  const onRightPanelClick = (event) => {
    const targetName = event.target.textContent;
    const currentPath = store.get('currentPath');
    const currentNode = store.get('currentNode');

    if (targetName === '..') {
      const newPath = [...currentPath];
      newPath.pop()

      const newNode = currentNode.parent;
      store.add('currentPath', newPath);
      store.add('currentNode', newNode)

      renderList(newNode, rightPanel)
    } else {
      const pathCandidate = [
        ...currentPath,
        targetName
      ];
  
      const desiredNode = tree.findNode([targetName], currentNode);
  
      if (desiredNode.isFolder) {
        store.add('currentPath', pathCandidate);
        store.add('currentNode', desiredNode)
  
        renderList(desiredNode, rightPanel)
      }
    }
  };

  tree.fetchTreeData()
    .then(() => tree.constructTreeNodes())
    .then(() => {
      const path = [tree.root.name];

      store.add('currentPath', path)
      store.add('currentNode', tree.root)

      renderTree(tree.root, leftPanel);
      renderList(tree.root, rightPanel);
    })
    .then(() => {
      leftPanel.addEventListener('click', onLeftPanelClick);
      rightPanel.addEventListener('click', onRightPanelClick);
    });
});