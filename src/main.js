import Tree from './models/Tree';

window.addEventListener('load', () => {
  const tree = new Tree();

  tree.fetchTreeData()
    .then(() => tree.constructTreeNodes())
    .then(() => {
      console.log('tree', tree.treeRaw)
    })
});