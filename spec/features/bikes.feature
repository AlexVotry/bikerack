Feature: Adding, modifying, deleting bikes

  Scenario: Add a bike
    Given I see my bike list
    When I add a bike
    Then I see the bike in the list
