Feature: Dashboard

  Scenario: Viewing my list of bikes
    Given I am logged in
    When I visit my dashboard
    Then I see a list of my bikes

  Scenario: The dashboard is protected
    Given I am not logged in
    When I visit my dashboard
    Then I do not see my dashboard
    And I see the homepage
