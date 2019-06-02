function asyncSum (n, cb) {
    let sum = 0
    function add_i(i) {
        sum += i
        if (i === n) return cb(sum)
        setImmediate(add_i.bind(null, i + 1))
    }
    add_i(1)
}
asyncSum(1000, res => console.log(res))
