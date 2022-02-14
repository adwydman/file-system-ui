
/**
 * @jest-environment jsdom
 */

import { 
  TAGS,
  createHtmlElement
} from '../../src/renderers/utils';
 import { 
  renderTree
} from '../../src/renderers/renderTree';
import TreeNode from '../../src/models/TreeNode';

describe('renderers/renderList', () => {
  test('creates a list', () => {
    const treeNode1 = new TreeNode({
      type: 'folder', 
      name: 'Test', 
      modified: '2022-02-13T06:00:13.000Z', 
      size: 42562,
      parent: null
    })

    const treeNode2 = new TreeNode({
      type: 'folder', 
      name: 'Another Test', 
      modified: '2022-02-13T06:00:13.000Z', 
      size: 42562
    });

    const treeNode3 = new TreeNode({
      type: 'file', 
      name: 'test.txt', 
      modified: '2022-02-13T06:00:13.000Z', 
      size: 42562
    })

    treeNode1.addChild(treeNode2)
    treeNode2.addChild(treeNode3)

    const htmlNode = createHtmlElement({
      tagName: TAGS.DIV,
    });

    renderTree(treeNode1, htmlNode);

    expect(htmlNode.children.length).toEqual(1)
    expect(htmlNode.children[0].classList.toString()).toEqual('node')

    const mainNode = htmlNode.children[0];

    expect(mainNode.children[0].textContent).toEqual(treeNode1.name)
    expect(mainNode.children[1].classList.toString()).toEqual('children')

    const firstChild = mainNode.children[1].children[0];
    expect(firstChild.classList.toString()).toEqual('node');
    expect(firstChild.children[0].textContent).toEqual(treeNode2.name)
    expect(firstChild.children[1].classList.toString()).toEqual('children')

    expect(firstChild.children[1].children.length).toEqual(0)
  })
})
