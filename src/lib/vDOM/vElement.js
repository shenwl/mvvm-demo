import VNode from './vNode';
import VText from './vText';

export default class VElement extends VNode {
  constructor(dom) {
    super(dom);
    this._tag = dom.tagName.toLowerCase();

    this._attrs = this._getAttributes(dom);
    this._children = this._getChildren(dom);
  }

  _getAttributes(dom) {
    const attrs = {};
    Array.from(dom.attributes || []).forEach(attr => {
      attrs[attr.name] = attr.value;
    });
    return attrs;
  }

  _getChildren(dom) {
    const children = [];
    Array.from(dom.childNodes || []).forEach(node => {
      const nodeType = node.nodeType;
      if(nodeType === document.TEXT_NODE) {
        const child = new VText(node)

        if(child.isEmpty()) return;
        return children.push(child);
      }
      if(nodeType === document.ELEMENT_NODE) {
        return children.push(new VElement(node));
      }
      console.warn(`[非法节点类型，节点已丢失] 节点类型为${node.nodeType}， 节点为`, node)
    });
    return children;
  }
}

function isEmptyTextNode(dom) {

}
