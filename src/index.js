import MVue from './lib/mvue';

const vm = new MVue({
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


