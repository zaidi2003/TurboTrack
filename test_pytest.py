import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time

BASE = "http://localhost:5173"

def get_toast_text(driver):
    try:
        toast = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CLASS_NAME, "Toastify__toast-body"))
        )
        return toast.text
    except TimeoutException:
        print("ERROR: Toast message not found within timeout period")
        driver.save_screenshot("toast_error.png")

        return ""

def test_incorrect_card_number():
    driver = webdriver.Safari()
    try:
        print(f"Navigating to {BASE}/bookings/sheet/spain/checkout")
        driver.get(f"{BASE}/bookings/sheet/spain/checkout")
        
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "cardNumber"))
        )
        
        print("Filling out incorrect card number + other details.........")

        driver.find_element(By.NAME, "cardNumber").send_keys("12345")
        driver.find_element(By.NAME, "expirationDate").send_keys("12/2025")
        driver.find_element(By.NAME, "cvc").send_keys("123")
        
        try:
            country_dropdown = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.NAME, "country"))
            )
            Select(country_dropdown).select_by_value("PK")
        except (TimeoutException, NoSuchElementException) as e:
            print(f"Country dropdown error: {e}")
        
        submit_button = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.XPATH, "//button[text()='Pay']"))
        )

        submit_button.click()
        
        toast_text = get_toast_text(driver)
        print(f"Toast message: '{toast_text}'")
        
        assert "Invalid card number" in toast_text, f"Test failed: Incorrect card number error not shown. Got: '{toast_text}'"
        print("Test passed: Incorrect card number")

    finally:
        driver.quit()

def test_expired_card():
    driver = webdriver.Safari()
    try:
        print(f"Navigating to {BASE}/bookings/sheet/spain/checkout")
        driver.get(f"{BASE}/bookings/sheet/spain/checkout")
        
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "cardNumber"))
        )
        
        print("Filling out card details.........")

        driver.find_element(By.NAME, "cardNumber").send_keys("4111111111111111")
        driver.find_element(By.NAME, "expirationDate").send_keys("01/2023")
        driver.find_element(By.NAME, "cvc").send_keys("123")
        
        try:
            country_dropdown = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.NAME, "country"))
            )
            Select(country_dropdown).select_by_visible_text("Pakistan")

        except (TimeoutException, NoSuchElementException) as e:
            print(f"Country dropdown error: {e}")
        
        submit_button = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.XPATH, "//button[text()='Pay']"))
        )
        submit_button.click()
        
        toast_text = get_toast_text(driver)
        print(f"Toast message: '{toast_text}'")
        
        assert "Your card has expired" in toast_text, f"Test failed: Expired card error not shown. Got: '{toast_text}'"
        print("Test passed: Expired card")
    finally:
        driver.quit()





        