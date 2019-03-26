/**
 * @description: 集合实现函数demo
 * @param {} 
 * @return: 
 */
function Set() {
    let items = {}
    this.size = 0
    
    this.has = function(val) {
        return items.hasOwnProperty(val)
    }

    this.add = function(val) {
        if (!this.has(val)) {
            items[val] = val
            this.size++
            return true
        }
        return false
    }

    this.delete = function(val) {
        if (!this.has(val)) {
            delete items[val]
            this.size--
            return true
        }
        return false
    }

    this.clear = function() {
        items = {}
        this.size = 0
    }

    this.keys = function() {
        return Object.keys(items)
    }

    this.values = function() {
        return Object.values(items)
    }

    this.entries = function () {
        // return Object.entries(items)
        var ownProps = Object.keys(items),
            i = ownProps.length,
            resArray = new Array(i)
        while (i--)
            resArray[i] = [ownProps[i], items[ownProps[i]]]

        return resArray;
    }
}

var s1 = new Set()
s1.add('a')
s1.add('b')
s1.add('1')
console.log(s1.keys());
