export function addToArrArrays(arr,index,payload) {
    if(arr[index]) {
        arr[index] = [...arr[index],payload]
    } else {
        arr[index] = [payload]
    }
}