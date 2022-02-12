import Tree from './models/Tree';
import { renderTree, renderList } from './renderers/DirectoryRenderer';

window.addEventListener('load', () => {
  const tree = new Tree();

  const leftPanel = document.querySelector('.left-panel');
  const rightPanel = document.querySelector('.right-panel .body');

  tree.fetchTreeData()
    .then(() => tree.constructTreeNodes())
    .then(() => {
      console.log('tree', tree.treeRaw)
      renderTree(tree.root, leftPanel);
      renderList(tree.root, rightPanel);
    })
});