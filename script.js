const copyButton = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");
const emailLink = document.querySelector(".contact-link");

if (copyButton && copyStatus && emailLink) {
  copyButton.addEventListener("click", async () => {
    const email = emailLink.href.replace("mailto:", "");

    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = "Email copied.";
    } catch {
      copyStatus.textContent = "Copy didn't work. You can select the address above.";
    }
  });
}

const categoryButtons = document.querySelectorAll("[data-category]");
const categoryPanels = document.querySelectorAll("[data-category-panel]");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    categoryPanels.forEach((panel) => {
      panel.hidden = panel.id !== button.dataset.category;
    });
  });
});
