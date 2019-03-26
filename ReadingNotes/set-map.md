# Set-map
  - [Set](#set)
    - [Set 实例的属性和方法](#set-%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%B1%9E%E6%80%A7%E5%92%8C%E6%96%B9%E6%B3%95)
    - [Set遍历](#set%E9%81%8D%E5%8E%86)
    - [Set应用](#set%E5%BA%94%E7%94%A8)
  - [Map](#map)
    - [Map 实例的属性和方法](#map-%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%B1%9E%E6%80%A7%E5%92%8C%E6%96%B9%E6%B3%95)
    - [Map遍历方法](#map%E9%81%8D%E5%8E%86%E6%96%B9%E6%B3%95)
    - [其他](#%E5%85%B6%E4%BB%96)
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


## Map
> 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

### Map 实例的属性和方法

- set(key, value)
> set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。

> set方法返回的是当前的Map对象，因此可以采用链式写法。


```js
let m = new Map()
let o = {'name': 'clearives'}
m.set(o, 10086)
console.log(m); // Map { { name: 'clearives' } => 10086 }
```
- size 属性
> size属性返回 Map 结构的成员总数。

- get(key)
> get方法读取key对应的键值，如果找不到key，返回undefined。
```js
let m = new Map()
let o = {'name': 'clearives'}
m.set(o, 10086)
console.log(m.get(o));  // 10086
```
- has(key)
> has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
```js
let m = new Map()
let o = {'name': 'clearives'}
m.set(o, 10086)
console.log(m.has(o));  // true
```
- delete(key)
> delete方法删除某个键，返回true。如果删除失败，返回false。
- clear()
> clear方法清除所有成员，没有返回值。

### Map遍历方法
> Map 的遍历顺序就是插入顺序。

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历 Map 的所有成员。

```
[Map Iterator] { { name: 'clearives' } }
[Map Iterator] { 10086 }
[Map Iterator] { [ { name: 'clearives' }, 10086 ] }
```

### 其他

- Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。

