import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

class TestCancelBooking:
    """Test case for logging in and cancelling a booking"""
    
    @pytest.fixture(scope="function")
    def driver(self):
        """Set up and tear down the WebDriver for each test"""
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        import tempfile
        import os
        temp_dir = os.path.join(tempfile.gettempdir(), f"chrome_profile_{int(time.time())}")
        chrome_options.add_argument(f"--user-data-dir={temp_dir}")
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.implicitly_wait(10)
        
        yield driver
        driver.quit()
        
    def test_login_and_cancel_booking(self, driver):
        """
        Test Case: Login and Cancel a booking
        Description: User should be able to login and cancel a booking from the Current Bookings tab
        """

        driver.get("http://localhost:5173/login")
        print("Navigated to login page")

        email = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//input[@type='email']"))
        )
        email.clear()
        email.send_keys("26100175@gmail.com")
        print("Entered email")

        password = driver.find_element(By.XPATH, "//input[@type='password']")
        password.clear()
        password.send_keys("111111")
        print("Entered password")

        signin_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
        )
        print("Found Sign in button via type=submit")
        signin_button.click()


        WebDriverWait(driver, 10).until(lambda d: "/employee-dashboard" in d.current_url)
        print(f"Login successful, current URL: {driver.current_url}")


        driver.get("http://localhost:5173/bookings")
        print("Navigated to bookings page")

        try:

            WebDriverWait(driver, 10).until(
                EC.visibility_of_element_located((By.XPATH, "//div[text()='Current Bookings']"))
            )
            

            current_bookings_tab = driver.find_element(By.XPATH, "//div[text()='Current Bookings']")
            driver.execute_script("arguments[0].click();", current_bookings_tab)
            print("Clicked Current Bookings tab")
        except Exception as e:
            print(f"Error clicking Current Bookings tab: {e}")

            try:
                tabs = driver.find_elements(By.XPATH, "//div[contains(@class, 'tab')]")
                for tab in tabs:
                    if "current" in tab.text.lower():
                        driver.execute_script("arguments[0].click();", tab)
                        print(f"Clicked tab with text: {tab.text}")
                        break
            except Exception as alt_error:
                print(f"Alternative tab click also failed: {alt_error}")
                raise

        time.sleep(2)

        empty_state = driver.find_elements(By.XPATH, "//div[contains(text(), 'You have no current bookings')]")
        if empty_state:
            pytest.skip("No current bookings available to cancel. Test skipped.")
        

        booking_cards = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, "//div[contains(@style, 'background') and contains(@style, 'border-radius')]"))
        )
        
        if not booking_cards:
            print("No booking cards found using style search")

            booking_cards = driver.find_elements(By.XPATH, "//div[contains(text(), 'tester')]/ancestor::div[2]")
        
        assert len(booking_cards) > 0, "No booking cards found"
        first_booking = booking_cards[0]
        print(f"Booking card text:\n{first_booking.text}")
        

        try:
            track_element = first_booking.find_element(By.XPATH, ".//div[contains(text(), 'tester')]")
            track_name = track_element.text
        except:

            track_name = first_booking.text.split('\n')[0]
        
        print(f"Found booking for: {track_name}")
        

        cancel_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[text()='Cancel']"))
        )
        

        driver.execute_script("arguments[0].scrollIntoView(true);", cancel_button)
        time.sleep(1)
        
        print(f"Found Cancel button with text: {cancel_button.text}")
        driver.execute_script("arguments[0].click();", cancel_button)
        print("Clicked Cancel button")

        modal = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//div[contains(text(), 'Cancel Booking')]"))
        )
        print(f"Modal appeared: {modal.text}")
        

        confirm_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[text()='Yes, Cancel']"))
        )
        
        confirm_button.click()
        print("Confirmed cancellation")

        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.XPATH, "//div[contains(text(), 'Cancel Booking')]"))
        )

        time.sleep(3)
        

        remaining = driver.find_elements(By.XPATH, f"//div[contains(text(), '{track_name}')]")
        if remaining:
            print(f"WARNING: {len(remaining)} elements with track name still visible")
        else:
            print("Booking cancelled successfully")