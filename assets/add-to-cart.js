/**
 * Shopify Add To Cart. 
 * 
 * @uses Shopify jQuery API http://mayert-douglas4935.myshopify.com/shopify/api.jquery.js.
 *          We make some mods. consider them feedback :) See comments
 *
 */
$(document).ready(function() { 
//Begin Wrapper

var selectors = {
    TOTAL_ITEMS: '.cart-total-items'
};

var text = {
    ITEM: 'Item', 
    ITEMS: 'Items'
};

//Override the Shopify default: Allow use of form element instead of id.
//
//This makes it a bit more flexible. Every form doesn't need an id.
//Once you are having someone pass in an id, might as well make it selector based, or pass in the element itself.
//Since you are just wrapping it in a jq(). The same rationale is behind the change for updateCartFromForm
// ---------------------------------------------------------
// POST to cart/add.js returns the JSON of the line item.
// ---------------------------------------------------------
//@param HTMLElement the form element which was submitted. Or you could pass in a string selector such as the form id. 
//@param function callback callback fuction if you like, but I just override Shopify.onItemAdded() instead
Shopify.addItemFromForm = function(form, callback) {
    var params = {
      type: 'POST',
      url: '/cart/add.js',
      data: jQuery(form).serialize(),
      dataType: 'json',
      success: function(line_item) { 
        if ((typeof callback) === 'function') {
          callback(line_item);
        }
        else {
          Shopify.onItemAdded(line_item, form);
        }
      },
      error: function(XMLHttpRequest, textStatus) {
        Shopify.onError(XMLHttpRequest, textStatus);
      }
    };
    jQuery.ajax(params);
};

//When an item is added to the cart, we re-enable the button.
//This is where you would want to put any flash messaging, for example.
//@param object line_item
//@param HTMLelement/String form string selector, or HTMLelement itself. 
Shopify.onItemAdded = function(line_item, form) {
    $(form).find('input[type=image]').attr('disabled', false).removeClass('disabled');
    //You can add any extra messaging you would want here. 
    //Get the state of the cart, which will trigger onCartUpdate
    Shopify.getCart();
};

//Define onCartUpdate. This updates the N item/items left in your cart
//@param object the cart object. 
Shopify.onCartUpdate = function(cart) {    
    var message = '<span class="count">'+cart.item_count+'</span> ' +
                    ((cart.item_count == 1) ? text.ITEM : text.ITEMS );
    $(selectors.TOTAL_ITEMS).html(message);
};

//What to display when there is an error. You tell me?! I've left in a commented out example.
Shopify.onError = function(XMLHttpRequest, textStatus) {
  // Shopify returns a description of the error in XMLHttpRequest.responseText.
  // It is JSON.
  // Example: {"description":"The product 'Amelia - Small' is already sold out.","status":500,"message":"Cart Error"}
  // var data = eval('(' + XMLHttpRequest.responseText + ')');
  // errorMessage(data.message + '(' + data.status  + '): ' + data.description);
};

$('form[action=/cart/add]').submit(function(e) {
    e.preventDefault();
    //Can't use updateCartFromForm since you need the item added before you can update, so we just get cart to repaint.
    $(e.target).find('input[type=image]').attr('disabled', true).addClass('disabled');
    Shopify.addItemFromForm(e.target);
});

var testErrorMessage = function() {
    var errorTest = {
        responseText : '{"description":"The product Amelia - Small is already sold out.","status":500,"message":"Cart Error"}'
    };
    Shopify.onError(errorTest, 500);
};

//End Wrapper    
});