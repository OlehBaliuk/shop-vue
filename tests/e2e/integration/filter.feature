Feature: Search
    
    Scenario: Search product by name
    Given A user open catalog
    When A user clicks category Filter
    And A user checked Search by price
    And A user types price from "100" to "200"
    Then Show result by search