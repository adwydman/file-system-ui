import Tree from './models/Tree';
import { createStore } from './stores/Store';
import { renderTree, renderList, getNodePathToRoot } from './renderers/DirectoryRenderer';

const init = () => {
  const store = createStore([
    {
      key: 'currentPath',
      value: []
    },
    {
      key: 'currentNode',
      value: null
    }
  ]);

  const tree = new Tree();
  const leftPanel = document.querySelector('.left-panel');
  const rightPanel = document.querySelector('.right-panel .body');

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
    const nodePath = getNodePathToRoot(event.target);
    const desiredNode = tree.findNode(nodePath.slice(1));

    store.add('currentPath', nodePath)
    store.add('currentNode', desiredNode);

    renderList(desiredNode, rightPanel)
  }

  const onRightPanelClick = (event) => {
    const targetName = event.target.textContent;
    const currentPath = store.get('currentPath');
    const currentNode = store.get('currentNode');

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
  };

  tree.fetchTreeData()
    .then(() => tree.constructTreeNodes())
    .then(() => {
      store.add('currentPath', [tree.root.name])
      store.add('currentNode', tree.root)

      renderTree(tree.root, leftPanel);
      renderList(tree.root, rightPanel);
    })
    .then(() => {
      leftPanel.addEventListener('click', onLeftPanelClick);
      rightPanel.addEventListener('click', onRightPanelClick);
    });
});