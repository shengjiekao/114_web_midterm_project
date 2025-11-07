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

  // --- 隱私權 Modal ---
  const privacyModal = document.getElementById('privacy-modal');
  const privacyButton = document.getElementById('privacy-button');
  const closeModalBtn = document.getElementById('close-modal');
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
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    }

    if (stepNumber > totalSteps) {
      navContainer.classList.add('hidden');
    } else {
      navContainer.classList.remove('hidden');
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
      circle.classList.remove('bg-indigo-600', 'dark:bg-indigo-500', 'text-white', 'bg-green-500', 'dark:bg-green-400', 'bg-gray-200', 'dark:bg-gray-600');
      text.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'text-gray-500', 'dark:text-gray-400', 'text-gray-900', 'dark:text-gray-100');
      stepNumberSpan.classList.remove('hidden');
      stepCheck.classList.add('hidden');

      if (stepNum < stepNumber) {
        step.classList.add('completed');
        circle.classList.add('bg-green-500', 'dark:bg-green-400', 'text-white');
        text.classList.add('text-gray-900', 'dark:text-gray-100');
        stepNumberSpan.classList.add('hidden');
        stepCheck.classList.remove('hidden');
      } else if (stepNum === stepNumber) {
        step.classList.add('active');
        circle.classList.add('bg-indigo-600', 'dark:bg-indigo-500', 'text-white');
        text.classList.add('text-indigo-600', 'dark:text-indigo-400');
      } else {
        step.classList.add('inactive');
        circle.classList.add('bg-gray-200', 'dark:bg-gray-600', 'text-gray-500', 'dark:text-gray-300');
        text.classList.add('text-gray-500', 'dark:text-gray-400');
      }
    });
  }

  function validateStep1() {
    const selected = document.querySelector('input[name="category"]:checked');
    if (!selected) {
      step1Error.classList.remove('hidden');
      return false;
    }
    step1Error.classList.add('hidden');
    return true;
  }

  function validateStep2() {
    if (description.value.trim() === '') {
      step2Error.classList.remove('hidden');
      description.focus();
      return false;
    }
    step2Error.classList.add('hidden');
    return true;
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validateStep3() {
    let isValid = true;

    [nameError, phoneError, emailError, privacyError].forEach(err => err.classList.add('hidden'));

    if (nameInput.value.trim() === '') {
      nameError.classList.remove('hidden');
      isValid = false;
    }

    if (phoneInput.value.trim() === '') {
      phoneError.classList.remove('hidden');
      isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
      emailError.classList.remove('hidden');
      isValid = false;
    }

    if (!privacyCheckbox.checked) {
      privacyError.classList.remove('hidden');
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
    mockDownloadMessage.classList.remove('hidden');
    setTimeout(() => {
      mockDownloadMessage.classList.add('hidden');
    }, 3000);
  };

  // Modal 控制
  function openModal() {
    privacyModal.classList.remove('hidden');
  }
  function closeModal() {
    privacyModal.classList.add('hidden');
  }

  // 深色模式
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
  }
  function updateThemeIcons(isDark) {
    themeToggles.forEach(toggle => {
      const moonIcon = toggle.querySelector('ion-icon[name="moon-outline"]');
      const sunIcon = toggle.querySelector('ion-icon[name="sunny-outline"]');
      if (isDark) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
      } else {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
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
      const categoryName = label.querySelector('.font-semibold').textContent;
      selectedCategoryName.textContent = categoryName;
      downloadPrompt.classList.remove('hidden');
      step1Error.classList.add('hidden');
    });
  });

  description.addEventListener('input', () => {
    if (description.value.trim() !== '') {
      step2Error.classList.add('hidden');
    }
  });

  [nameInput, phoneInput, emailInput].forEach(input => {
    input.addEventListener('input', () => {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (errorEl) errorEl.classList.add('hidden');
    });
  });

  privacyCheckbox.addEventListener('change', () => {
    if (privacyCheckbox.checked) {
      privacyError.classList.add('hidden');
    }
  });

  privacyButton.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  modalAgreeBtn.addEventListener('click', () => {
    privacyCheckbox.checked = true;
    privacyError.classList.add('hidden');
    closeModal();
  });
  privacyModal.addEventListener('click', (e) => {
    if (e.target === privacyModal) closeModal();
  });

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });

  // 初始化：主題
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    updateThemeIcons(true);
  } else {
    updateThemeIcons(false);
  }

  // 初始化：顯示第一步
  showStep(currentStep);
});

// --- JavaScript 邏輯結束 ---
