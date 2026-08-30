document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatMessages = document.getElementById('chat-messages');
  const clearChatBtn = document.getElementById('clear-chat-btn');
  const promptChips = document.querySelectorAll('.chip');

  // Backend API URL - auto-detect origin if served from FastAPI or fallback to 8000
  const API_URL = (window.location.port === '8000' || window.location.port === '')
    ? '/chat'
    : 'http://127.0.0.1:8000/chat';

  // Handle form submission
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    sendMessage(message);
    userInput.value = '';
  });

  // Handle quick prompt chips
  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-question');
      if (question) {
        sendMessage(question);
      }
    });
  });

  // Handle Clear Chat
  clearChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = `
      <div class="message assistant-message">
        <div class="message-avatar">
          <i class="fa-solid fa-robot"></i>
        </div>
        <div class="message-content">
          <div class="sender-name">Candidate Assistant</div>
          <div class="text">
            Chat cleared! Ask any question about <strong>Parth Rastogi</strong> to begin the interview.
          </div>
          <div class="message-time">${getCurrentTime()}</div>
        </div>
      </div>
    `;
  });

  async function sendMessage(question) {
    // Render User Message
    appendMessage(question, 'user');

    // Show Typing Indicator
    const typingElement = showTypingIndicator();
    scrollToBottom();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Remove typing indicator
      typingElement.remove();

      // Render Assistant Message
      const answer = data.answer || "I don't have enough information to answer that.";
      appendMessage(answer, 'assistant');

    } catch (error) {
      console.error('Error fetching chat response:', error);
      typingElement.remove();
      appendMessage('⚠️ Error connecting to candidate backend server. Please make sure the FastAPI server is running on port 8000.', 'assistant');
    }

    scrollToBottom();
  }

  function appendMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);

    const isUser = sender === 'user';
    const avatarHtml = isUser 
      ? `<div class="message-avatar"><i class="fa-solid fa-user"></i></div>` 
      : `<div class="message-avatar"><i class="fa-solid fa-robot"></i></div>`;

    const senderName = isUser ? 'HR Interviewer' : 'Candidate Assistant';

    // Parse Markdown if marked is available
    const formattedContent = (typeof marked !== 'undefined' && !isUser) 
      ? marked.parse(content) 
      : escapeHtml(content);

    messageDiv.innerHTML = `
      ${avatarHtml}
      <div class="message-content">
        <div class="sender-name">${senderName}</div>
        <div class="text">${formattedContent}</div>
        <div class="message-time">${getCurrentTime()}</div>
      </div>
    `;

    chatMessages.appendChild(messageDiv);
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'assistant-message', 'typing-indicator');

    typingDiv.innerHTML = `
      <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="message-content">
        <div class="sender-name">Candidate Assistant</div>
        <div class="text typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;

    chatMessages.appendChild(typingDiv);
    return typingDiv;
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }
});
