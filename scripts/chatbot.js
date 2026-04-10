class ChatBot {
  constructor() {
    this.isOpen = false;
    this.isTyping = false;
  }

  init() {
    this.toggleBtn = document.getElementById('chatbotToggle');
    this.closeBtn = document.getElementById('chatbotClose');
    this.window = document.getElementById('chatbotWindow');
    this.messages = document.getElementById('chatbotMessages');
    this.typing = document.getElementById('chatbotTyping');
    this.input = document.getElementById('chatbotInput');
    this.sendBtn = document.getElementById('chatbotSend');
    this.clearBtn = document.getElementById('chatbotClear');

    if (!this.toggleBtn || !this.messages) return;

    // Toggle
    this.toggleBtn.addEventListener('click', () => this.toggle());
    this.closeBtn.addEventListener('click', () => this.toggle());

    // Send
    this.sendBtn.addEventListener('click', () => this.send());
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.send();
      }
    });

    // Auto-height textarea
    this.input.addEventListener('input', () => {
      this.input.style.height = 'auto';
      this.input.style.height = Math.min(this.input.scrollHeight, 80) + 'px';
    });

    // Clear history
    this.clearBtn.addEventListener('click', () => this.clear());

    // Load saved messages
    this.loadHistory();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.window.classList.toggle('open', this.isOpen);
    this.toggleBtn.classList.toggle('open', this.isOpen);
    this.toggleBtn.setAttribute('aria-expanded', this.isOpen);

    if (this.isOpen) {
      this.input.focus();
    }
  }

  send() {
    const text = this.input.value.trim();
    if (!text || this.isTyping) return;

    this.addMessage(text, 'user');
    this.input.value = '';
    this.input.style.height = 'auto';

    this.showTyping();
    this.isTyping = true;

    const delay = 500 + Math.random() * 1000;
    setTimeout(() => {
      this.hideTyping();
      const reply = this.getReply(text.toLowerCase());
      this.addMessage(reply, 'bot');
      this.isTyping = false;
      this.saveHistory();
    }, delay);
  }

  addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `chatbot__message ${sender}`;
    msg.innerHTML = `<p>${text}</p>`;
    this.messages.appendChild(msg);
    this.messages.scrollTop = this.messages.scrollHeight;
    this.saveHistory();
  }

  showTyping() {
    this.typing.classList.add('active');
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  hideTyping() {
    this.typing.classList.remove('active');
  }

  getReply(msg) {
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "👋 Hello! Welcome to Dream Home. How can I help you today?";
    }
    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
      return "💰 Our property prices start from $850,000. Would you like details on a specific listing?";
    }
    if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('call')) {
      return "📞 You can reach us at support@dreamhome.com or call +1 (555) 123-4567.";
    }
    if (msg.includes('house') || msg.includes('home') || msg.includes('property') || msg.includes('buy')) {
      return "🏡 We have 8,000+ properties available! Check our portfolio section or tell me what type of property you're looking for.";
    }
    if (msg.includes('agent') || msg.includes('realtor')) {
      return "👤 We have 2,000+ trusted agents ready to help. Would you like to be connected with one?";
    }
    if (msg.includes('thank')) {
      return "😊 You're welcome! Let me know if you need anything else.";
    }
    if (msg.includes('help') || msg.includes('support') || msg.includes('assist')) {
      return "🛟 I'm here to help! You can ask me about prices, properties, agents, or contact info.";
    }
    return "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our listings! 🏠";
  }

  saveHistory() {
    try {
      const msgs = [];
      this.messages.querySelectorAll('.chatbot__message').forEach(el => {
        msgs.push({
          text: el.querySelector('p').textContent,
          sender: el.classList.contains('user') ? 'user' : 'bot'
        });
      });
      localStorage.setItem('dream-home-chat', JSON.stringify(msgs));
    } catch {}
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('dream-home-chat');
      if (saved) {
        const msgs = JSON.parse(saved);
        // Clear default greeting
        this.messages.innerHTML = '';
        msgs.forEach(m => this.addMessage(m.text, m.sender));
      }
    } catch {}
  }

  clear() {
    localStorage.removeItem('dream-home-chat');
    this.messages.innerHTML = `
      <div class="chatbot__message bot">
        <p>👋 Hi there! How can I help you today?</p>
      </div>
    `;
  }
}

const chatbot = new ChatBot();

export { chatbot };
export default chatbot;
