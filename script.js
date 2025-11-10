
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
(function() {

    // 1. 定義 localStorage 的 Key 和所有表單欄位的 ID
    const storageKey = 'contactFormData';
    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        law: document.getElementById('law'),
        lawyer: document.getElementById('lawyer'),
        message: document.getElementById('message'),
        privacy: document.getElementById('privacy')
    };

    // --- 功能 1: 網頁載入時，讀取舊資料 ---
    function loadFormData() {
        const savedData = localStorage.getItem(storageKey);
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                
                // 將儲存的資料填回對應的欄位
                fields.name.value = data.name || '';
                fields.email.value = data.email || '';
                fields.law.value = data.law || '';
                fields.lawyer.value = data.lawyer || '';
                fields.message.value = data.message || '';
                fields.privacy.checked = data.privacy || false;
                

            } catch (e) {
                console.error('解析 localStorage 資料失敗:', e);
                localStorage.removeItem(storageKey); // 如果資料格式錯誤，就清除它
            }
        }
    }

    
    // --- 功能 2: 使用者輸入時，儲存新資料 ---
    function saveFormData() {
        // 1. 建立一個物件來儲存所有欄位的值
        const data = {
            name: fields.name.value,
            email: fields.email.value,
            law: fields.law.value,
            lawyer: fields.lawyer.value,
            message: fields.message.value,
            privacy: fields.privacy.checked // checkbox 是用 .checked
        };
        
        // 2. 把這個物件轉成 JSON 字串，存到 localStorage
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    // --- 綁定事件 ---
    
    // 1. 綁定「網頁載入完成」事件
    //    (DOMContentLoaded 比 window.onload 更快)
    document.addEventListener('DOMContentLoaded', loadFormData);

    // 2. 綁定「輸入」事件到所有欄位
    //    (Object.values 會取得 fields 物件中所有的元素)
    Object.values(fields).forEach(field => {
        // 根據欄位類型，綁定不同事件
        if (field.type === 'checkbox') {
            field.addEventListener('change', saveFormData); // 勾選框用 'change'
        } else {
            field.addEventListener('input', saveFormData);  // 文字/下拉選單用 'input'
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
  
