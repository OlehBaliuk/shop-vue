Feature: Cart

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
