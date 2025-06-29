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

    // === �ѱ� �Է� �� ���� Ȯ�� (IME ���� ����) ===
    let isComposing = false;

    messageInput.addEventListener('compositionstart', () => {
        isComposing = true;
    });

    messageInput.addEventListener('compositionend', () => {
        isComposing = false;
    });

    // === �޽��� ���� �Լ� ===
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
                <div class="message-content">�޽����� �޾ҽ��ϴ�. ó�� ���Դϴ�...</div>
            `;
            messagesContainer.appendChild(assistantMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }

    // === ���� ��ư Ŭ�� ===
    sendBtn.addEventListener('click', sendMessage);

    // === Enter Ű �Է� (�ѱ� �Է� �߿��� ����) ===
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
            e.preventDefault(); // �ٹٲ� ����
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
