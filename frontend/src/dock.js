// Liquid Glass Bottom Dock Logic
document.addEventListener('DOMContentLoaded', () => {
  initDock();
});

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initDock();
}

function initDock() {
  const dock = document.getElementById('mobile-bottom-dock');
  if (!dock || dock.dataset.initialized === 'true') return;
  dock.dataset.initialized = 'true';

  const btnAi = document.getElementById('dock-item-ai');
  const btnRfq = document.getElementById('dock-item-rfq');
  const btnContact = document.getElementById('dock-item-contact');

  const buttonsView = document.getElementById('dock-buttons-view');
  const searchView = document.getElementById('dock-search-view');
  const searchInput = document.getElementById('dock-search-input');
  const btnSearchClose = document.getElementById('dock-search-close');
  const btnSearchSubmit = document.getElementById('dock-search-submit');
  const btnSearchMic = document.getElementById('dock-search-mic');

  const modalRfq = document.getElementById('dock-rfq-modal');
  const modalContact = document.getElementById('dock-contact-modal');

  let typingTimer = null;

  function adjustDockTextareaHeight() {
    if (!searchInput || !searchView) return;
    searchInput.style.height = 'auto';
    const scrollH = searchInput.scrollHeight;
    const hasNewline = searchInput.value.includes('\n');
    const isMulti = (hasNewline || scrollH > 32) && searchInput.value.trim().length > 0;

    if (isMulti) {
      searchView.classList.add('is-multiline');
      dock.classList.add('is-multiline');
      const targetH = Math.min(scrollH, 160);
      searchInput.style.height = `${targetH}px`;
      searchInput.style.overflowY = scrollH > 160 ? 'auto' : 'hidden';
    } else {
      searchView.classList.remove('is-multiline');
      dock.classList.remove('is-multiline');
      searchInput.style.height = '26px';
      searchInput.style.overflowY = 'hidden';
    }
  }

  // Expand Dock into Search Bar from Center
  const expandDockSearch = () => {
    dock.classList.add('dock-expanded');
    if (buttonsView) buttonsView.classList.add('hidden');
    if (searchView) {
      searchView.classList.remove('hidden');
      searchView.classList.add('dock-form-grid');
    }
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 120);
  };

  // Collapse Search Bar back to 3 Buttons
  const collapseDockSearch = () => {
    dock.classList.remove('dock-expanded', 'is-focused', 'is-typing', 'is-multiline');
    if (typingTimer) clearTimeout(typingTimer);
    if (searchView) {
      searchView.classList.add('hidden');
      searchView.classList.remove('dock-form-grid', 'is-multiline');
    }
    if (searchInput) {
      searchInput.value = '';
      searchInput.style.height = '26px';
      searchInput.style.overflowY = 'hidden';
    }
    if (buttonsView) buttonsView.classList.remove('hidden');
    if (!dock.matches(':hover')) {
      dock.classList.remove('dock-ai-active');
    }
  };

  // Toggle Search expansion on UDO AI click
  if (btnAi) {
    btnAi.addEventListener('click', (e) => {
      e.preventDefault();
      expandDockSearch();
    });

    btnAi.addEventListener('mouseenter', () => {
      dock.classList.add('dock-ai-active');
    });
    btnAi.addEventListener('mouseleave', () => {
      if (!dock.classList.contains('dock-expanded')) {
        dock.classList.remove('dock-ai-active');
      }
    });
    btnAi.addEventListener('focus', () => {
      dock.classList.add('dock-ai-active');
    });
    btnAi.addEventListener('blur', () => {
      if (!dock.classList.contains('dock-expanded')) {
        dock.classList.remove('dock-ai-active');
      }
    });
    btnAi.addEventListener('touchstart', () => {
      dock.classList.add('dock-ai-active');
    }, { passive: true });
  }

  // Close search on close button click
  if (btnSearchClose) {
    btnSearchClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      collapseDockSearch();
    });
  }

  // Handle typing inside Search Input (toggle Submit / Mic & pacing states)
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      dock.classList.add('is-focused');
    });

    searchInput.addEventListener('blur', () => {
      dock.classList.remove('is-focused', 'is-typing');
      if (typingTimer) clearTimeout(typingTimer);
    });

    searchInput.addEventListener('input', () => {
      adjustDockTextareaHeight();
      dock.classList.add('is-typing');
      if (typingTimer) clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        dock.classList.remove('is-typing');
      }, 2000);

      const val = searchInput.value.trim();
      if (val.length > 0) {
        if (btnSearchSubmit) {
          btnSearchSubmit.classList.remove('hidden');
          btnSearchSubmit.classList.add('flex');
        }
        if (btnSearchMic) {
          btnSearchMic.classList.add('hidden');
        }
      } else {
        if (btnSearchSubmit) {
          btnSearchSubmit.classList.add('hidden');
          btnSearchSubmit.classList.remove('flex');
        }
        if (btnSearchMic) {
          btnSearchMic.classList.remove('hidden');
        }
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      // Cmd + Enter (Mac) or Ctrl + Enter: Insert newline and expand
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        const start = searchInput.selectionStart;
        const end = searchInput.selectionEnd;
        searchInput.value = searchInput.value.substring(0, start) + '\n' + searchInput.value.substring(end);
        searchInput.selectionStart = searchInput.selectionEnd = start + 1;
        adjustDockTextareaHeight();
        searchInput.dispatchEvent(new Event('input'));
        return;
      }

      // Shift + Enter: inserts newline naturally in textarea, adjust height on next tick
      if (e.key === 'Enter' && e.shiftKey) {
        setTimeout(adjustDockTextareaHeight, 0);
        return;
      }

      // Enter alone (without Shift, Cmd, Ctrl, Alt): Submit search
      if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const val = searchInput.value.trim();
        if (val.length > 0) {
          window.location.href = `/chat.html?q=${encodeURIComponent(val)}`;
        }
      }
    });
  }

  // Handle Search Submission -> Navigate to /chat.html?q=...
  if (searchView) {
    searchView.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = searchInput ? searchInput.value.trim() : '';
      if (q) {
        window.location.href = `/chat.html?q=${encodeURIComponent(q)}`;
      } else {
        window.location.href = '/chat.html';
      }
    });
  }

  // Mic speech recognition
  if (btnSearchMic) {
    btnSearchMic.addEventListener('click', (e) => {
      e.preventDefault();
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition && searchInput) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'th-TH';
          recognition.onstart = () => {
            searchInput.placeholder = 'กำลังฟังเสียงของคุณ...';
          };
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            window.location.href = `/chat.html?q=${encodeURIComponent(transcript)}`;
          };
          recognition.onerror = () => {
            searchInput.placeholder = 'ลองถามอะไรก็ได้';
          };
          recognition.onend = () => {
            searchInput.placeholder = 'ลองถามอะไรก็ได้';
          };
          recognition.start();
        } catch (err) {
          window.location.href = '/chat.html';
        }
      } else {
        window.location.href = '/chat.html';
      }
    });
  }

  // Click outside to collapse search
  document.addEventListener('click', (e) => {
    if (dock.classList.contains('dock-expanded')) {
      if (!dock.contains(e.target)) {
        collapseDockSearch();
      }
    }
  });

  // Modal Open / Close Logic
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    const card = modal.querySelector('.dock-modal-card');
    if (card) {
      card.classList.remove('translate-y-8', 'sm:translate-y-4', 'scale-95');
    }
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    const card = modal.querySelector('.dock-modal-card');
    if (card) {
      card.classList.add('translate-y-8', 'sm:translate-y-4', 'scale-95');
    }
  };

  if (btnRfq && modalRfq) {
    btnRfq.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modalRfq);
    });
  }

  if (btnContact && modalContact) {
    btnContact.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modalContact);
    });
  }

  // Close modals on clicking backdrop or close button
  document.querySelectorAll('.dock-modal-close, .dock-modal-backdrop').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(modalRfq);
      closeModal(modalContact);
    });
  });

  // ESC key to close search or modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (dock.classList.contains('dock-expanded')) {
        collapseDockSearch();
      }
      closeModal(modalRfq);
      closeModal(modalContact);
    }
  });
}
