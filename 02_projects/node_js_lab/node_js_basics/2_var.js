const odd = "this number is odd";
const even = "this number is even";

module.exports = { odd, even };
// module.exports = {
//  odd: odd,
//  even: even }; 할 필요 없다.
// 추가로 exports.odd = odd; exports.even = even; 도 동일한 원칙으로 가능하.
// exports. 를 쓰던 module.exports 를 쓰던 하나만 써야한다.
// 전역 객체란, 코드가 실행되는 환경(브라우저, Node.js)이 기본적으로 제공하는, 코드 어디서나 접근할 수 있는 공용 기능과 정보들의 모음집