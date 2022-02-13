const ALLOWED_TYPES = {
  FILE: 'file',
  FOLDER: 'folder'
}

export default class TreeNode {
  constructor({ type, name, dateModified, size, parent }) {
    if (![ALLOWED_TYPES.FILE, ALLOWED_TYPES.FOLDER].includes(type)) {
      throw new Error(`Incorrect type: ${type}`)
    }

    this.type = type;
    this.name = name;
    this.dateModified = dateModified;
    this.size = size;
    this.parent = parent;

    if (this.isFile) {
      this.children = null;
    } else if (this.isFolder) {
      this.children = [];
    }
  }

  get isRoot() {
    return this.parent === null;
  }

  get isFile() {
    return this.type === ALLOWED_TYPES.FILE;
  }

  get isFolder() {
    return this.type === ALLOWED_TYPES.FOLDER;
  }

  get hasFolders() {
    if (!this.isFolder) {
      throw Error('The node is not a folder')
    }

    return this.children.some((child) => child.isFolder)
  }

  getPathFromRoot() {
    const path = [];

    let currentNode = this;
    do {
      path.unshift(currentNode.name);
      currentNode = currentNode.parent;
    } while (currentNode !== null)

    return path;
  }

  addChild(child) {
    if (child instanceof TreeNode === false) {
      throw Error('Child has to be a TreeNode instance');
    } else if (this.isFile) {
      throw Error('Cannot add child to a file');
    }

    this.children.push(child);
  }

  findChildByName(childName) {
    if (!this.isFolder) {
      throw Error('The node is not a folder')
    }

    let child = null;
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].name === childName) {
        child = this.children[i];
        break;
      }
    }

    return child;
  }
}
