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
          showSubmitionPopup();
        } else {
          console.error("Error sending form!");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });
function showSubmitionPopup() {
  let message;
  const lang = document.documentElement.lang;

  switch (lang) {
    case "ru":
      message =
        "Форму успешно отправлено! Спасибо! В ближайшее время мы свяжемся с вами.";
      break;
    case "de":
      message =
        "Das Formular wurde erfolgreich gesendet! Vielen Dank! Wir werden uns in Kürze mit Ihnen in Verbindung setzen.";
      break;
    default:
      message =
        "Form submitted successfully! Thank you! We will get in touch with you shortly.";
  }

  alert(message);
}
