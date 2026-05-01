document.addEventListener('DOMContentLoaded', () => {
  const chatHTML = `
    <div id="chat-widget" class="chat-widget">
      <div id="chat-bubble" class="chat-bubble">
        <span class="chat-icon">💬</span>
      </div>
      <div id="chat-window" class="chat-window" style="display: none;">
        <div class="chat-header">
          <h4>The Machine Support</h4>
          <button id="close-chat">×</button>
        </div>
        <div class="chat-body">
          <p>Leave us a message and we'll get back to you asap.</p>
          <form id="chat-form">
            <input type="text" id="chat-name" placeholder="Your Name" required>
            <input type="email" id="chat-email" placeholder="Your Email" required>
            <textarea id="chat-message" placeholder="Ask us anything..." required></textarea>
            <button type="submit" class="btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);

  const bubble = document.getElementById('chat-bubble');
  const window = document.getElementById('chat-window');
  const close = document.getElementById('close-chat');

  bubble.addEventListener('click', () => {
    window.style.display = 'flex';
    bubble.style.display = 'none';
  });

  close.addEventListener('click', () => {
    window.style.display = 'none';
    bubble.style.display = 'flex';
  });
});
