// --- JavaScript 邏輯開始 ---

document.addEventListener('DOMContentLoaded', () => {

  // --- 狀態管理 ---
  let currentStep = 1;
  const totalSteps = 3;

  // --- DOM 元素 ---
  const form = document.getElementById('consultation-form');
  const steps = document.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.progress-step');

  // 導航按鈕
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const navContainer = document.getElementById('form-navigation');

  // 步驟 1 元素
  const categoryRadios = document.querySelectorAll('input[name="category"]');
  const downloadPrompt = document.getElementById('download-prompt');
  const selectedCategoryName = document.getElementById('selected-category-name');
  const mockDownloadMessage = document.getElementById('mock-download-message');
  const step1Error = document.getElementById('step-1-error');

  // 步驟 2 元素
  const description = document.getElementById('description');
  const step2Error = document.getElementById('step-2-error');

  // 步驟 3 元素
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const privacyCheckbox = document.getElementById('privacy');
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const emailError = document.getElementById('email-error');
  const privacyError = document.getElementById('privacy-error');

  // --- 隱私權 Modal (Bootstrap 5.3 初始化) ---
  const privacyModalEl = document.getElementById('privacy-modal');
  // 檢查元素是否存在，避免錯誤
  const privacyModalInstance = privacyModalEl ? new bootstrap.Modal(privacyModalEl) : null;
  const privacyButton = document.getElementById('privacy-button');
  const closeModalBtn = document.getElementById('close-modal'); // 雖然 BS 會自動處理 data-bs-dismiss，保留 ID 以防萬一
  const modalAgreeBtn = document.getElementById('modal-agree-btn');

  // --- 深色模式 (多個按鈕) ---
  const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');

  // --- 函數 ---

  function showStep(stepNumber) {
    steps.forEach(step => step.classList.remove('active'));
    const activeStep = document.getElementById(`step-${stepNumber}`);
    if (activeStep) activeStep.classList.add('active');
    updateNavigationButtons(stepNumber);
    updateProgressBar(stepNumber);
  }

  function updateNavigationButtons(stepNumber) {
    prevBtn.disabled = (stepNumber === 1);

    if (stepNumber === totalSteps) {
      // **[修改]** 使用 d-none 替換 hidden
      nextBtn.classList.add('d-none');
      submitBtn.classList.remove('d-none');
    } else {
      nextBtn.classList.remove('d-none');
      submitBtn.classList.add('d-none');
    }

    if (stepNumber > totalSteps) {
      navContainer.classList.add('d-none');
    } else {
      navContainer.classList.remove('d-none');
    }
  }

  function updateProgressBar(stepNumber) {
    progressSteps.forEach((step, index) => {
      const stepNum = index + 1;
      const circle = step.querySelector('div');
      const text = step.querySelector('span:last-child');
      const stepNumberSpan = step.querySelector('.step-number');
      const stepCheck = step.querySelector('.step-check');

      step.classList.remove('active', 'inactive', 'completed');
      // **[修改]** 替換為 Bootstrap 顏色 class
      circle.classList.remove('text-bg-primary', 'text-bg-success', 'bg-light', 'text-muted');
      text.classList.remove('text-primary', 'text-muted', 'text-dark');
      stepNumberSpan.classList.remove('d-none');
      stepCheck.classList.add('d-none');

      if (stepNum < stepNumber) {
        step.classList.add('completed');
        circle.classList.add('text-bg-success'); // 完成：綠色
        text.classList.add('text-dark');
        stepNumberSpan.classList.add('d-none');
        stepCheck.classList.remove('d-none');
      } else if (stepNum === stepNumber) {
        step.classList.add('active');
        circle.classList.add('text-bg-primary'); // 目前：主題色
        text.classList.add('text-primary');
      } else {
        step.classList.add('inactive');
        circle.classList.add('bg-light', 'text-muted'); // 未來：灰色
        text.classList.add('text-muted');
      }
    });
  }

  function validateStep1() {
    const selected = document.querySelector('input[name="category"]:checked');
    if (!selected) {
      step1Error.classList.remove('d-none'); // **[修改]**
      return false;
    }
    step1Error.classList.add('d-none'); // **[修改]**
    return true;
  }

  function validateStep2() {
    if (description.value.trim() === '') {
      step2Error.classList.remove('d-none'); // **[修改]**
      description.classList.add('is-invalid'); // **[新增]** BS 驗證
      description.focus();
      return false;
    }
    step2Error.classList.add('d-none'); // **[修改]**
    description.classList.remove('is-invalid'); // **[新增]** BS 驗證
    return true;
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validateStep3() {
    let isValid = true;

    // **[修改]** 重置 BS 驗證 class
    [nameError, phoneError, emailError, privacyError].forEach(err => err.classList.add('d-none'));
    [nameInput, phoneInput, emailInput, privacyCheckbox].forEach(el => el.classList.remove('is-invalid'));

    if (nameInput.value.trim() === '') {
      nameError.classList.remove('d-none');
      nameInput.classList.add('is-invalid'); // **[新增]**
      isValid = false;
    }

    if (phoneInput.value.trim() === '') {
      phoneError.classList.remove('d-none');
      phoneInput.classList.add('is-invalid'); // **[新增]**
      isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
      emailError.classList.remove('d-none');
      emailInput.classList.add('is-invalid'); // **[新增]**
      isValid = false;
    }

    if (!privacyCheckbox.checked) {
      privacyError.classList.remove('d-none');
      privacyCheckbox.classList.add('is-invalid'); // **[新增]**
      isValid = false;
    }

    return isValid;
  }

  function handleNextStep() {
    let isValid = false;
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else {
      isValid = true; // 第 3 步的驗證交由提交時處理
    }

    if (isValid && currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
    }
  }

  function handlePrevStep() {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  }

  function handleSubmit() {
    if (validateStep3()) {
      console.log('表單提交成功！');
      console.log('類別:', document.querySelector('input[name="category"]:checked').value);
      console.log('內容:', description.value);
      console.log('姓名:', nameInput.value);
      console.log('電話:', phoneInput.value);
      console.log('Email:', emailInput.value);

      currentStep = totalSteps + 1;
      showStep(currentStep);
      updateProgressBar(currentStep);
    }
  }

  // 提供給超連結的假下載提示
  window.showMockDownloadMessage = () => {
    mockDownloadMessage.classList.remove('d-none'); // **[修改]**
    setTimeout(() => {
      mockDownloadMessage.classList.add('d-none'); // **[修改]**
    }, 3000);
  };

  // **[修改]** Modal 控制 (使用 Bootstrap API)
  function openModal() {
    if (privacyModalInstance) {
      privacyModalInstance.show();
    }
  }
  function closeModal() {
    if (privacyModalInstance) {
      privacyModalInstance.hide();
    }
  }

  // **[修改]** 深色模式 (使用 data-bs-theme)
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme === 'dark');
  }

  // **[修改]** 更新 Bootstrap Icons (使用 d-none)
  function updateThemeIcons(isDark) {
    themeToggles.forEach(toggle => {
      // **[修改]** 選擇 .bi-moon 和 .bi-sun
      const moonIcon = toggle.querySelector('.bi-moon');
      const sunIcon = toggle.querySelector('.bi-sun');
      if (moonIcon && sunIcon) {
        if (isDark) {
          moonIcon.classList.add('d-none');
          sunIcon.classList.remove('d-none');
        } else {
          moonIcon.classList.remove('d-none');
          sunIcon.classList.add('d-none');
        }
      }
    });
  }

  // 綁定事件
  nextBtn.addEventListener('click', handleNextStep);
  prevBtn.addEventListener('click', handlePrevStep);
  submitBtn.addEventListener('click', handleSubmit);

  categoryRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const label = document.querySelector(`label[for="${e.target.id}"]`);
      const categoryName = label.querySelector('.fw-semibold').textContent;
      selectedCategoryName.textContent = categoryName;
      downloadPrompt.classList.remove('d-none'); // **[修改]**
      step1Error.classList.add('d-none'); // **[修改]**
    });
  });

  description.addEventListener('input', () => {
    if (description.value.trim() !== '') {
      step2Error.classList.add('d-none'); // **[修改]**
      description.classList.remove('is-invalid'); // **[新增]**
    }
  });

  [nameInput, phoneInput, emailInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid'); // **[新增]**
      const errorEl = document.getElementById(`${input.id}-error`);
      if (errorEl) errorEl.classList.add('d-none'); // **[修改]**
    });
  });

  privacyCheckbox.addEventListener('change', () => {
    if (privacyCheckbox.checked) {
      privacyError.classList.add('d-none'); // **[修改]**
      privacyCheckbox.classList.remove('is-invalid'); // **[新增]**
    }
  });

  if (privacyButton) {
    privacyButton.addEventListener('click', openModal);
  }
  if (modalAgreeBtn) {
    modalAgreeBtn.addEventListener('click', () => {
      privacyCheckbox.checked = true;
      privacyCheckbox.classList.remove('is-invalid');
      privacyError.classList.add('d-none');
      closeModal(); // BS 5.3 已經會因為 data-bs-dismiss 自動關閉，但保留
    });
  }
  // **[移除]** Modal backdrop click 監聽器 (Bootstrap 會自動處理)

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });

  // **[修改]** 初始化：主題
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    updateThemeIcons(true);
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    updateThemeIcons(false);
  }

  // 初始化：顯示第一步
  showStep(currentStep);
});
// --- JavaScript 邏輯結束 ---