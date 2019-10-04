import {assert} from '../utils';

export default class VNode {
  constructor(dom) {
    assert(dom && (dom instanceof Node));

    this._dom = dom;
  }
}
