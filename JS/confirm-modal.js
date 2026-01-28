// Shared confirm modal used by admin pages. Defines window.openDeleteConfirm(message, onConfirm)
(function(){
  if(window.openDeleteConfirm) return; // already present
  const modal = document.createElement('div');
  modal.id = 'confirm-delete-modal';
  modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:99999;align-items:center;justify-content:center';
  modal.innerHTML = `
    <div style="background:#fff;padding:18px;border-radius:8px;max-width:520px;width:100%;direction:rtl;text-align:right;box-shadow:0 6px 20px rgba(0,0,0,0.12);">
      <h5 style="margin-top:0">تأكيد الحذف</h5>
      <div class="modal-msg" style="margin-bottom:12px;color:#333"></div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button class="btn btn-secondary modal-cancel">إلغاء</button>
        <button class="btn btn-danger modal-ok">حذف</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  function cleanupHandlers(ok, cancel, okHandler, cancelHandler){
    ok.removeEventListener('click', okHandler);
    cancel.removeEventListener('click', cancelHandler);
    modal.style.display = 'none';
  }

  window.openDeleteConfirm = function(message, onConfirm){
    const msgEl = modal.querySelector('.modal-msg');
    const ok = modal.querySelector('.modal-ok');
    const cancel = modal.querySelector('.modal-cancel');
    msgEl.textContent = message || '';
    modal.style.display = 'flex';
    const okHandler = async function(){ cleanupHandlers(ok, cancel, okHandler, cancelHandler); try{ await onConfirm(); }catch(e){ console.error(e); } };
    const cancelHandler = function(){ cleanupHandlers(ok, cancel, okHandler, cancelHandler); };
    ok.addEventListener('click', okHandler);
    cancel.addEventListener('click', cancelHandler);
    modal.onclick = (e)=>{ if(e.target === modal) cleanupHandlers(ok, cancel, okHandler, cancelHandler); };
  };
})();
