document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("siteHeader");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 15);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const contactSelects = document.querySelectorAll(".contact-select");

  contactSelects.forEach(function (select) {
    const trigger = select.querySelector(".contact-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function (event) {
      event.stopPropagation();

      const isOpen = select.classList.contains("open");

      contactSelects.forEach(function (item) {
        item.classList.remove("open");

        const itemTrigger = item.querySelector(".contact-trigger");

        if (itemTrigger) {
          itemTrigger.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        select.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", function () {
    contactSelects.forEach(function (select) {
      select.classList.remove("open");

      const trigger = select.querySelector(".contact-trigger");

      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.querySelectorAll(".contact-menu").forEach(function (menu) {
    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

  document.querySelectorAll("#mainNav .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      const nav = document.getElementById("mainNav");

      if (
        nav &&
        nav.classList.contains("show") &&
        typeof bootstrap !== "undefined"
      ) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  const waModal = document.getElementById("waModal");
  const waClose = document.getElementById("waClose");
  const waNumber1 = document.getElementById("waNumber1");
  const waNumber2 = document.getElementById("waNumber2");

  let selectedService = "";
  let selectedProduct = "";
  let waModalOpener = null;

  const whatsappNumbers = {
    first: "966567802083",
    second: "966545651404"
  };

  function openWaModal(opener) {
    if (!waModal) return;

    waModalOpener = opener || document.activeElement;
    waModal.classList.add("show");
  }

  function closeWaModal() {
    if (!waModal) return;

    waModal.classList.remove("show");

    if (
      waModalOpener &&
      waModalOpener.isConnected &&
      typeof waModalOpener.focus === "function"
    ) {
      waModalOpener.focus({ preventScroll: true });
    }
  }

  document.querySelectorAll(".service-btn").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const card = button.closest(".service-card");
      const heading = card ? card.querySelector("h3") : null;

      selectedService = heading
        ? heading.textContent.trim()
        : "الخدمات";

      selectedProduct = "";

      openWaModal(button);
    });
  });

  document.querySelectorAll(".whatsapp-product").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      selectedProduct = this.dataset.product || "المنتج";
      selectedService = "";

      openWaModal(this);
    });
  });

  if (waClose) {
    waClose.addEventListener("click", closeWaModal);
  }

  if (waModal) {
    waModal.addEventListener("click", function (event) {
      if (event.target === waModal) {
        closeWaModal();
      }
    });
  }

  function openWhatsApp(phone) {
    let message;

    if (selectedProduct) {
      message =
        "مرحباً، أريد الاستفسار عن " +
        selectedProduct +
        " من مؤسسة لؤلؤة دور. أرجو تزويدي بالتفاصيل والأسعار.";
    } else {
      message =
        "مرحباً، أريد الاستفسار عن خدمة " +
        selectedService +
        " من مؤسسة لؤلؤة دور.";
    }

    const url =
      "https://wa.me/" +
      phone +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");

    closeWaModal();

    selectedProduct = "";
    selectedService = "";
  }

  if (waNumber1) {
    waNumber1.addEventListener("click", function (event) {
      event.preventDefault();
      openWhatsApp(whatsappNumbers.first);
    });
  }

  if (waNumber2) {
    waNumber2.addEventListener("click", function (event) {
      event.preventDefault();
      openWhatsApp(whatsappNumbers.second);
    });
  }

  document.querySelectorAll(".maintenance-whatsapp").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const card = button.closest(".maintenance-card");
      const heading = card ? card.querySelector("h3") : null;

      selectedService = heading
        ? heading.textContent.trim()
        : "الصيانة وخدمات ما بعد البيع";

      selectedProduct = "";

      openWaModal(button);
    });
  });

  const yearElement = document.getElementById("ldFooterYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const picker = document.getElementById("ldWaPicker");
  const contactForm = document.getElementById("ldContactForm");

  if (picker) {
    let whatsappMessage = "";
    let pickerOpener = null;

    if (!picker.classList.contains("is-open")) {
      picker.setAttribute("aria-hidden", "true");
      picker.setAttribute("inert", "");
    } else {
      picker.setAttribute("aria-hidden", "false");
      picker.removeAttribute("inert");
    }

    function openPicker(action, opener) {
      pickerOpener = opener || document.activeElement;

      picker.dataset.action = action || "whatsapp";

      picker.removeAttribute("inert");
      picker.setAttribute("aria-hidden", "false");
      picker.classList.add("is-open");
    }

    function closePicker() {
      if (picker.contains(document.activeElement)) {
        if (
          pickerOpener &&
          pickerOpener.isConnected &&
          !picker.contains(pickerOpener)
        ) {
          pickerOpener.focus({ preventScroll: true });
        } else {
          document.activeElement.blur();
        }
      }

      picker.classList.remove("is-open");
      picker.setAttribute("aria-hidden", "true");
      picker.setAttribute("inert", "");
    }

    document.querySelectorAll(".ld-footer-choice").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();

        const action = button.dataset.contactAction || "whatsapp";

        openPicker(action, button);
      });
    });

    if (contactForm) {
      contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const nameElement = document.getElementById("ldContactName");
        const phoneElement = document.getElementById("ldContactPhone");
        const serviceElement = document.getElementById("ldContactService");
        const messageElement = document.getElementById("ldContactMessage");

        const name = nameElement ? nameElement.value.trim() : "";
        const phone = phoneElement ? phoneElement.value.trim() : "";
        const service = serviceElement ? serviceElement.value : "";
        const message = messageElement
          ? messageElement.value.trim()
          : "";

        whatsappMessage = [
          "مرحباً، لدي استفسار جديد من موقع مؤسسة لؤلؤة دور.",
          "",
          "الاسم: " + name,
          "رقم الجوال: " + phone,
          "الخدمة المطلوبة: " + service,
          "تفاصيل الطلب: " + (message || "لا توجد تفاصيل إضافية")
        ].join("\n");

        openPicker("form", document.activeElement);
      });
    }

    picker.querySelectorAll("[data-wa-close]").forEach(function (element) {
      element.addEventListener("click", function (event) {
        event.preventDefault();
        closePicker();
      });
    });

    picker.querySelectorAll("[data-wa-number]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();

        const action = picker.dataset.action || "whatsapp";
        const localNumber = button.dataset.waNumber;
        const internationalNumber = button.dataset.waInternational;

        if (action === "call") {
          if (!localNumber) return;

          closePicker();
          window.location.href = "tel:" + localNumber;

          return;
        }

        if (!internationalNumber) {
          closePicker();
          return;
        }

        let url = "https://wa.me/" + internationalNumber;

        if (action === "form" && whatsappMessage) {
          url += "?text=" + encodeURIComponent(whatsappMessage);
        }

        const whatsappWindow = window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );

        if (whatsappWindow) {
          whatsappWindow.opener = null;

          if (action === "form" && contactForm) {
            contactForm.reset();
            whatsappMessage = "";
          }
        }

        closePicker();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        picker.classList.contains("is-open")
      ) {
        closePicker();
      }
    });

    picker.addEventListener("click", function (event) {
      if (event.target === picker) {
        closePicker();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      waModal &&
      waModal.classList.contains("show")
    ) {
      closeWaModal();
    }
  });

  const floatingWhatsApp = document.getElementById("floatingWhatsApp");
  const floatingPhone = document.getElementById("floatingPhone");
  const phoneModal = document.getElementById("phoneModal");
  const phoneClose = document.getElementById("phoneClose");

  if (floatingWhatsApp && waModal) {
    floatingWhatsApp.addEventListener("click", function () {
      openWaModal(floatingWhatsApp);
    });
  }

  if (floatingPhone && phoneModal) {
    floatingPhone.addEventListener("click", function () {
      phoneModal.classList.add("show");
    });
  }

  if (phoneClose && phoneModal) {
    phoneClose.addEventListener("click", function () {
      phoneModal.classList.remove("show");
    });
  }

  if (phoneModal) {
    phoneModal.addEventListener("click", function (event) {
      if (event.target === phoneModal) {
        phoneModal.classList.remove("show");
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && phoneModal) {
      phoneModal.classList.remove("show");
    }
  });

  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        backToTop.classList.toggle("show", window.scrollY > 300);
      },
      { passive: true }
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
 