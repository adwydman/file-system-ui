/**
 * @jest-environment jsdom
 */

import { 
  TAGS,
  createHtmlElement
} from '../../src/renderers/utils';
import TreeNode from '../../src/models/TreeNode';


describe('renderers/utils', () => {
  test('#TAGS', () => {
    const keys = Object.keys(TAGS);
    const values = Object.values(TAGS);
    expect(keys).toEqual(['DIV', 'I']);
    expect(values).toEqual(['div', 'i']);
  })

  test('#createHtmlElement', () => {
    const treeNode = new TreeNode({
      type: 'file', 
      name: 'Test', 
      modified: '2022-02-13T06:00:13.000Z', 
      size: 42562
    })

    const htmlNode = createHtmlElement({
      tagName: TAGS.DIV,
      cssClasses: ['node'],
      text: 'Test',
      node: treeNode
    });

    expect(htmlNode.tagName).toEqual('DIV')
    expect(htmlNode.classList[0]).toEqual('node')
    expect(htmlNode.textContent).toEqual('Test')
    expect(htmlNode.__getTreeNode__()).toEqual(treeNode)
  })
})
