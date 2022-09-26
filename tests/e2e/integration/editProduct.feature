Feature: Edit product Feature
    
    Scenario: Edit product
    Given A user opens page add new product
    When A user enter the name "name" 
    And A user enter the description "description"
    And A user enter the price "400"
    And A user checked checkbox
    And A user clicks submit button
    Then The product add to catalog and redirect to catalog 
