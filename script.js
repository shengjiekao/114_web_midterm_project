
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

  // 所有欄位 ID
  const ids = ['name', 'email', 'law', 'lawyer', 'message', 'privacy'];

  // 讀取資料
  document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el[el.type === 'checkbox' ? 'checked' : 'value'] = data[id] || '';
      }
    });
  });

  // 儲存資料
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

const form = document.querySelectorAll('.needs-validation');

Array.from(form).forEach(form => {
  form.addEventListener('submit', event => {
    
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      
    } else {
      event.preventDefault(); 
      
      alert('我們將在300到500個工作天後與您聯繫！');
      localStorage.removeItem('contactFormData');
      form.reset();
      form.classList.remove('was-validated');
    }

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
    }
    
  }, false); 
});


// 同意自動打勾

const agreeButton = document.getElementById('agree');
const privacyCheckbox = document.getElementById('privacy');
  agreeButton.addEventListener('click', function() {
    privacyCheckbox.checked = true;
    privacyCheckbox.dispatchEvent(new Event('change'));
  });


//深色模式
// --- 這是「深色模式切換按鈕」用的 JS ---
(function() {
    // 1. 取得需要的元素
    const htmlEl = document.documentElement;
    const themeToggler = document.getElementById('theme-toggler');
    const themeIcon = document.getElementById('theme-icon');

    if (!themeToggler || !themeIcon) {
        return; // 如果找不到按鈕，就停止
    }

    // 2. 輔助函式：更新圖示
    const updateIcon = (theme) => {
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        }
    };

    // 3. 【重要】頁面載入時，設定「目前」的圖示
    //    (讀取 <head> 腳本已設定好的 'data-bs-theme')
    const currentTheme = htmlEl.getAttribute('data-bs-theme');
    updateIcon(currentTheme);

    // 4. 監聽「點擊」事件
    themeToggler.addEventListener('click', (e) => {
        e.preventDefault(); // 阻止 <a> 連結跳轉
        
        // 取得目前的主題，並決定新主題
        const currentTheme = htmlEl.getAttribute('data-bs-theme');
        const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
        
        // 1. 更新 <html> 屬性
        htmlEl.setAttribute('data-bs-theme', newTheme);
        
        // 2. 儲存到 localStorage
        localStorage.setItem('theme', newTheme);
        
        // 3. 更新按鈕圖示
        updateIcon(newTheme);
    });

})();  
  
