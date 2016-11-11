Feature: User authentication

  Scenario: Registration
    Given I am a new user
    When I register for a new account
    Then I am logged into the application
      And I see my dashboard

  Scenario: Login
    Given I am an existing user
    When I log in
    Then I am logged into the application
      And I see my dashboard
      And I see a logout button
      And I do not see a signup button
      And I do not see a login button

  Scenario: Logout
    Given I am logged in
    When I log out
    Then I am logged out of the application
      And I see the homepage
      And I see a login button
      And I see a signup button
      And I do not see a logout button
