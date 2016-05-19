/**
 * Created by Ben on 5/19/16.
 */



//(function() {
//
//    function add( nums, option ) {
//        console.log(this);
//        this.nums = nums;
//        if(nums && option === 'curry') this.curry()
//
//    }
//
//    add.prototype.curry = function() {
//        var module = (function(num) {
//            return function(num2) {
//
//            }
//        })
//            console.log(this.nums)
//
//    };
//
//
//    new add([1,2,3,4], 'curry');
//
//})();


var currier = function(fn) {
    console.log(arguments);
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat(
            Array.prototype.slice.call(arguments,0)))
    }
}

var add = function(nums) {
    var results = [];

    //console.log(nums)

    //for(var i = nums; i <= nums; i++) {
    //    results.push(i)
    //}
    //return results
}

var addSome = currier(add, 1)

addSome(5)