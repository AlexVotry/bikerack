Feature: Application identity

  All visitors should know where they've landed.
  Visitors see a friendly message when they visit the application.

  Scenario: Application title
    Given the application has a home page
    When I visit the home page
    Then I see the name of the application

  Scenario: Welcome message
    Given the application has a home page
    When I visit the home page
    Then I see a welcome message
