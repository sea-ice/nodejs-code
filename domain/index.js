const domain = require('domain')
const EventEmitter = require('events').EventEmitter

// Example 1，创建出来的domain对象会捕获next函数中抛出的异步异常
// process.domain的值在domain对象执行的next函数中不为空，而在函数外部值为空
// function next() {
//   console.log(process.domain)
//   setTimeout(() => {
//     throw new Error("error in timer");
//   }, 100)
// }
// const d = domain.create();
// d.on("error", e => {
//   console.log("domain catch error!");
//   console.log(e);
// });
// d.run(next)
// console.log(process.domain) // undefined

// Example 2
// 下面的例子中创建出来的domain对象无法捕获执行的next函数抛出的错误
// const d = domain.create();
// d.on("error", e => {
//   console.log("domain catch error!");
//   console.log(e);
// });
// const e = new EventEmitter();
// const timer = setTimeout(() => {
//   e.emit("data");
// }, 100)
// function next() {
//   e.once('data', () => {
//     throw new Error("err!");
//   })
// }
// d.run(next);

// Example 3：可以捕获，执行的next函数内部引用了外部的变量，因此需要先调用add方法将外部变量关联到创建的domain对象上，否则domain对象依然捕获不到函数内部抛出的异常
var e = new EventEmitter();
setTimeout(() => {
  e.emit("data");
}, 100);
function next() {
  e.once("data", () => {
    throw new Error("err!");
  });
}
const d = domain.create();
d.on("error", e => {
  console.log("domain catch error!");
  console.log(e);
});
d.add(e)
d.run(next);






