(function() {
    const alertModalHTML = `
    <div id="global-custom-alert" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999999;align-items:center;justify-content:center;transition:all 0.3s ease;">
      <div style="background:#fff;padding:24px;border-radius:8px;max-width:400px;width:90%;direction:rtl;text-align:center;box-shadow:0 6px 20px rgba(0,0,0,0.12);transform:scale(0.9);opacity:0;transition:all 0.3s ease;" id="global-alert-box">
        <h4 style="margin-top:0;font-weight:bold;color:#007c8b;margin-bottom:15px;">تنبيه</h4>
        <div id="global-alert-msg" style="margin-bottom:20px;color:#333;font-size:1.1rem;line-height:1.6;"></div>
        <button id="global-alert-ok" style="background:#007c8b;color:#fff;border:none;border-radius:6px;padding:8px 30px;font-size:1rem;cursor:pointer;font-family:inherit;font-weight:600;transition:0.2s;">حسناً</button>
      </div>
    </div>
    `;
    
    function injectModal() {
        if (!document.getElementById('global-custom-alert')) {
            document.body.insertAdjacentHTML('beforeend', alertModalHTML);
            
            const modal = document.getElementById('global-custom-alert');
            const box = document.getElementById('global-alert-box');
            const okBtn = document.getElementById('global-alert-ok');
            
            const closeAlert = () => { 
                box.style.transform = 'scale(0.9)';
                box.style.opacity = '0';
                setTimeout(() => { modal.style.display = 'none'; }, 200);
            };
            
            okBtn.addEventListener('click', closeAlert);
            modal.addEventListener('click', (e) => {
                if(e.target === modal) closeAlert();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectModal);
    } else {
        injectModal();
    }

    // Override global alert
    window.alert = function(msg) {
        const show = () => {
            const modal = document.getElementById('global-custom-alert');
            const box = document.getElementById('global-alert-box');
            if(modal && box) {
                document.getElementById('global-alert-msg').innerText = msg;
                modal.style.display = 'flex';
                // Trigger reflow for animation
                void modal.offsetWidth; 
                box.style.transform = 'scale(1)';
                box.style.opacity = '1';
                
                // Focus OK button for accessibility
                document.getElementById('global-alert-ok').focus();
            } else {
                console.warn("Alert (Fallback):", msg);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', show);
        } else {
            // Give a small delay in case DOM was just modified
            setTimeout(show, 10);
        }
    };
})();
