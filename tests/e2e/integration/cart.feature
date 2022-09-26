Feature: Cart
    
    # Scenario: Change quantity product in the cart, delete product, clear cart
    # Given A user open catalog
    # When A user add  products to cart
    # Then In the header change count
    # And A user clicks cart
    # And A user increment product
    # And A user decrement product
    # And A user typed value
    # And A user delete product from cart
    # Then Cart is empty

    Background: 
       Given A user open catalog
        * A user add products to cart
        * A user clicks cart
       

    Scenario: Change quantity product in the cart
        When A user increments product
        Then Count increments
        When A user decrements product
        Then Count decrements
        When A user typed value
        Then Count change

    Scenario: Delete product from cart
        When A user clicks button delete
        Then A cart is empty
   
    Scenario: Clear cart
        When A user clicks button clear cart
        Then A cart is empty
   