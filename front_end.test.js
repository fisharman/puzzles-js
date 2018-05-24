// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;
const frontEnd = require('./front_end.js');

test.skip('test anagram', () => {
    const anagram = ['monk', 'konm', 'nkom', 'bbc', 'cbb', 'dell', 'ledl', 'llde', 'abc'];
    expect(frontEnd.anagram(anagram)).toEqual(["monk", "konm", "nkom", "bbc", "cbb", "dell", "ledl", "llde"]);
});

test.skip('test array_dedup', () => {
    const array_dedup = ['aaa', 'aaa', 'abc'];
    expect(frontEnd.array_dedup(array_dedup)).toEqual(['aaa', 'abc']);
});

describe.skip('test flatten_array', () => {
    const flatten_array = [1, [[2, 3], 4], 5];
    const flatten_array1 = [[[1, 2], 3], 4, 5];

    test('array', () => {
        expect(frontEnd.flatten_array(flatten_array)).toEqual([1, 2, 3, 4, 5]);
    });

    test('array1', () => {
        expect(frontEnd.flatten_array(flatten_array1)).toEqual([1, 2, 3, 4, 5]);
    });
});

describe.skip('test async_all', () => {
    test('test promise method', () => {
        // make them in curried func
        const fn1 = callback => {
            setTimeout(callback, 0, 1);
        };
        
        const fn2 = callback => {
            setTimeout(callback, 0, 2);
        };
        
        const fn3 = callback => {
            setTimeout(callback, 0, 3);
        };
    
        return expect(frontEnd.async_all_promise(fn1, fn2, fn3)).resolves.toEqual([1, 2, 3]);
    });

    test('test async method', () => {
        // make them in curried func
        const fn1 = callback => {
            setTimeout(callback, 0, 1);
        };
        
        const fn2 = callback => {
            setTimeout(callback, 0, 2);
        };
        
        const fn3 = callback => {
            setTimeout(callback, 0, 3);
        };
    
        return expect(frontEnd.async_all_es6(fn1, fn2, fn3)).resolves.toEqual([1, 2, 3]);
    });
});

test.skip('test html-node-contains', () => {
    const markup = `
    <html>
      <head></head>
      <body>
        <div>
          <div>
            <div>
              <div id="child">
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
    const { document } = new JSDOM(markup).window;  
    const child = document.querySelector('#child');
    expect(frontEnd.contains(document, child)).toBeTruthy();      
});

describe.skip('test maxSubArray', () => {
    test('test [4,-7,5,6]', () => {
        let array = [4,-7,5,6];
        expect(frontEnd.maxSubArray(array)).toEqual(11);
    });

    test('test [-1,-2,-3,-4]', () => {
        let array = [-1,-2,-3,-4];
        expect(frontEnd.maxSubArray(array)).toEqual(-1);
    });

    test('test [4,-7,5,6,-4]', () => {
        let array = [4,-7,5,6,-4];
        expect(frontEnd.maxSubArray(array)).toEqual(11);
    });

    test('test [-2,1,-3,4,-1,2,1,-5,4]', () => {
        let array = [-2,1,-3,4,-1,2,1,-5,4];
        expect(frontEnd.maxSubArray(array)).toEqual(6);
    });

});

test('test array permutation', () => {
    let array = [1,2,3];
    let output = [
        [1,2,3],
        [1,3,2],
        [2,1,3],
        [2,3,1],
        [3,1,2],
        [3,2,1]
    ];
    expect(frontEnd.findPermutations(array)).toEqual(output);
});


    