Feature: ProductsTable

    Background:
    Given A user login, enter email 'abc@ab.ab' and password '12345678'
    And A user opens page products table 
    
    Scenario: Redirect to page edit product
    When A user clicks icon edit product
    Then A user redirect to page edit product

    Scenario: Redirect to page add new product
    When A user clicks button add new product
    Then A user redirect to page add new product

    Scenario: Filter products
    When A user types id "1"
    Then In the table have to be one product with id "1"