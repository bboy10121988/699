// 平滑滾動功能
document.addEventListener('DOMContentLoaded', function() {
    // 處理聯繫按鈕點擊
    const formBtn = document.querySelector('.form-btn');
    if (formBtn) {
        formBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // 服務項目切換功能
    const serviceNavItems = document.querySelectorAll('.service-nav-item');
    const serviceDetails = document.querySelectorAll('.service-detail');

    serviceNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活動狀態
            serviceNavItems.forEach(nav => nav.classList.remove('active'));
            serviceDetails.forEach(detail => detail.classList.remove('active'));
            
            // 添加當前活動狀態
            this.classList.add('active');
            
            // 顯示對應的服務詳情
            const serviceId = this.getAttribute('data-service');
            const targetDetail = document.querySelector(`#service-${serviceId}`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });

    // 聯繫側邊欄功能
    const contactToggle = document.getElementById('contactToggle');
    const contactSidebar = document.getElementById('contactSidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const overlay = document.getElementById('overlay');

    function openSidebar() {
        contactToggle.classList.add('active');
        contactSidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        contactToggle.classList.remove('active');
        contactSidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (contactToggle) {
        contactToggle.addEventListener('click', function() {
            if (contactSidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactSidebar.classList.contains('open')) {
            closeSidebar();
        }
    });

    // 表單提交處理
    const contactForm = document.querySelector('.contact-form-content');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 獲取表單資料
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 驗證必填欄位
            const requiredFields = ['name', 'phone', 'area', 'address', 'service-type'];
            let isValid = true;
            let errorMessage = '';
            
            requiredFields.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                    const label = this.querySelector(`label[for="${field}"]`).textContent;
                    errorMessage += `${label} 為必填欄位\n`;
                }
            });
            
            // 驗證電話格式
            const phoneRegex = /^[0-9\-\+\s\(\)]+$/;
            if (data.phone && !phoneRegex.test(data.phone)) {
                isValid = false;
                errorMessage += '電話格式不正確\n';
            }
            
            // 驗證電子郵件格式（如果有填寫）
            if (data.email && data.email.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    isValid = false;
                    errorMessage += '電子郵件格式不正確\n';
                }
            }
            
            if (!isValid) {
                alert('請檢查以下錯誤：\n\n' + errorMessage);
                return;
            }
            
            // 顯示提交中狀態
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = '提交中...';
            submitButton.disabled = true;
            
            // 模擬提交處理（實際使用時需要後端 API）
            setTimeout(() => {
                alert('感謝您的諮詢！我們將於24小時內與您聯繫。');
                
                // 重置表單
                this.reset();
                
                // 恢復按鈕狀態
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // 可以在這裡添加實際的表單提交邏輯
                console.log('表單資料：', data);
                
            }, 2000);
        });
    }

    // 服務項目動畫效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 觀察服務項目和案例項目
    const serviceItems = document.querySelectorAll('.service-item, .portfolio-item');
    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // 電話號碼格式化
    const phoneInput = document.querySelector('#phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 4) {
                if (value.startsWith('09')) {
                    // 手機號碼格式：0900-000-000
                    value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
                } else if (value.startsWith('0')) {
                    // 市話格式：02-0000-0000
                    if (value.length >= 9) {
                        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
                    } else if (value.length >= 6) {
                        value = value.replace(/(\d{2})(\d{4})(\d+)/, '$1-$2-$3');
                    }
                }
            }
            e.target.value = value;
        });
    }

    // 載入 Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
});

