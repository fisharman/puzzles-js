/*
  assumption: ascending input, ascending output, each list will contain
  at least 1 element
*/

function merge (list1, list2) {
  let answer = [];
  while (list1.length > 0 && list2.length > 0){
    let next_element = list1[0] < list2[0] ? list1.shift() : list2.shift();
    answer.push(next_element)
  }
  return list1.length > 0 ? answer.concat(list1) : answer.concat(list2);
}

var list1 = [1,3,5];
var list2 = [2,4,6,7];
console.log(merge(list1,list2));

list1 = [1, 2, 3];
list2 = [4, 5, 6];
console.log(merge(list1,list2));

list1 = [1];
list2 = [4, 5, 6];
console.log(merge(list1,list2));
