Feature: Search
    
    Scenario: Search product by name
    Given A user open catalog
    When A user clicks category Filter
    And A user checked Search by name
    And A user types word "T-shirt"
    Then Show result by search