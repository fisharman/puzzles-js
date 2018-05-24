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

module.exports = {
  anagram,
  array_dedup,
  flatten_array,
  async_all_promise,
  async_all_es6,
  contains,
  maxSubArray,
  findPermutations
};