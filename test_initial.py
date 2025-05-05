import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import tempfile
import os

class TestInitialBookingFlow:
    """Test case for checking the initial booking flow (empty current and history tabs)"""
    
    @pytest.fixture(scope="function")
    def driver(self):
        """Set up and tear down the WebDriver for each test"""
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        temp_dir = os.path.join(tempfile.gettempdir(), f"chrome_profile_{int(time.time())}")
        chrome_options.add_argument(f"--user-data-dir={temp_dir}")
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.implicitly_wait(10)
        
        yield driver
        driver.quit()
        
    def test_initial_booking_flow(self, driver):
        """
        Test Case 7: Initial Booking Flow
        Description: First time usage should clearly show the current booking and history tab as empty
        """

        driver.get("http://localhost:5173/login")
        print("Navigated to login page")

        email = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//input[@type='email']"))
        )
        email.clear()
        email.send_keys("mema@gmail.com")
        print("Entered email")

        password = driver.find_element(By.XPATH, "//input[@type='password']")
        password.clear()
        password.send_keys("mema")
        print("Entered password")

        signin_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
        )
        print("Found Sign in button")
        signin_button.click()

        WebDriverWait(driver, 10).until(lambda d: "/employee-dashboard" in d.current_url)
        print(f"Login successful, current URL: {driver.current_url}")


        driver.get("http://localhost:5173/bookings")
        print("Navigated to booking page")

        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//div[contains(text(), 'Discover')]"))
        )
        print("Booking page loaded with discover tab")
        

        tabs = driver.find_elements(By.XPATH, "//div[contains(@class, 'tab') or contains(@class, 'tabs')]//div")
        tab_texts = [tab.text.lower() for tab in tabs if tab.text.strip()]
        
        assert "discover" in " ".join(tab_texts).lower(), "Discover tab is not present"
        assert "current bookings" in " ".join(tab_texts).lower(), "Current Bookings tab is not present"
        assert "history" in " ".join(tab_texts).lower(), "History tab is not present"
        
        print("Verified all three tabs are present")
        

        try:
            current_bookings_tab = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'Current Bookings')]"))
            )
            driver.execute_script("arguments[0].click();", current_bookings_tab)
            print("Clicked on Current Bookings tab")
            

            time.sleep(2)
            

            empty_current = WebDriverWait(driver, 10).until(
                EC.visibility_of_element_located((By.XPATH, "//div[contains(text(), 'You have no current bookings')]"))
            )
            
            print("Verified Current Bookings tab shows empty state message:", empty_current.text)
            assert "no current bookings" in empty_current.text.lower(), "Empty state message for current bookings is incorrect"
            
        except Exception as e:
            print(f"Error navigating to Current Bookings tab: {e}")
            raise

        try:
            history_tab = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'History')]"))
            )

            driver.execute_script("arguments[0].click();", history_tab)
            print("Clicked on History tab")

            time.sleep(2)
            

            empty_history = WebDriverWait(driver, 10).until(
                EC.visibility_of_element_located((By.XPATH, "//div[contains(text(), 'You have no booking history')]"))
            )
            
            print("Verified History tab shows empty state message:", empty_history.text)
            assert "no booking history" in empty_history.text.lower(), "Empty state message for booking history is incorrect"
            
        except Exception as e:
            print(f"Error navigating to History tab: {e}")
            raise
        
        print("Test Case 7: Initial Booking Flow - PASSED")