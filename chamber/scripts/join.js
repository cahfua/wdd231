document.addEventListener("DOMContentLoaded", () => {
  // Hidden timestamp field
  const timestampInput = document.querySelector("#timestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

  // Open modals
  const openButtons = document.querySelectorAll("[data-open-modal]");
  const closeButtons = document.querySelectorAll("[data-close-modal]");

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.openModal;
      const dialog = document.getElementById(modalId);

      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
      }
    });
  });

  // Close modals
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");
      if (dialog) {
        dialog.close();
      }
    });
  });
});
