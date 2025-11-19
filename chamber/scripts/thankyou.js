document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  // Paramater names from form
  const fieldMap = {
    firstName: "summary-firstName",
    lastName: "summary-lastName",
    email: "summary-email",
    phone: "summary-phone",
    organization: "summary-organization",
    membership: "summary-membership",
    timestamp: "summary-timestamp",
  };

  Object.entries(fieldMap).forEach(([paramName, elementId]) => {
    const el = document.getElementById(elementId);
    if (!el) return;

    let value = params.get(paramName);


    if (paramName === "timestamp" && value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        value = date.toLocaleString();
      }
    }

    el.textContent = value || "Not provided";
  });
});
