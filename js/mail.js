document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    formData.append("access_key", "da720ba4-a2c1-4700-8767-b1ac748c50e");
    fetch("../api/mail.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "success") {
          showPopup();
        } else {
          console.error("Error sending form!");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });

function showPopup() {
  alert(
    "Форму успішно надіслано! Дякуємо! Протягом найближчого часу ми звʼяжемось з Вами."
  );
}
