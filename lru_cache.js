class Node {
  constructor(key, value){
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor(capacity){
    this.capacity = capacity;
    this.cache = new Map();

    this.head = new Node('head', 0)
    this.tail = new Node('tail', 0)

    this.head.next = this.tail
    this.tail.prev = this.head
  }

  removeLast() {
    let node = this.tail.prev
    this.tail.prev = node.prev
    node.prev.next = this.tail
    return node;
  }

  removeNode (node) {
    console.log(node);
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  addHead (node) {
    node.next = this.head.next;
    this.head.next = node;
    node.next.prev = node
    node.prev = this.head;
  }

  get (key) {
    if (this.cache.has(key)){
      let node = this.cache.get(key);
      this.removeNode(node);
      this.addHead(node);
      return node.value;
    }
    return -1;
  }

  put (key, value) {
    let node;
    if (this.cache.has(key)){
      node = this.cache.get(key);
      this.removeNode(node);
      node.value = value;
    }
    else {
      node = new Node(key, value);
    }
    this.addHead(node);
    this.cache.set(key, node);

    if (this.cache.size > this.capacity) {
        let lastNode = this.removeLast();
        this.cache.delete(lastNode.key);
    }
    // console.log(this.cache);

  }
}

class LRUCacheDict {
  constructor(capacity){
    this.capacity = capacity;
    this.cache = new Map();
  }

  get (key) {
    if (this.cache.has(key)){
      let value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }

  put (key, value) {
    if (this.cache.has(key)){
      this.cache.delete(key);
    }
    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
        //console.log(this.cache.keys().next().value);
        this.cache.delete(this.cache.keys().next().value)
    }
    console.log(this.cache);
  }
}

cache = new LRUCache(2)

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // returns 1
cache.put(3, 3);    // evicts key 2
console.log(cache.get(2));       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
console.log(cache.get(1));       // returns -1 (not found)
console.log(cache.get(3));       // returns 3
console.log(cache.get(4));       // returns 4
