const ALLOWED_TYPES = {
  FILE: 'file',
  FOLDER: 'folder'
}

export default class TreeNode {
  constructor(type, name, modified, size) {
    if (![ALLOWED_TYPES.FILE, ALLOWED_TYPES.FOLDER].includes(type)) {
      throw new Error(`Incorrect type: ${type}`)
    }

    this.type = type;
    this.name = name;
    this.modified = modified;
    this.size = size;

    if (this.isFile) {
      this.children = null;
    } else if (this.isFolder) {
      this.children = [];
    }
  }

  get isFile() {
    return this.type === ALLOWED_TYPES.FILE;
  }

  get isFolder() {
    return this.type === ALLOWED_TYPES.FOLDER;
  }

  get hasChildFolders() {
    if (!this.isFolder) {
      // raise error
    }

    return this.children.some((child) => child.isFolder)
  }

  addChild(child) {
    if (child instanceof TreeNode === false) {
      throw Error('Child has to be a TreeNode instance');
    } else if (this.isFile) {
      throw Error('Cannot add child to a file');
    }

    this.children.push(child);
  }
}
