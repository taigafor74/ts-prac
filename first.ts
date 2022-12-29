let a: number;
a = 10;
let c: boolean = true;

function sum(a: number, b: number): number {
  return a + b;
}
console.log(sum(111, 222));
let un: unknown;
let str: string;
un = 10;
un = true;
str = un as string;
str = <string>un;
console.log(str);
function dn(): never {
  throw new Error("wrong");
}
enum Gender {
  male = 0,
  female = 1,
}
let obj: { name: string; [prop: string]: any; gender: Gender };
obj = { name: "1", age: 1, sex: "female", go: 1, gender: Gender.male };
console.log(obj);

let func: (a: number, b: number) => number;
func = function (a, b) {
  return a + b;
};
let arr: object[];
let arr2: Array<number>;
arr = [obj, obj];
let tup: [number, string];
tup = [1, "1"];
let j: string | number;
let sss: string = "123";
let jj: { name: string } & { age: number };
jj = { name: "123", age: 12 };
type my = string;
let m: my;
let xix = "xi1212xi";
