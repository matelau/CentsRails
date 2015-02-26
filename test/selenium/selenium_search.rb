require 'selenium-webdriver'

driver = Selenium::WebDriver.for :chrome

page = driver.get("https://trycents.com")

wait = Selenium::WebDriver::Wait.new(:timeout => 10)
wait.until { driver.find_element :id => "search-bar" }

element= driver.find_element :id => "search"

element.send_keys "B"
element.send_keys "Y"
element.send_keys "U"
element.send_keys " "
element.send_keys "v"
element.send_keys "s"
element.send_keys " "
element.send_keys "U"
element.send_keys " "
element.send_keys "o"
element.send_keys "f"
element.send_keys " "
element.send_keys "U"

element.submit