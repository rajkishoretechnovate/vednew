document.addEventListener("DOMContentLoaded", function () {
  // 1. Mobile Navigation Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // 2. Popup Modal Functionality
  const quoteModal = document.getElementById("quoteModal");
  const openModalBtns = document.querySelectorAll(".open-modal-btn");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Open modal when any "Get a Quote" button is clicked
  openModalBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (quoteModal) {
        quoteModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      }
      // Close mobile menu if open
      if (navLinks) navLinks.classList.remove("active");
      if (menuToggle) menuToggle.classList.remove("active");
    });
  });

  // Close modal function
  function closeModal() {
    if (quoteModal) {
      quoteModal.classList.remove("active");
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  }

  // Close when clicking 'X' button
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Close when clicking outside modal content (on overlay)
  if (quoteModal) {
    quoteModal.addEventListener("click", function (e) {
      if (e.target === quoteModal) {
        closeModal();
      }
    });
  }

  // Close modal on ESC key press
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && quoteModal && quoteModal.classList.contains("active")) {
      closeModal();
    }
  });

  // 3. Accordion Toggle for FAQ Section
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (button) {
    button.addEventListener("click", function () {
      const faqItem = this.parentElement;

      // Close all other open accordion items
      document.querySelectorAll(".faq-item").forEach(function (item) {
        if (item !== faqItem) {
          item.classList.remove("active");
        }
      });

      // Toggle current clicked item
      faqItem.classList.toggle("active");
    });
  });
});