const growth1 = coords => {
    let arr = [];

    coords.forEach(coord => {
        for (let i = 0; i < coord[0]; i++){
            if (arr[i] == null)
                arr.push([]);
            for (let j = 0; j < coord[1]; j++){
                if(arr[i][j] == null)
                    arr[i].push(1);
                else
                    arr[i][j] += 1;
            }
        }
    })
    
    let max = arr[0][0];
    let maxCount = 0;
    let [row, col] = [0, 0];

    while (arr[row][col] === max){
        while(arr[row][col] === max){        
            maxCount++;
            col++;
        }
        col = 0;
        row++;
    }

    return maxCount;
}

const growth = coords => {
    let arr = [];
    let maxCount = 0;

    coords.forEach((coord,idx) => {
        maxCount = 0;
        for (let i = 0; i < coord[0]; i++){
            if (arr[i] == null)
                arr.push([]);
            for (let j = 0; j < coord[1]; j++){
                if(arr[i][j] == null)
                    arr[i].push(1);
                else{
                    arr[i][j] += 1;
                    if (arr[i][j] === idx+1){
                        maxCount++;
                    }
                }                  
            }
        }
    })
    return maxCount;
}

let steps = [[2, 3], [3, 7], [4, 1]];

console.log(growth(steps));