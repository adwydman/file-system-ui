import TreeNode from './TreeNode';
import { fetchTree } from '../services/TreeService';

function createTreeNodes(nodeInfo, parent) {
  if (!nodeInfo.children) {
    return;
  }

  for(let i = 0; i < nodeInfo.children.length; i++) {
    const childInfo = nodeInfo.children[i];

    const childNode = new TreeNode({
      type: childInfo.type,
      name: childInfo.name,
      modified: childInfo.modified,
      size: childInfo.size
    });

    parent.addChild(childNode);

    createTreeNodes(childInfo, childNode)
  }
}

export default class Tree {
  constructor() {
    this.treeRaw = null;
  }

  fetchTreeData() {
    return fetchTree()
      .then((tree) => {
        this.treeRaw = tree;

        return tree;
      })
  }

  constructTreeNodes() {
    if (!this.treeRaw) {
      return;
    }

    const root = new TreeNode({
      type: this.treeRaw.type,
      name: this.treeRaw.name,
      modified: this.treeRaw.modified,
      size: this.treeRaw.size,
      parent: null
    });

    this.root = root;
    createTreeNodes(this.treeRaw, root)

    return this.root;
  }
}