// 回到頂部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 建立回到頂部按鈕
window.addEventListener('scroll', function() {
    let scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.setAttribute('aria-label', '回到頂部');
        scrollToTopBtn.onclick = scrollToTop;
        document.body.appendChild(scrollToTopBtn);
        
        // 添加樣式
        const style = document.createElement('style');
        style.textContent = `
            .scroll-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg, #ff6b35, #f7931e);
                color: white;
                border: none;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
                transition: all 0.3s ease;
                opacity: 0;
                visibility: hidden;
                z-index: 1000;
            }
            .scroll-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            .scroll-to-top:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
            }
        `;
        document.head.appendChild(style);
    }
    
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// 案例介紹彈窗功能
const portfolioData = {
    1: {
        title: '水電進場前管溝打鑿・全室清運',
        date: '2024/11/07',
        category: '老屋拆除,老屋拆除工程',
        location: '桃園市中壢區',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '本案為老屋翻新前的全面拆除工程,包含水電管溝打鑿與全室廢棄物清運。',
        details: [
            '施工項目:室內隔間拆除、地磚打鑿、水電管溝開挖',
            '清運內容:建築廢料、裝潢廢料、舊有設備',
            '施工天數:5個工作天',
            '施工特色:精準控制施工範圍,保護結構安全,完整清運不留殘渣'
        ],
        images: [
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ]
    },
    2: {
        title: '全棟建材進料運送',
        date: '2024/11/07',
        category: '建材清運,工地材料運送',
        location: '台北市大安區',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '配合工程進度,提供全棟建材進料運送服務,確保材料準時到位。',
        details: [
            '服務項目:建材搬運進場、樓層運送、定點擺放',
            '運送內容:磁磚、木料、衛浴設備、廚具等',
            '施工天數:3個工作天',
            '施工特色:專業搬運團隊,保護材料完整,配合工程時程彈性調度'
        ],
        images: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ]
    },
    3: {
        title: '裝潢前拆除工程',
        date: '2024/11/07',
        category: '桃園拆除工程,桃園拆除工程推薦',
        location: '桃園市桃園區',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '裝潢前的完整拆除工程,為後續施工打下良好基礎。',
        details: [
            '施工項目:天花板拆除、隔間牆拆除、地板打鑿',
            '清運內容:輕隔間、木作、舊有天花板材料',
            '施工天數:7個工作天',
            '施工特色:徹底拆除不留後患,保護結構體,確保後續工程順利進行'
        ],
        images: [
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ]
    },
    4: {
        title: '透天套房拆除清運',
        date: '2024/10/21',
        category: '桃園套房拆除,桃園透天拆除',
        location: '桃園市中壢區',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '透天套房全棟拆除,包含9間浴室、管溝、管道間等複雜工程。',
        details: [
            '施工項目:9間衛浴拆除、管溝打鑿、管道間拆除、全棟清運',
            '清運內容:衛浴設備、磁磚、管線、隔間材料',
            '施工天數:10個工作天',
            '施工特色:大型透天拆除經驗豐富,管線處理專業,清運效率高'
        ],
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        ]
    }
};

function openPortfolioModal(id) {
    const modal = document.getElementById('portfolioModal');
    const modalBody = document.getElementById('modalBody');
    const data = portfolioData[id];
    
    if (!data) return;
    
    // 生成彈窗內容
    let imagesHTML = '';
    data.images.forEach(img => {
        imagesHTML += `<img src="${img}" alt="${data.title}">`;
    });
    
    let detailsHTML = '';
    data.details.forEach(detail => {
        detailsHTML += `<li>${detail}</li>`;
    });
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${data.title}</h2>
            <div class="modal-meta">
                <span class="modal-date">發佈:${data.date}</span>
                <span class="modal-location">地點:${data.location}</span>
            </div>
            <div class="modal-category">${data.category}</div>
        </div>
        <div class="modal-main-image">
            <img src="${data.image}" alt="${data.title}">
        </div>
        <div class="modal-description">
            <h3>專案概述</h3>
            <p>${data.description}</p>
        </div>
        <div class="modal-details">
            <h3>施工詳情</h3>
            <ul>${detailsHTML}</ul>
        </div>
        <div class="modal-gallery">
            <h3>施工照片</h3>
            <div class="modal-images">${imagesHTML}</div>
        </div>
        <div class="modal-contact">
            <p>如有類似需求,歡迎與我們聯繫</p>
            <a href="tel:0936824717" class="modal-contact-btn">立即來電:0936-824-717</a>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// 點擊彈窗外部關閉
document.addEventListener('click', function(e) {
    const modal = document.getElementById('portfolioModal');
    if (e.target === modal) {
        closePortfolioModal();
    }
});

// ESC 鍵關閉彈窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePortfolioModal();
    }
});

// 表單提交到 Google 試算表
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxgS5PrYjqtQSPX_lGRsF3hMpMek7ju1DCmDC-eKfMGDsBtpNIQDhJDCxIlAdSvkgBkkw/exec';

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // 顯示載入狀態
    submitButton.textContent = '送出中...';
    submitButton.disabled = true;
    
    // 收集表單數據
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        email: formData.get('email') || '',
        message: formData.get('message'),
        timestamp: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    };
    
    try {
        // 發送到 Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // 顯示成功訊息
        alert('感謝您的留言！我們會盡快與您聯繫。');
        
        // 重置表單
        this.reset();
        
    } catch (error) {
        console.error('提交失敗:', error);
        alert('提交失敗，請稍後再試或直接撥打電話 0936-824-717');
    } finally {
        // 恢復按鈕狀態
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// 施工側拍分頁功能
function showGalleryPage(pageNumber) {
    // 隱藏所有頁面
    const pages = document.querySelectorAll('.gallery-page');
    pages.forEach(page => page.classList.remove('active'));
    
    // 顯示指定頁面
    const targetPage = document.getElementById(`gallery-page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新按鈕狀態
    const buttons = document.querySelectorAll('.page-btn');
    buttons.forEach((btn, index) => {
        if (index + 1 === pageNumber) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}
