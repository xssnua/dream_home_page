document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const successMsg = document.getElementById("formSuccess");
    const submitBtn = document.querySelector(".support__form-btn");

    function showError(input, message) {
        input.classList.add("error");
        let errorMsg = input.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains("error-message")) {
            errorMsg = document.createElement("div");
            errorMsg.className = "error-message";
            input.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }

    function clearError(input) {
        input.classList.remove("error");
        const errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains("error-message")) {
            errorMsg.remove();
        }
    }

    const savedData = JSON.parse(localStorage.getItem("contactFormData"));
    if (savedData) {
        form.name.value = savedData.name || "";
        form.email.value = savedData.email || "";
        form.phone.value = savedData.phone || "";
        form.message.value = savedData.message || "";
    }

    function validateForm() {
        let valid = true;

        const name = form.name.value.trim();
        if (!/^([A-Za-zА-Яа-яё_-]+)$/.test(name) &&
            !/^([A-Za-zА-Яа-яё_]+(\s[A-Za-zА-Яа-яё_]+){1,2})$/.test(name)) {
            valid = false;
            showError(form.name, "Enter a name (1 word) or full name (2-3 words)");
        } else {
            clearError(form.name);
        }

        const email = form.email.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            valid = false;
            showError(form.email, "Enter a valid email address (with @ and a period)");
        } else {
            clearError(form.email);
        }

        const phone = form.phone.value.trim();
        if (!/^\+?\d{10,15}$/.test(phone)) {
            valid = false;
            showError(form.phone, "Enter your phone number in the format +375XXXXXXXXX");
        } else {
            clearError(form.phone);
        }

        const message = form.message.value.trim();
        if (message.length < 5) {
            valid = false;
            showError(form.message, "The message must be at least 5 characters long");
        } else {
            clearError(form.message);
        }

        submitBtn.disabled = !valid;
        return valid;
    }

    form.addEventListener("input", validateForm);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                phone: form.phone.value.trim(),
                message: form.message.value.trim()
            };

            localStorage.setItem("contactFormData", JSON.stringify(formData));

            successMsg.classList.add("show");
            setTimeout(() => successMsg.classList.remove("show"), 3000);
            form.reset();
            submitBtn.disabled = true;
        }
    });

    validateForm();
});
