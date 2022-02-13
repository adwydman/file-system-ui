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
      dateModified: childInfo.dateModified,
      size: childInfo.size,
      parent: parent
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
      dateModified: this.treeRaw.dateModified,
      size: this.treeRaw.size,
      parent: null
    });

    this.root = root;
    createTreeNodes(this.treeRaw, root)

    return this.root;
  }

  findNode(path, node = this.root) {
    if (path.length === 0) {
      return node;
    }
  
    const currentValue = path[0];
    const newPath = [ ...path.slice(1) ];

    const desiredNode = node.findChildByName(currentValue);
  
    if (!desiredNode) {
      throw Error('not found')
    }
  
    if (desiredNode && newPath.length === 0) {
      return desiredNode;
    }
  
    return this.findNode(newPath, desiredNode)
  }
}
