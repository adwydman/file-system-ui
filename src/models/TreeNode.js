const ALLOWED_TYPES = {
  FILE: 'file',
  FOLDER: 'folder'
}

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default class TreeNode {
  constructor(options) {
    this.beforeCreate(options);

    const { type, name, modified, size, parent } = options;

    this.type = type;
    this.name = name;
    this.modified = new Date(modified);
    this.size = formatBytes(size);
    this.parent = parent;

    if (this.isFile) {
      this.children = null;
    } else if (this.isFolder) {
      this.children = [];
    }
  }

  beforeCreate(options) {
    if (![ALLOWED_TYPES.FILE, ALLOWED_TYPES.FOLDER].includes(options.type)) {
      throw new Error(`Incorrect type: ${options.type}`)
    }
  }

  set modified(date) {
    this._modified = new Date(date)
  }

  get modified() {
    if (!this._modified) {
      return null;
    }
    const month = this._modified.getMonth() + 1;
    const day = this._modified.getDate();
    const year = this._modified.getFullYear();

    return `${month}/${day}/${year}`;
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

    child.parent = this;
    this.children.push(child);
  }
}
