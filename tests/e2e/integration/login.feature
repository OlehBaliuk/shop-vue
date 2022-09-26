Feature: Login Feature
    
    Background:
    Given A user opens page login
    When A user enter the email "abc@ab.ab"

    Scenario: Login user  
    When A user enter the password "12345678"
    And A user clicks button submit 
    Then A user have to log in 

    Scenario: Login user error    
    When A user enter the password "1234567"
    And A user clicks button submit 
    Then Show error message

    Scenario: Clear input fields 
    When A user enter the password "12345678"
    And A user clicks button clear
    Then Input fields are empty