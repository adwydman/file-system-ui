import Tree from './models/Tree';
import { createStore } from './stores/Store';
import { renderTree, renderList, setupRenderCurrentPath } from './renderers/DirectoryRenderer';

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

  const applyDirectoryChanges = (newCurrentPath, newCurrentNode) => {
    store.add('currentPath', newCurrentPath)
    store.add('currentNode', newCurrentNode);

    renderList(newCurrentNode, rightPanel)
  }

  const onLeftPanelClick = (event) => {
    const closestHtmlNode = event.target.closest('.node');
    const desiredNode = closestHtmlNode.__node__;
    const nodePath = desiredNode.getPathFromRoot();

    applyDirectoryChanges(nodePath, desiredNode);
  }

  const onRightPanelClick = (event) => {
    const closestHtmlNode = event.target.closest('.node');
    const currentPath = store.get('currentPath');
    const currentNode = store.get('currentNode');

    if (closestHtmlNode.__node__ === null) {
      const newPath = [...currentPath];
      newPath.pop();

      const newNode = currentNode.parent;

      applyDirectoryChanges(newPath, newNode);
    } else {
      const pathCandidate = [
        ...currentPath,
        closestHtmlNode.textContent
      ];
  
      const desiredNode = closestHtmlNode.__node__;
  
      if (!desiredNode.isFolder) {
        return;
      }

      applyDirectoryChanges(pathCandidate, desiredNode);
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