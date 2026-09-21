/**
 * ============================================================================
 * INTERACTIVE FORM VALIDATION & FEEDBACK
 * Tugas UTS Pemrograman Web - Kriteria JavaScript 4: Form Validation
 * Mahasiswa: Andrasena Nugraha (NIM: 25091397129)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('input-name');
  const emailInput = document.getElementById('input-email');
  const subjectInput = document.getElementById('input-subject');
  const messageInput = document.getElementById('input-message');
  const charCounter = document.getElementById('char-counter');

  // Regex pola email terstandar
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Regex nama (hanya huruf, spasi, tanda petik satu, titik)
  const nameRegex = /^[a-zA-Z\s'.]{3,50}$/;

  /**
   * Validasi Input Nama
   */
  function validateName() {
    const val = nameInput.value.trim();
    const errorEl = document.getElementById('error-name');

    if (val === '') {
      showError(nameInput, errorEl, 'Nama lengkap wajib diisi.');
      return false;
    } else if (val.length < 3) {
      showError(nameInput, errorEl, 'Nama minimal terdiri dari 3 karakter.');
      return false;
    } else if (!nameRegex.test(val)) {
      showError(nameInput, errorEl, 'Nama hanya boleh memuat huruf dan spasi.');
      return false;
    } else {
      showSuccess(nameInput, errorEl);
      return true;
    }
  }

  /**
   * Validasi Input Email
   */
  function validateEmail() {
    const val = emailInput.value.trim();
    const errorEl = document.getElementById('error-email');

    if (val === '') {
      showError(emailInput, errorEl, 'Alamat email wajib diisi.');
      return false;
    } else if (!emailRegex.test(val)) {
      showError(emailInput, errorEl, 'Format email tidak valid (contoh: user@gmail.com).');
      return false;
    } else {
      showSuccess(emailInput, errorEl);
      return true;
    }
  }

  /**
   * Validasi Input Subjek
   */
  function validateSubject() {
    const val = subjectInput.value.trim();
    const errorEl = document.getElementById('error-subject');

    if (val === '') {
      showError(subjectInput, errorEl, 'Subjek pesan tidak boleh kosong.');
      return false;
    } else if (val.length < 4) {
      showError(subjectInput, errorEl, 'Subjek pesan minimal 4 karakter.');
      return false;
    } else {
      showSuccess(subjectInput, errorEl);
      return true;
    }
  }

  /**
   * Validasi Input Pesan
   */
  function validateMessage() {
    const val = messageInput.value.trim();
    const errorEl = document.getElementById('error-message');

    if (val === '') {
      showError(messageInput, errorEl, 'Isi pesan tidak boleh kosong.');
      return false;
    } else if (val.length < 10) {
      showError(messageInput, errorEl, `Pesan terlalu singkat (minimal 10 karakter, sekarang ${val.length}).`);
      return false;
    } else {
      showSuccess(messageInput, errorEl);
      return true;
    }
  }

  /**
   * Menampilkan pesan kesalahan pada input tertentu
   */
  function showError(inputElement, errorElement, message) {
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  /**
   * Menampilkan status valid pada input tertentu
   */
  function showSuccess(inputElement, errorElement) {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  /**
   * Menghapus semua feedback visual
   */
  function clearValidationFeedback() {
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      input.classList.remove('is-valid', 'is-invalid');
    });
    ['error-name', 'error-email', 'error-subject', 'error-message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  }

  // Event Listener Real-Time saat mengetik / kehilangan fokus (Event Handling)
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  subjectInput.addEventListener('input', validateSubject);

  messageInput.addEventListener('input', () => {
    // Perbarui penghitung karakter secara live
    const length = messageInput.value.length;
    if (charCounter) {
      charCounter.textContent = `${length} / 500`;
      charCounter.style.color = length >= 480 ? 'var(--error)' : 'var(--text-dim)';
    }
    validateMessage();
  });

  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  subjectInput.addEventListener('blur', validateSubject);
  messageInput.addEventListener('blur', validateMessage);

  // Penanganan Submit Formulir - Mengirim pesan nyata ke email akademik via AJAX
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const subjectVal = subjectInput.value.trim();
      const messageVal = messageInput.value.trim();
      const submitBtn = document.getElementById('submit-btn');
      const originalBtnText = submitBtn.querySelector('.btn-text').textContent;

      // Status loading tombol submit
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Mengirim ke Email...';

      try {
        const response = await fetch('https://formsubmit.co/ajax/25091397129@mhs.unesa.ac.id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            _subject: `[Portofolio UNESA] ${subjectVal} - dari ${nameVal}`,
            message: messageVal,
            _captcha: 'false',
            _template: 'table'
          })
        });

        const result = await response.json();

        if (response.ok && (result.success === 'true' || result.success === true)) {
          showToastNotification(
            'Pesan Berhasil Terkirim!',
            `Terima kasih, ${nameVal}! Pesan Anda telah berhasil dikirimkan ke email akademik (25091397129@mhs.unesa.ac.id).`
          );
          form.reset();
          clearValidationFeedback();
          if (charCounter) charCounter.textContent = '0 / 500';
        } else if (result.message && result.message.toLowerCase().includes('activation')) {
          // Kasus aktivasi pertama kali pada email akademik
          showToastNotification(
            'Konfirmasi Aktivasi Email Dikirim!',
            `Link aktivasi pertama telah dikirim ke 25091397129@mhs.unesa.ac.id. Cukup klik 'Activate Form' sekali di email tersebut agar form siap menerima pesan seterusnya!`
          );
          form.reset();
          clearValidationFeedback();
          if (charCounter) charCounter.textContent = '0 / 500';
        } else {
          throw new Error(result.message || 'Gagal mengirim pesan.');
        }
      } catch (err) {
        console.warn('Pengiriman via FormSubmit dialihkan ke mailto:', err.message);
        showToastNotification(
          'Membuka Aplikasi Email...',
          `Membuka aplikasi email default untuk mengirim pesan langsung ke 25091397129@mhs.unesa.ac.id.`
        );
        // Fallback langsung membuka mailto
        const mailtoBody = encodeURIComponent(`Halo Andrasena,\n\nNama: ${nameVal}\nEmail: ${emailVal}\nSubjek: ${subjectVal}\n\nPesan:\n${messageVal}`);
        window.location.href = `mailto:25091397129@mhs.unesa.ac.id?subject=${encodeURIComponent(subjectVal)}&body=${mailtoBody}`;
      } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalBtnText;
      }
    } else {
      // Fokus ke elemen pertama yang tidak valid
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });
});

/**
 * Menampilkan Toast Notification interaktif (Kriteria JS 2 & 3: DOM & Style Animation)
 */
function showToastNotification(title, message) {
  const toast = document.getElementById('toast-notification');
  const titleEl = document.getElementById('toast-title');
  const msgEl = document.getElementById('toast-message');
  const closeBtn = document.getElementById('toast-close');

  if (!toast) return;

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;

  toast.classList.add('show');

  const closeToast = () => {
    toast.classList.remove('show');
  };

  if (closeBtn) {
    closeBtn.onclick = closeToast;
  }

  // Otomatis menutup setelah 5.5 detik
  setTimeout(closeToast, 5500);
}
