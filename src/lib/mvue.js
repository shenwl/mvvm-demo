import { compileNode } from './compile';

export default class MVue {
  constructor(options) {
    const { el, data, methods } = options;

    this.timer = 0;

    this.$el = _getElement(el);
    this.$temp = this.$el.cloneNode(true);

    this.$data = new Proxy(_getData(data), {
      set: (target, name, val) => {
        target[name] = val;

        this.update();
        return true;
      },
      get: (target, name) => {
        if(!(name in target)) throw new Error(`${name} is not found`);

        return target[name];
      },
    });

    this.$methods = methods;

    this.render();
    return this.$data;
  }

  update() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.render();
    }, 0);
  }

  render() {
    const root = this.$temp.cloneNode(true);

    compileNode(root, this.$data, this.$methods)

    this.$el.parentNode.replaceChild(root, this.$el);
    this.$el = root;
  }
}

function _getElement(el) {
  if (el instanceof HTMLBaseElement) {
    return el;
  }
  let dom = document.querySelector(el);
  return dom;
}

function _getData(data) {
  if (typeof data === "function") {
    return data() || {};
  }
  return data || {};
}
