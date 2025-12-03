// scripts/form.mjs

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  // FORM PAGE LOGIC
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

  const dogField = document.getElementById("dog-field");
  const dogFromQuery = params.get("dog");
  if (dogField && dogFromQuery) {
    dogField.value = dogFromQuery;
  }

  // THANK YOU PAGE LOGIC
  const summaryMap = {
    name: "summary-name",
    email: "summary-email",
    phone: "summary-phone",
    dog: "summary-dog",
    housing: "summary-housing",
    experience: "summary-experience",
    message: "summary-message",
    timestamp: "summary-timestamp"
  };

  const hasSummaryElements = Object.values(summaryMap).some((id) =>
    document.getElementById(id)
  );

  if (hasSummaryElements) {
    Object.entries(summaryMap).forEach(([paramName, elementId]) => {
      const el = document.getElementById(elementId);
      if (!el) return;

      let value = params.get(paramName);

      if (paramName === "timestamp" && value) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          value = date.toLocaleString();
        }
      }

      el.textContent = value && value.trim() !== "" ? value : "Not provided";
    });
  }
});
