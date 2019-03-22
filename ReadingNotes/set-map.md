- [Set-map](#set-map)
  - [Set](#set)
    - [Set 实例的属性和方法](#set-%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%B1%9E%E6%80%A7%E5%92%8C%E6%96%B9%E6%B3%95)
    - [Set遍历](#set%E9%81%8D%E5%8E%86)
    - [Set应用](#set%E5%BA%94%E7%94%A8)
# Set-map

## Set
> Set类似于数组，但是成员的值都是唯一的，没有重复的值。

### Set 实例的属性和方法

```javascript
let set =  new Set()
console.log(typeof set)     // object
```
- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。

- add(value)：添加某个值，返回 Set 结构本身。

```javascript
let set =  new Set()
let arr = [1,2,3,2,3,4]
arr.forEach(
    x => set.add(x)
)
console.log([...set])   // [ 1, 2, 3, 4 ]
```
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

```javascript
let set =  new Set()
let arr = [1,2,3,2,3,4]
arr.forEach(
    x => set.add(x)
)
console.log([...set])   // [ 1, 2, 3, 4 ]
set.delete(2)
console.log([...set])   // [ 1, 3, 4 ]
console.log(set.has(2)) // false
set.clear()
console.log([...set])   // []
```

### Set遍历

> Set 结构没有键名，只有键值（或者说键名和键值是同一个值）

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

```javascript
[Set Iterator] { 1, 2, 3, 4 }
[Set Iterator] { 1, 2, 3, 4 }
[Set Iterator] { 1, 2, 3, 4 }
[ 1, 1 ]
[ 2, 2 ]
[ 3, 3 ]
[ 4, 4 ]

```

```javascript
let set =  new Set()
let arr = [1,2,3,2,3,4]
arr.forEach(
    x => set.add(x)
)
set.forEach(
    (k, v) => console.log(`k:${k},v:${v}`)
)

// k:1,v:1
// k:2,v:2
// k:3,v:3
// k:4,v:4
```

### Set应用

- 去除数组的重复成员

```js
let arr = [1,2,3,4,2,3,1,5]
let unique = [...new Set(arr)]
console.log(unique) // [ 1, 2, 3, 4, 5 ]
```
- 并集&交集&差集

```js
let set1 = new Set([8, 6, 5])
let set2 = new Set([9, 5, 6])

// 并集
let union = new Set([...set1, ...set2])
console.log(union)  // Set { 8, 6, 5, 9 }

// 交集
let intersect = new Set([...set1].filter(x => set2.has(x)))
console.log(intersect)  // Set { 6, 5 }

// 差集
let difference = new Set([...set1].filter(x => !set2.has(x)))
console.log(difference) // Set { 8 }
```