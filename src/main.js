import Tree from './models/Tree';
import { createStore } from './stores/Store';
import { renderTree, renderList } from './renderers/DirectoryRenderer';
import { leftPanelEventHandler, rightPanelEventHandler } from './eventHandlers/TreeEventHandler';

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

  tree.fetchTreeData()
    .then(() => tree.constructTreeNodes())
    .then(() => {
      store.add('currentPath', [tree.root.name])
      store.add('currentNode', tree.root)

      renderTree(tree.root, leftPanel);
      renderList(tree.root, rightPanel);
    })
    .then(() => {
      leftPanel.addEventListener('click', leftPanelEventHandler((result) => {
        // add current node to the store
        const nodePath = result;
        const desiredNode = tree.findNode(nodePath.slice(1));

        store.add('currentPath', nodePath)
        store.add('currentNode', desiredNode);

        renderList(desiredNode, rightPanel)
      }));

      rightPanel.addEventListener('click', rightPanelEventHandler((result) => {
        const targetName = result;
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
      }))
    })
});