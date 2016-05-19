(function() {

    // Here we create a function that takes a element as the parameter
    // when the SVGDDMenu function is invoked it starts a chain of events that starts with the init()
    function SVGDDMenu( el ) {
        // If you look in your console you will see a SVGDDMenu object that has our init,initEvents and toggle methods listed under the proto chain
        console.log(this);
        // this is the element being passed in when the SVGDDMenu is invoked
        this.el = el;
        // invoke the init method
        this.init();
    }

    SVGDDMenu.prototype.init = function() {

        // Here we are selecting the class morph-shape
        this.shapeEl = this.el.querySelector( 'div.morph-shape' );

        // Here we are using the snap library and passing the Snap method the svg element
        var s = Snap( this.shapeEl.querySelector( 'svg' ) );

        // Here we are using the snap library again to target the path element child element to svg
        this.pathEl = s.select( 'path' );

        // Here we are adding some properties to the SVGDDMenu object so we can open and close the menu by referencing these attributes
        this.paths = {
            reset : this.pathEl.attr( 'd' ),
            open : this.shapeEl.getAttribute( 'data-morph-open' )
        };

        // Here we set the default position to closed
        this.isOpen = false;

        // Here we invoke the initEvents method on the SVGDDMenu object

        this.initEvents();
    };

    // Here we create a initEvents method on the SVGDDMenu objects proto chain
    SVGDDMenu.prototype.initEvents = function() {
        // Here we are adding a event listener to the entire SVGDDMenu. You'll notice that if you click anywhere on the menu bar it will toggle the class
       // We have access to the toggle method on the SVGDDMenu object via the keyword this
        // We use the bind method because we are going to be using this functionality later when we click on the menubar
        this.el.addEventListener( 'click', this.toggle.bind(this) );

    };

    // Here we are adding a toggle method to our SVGDDMenu objects proto chain
    SVGDDMenu.prototype.toggle = function() {
        var self = this;

        console.log(self.el);

        if( self.isOpen ) {
            // Here is a example of using javascript without the classie library to remove a class
            //self.el.classList.remove(  'menu--open' );

            // Here is a example of using the classie library to remove the class menu--open from the self.el/ nav
            classie.remove( self.el, 'menu--open' );

            setTimeout(function(){
                // Another examople of pure javascript to remove a class

                self.el.classList.remove( 'menu--closed-background' );
            },300)

        }
        else {
            classie.add( self.el, 'menu--open' );
            classie.add( self.el, 'menu--closed-background' );
        }
        // Here we are referencing the pathEl property on the SVGDDMenu object and stopping the animation
        // We then pass some arguments to the animate method
        this.pathEl.stop().animate(
            {
            'path' : this.paths.open
            }, 320, mina.easeinout, function() {
            self.pathEl.stop().animate( {
                'path' : self.paths.reset }, 1000, mina.elastic );
        } );

        // Here we set isOpen to whatever is the oposite so we can toggle isOpen to true and false
        self.isOpen = !self.isOpen;
    };

    // Here we construct a new SVGDDMenu and pass in the id menu
    // Because we built our animation and click event this way we will have a reuasable component for future use we would just need to change the
    // argument being passed in

    new SVGDDMenu( document.getElementById( 'menu1' ) );
    new SVGDDMenu( document.getElementById( 'menu2' ) );
    new SVGDDMenu( document.getElementById( 'menu3' ) );
    new SVGDDMenu( document.getElementById( 'menu4' ) );



})();