# file-system-ui

## Before you start

After cloning the repo run:

```
$ npm install
$ npm start
```

Then click `index.html` to open the project

## Tests

In order to run tests run:

```
$ npm test
```

## Implementation

### `main.js`

The main file that runs the set up and displays the initial state of the file system. It does the following:

1. Fetches the tree data in JSON
2. Constructs tree nodes
3. Attaches event listeners to the tree and list panels

#### Tree event listener

Detects a click on one of the folders and opens its content. Rebuilds the path from scratch every time.

#### List event listener

Detects whether a "go up" element was clicked or a regular one. If the target is a folder, it opens its content. Since the list operates on a single branch of the tree, the new path is constructed by either adding the clicked node name to the current value of the path, or by removing the last element in the "go up" case.

### `modules/Tree.js`

Handles fetching the JSON tree and constructs the TreeNode instances.

### `modules/TreeNode.js`

Built from JSON entries, provides a way to interact with the data. Implements the following getters and methods:

- `isRoot` - returns `true` if the TreeNode is the root of the tree
- `isFile` - returns `true` if the TreeNode instance is a file
- `isFolder` - returns `true` if the TreeNode instance is a folder
- `hasFolders` - available only for folders; returns `true` when a given TreeNode has children who are folders
- `getPathFromRoot()` - returns the path from root to the given TreeNode, ex: `['root', 'folder1', 'file.txt']`
- `addChild()` - adds a child to a folder TreeNode 

### `renderers`

Contains tree and list renderers. Designed so that all DOM manipulations are handled inside this directory. The new HTML elements are attached to the DOM at once through the usage of `createDocumentFragment` to increase the performance.

#### `renderers/renderList.js`

Renders a list of files and folders.

#### `renderers/renderTree.js`

Renders a tree of folders.

#### `renderers/utils.js`

Holds common pieces used by both `renderTree` and `renderList`.

- `createHtmlElement()`
- `TAGS` - an object that stores available tags
- `clearChildrenElements()` - removes all child elements from an HTML element
- `setupRenderCurrentPath()` - function that returns another function that handles displaying the current path

##### `createHtmlElement()`
Creates a new HTML element that can be attached to the DOM. Accepts the following options in its argument:

  - `tagName` - the name of the tag, for example `'div'` (recommended usage through `TAGS` object)
  - `cssClasses` - a list of CSS classes. If it's a main element that holds `node`, it needs to have a `'node'` CSS class.
  - `text` - displayable text
  - `children` - HTML elements that will become children
  - `node` - an instance of `TreeNode`. Can be provided only when the CSS classes include `'node'`.

Each HTML element implements `__getTreeNode__` method that returns the `node` of the nearest element with class `'node'`.

### `stores/Store.js`

A simple store manager. The `createStore` accepts an array of the following format:

```
[
    {
        key: 'currentPath',
        value: ['Files', 'Documents'],
        onChange: (oldValue, newValue) {
            // optional method called when the value is updated
        }
    }
]
```

The `createStore` method returns an object with two methods:

- `add` - allows modifing an already existing value
- `get` - gets an already stored value

### `servies/TreeService.js`

A simple service that returns a Promise of the JSON tree. Meant to represent an actual service.
