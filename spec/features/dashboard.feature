Feature: Dashboard

  Scenario: Viewing my list of bikes
    Given I am logged in
    When I visit my dashboard
    Then I see a list of my bikes
