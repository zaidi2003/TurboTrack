import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE = "http://localhost:5173"

def get_toast_text(driver):
    toast = WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "Toastify__toast-body"))
    )
    return toast.text


def test_empty_all_fields_shows_error(driver):
    driver.get(f"{BASE}/reset-password/ANY_TOKEN")
    driver.find_element(By.TAG_NAME, "button").click()
    assert "Please fill in all fields!" in get_toast_text(driver)



def test_reset_password_with_expired_token_shows_error(driver):
    expired_token = "EXPIRED_TOKEN"
    driver.get(f"{BASE}/reset-password/{expired_token}")
    # fill all fields to bypass front‑end validation
    driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Current Password"]').send_keys("oldpass")
    driver.find_element(By.CSS_SELECTOR, 'input[placeholder="New Password"]').send_keys("Newpass123!")
    driver.find_element(By.CSS_SELECTOR, 'input[placeholder="Confirm New Password"]').send_keys("Newpass123!")
    driver.find_element(By.TAG_NAME, "button").click()
    assert "Invalid or expired token" in get_toast_text(driver)
