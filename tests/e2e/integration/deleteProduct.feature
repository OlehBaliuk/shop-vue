Feature: Delete product Feature

    Background:
        Given A user login, enter email 'abc@ab.ab' and password '12345678'

    Scenario: Delete product
        Given A user opens page catalog
        When A user clicks button delete product
        And Agree with delete product
        Then The product is removed from the catalog
