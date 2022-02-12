import Tree from './models/Tree';
import { renderTree, renderList } from './renderers/DirectoryRenderer';
import { leftPanelEventHandler, rightPanelEventHandler } from './eventHandlers/TreeEventHandler';

window.addEventListener('load', () => {
  const tree = new Tree();

  const leftPanel = document.querySelector('.left-panel');
  const rightPanel = document.querySelector('.right-panel .body');

  let path = [];

  tree.fetchTreeData()
    .then(() => tree.constructTreeNodes())
    .then(() => {
      path = [tree.root.name];
      renderTree(tree.root, leftPanel);
      renderList(tree.root, rightPanel);
    })
    .then(() => {
      leftPanel.addEventListener('click', leftPanelEventHandler((result) => {
        // add current node to the store
        const nodePath = result;
        path = nodePath;

        const desiredNode = tree.findNode(nodePath.slice(1));

        renderList(desiredNode, rightPanel)
      }));

      rightPanel.addEventListener('click', rightPanelEventHandler((result) => {
        const targetName = result;

        const pathCandidate = [
          ...path,
          targetName
        ];

        const desiredNode = tree.findNode(pathCandidate.slice(1));

        if (desiredNode.isFolder) {
          path = pathCandidate;
  
          renderList(desiredNode, rightPanel)
        }
      }))
    })
});