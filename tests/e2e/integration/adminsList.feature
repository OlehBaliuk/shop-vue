Feature: AdminsList Feature

    Background:
    Given A user login, enter email 'abc@ab.ab' and password '12345678'
    And A user opens page admins 
    
    Scenario: Add new admin
    When A user clicks users select and type name 'Leo Messi'
    And Clicks on user
    Then A user add to admins list

    Scenario: Remove admin
    When When a user clicks remove button
    Then A user will be remove from admins list