Feature: User authentication

  Scenario: Registration
    Given I am a new user
    When I register for a new account
    Then I am logged into the application
      And I see my dashboard

