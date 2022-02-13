import Tree from './models/Tree';
import { createStore } from './stores/Store';
import { renderTree, renderList, setupRenderCurrentPath } from './renderers/index';

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
      onChange: (oldValue, newValue) => {
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

  const isGoUpClicked = (treeNode) => treeNode === null;

  const isDirectoryClicked = (treeNode) => treeNode !== undefined;

  const applyDirectoryChanges = (newCurrentPath, newCurrentNode) => {
    store.add('currentPath', newCurrentPath)
    store.add('currentNode', newCurrentNode);

    renderList(newCurrentNode, rightPanel)
  }

  const onLeftPanelClick = (event) => {
    const targetTreeNode = event.target.__getTreeNode__();
    const nodePath = targetTreeNode.getPathFromRoot();

    applyDirectoryChanges(nodePath, targetTreeNode);
  }

  const onRightPanelClick = (event) => {
    const targetTreeNode = event.target.__getTreeNode__();

    const currentPath = store.get('currentPath');
    const currentNode = store.get('currentNode');

    if (isGoUpClicked(targetTreeNode)) {
      const newPath = [...currentPath];
      newPath.pop();

      const newNode = currentNode.parent;

      applyDirectoryChanges(newPath, newNode);
    } else if (isDirectoryClicked(targetTreeNode)) {
      if (!targetTreeNode.isFolder) {
        return;
      }

      const newPath = [
        ...currentPath,
        targetTreeNode.name
      ];

      applyDirectoryChanges(newPath, targetTreeNode);
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
    })
    .catch((err) => {
      console.error('an error occurred', err);
    });
});