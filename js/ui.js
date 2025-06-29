document.addEventListener('DOMContentLoaded', () => {
    // === Mobile navigation toggle ===
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const closeNav = document.getElementById('closeNav');
    const nav = document.getElementById('nav');

    hamburgerMenu.addEventListener('click', () => {
        nav.classList.add('active');
    });

    closeNav.addEventListener('click', () => {
        nav.classList.remove('active');
    });

    // === Message input, send button, message container ===
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('messages');

    // === Auto-resize textarea ===
    messageInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });

    // === 한글 입력 중 여부 확인 (IME 문제 방지) ===
    let isComposing = false;

    messageInput.addEventListener('compositionstart', () => {
        isComposing = true;
    });

    messageInput.addEventListener('compositionend', () => {
        isComposing = false;
    });

    // === 메시지 전송 함수 ===
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `
            <div class="message-content">${message}</div>
        `;
        messagesContainer.appendChild(userMessage);

        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate assistant response
        setTimeout(() => {
            const assistantMessage = document.createElement('div');
            assistantMessage.className = 'message assistant';
            assistantMessage.innerHTML = `
                <div class="message-content">메시지를 받았습니다. 처리 중입니다...</div>
            `;
            messagesContainer.appendChild(assistantMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }

    // === 전송 버튼 클릭 ===
    sendBtn.addEventListener('click', sendMessage);

    // === Enter 키 입력 (한글 입력 중에는 막기) ===
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
            e.preventDefault(); // 줄바꿈 방지
            sendMessage();
        }
    });

    const textarea = document.getElementById('messageInput');
    const placeholder = document.querySelector('.custom-placeholder');

    textarea.addEventListener('focus', () => {
        placeholder.style.opacity = '0';
    });

    textarea.addEventListener('blur', () => {
        if (!textarea.value.trim()) {
            placeholder.style.opacity = '1';
        }
    });

    // === Close nav when clicking outside on mobile ===
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!nav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
                nav.classList.remove('active');
            }
        }
    });
});
