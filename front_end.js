const anagram = words => {
    const hash = {};
    let anagrams = [];
  
    words.forEach(word => {
      const sorted = word.split('').sort().join('');
      if (!hash[sorted]) {
        hash[sorted] = [];
      }
      hash[sorted].push(word);
    });
  
    Object.keys(hash).forEach(key => {
      /* istanbul ignore next */
      if (hash[key].length > 1) {
        anagrams = anagrams.concat(hash[key]);
      }
    });
  
    return anagrams;

    /*
    return list.filter(word => {
        if (word === word.split('').reverse().join(''))
            return true;
        return false;
    });
*/
};

const array_dedup = words => {
  // using hashtable
  let set = {};

  words = words.filter(word => {
      if (!set[word]){
        set[word] = true;
        return true;
      }
      return false
    }
  )

  return words;

  /* using ES6 set
  const list = new Set(words);
  return [...list];
  */
}

const flatten_array = array => {
  /* recursion
  return array.reduce((previous, current) => {
    return previous.concat(Array.isArray(current) ? flatten_array(current) : current)
  }, []);
  */
  
  for (let i = 0; i < array.length; i++){
    if (Array.isArray(array[i])){   
      array = [
        ...array.slice(0,i),
        ...array[i],
        ...array.slice(i+1)
      ]
      i -= 1;
    }
  }

  return array;
}

const async_all_promise = (...args) => {
  // using promises
  
  const promises = Promise.all(args.map(func => {
    return new Promise(resolve => {
      func(resolve);
    })
  }))



  return promises;
}

const async_all_es6 = async (...args) => {

  let list = await Promise.all(args.map(func => {
    return new Promise(resolve => {
      func(resolve);
    })
  }))
  return list;
}

const debounce = (func, wait) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    function later() {
      timeout = null;
      func.apply(context, args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const contains = (parent, child) => {
  if (parent === child.parentNode)
    return true;

  if (child.parentNode)
    return contains(parent, child.parentNode);

  return false;
  //return parent.contains(child);
}

// array = [4, -7, 5, 6]; // rt 11

const maxSubArray = array => {
  let max = Number.NEGATIVE_INFINITY;

  array.reduce((sum, current) => {
    sum = sum + current;
    max = sum > max ? sum : max;
    sum = sum < 0 ? 0 : sum;
    return sum;
  }, 0)
  
  return max;
};

const findPermutations = (inputArr) => {
  let solution = [];
  
  const permute = (arr, m = []) => {
    if (arr.length === 0){
      solution.push(m);
    }else{
      arr.map((number, idx) => {
        let newArray = [
          ...arr.slice(0,idx),
          ...arr.slice(idx+1)
        ];
        permute(newArray, m.concat(number));
      });
    }
  }
  
  permute(inputArr);
  return solution;
};


const reconstructItinerary = itinerary => {
  
  let itineraryMap = new Map();
  let reverseItinerary = new Map();
  let output = [];
  let startingCity = '';

  itinerary.forEach(pair => {
    itineraryMap.set(pair[0], pair[1]);
    reverseItinerary.set(pair[1], pair[0]);
  })

  // find starting city
  for (let i = 0; i < itinerary.length; i++){
    if (!reverseItinerary.has(itinerary[i][0])){
      startingCity = itinerary[i][0];
      break;
    }
  }

  if (!startingCity)
    throw new Error('no starting city found')

  output.push(startingCity);
  for (let i = 0; i < itineraryMap.size; i++){  
    startingCity = itineraryMap.get(startingCity)
    output.push(startingCity)
  }

  return output;

  /*
  o(n^2)
  let output = [];
  output.push(...itinerary[0]);
  for (let i = 1; i < itinerary.length; i++){
    let nextSource = output[output.length-1];
    for (let j = 1; j < itinerary.length; j++){
      if (itinerary[j][0] === nextSource){
        output.push(itinerary[j][1])
        break;
      }
    }
  }
  
  return output;
  */
}

const reconstructItinerary_tps = tickets => {
  // place tickets into graphs
  let graph = new Map();
  tickets.forEach(pair => {
    if (!graph.has(pair[0])){
      graph.set(pair[0], [])
    }
    graph.get(pair[0]).push(pair[1])
  })

  // perform topological sort on the graph
  const visit = (vertex) => {
    while (graph.get(vertex)){
      visit(graph.get(vertex).pop());
    }     
    stack.push(vertex);
  }
  
  let stack = [];
  
  //graph.forEach(nodes, vertex, )
  visit('JFK');
  return stack;
  
}


const fibonacci = idx => {
  // 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …  
  
  const cache = new Map();

  const calc = (idx) => {
    if (cache.has(idx))
      return cache.get(idx);
    
    if (idx < 2)
      return 1;
    
    cache.set(idx, fibonacci(idx-2) + fibonacci(idx-1));
    
    return cache.get(idx);

    return fibonacci(idx-2) + fibonacci(idx-1);
  }
  
  return calc(idx);

  /*
  let arr = [1, 1];

  for (let i = 2; i < idx + 1; i++){
    arr.push(arr[i-1] + arr[i-2])
  }

  return arr[idx];
  */
}

module.exports = {
  anagram,
  array_dedup,
  flatten_array,
  async_all_promise,
  async_all_es6,
  contains,
  maxSubArray,
  findPermutations,
  reconstructItinerary,
  reconstructItinerary_tps,
  fibonacci,
};