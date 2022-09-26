Feature: Registration Feature
    
    Background:
    Given A user opens page registration
    When A user enter name "name"
    When A user enter second name "secondName"
    When A user enter the password "12345678"
    When A user checked checkbox
  

    Scenario: Registration user  
    When A user enter the correct email
    And A user clicks button submit 
    Then A user have to registration 

    Scenario: Registration user error    
    When A user enter the incorrect email "abc@ab.ab"
    And A user clicks button submit 
    Then Show error message

    Scenario: Clear input fields 
    When A user enter the correct email
    And A user clicks button clear
    Then Input fields are empty

  