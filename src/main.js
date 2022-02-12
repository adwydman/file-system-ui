import Tree from './models/Tree';
import { renderTree, renderList } from './renderers/DirectoryRenderer';
import { leftPanelEventHandler } from './eventHandlers/TreeEventHandler';

window.addEventListener('load', () => {
  const tree = new Tree();

  const leftPanel = document.querySelector('.left-panel');
  const rightPanel = document.querySelector('.right-panel .body');

  tree.fetchTreeData()
    .then(() => tree.constructTreeNodes())
    .then(() => {
      renderTree(tree.root, leftPanel);
      renderList(tree.root, rightPanel);
    })
    .then(() => {
      leftPanel.addEventListener('click', leftPanelEventHandler((result) => {
        const nodePath = result;

        const desiredNode = tree.findNode(nodePath.slice(1));

        while (rightPanel.firstChild) {
          rightPanel.removeChild(rightPanel.lastChild);
        }

        renderList(desiredNode, rightPanel)
      }));
    })
});