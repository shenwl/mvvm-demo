import MiniVue from './lib/miniVue';

const vm = new MiniVue({
  el: "#root",
  data() {
    return {
      name: "Allen",
      a: 1,
      b: 2,
    };
  },
  methods: {
    add() {
      console.log('add', this.a)
      this.a += 6;
    }
  }
});


