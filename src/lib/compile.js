export function compileNode(root, data, methods) {
  if (!root) return;

  // 把data中的数据转化为变量声明
  const envData = [];
  for (const key in data) {
    envData.push(`let ${key}=${JSON.stringify(data[key])};`);
  }

  for (const key in methods) {
    envData.push(`let ${key}=methods[${JSON.stringify(key)}];`);
  }

  // 找到所有的模板 "{{}}"
  Array.from(root.childNodes).forEach(node => {
    if (node.nodeType === document.TEXT_NODE) {
      node.data = node.data.replace(/\{\{[^\}]+\}\}/g, str => {
        const statement = str.substring(2, str.length - 2).trim();
        return eval([...envData, statement].join(""));
      });
    } else {
      compileNode(node, data, methods);
    }
  });

  // 找到所有的事件，属性
  Array.from(root.childNodes).forEach(node => {
    Array.from(node.attributes || []).forEach(attr => {
      if (attr.name.startsWith("@")) {
        const eventName = attr.name.substring(1);

        node.addEventListener(eventName, e => {
          eval([...envData, attr.value + ".call(data)"].join(""));
        });
      }
      if (attr.name.startsWith(":")) {
        const valueName = attr.name.substring(1);

        node.setAttribute(valueName, eval([...envData, attr.value].join("")))
      }
    });
  });
}
