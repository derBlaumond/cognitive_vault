// Callback: 이 일이 끝나면 함수를 불러줘 ... 작업이 끝난 후에 실행할 함수 미리 전달하는 방식
// function buyWater(callback) {
//     console.log("Go Supermarket");
//     setTimeout(() => {
//         console.log("Buy Water");
//         callback();
//     }, 2000);
// }
//
// buyWater(() => console.log("Thank you!"));

// Promise: 결과가 생기면 .then 으로 이어서 처리함. (지금은 결과가 없지만, 나중에 결과를 주겠다는 "약속")

function buyWater(){
    return new Promise((resolve, reject) => {
      console.log("Go Supermarket");
      setTimeout(() => {
          console.log("Buy Water");
          resolve("Cold Water!");
      }, 2000);
    });
}

// buyWater().then((result) => {
//     console.log(result);
//     console.log("Thank you!");
// })

async function run(){
    const result = await buyWater();
    console.log(result);
    console.log("Thank you!");
}
run();