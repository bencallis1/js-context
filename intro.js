/**
 * Created by Ben on 3/28/16.
 */



/*****************************

 ** RULE #1

 ** IMPLICIT BINDING - left of the dot at call time

*****************************/

// The slice method of an array takes 2 parameter the starting and ending index and returns a new array up to the starting index

// Create a function called slice that takes 3 parameters.
// An array, starting index and the final index.
// This function should duplicate the behavior of the slice method

var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];


function mySlice(arr, startIndex, endIndex){
    var newArr = [];
    for(var i = startIndex; i < endIndex; i++ ) {
        newArr.push(arr[i])
    }
    return newArr
}


var citrus = mySlice(fruits, 1, 3);


// What is the difference between our slice function and the slice method we would use that comes with javascript


// Create a sayName function with the parameter of name.
// Just like the name parameter we will not know what this this keyword is until the function is inviked

var sayName(name) {
    console.log(name);
}




var me = {
    name: "ben",
    age: 29,
    sayName: function() {
        console.log(this.name)
    }
}


var you = {
    name: 'Sally',
    age: 30,
    sayName: function() {
        console.log(this.name)
    }
}


me.sayName();
you.sayName();



// Create a object called player, with name property
// Add a property called weapon, also with a name


// Create a fireWeapon function that takes the player as the first
// parameter and displays the weapon name

function  fireWeapon() {
    if(this === player) {
        console.log(player.weapon.name)

    }
}


var player = {
    name: 'Sumo Man',
    weapon : {
        name: 'Big Belly'
    },
    attack: fireWeapon
};

player.attack();


// What are some of the problems with this funnction??



// Modify the fireWeapon function to use the this keyword and modify the player object.



//function fireWeapon() {
    //console.log(this.weapon.name)

//}


// This is an example of implicit binding this is the most often way you will
// use the this keyword
// When we write this function we have no idea what the context is going to be.
// We wil not know that until we invoke the function

var whoAmI = {
    firstName: 'Ben',
    lastName: 'Callis',
    age: 28,
    sayName: function() {
        console.log(this.firstName) ;
    }
};

whoAmI.sayName();






// Creating objects is more than just making javascript spreadsheets inside a object
// We also care about the way that that data works and interacts
// As you can see that the player really should have a fireWeapon function


var player = {
    name: 'super sumo',
    weapon: {
      name:  'Big Belly'
    }
    //fireWeapon: fireWeapon // this is a little bit better but we would still need to pass in the player when we invoke the function player.fireWeapon(player)
    // So this doesn't really change the behavior. We need a way to tell this function what weapon to fire without passing in the player
};


// OR

player.fireWeapon();






// This this keyword is pointing at the the window

function showThis() {
    console.log(this)
}

// ALWAYS LOOK AT WHERE THE FUNCTION IS BEING INVOKED THEN LOOK LEFT OF THE PERIOD

// The key to the this keyword is where the function is being INVOKED not where the function is declared

// When a function is invoked look to the left of the DOT id there is nothing there then the functon is bound to the global object
// If there is smelting left of the dot then the function will be bound to that object





/*****************************

 ** RULE #2
 ** EXPLICIT BINDING - apply,call and bind

 *****************************/










// In JavaScript, functions are first-class objects, because they can have properties and methods just like any other object.
// What distinguishes them from other objects is that functions can be called. In brief, they are Function objects.


// Call invokes the function and allows you to pass in arguments one by one.

function fireWeapon(range) {
    console.log(this)
    console.log(range)
    console.log(this.weapon.name)
}

var player = {
    name: 'super sumo',
    weapon: {
        name:  'Big Belly'
    }
};


fireWeapon.call(player,10)


// Now we are assigning the first parameter to this



// What if our function was expecting a argument to be passed


function fireWeapon(strength, range) {
    console.log(strength);
    console.log(range);
    console.log(this.weapon.name)
}

fireWeapon.call(player,10,5);



// APPLY
// apply invokes the function and allows you to pass in arguments as an array.



fireWeapon.apply(player,[10,5])


// BIND

// Bind will not invoke the function when use instead it gives
// us a reference to the function that we can then call later
// Call and Apply will invoke the function immediately


function multiplier(multiplyBy) {
        return this.val * multiplyBy
}

multiplier(2);  // What would happen


var result = multiplier.bind({val: 30})
console.log(result(2))

function multiplyAndDivide(multiplyBy,divideBy) {
    return this.val * multiplyBy / divideBy
}

var calculator = multiplyAndDivide.bind({val: 20}, 10, 2);
calculator()






/*****************************
 ** RULE #3
 *
 ** new BINDING  & prototypes

 *****************************/


function PlayerCreator(playerName, weaponName) {
    var player = {
        name: playerName,
        weapon: weaponName,
        fire: function() {
            console.log(this.weapon.name);
        }
    }
    return player
}


// Now we can just create a new player object with our constructor function

var player = PlayerCreator('sumoMan', {name: 'Big Belly'})
console.log(player)






// Usig the new syntax



function Player(playerName, weaponName) {
    this.name = playerName;
    this.weapon = weaponName;

}

Player.prototype.fire = function() {
    console.log(this.weapon.name)
};



// No need for a return it takes care of that for us
// We have to use the new keyword or our function would point to the window

var player2 =  Player('sumoMan', { name: 'Big Belly'});

player2.fire();


// Our function will have a property called prototype that is a object

// We can add methods to our objects using the prototype so that all our players will have the fire function
// Now we only need to create the prototype one time then our constructor function will take care the rest



/*****************************
 ** RULE #4
 *
 ** window BINDING


 *****************************/



//  IMPLICIT BINDING - left of the dot at call time

var whoAmI = {
    firstName: 'Ben',
    lastName: 'Callis',
    age: 28,
    sayName: function() {
        console.log(this.firstName) ;
    }
};

whoAmI.sayName();


// Call invokes the function and allows you to pass in the arguments one one by one

var person1 = {firstName: 'Sally', lastName: 'Rally'};
var person2 = {firstName: 'Phillip', lastName: 'Phillips'};

function say(greeting) {
    console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
}

say.call(person1, 'Hello'); // Hello Sally Rally
say.call(person2, 'Hello'); // Hello Phillip Phillips


// Apply invokes the function and allows you to pass in arguments as an array.

say.apply(person1, ['Hello']); // Hello Sally Rally
say.apply(person2, ['Hello']); //  Hello Phillip Phillips


// bind returns a new function, allowing you to pass in a this array and any number of arguments

var hiSally = say.bind(person1,'Hello');
var hiPhillip = say.bind(person2,'Hello');

hiSally(); // Hello Sally Rally
hiPhillip(); // Hello Kelly King



