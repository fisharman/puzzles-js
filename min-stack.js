/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  let min = this.stack.length > 0 ? Math.min(x, this.stack[this.stack.length - 1].min) : x;
  this.stack.push({
    val: x,
    min: min
  });
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  return this.stack.pop().val;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  if (this.stack.length === 0){
    return null;
  }
  return this.stack[this.stack.length-1].val;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  if (this.stack.length === 0){
    return null;
  }
  return this.stack[this.stack.length-1].min;
};

 var obj = new MinStack();
 obj.push(-2);
 obj.push(0);
 obj.push(-3);
 console.log("1 " + obj.getMin());
 console.log("2 " + obj.pop());
 console.log("3 " + obj.top());
 console.log("4 " + obj.getMin());
