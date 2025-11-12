
// 下載彈跳視窗
const download = document.getElementById('downloadModal');

  download.addEventListener('show.bs.modal', function (event) {
    const triggerElement = event.relatedTarget;
    const clickedCard = triggerElement.closest('.card-clickable');
    const filePath = clickedCard.getAttribute('data-file-path');
    const fileName = clickedCard.getAttribute('data-file-name');
    const modalFileNameEl = download.querySelector('#modalFileName');
    const modalDownloadButtonEl = download.querySelector('#modalDownloadButton');
    modalFileNameEl.textContent = fileName; 
    modalDownloadButtonEl.setAttribute('href', filePath);
    modalDownloadButtonEl.setAttribute('download', fileName);
  })




// 律師介紹彈跳視窗
const infoModal = document.getElementById('infoModal');
  infoModal.addEventListener('show.bs.modal', function (event) {
    const triggerElement = event.relatedTarget;
    const clickedCard = triggerElement.closest('.card-clickable');
    const lawyerName = clickedCard.getAttribute('data-lawyer-name');
    const lawyerDesc = clickedCard.getAttribute('data-lawyer-desc');
    const lawyerLink = clickedCard.getAttribute('data-lawyer-link');
    const modalTitleEl = infoModal.querySelector('#infoModalLabel');
    const modalDescEl = infoModal.querySelector('#modalLawyerDesc');
    const modalLinkEl = infoModal.querySelector('#modalLawyerLink');
    modalTitleEl.textContent = lawyerName;
    modalDescEl.textContent = lawyerDesc;
    modalLinkEl.setAttribute('href', lawyerLink);
  });




// 回到頂端

let topButton = document.getElementById("btnBackToTop");
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    topButton.style.display = "flex";
    } else {
    topButton.style.display = "none";
  }
}





// localStorage

(function () {
  const key = 'formData';
  const ids = ['name', 'email', 'law', 'lawyer', 'message', 'privacy'];
  document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el[el.type === 'checkbox' ? 'checked' : 'value'] = data[id] || '';
      }
    });
  });

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const eventType = el.type === 'checkbox' ? 'change' : 'input';
      el.addEventListener(eventType, () => {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        data[id] = el.type === 'checkbox' ? el.checked : el.value;
        localStorage.setItem(key, JSON.stringify(data));
      });
    }
  });
})();

// Bootstrap 5 表單驗證用
document.querySelectorAll('.needs-validation').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const isValid = form.checkValidity();

    if (isValid) {
      alert('我們將在300到500個工作天後與您聯繫！');
      localStorage.removeItem('contactFormData');
      form.reset();
      form.classList.remove('was-validated');
    } else {
      event.stopPropagation();
      form.classList.add('was-validated');
    }
  });
});


// 同意自動打勾

const agreeButton = document.getElementById('agree');
const privacyCheckbox = document.getElementById('privacy');
  agreeButton.addEventListener('click', function() {
    privacyCheckbox.checked = true;
    privacyCheckbox.dispatchEvent(new Event('change'));
  });
  

// 服務流程
const processSteps = [
  document.getElementById('step-1'),
  document.getElementById('step-2'),
  document.getElementById('step-3')
];

const progressBar = document.getElementById('processProgressBar');
const stepData = {
  1: { width: '33.3%', text: '步驟 1: 初步諮詢' },
  2: { width: '66.6%', text: '步驟 2: E案件評估' },
  3: { width: '100%',  text: '步驟 3: 案件執行' }
};

function goToProcessStep(stepNumber) {
  
  processSteps.forEach(step => {
    if (step) {
      step.style.display = 'none';
    }
  });
  
  const targetStep = document.getElementById('step-' + stepNumber);
  if (targetStep) {
    targetStep.style.display = 'block';
  }
  
  const data = stepData[stepNumber];
  if (progressBar && data) {
    progressBar.style.width = data.width;
    progressBar.setAttribute('aria-valuenow', data.width.replace('%', ''));
    progressBar.textContent = data.text;
  }
}

  
