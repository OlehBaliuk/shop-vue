Feature: Profile Feature
    
    Scenario: Edit profile info
    Given A user login, enter email 'abc@ab.ab' and password '12345678'
    And A user opens page profile 
    And A user unlocks from
    When A user cliks select contact
    And A user clicks option a phone
    And A user enter the phone number '670000001'
    And A user clicks submit button
    Then The profile info update
