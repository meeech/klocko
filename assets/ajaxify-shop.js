/**
 * Shopify Ajaxify Shop. 
 * 
 * @uses Modified Shopify jQuery API (link to it)
 *
 */

jQuery(document).ready(function() { 
//Begin Wrapper

var jQ = jQuery;

/**
 * Collection of Selectors for various pieces on the page we need to update 
 *
 */
var selectors = {
    TOTAL_ITEMS: '.cart-total-items',
    SUBMIT_ADD_TO_CART: 'input[type=image], input.submit-add-to-cart'
};


/**
 * Collection of text strings. This is where you would change for a diff language, for example. 
 *
 */
var text = {
    ITEM: 'Item', 
    ITEMS: 'Items'
};

//Attach Submit Handler to all forms with the /cart/add action. 
jQ('form[action*=/cart/add]').submit(function(e) {
    e.preventDefault();
    //Disable the Add To Cart button, add a disabled class. 
    jQ(e.target).find(selectors.SUBMIT_ADD_TO_CART).attr('disabled', true).addClass('disabled');

    //Can't use updateCartFromForm since you need the item added before you can update (otherwise, would have been more convenient)
    //So, in onItemAdded, we Shopify.getCart() to force the repaint of items in cart. 
    Shopify.addItemFromForm(e.target);
});

/**
 * Shopify.onItemAdded
 * 
 * Triggered by the response when something is added to the cart via the add to cart button.
 * This is where you would want to put any flash messaging, for example.
 * 
 * @param object line_item
 * @param HTMLelement/String Form HTMLElement, or selector
 */
Shopify.onItemAdded = function(line_item, form) {
    //Default behaviour for this modification:
    //When a Add To Cart form is clicked, we disable the button and apply a class of disabled. 
    //Here is where we remove the disabled class, and reactivate the button.
    jQ(form).find(selectors.SUBMIT_ADD_TO_CART).attr('disabled', false).removeClass('disabled');

    //You can add any extra messaging you would want here. 

    //Get the state of the cart, which will trigger onCartUpdate
    Shopify.getCart();
};

/**
 * This updates the N item/items left in your cart
 * 
 * It's setup to match the HTML used to display the Cart Count on Load. If you change that (in your theme.liquid) 
 * you will probably want to change the message html here. 
 * This will update the HTML in ANY element with the class defined in selectors.TOTAL_ITEMS
 *
 * @param object the cart object. 
 */
Shopify.onCartUpdate = function(cart) {    
    var message = '<span class="count">'+cart.item_count+'</span> ' +
                    ((cart.item_count == 1) ? text.ITEM : text.ITEMS );
    jQ(selectors.TOTAL_ITEMS).html(message);
};

//What to display when there is an error. You tell me?! I've left in a commented out example.
// You can tie this in to any sort of flash messages, or lightbox, or whatnot you want.
Shopify.onError = function(XMLHttpRequest, textStatus) {
  // Shopify returns a description of the error in XMLHttpRequest.responseText.
  // It is JSON.
  // Example: {"description":"The product 'Amelia - Small' is already sold out.","status":500,"message":"Cart Error"}
  // var data = eval('(' + XMLHttpRequest.responseText + ')');
  // errorMessage(data.message + '(' + data.status  + '): ' + data.description);
};

//End Wrapper    
});