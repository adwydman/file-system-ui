import TreeNode from './TreeNode';
import { fetchTree } from '../services/TreeService';

function createTreeNodes(nodeInfo, parent) {
  if (!nodeInfo.children) {
    return;
  }

  for(let i = 0; i < nodeInfo.children.length; i++) {
    const childInfo = nodeInfo.children[i];

    const childNode = new TreeNode(
      childInfo.type,
      childInfo.name,
      childInfo.modified,
      childInfo.size
    );

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

    const root = new TreeNode(
      this.treeRaw.type,
      this.treeRaw.name,
      this.treeRaw.dateModified,
      this.treeRaw.size
    );

    this.root = root;
    createTreeNodes(this.treeRaw, root)

    return this.root;
  }

  findNode(path, node = this.root) {
    if (path.length === 0) {
      return node;
    }
  
    const currentValue = path[0]
    const newPath = [
      ...path.slice(1)
    ];
  
    let desiredNode = null;
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
  
      if (child.name === currentValue) {
        desiredNode = child;
        break;
      }
    }
  
    if (!desiredNode) {
      throw Error('not found')
    }
  
    if (desiredNode && newPath.length === 0) {
      return desiredNode;
    }
  
    return this.findNode(newPath, desiredNode)
  }
}
