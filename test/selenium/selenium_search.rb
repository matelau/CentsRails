require 'selenium-webdriver'

driver = Selenium::WebDriver.for :chrome

page = driver.get("https://trycents.com")

wait = Selenium::WebDriver::Wait.new(:timeout => 10)
wait.until { driver.find_element :id => "search" }

element= driver.find_element :id => "search"

sleep(1)

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

driver.find_element(:class => "circle-arrow").click

wait = Selenium::WebDriver::Wait.new(:timeout => 10)
wait.until { driver.find_element :id => "center" }

sleep(5)

driver.find_element(:link_text => "HOME").click

wait = Selenium::WebDriver::Wait.new(:timeout => 10)
wait.until { driver.find_element :id => "search" }

element= driver.find_element :id => "search"

element.send_keys "Salt Lake City"
element.send_keys " and "
element.send_keys "Seattle, WA"

wait = Selenium::WebDriver::Wait.new(:timeout => 10)
wait.until { driver.find_element :id => "center" }

driver.find_element(:link_text => "COST OF LIVING").click

sleep(5)

driver.quit
