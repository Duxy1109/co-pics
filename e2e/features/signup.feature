Feature: ppp Test

  Scenario: Empty Phone
    When I reload the app
    Then I should have login page loaded
    When I click the signup button in login page
    When I should have signup page loaded
    Given I input phone number ''
    Given I input name 'koko'
    Given I input password1 '123123'
    Given I input password2 '123123'
    Given I finished input
    Given I click the signup button in signup page
    Then I should have err 'Please Fill in Each Form'

  Scenario: Empty Name
    When I reload the app
    Then I should have login page loaded
    When I click the signup button in login page
    When I should have signup page loaded
    Given I input phone number '1234567'
    Given I input name ''
    Given I input password1 '123123'
    Given I input password2 '123123'
    Given I finished input
    Given I click the signup button in signup page
    Then I should have err 'Please Fill in Each Form'

  Scenario: Empty Password1
    When I reload the app
    Then I should have login page loaded
    When I click the signup button in login page
    When I should have signup page loaded
    Given I input phone number '1234567'
    Given I input name 'koko'
    Given I input password1 ''
    Given I input password2 '123123'
    Given I finished input
    Given I click the signup button in signup page
    Then I should have err 'Please Fill in Each Form'

  Scenario: Empty Password2
    When I reload the app
    Then I should have login page loaded
    When I click the signup button in login page
    When I should have signup page loaded
    Given I input phone number '1234567'
    Given I input name 'koko'
    Given I input password1 '123123'
    Given I input password2 ''
    Given I finished input
    Given I click the signup button in signup page
    Then I should have err 'Password mismatch'

  Scenario: Unmatch Password
    When I reload the app
    Then I should have login page loaded
    When I click the signup button in login page
    When I should have signup page loaded
    Given I input phone number '1234567'
    Given I input name 'koko'
    Given I input password1 '123123'
    Given I input password2 '321321'
    Given I finished input
    Given I click the signup button in signup page
    Then I should have err 'Password mismatch'

  Scenario: Correct Signup Progress
    When I reload the app
    Then I should have login page loaded
    When I click the signup button in login page
    When I should have signup page loaded
    Given I input phone number '1234567'
    Given I input name 'koko'
    Given I input password1 '123123'
    Given I input password2 '123123'
    Given I finished input
    Given I click the signup button in signup page
    Then I should be in the main page