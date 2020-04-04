Feature: Sign In

  Scenario: Right User Phone Wrong Password
    When I reload the app
    When I should have login page loaded
    Given I input phone number '1234567'
    Given I input password1 '1234567'
    Given I finished input
    Given I click the signin button
    Then I should have err 'Invalid Phone or Password'

  Scenario: Wrong User Phone Right Password
    When I reload the app
    When I should have login page loaded
    Given I input phone number '123123'
    Given I input password1 '1234567'
    Given I finished input
    Given I click the signin button
    Then I should have err 'Invalid Phone or Password'

  Scenario: Empty User Phone
    When I reload the app
    When I should have login page loaded
    Given I input password1 '1234567'
    Given I finished input
    Given I click the signin button
    Then I should have err 'Please Put In Phone Number'

  Scenario: Correct Loggin Progress
  	When I reload the app
  	When I should have login page loaded
  	Given I input phone number '1234567'
  	Given I input password1 '123123'
    Given I finished input
  	Given I click the signin button
  	Then I should be in the main page
  	