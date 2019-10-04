import VNode from './vNode';

export default class VText extends VNode {
  constructor(dom) {
    super(dom)
    this._text = dom.data.trim();
  }

  isEmpty() {
    return !Boolean(this._text);
  }
}
