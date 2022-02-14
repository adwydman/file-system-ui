
/**
 * @jest-environment jsdom
 */

 import { 
  TAGS,
  createHtmlElement
} from '../../src/renderers/utils';
 import { 
  renderList
} from '../../src/renderers/renderList';
import TreeNode from '../../src/models/TreeNode';

describe('renderers/renderList', () => {
  test('creates a list', () => {
    const treeNode1 = new TreeNode({
      type: 'folder', 
      name: 'Test', 
      modified: '2022-02-13T06:00:13.000Z', 
      size: 42562
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
    treeNode1.addChild(treeNode3)

    const htmlNode = createHtmlElement({
      tagName: TAGS.DIV,
    });

    renderList(treeNode1, htmlNode);

    expect(htmlNode.children.length).toEqual(3)
    expect(htmlNode.children[0].textContent).toEqual('..')
    expect(htmlNode.children[1].textContent).toEqual('Another Test2/13/2022')
    expect(htmlNode.children[2].textContent).toEqual('test.txt2/13/202241.56 KB')

    const secondEntry = htmlNode.children[1]

    expect(secondEntry.children[0].classList.toString()).toEqual('cell cell-3 document-wrapper')
    expect(secondEntry.children[1].classList.toString()).toEqual('cell cell-1')
    expect(secondEntry.children[2].classList.toString()).toEqual('cell cell-1 cell-numeric')
  })
})
