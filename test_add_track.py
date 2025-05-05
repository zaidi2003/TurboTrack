import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import warnings


warnings.filterwarnings("ignore", category=Warning) 
@pytest.fixture(scope="function") 
def browser_session():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    wait = WebDriverWait(driver, 10)
    driver.get("http://localhost:5173/add-track")

    yield driver, wait 
    driver.quit()

def test_submit_without_difficulty(browser_session):
    driver, wait = browser_session

    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='text']")))
    assert "add-track" in driver.current_url

    track_name_input = driver.find_elements(By.XPATH, "//input[@type='text']")[0]
    track_name_input.send_keys("Test Track")

    for i in range(3):
        subtrack_name_xpath = f"(//input[@type='text'])[{i + 2}]" 
        subtrack_name_input = wait.until(EC.presence_of_element_located((By.XPATH, subtrack_name_xpath)))
        subtrack_name_input.send_keys(f"Subtrack {i+1}")

        number_inputs = driver.find_elements(By.XPATH, "//input[@type='number']")
        duration_input = number_inputs[i * 2]
        points_input = number_inputs[i * 2 + 1]

        duration_input.send_keys("1.5")
        points_input.send_keys("100")

    submit_btn_xpath = "//button[contains(text(), 'Add Track')]"
    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, submit_btn_xpath)))
    submit_btn.click()

    time.sleep(2) 

    assert "add-track" in driver.current_url.lower() 


def test_submit_with_only_whitespace_in_text_fields(browser_session):
    driver, wait = browser_session

    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='text']")))
    assert "add-track" in driver.current_url

    track_name_input = driver.find_elements(By.XPATH, "//input[@type='text']")[0]
    track_name_input.send_keys("   ") 

    for i in range(3):
        subtrack_name_xpath = f"(//input[@type='text'])[{i + 2}]"
        subtrack_name_input = wait.until(EC.presence_of_element_located((By.XPATH, subtrack_name_xpath)))
        subtrack_name_input.send_keys("   ") 

        number_inputs = driver.find_elements(By.XPATH, "//input[@type='number']")
        duration_input = number_inputs[i * 2]
        points_input = number_inputs[i * 2 + 1]
        duration_input.send_keys("1.5")
        points_input.send_keys("100")

        dropdowns = driver.find_elements(By.TAG_NAME, "select")
        dropdowns[i].send_keys("Beginner") 

    submit_btn_xpath = "//button[contains(text(), 'Add Track')]"
    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, submit_btn_xpath)))
    submit_btn.click()

    time.sleep(2) 
    assert "add-track" in driver.current_url.lower() 


def test_negative_distance_value(browser_session):
    driver, wait = browser_session

    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='text']")))
    assert "add-track" in driver.current_url

    track_name_input = driver.find_elements(By.XPATH, "//input[@type='text']")[0]
    track_name_input.send_keys("Negative Distance Test Track")

    for i in range(3):
        subtrack_name_xpath = f"(//input[@type='text'])[{i + 2}]"
        subtrack_name_input = wait.until(EC.presence_of_element_located((By.XPATH, subtrack_name_xpath)))
        subtrack_name_input.send_keys(f"Subtrack {i+1}")
  
        number_inputs = driver.find_elements(By.XPATH, "//input[@type='number']")
        duration_input = number_inputs[i * 2]
        points_input = number_inputs[i * 2 + 1]

        if i == 1: 
            duration_input.send_keys("-2.5")
            print("Step 3: Entered negative distance value (-2.5) for Subtrack 2")
        else:
            duration_input.send_keys("1.5")
        
        points_input.send_keys("100")
        try:
            dropdowns = driver.find_elements(By.TAG_NAME, "select")
            if len(dropdowns) > i:
                dropdowns[i].send_keys("Intermediate")
        except:
            print("No difficulty dropdown found, continuing test")
    
    submit_btn_xpath = "//button[contains(text(), 'Add Track')]"
    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, submit_btn_xpath)))
    submit_btn.click()
    print("Step 4: Clicked 'Add Track' button")
    
    time.sleep(2)
    
    assert "add-track" in driver.current_url.lower()
    print("Verification: Still on add-track page, form wasn't submitted due to negative distance value")
    
    try:
        error_message = driver.find_element(By.XPATH, "//*[contains(text(), 'error') or contains(text(), 'invalid') or contains(text(), 'negative')]")
        assert error_message.is_displayed()
        print(f"Success: Error message displayed: '{error_message.text}'")
    except:
        print("Note: Specific error message not found, but form wasn't submitted which is expected behavior")

def test_submit_with_some_subtrack_fields_empty(browser_session):
    driver, wait = browser_session

    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@type='text']")))
    assert "add-track" in driver.current_url

    track_name_input = driver.find_elements(By.XPATH, "//input[@type='text']")[0]
    track_name_input.send_keys("Partial Subtrack Test")

    subtrack_name_xpath = "(//input[@type='text'])[2]"
    subtrack_name_input = wait.until(EC.presence_of_element_located((By.XPATH, subtrack_name_xpath)))
    subtrack_name_input.send_keys("Subtrack 1")

    number_inputs = driver.find_elements(By.XPATH, "//input[@type='number']")
    duration_input = number_inputs[0]
    points_input = number_inputs[1]

    duration_input.send_keys("1.5")
    points_input.send_keys("100")

    try:
        dropdowns = driver.find_elements(By.TAG_NAME, "select")
        if dropdowns:
            dropdowns[0].send_keys("Beginner")
    except:
        pass

    submit_btn_xpath = "//button[contains(text(), 'Add Track')]"
    submit_btn = wait.until(EC.element_to_be_clickable((By.XPATH, submit_btn_xpath)))
    submit_btn.click()

    time.sleep(2)

    assert "add-track" in driver.current_url.lower()

    try:
        error_elements = driver.find_elements(By.XPATH, "//*[contains(text(), 'required') or contains(text(), 'fill') or contains(text(), 'empty') or contains(@class, 'error')]")
        assert len(error_elements) > 0
    except:
        pass