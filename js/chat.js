// Sam Chatbot Widget - JavaScript
class SamChatbot {
    constructor() {
        this.apiUrl = 'data.json';
        this.knowledgeBase = null;
        this.initialize();
    }

    async initialize() {
        // Load knowledge base
        await this.loadKnowledgeBase();
        
        // Initialize chatbot UI
        this.initUI();
        
        // Add event listeners
        this.addEventListeners();
    }

    async loadKnowledgeBase() {
        try {
            const response = await fetch(this.apiUrl);
            this.knowledgeBase = await response.json();
            console.log('Knowledge base loaded successfully');
        } catch (error) {
            console.error('Error loading knowledge base:', error);
            // Fallback to default responses
            this.knowledgeBase = this.getDefaultKnowledgeBase();
        }
    }

    getDefaultKnowledgeBase() {
        return {
            default_responses: {
                greeting: "Hello! I'm Sam from Samiksha Tech Solutions. How can I help you?",
                farewell: "Goodbye! Contact us for more information.",
                unknown: "I'm here to help with Samiksha Tech Solutions. Ask about our products or services."
            }
        };
    }

    initUI() {
        // Create chatbot container if it doesn't exist
        if (!document.getElementById('sam-chatbot-container')) {
            const container = document.createElement('div');
            container.id = 'sam-chatbot-container';
            container.innerHTML = `
                <button id="sam-toggle-btn" title="Chat with Sam">
                    <span>🤖</span>
                </button>
                
                <div id="sam-chat-window" class="sam-hidden">
                    <div class="sam-chat-header">
                        <h3>
                            <div class="sam-chat-header-avatar">S</div>
                            Sam - AI Assistant
                        </h3>
                        <button id="sam-close-btn" title="Close">×</button>
                    </div>
                    
                    <div id="sam-chat-messages">
                        <div class="sam-message sam-bot-message">
                            ${this.knowledgeBase?.default_responses?.greeting || "Hello! I'm Sam. How can I help?"}
                        </div>
                    </div>
                    
                    <div class="sam-quick-replies" id="sam-quick-replies">
                        <div class="sam-quick-reply" data-question="What services do you offer?">Our Services</div>
                        <div class="sam-quick-reply" data-question="Tell me about your products">Products</div>
                        <div class="sam-quick-reply" data-question="How to contact you?">Contact Us</div>
                        <div class="sam-quick-reply" data-question="What is your pricing?">Pricing</div>
                    </div>
                    
                    <div class="sam-chat-input-area">
                        <input type="text" id="sam-user-input" placeholder="Type your question here..." autocomplete="off">
                        <button id="sam-send-btn">Send</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(container);
            
            // Inject styles
            this.injectStyles();
        }
    }

    injectStyles() {
        // CSS is loaded externally from chat-widget.css
        // If you want to inject dynamically, uncomment below:
        /*
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'https://yourusername.github.io/samiksha-tech-chatbot/chat-widget.css';
        document.head.appendChild(style);
        */
    }

    addEventListeners() {
        // Toggle chatbot
        document.getElementById('sam-toggle-btn')?.addEventListener('click', () => {
            this.toggleChat();
        });

        // Close chatbot
        document.getElementById('sam-close-btn')?.addEventListener('click', () => {
            this.closeChat();
        });

        // Send message
        document.getElementById('sam-send-btn')?.addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('sam-user-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick reply buttons
        document.querySelectorAll('.sam-quick-reply').forEach(button => {
            button.addEventListener('click', (e) => {
                const question = e.target.getAttribute('data-question');
                this.processQuickReply(question);
            });
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('sam-chat-window');
        chatWindow.classList.toggle('sam-hidden');
        
        if (!chatWindow.classList.contains('sam-hidden')) {
            document.getElementById('sam-user-input').focus();
        }
    }

    closeChat() {
        document.getElementById('sam-chat-window').classList.add('sam-hidden');
    }

    async sendMessage() {
        const input = document.getElementById('sam-user-input');
        const message = input.value.trim();
        
        if (message) {
            // Add user message
            this.addMessage(message, 'user');
            input.value = '';
            
            // Show typing indicator
            this.showTypingIndicator();
            
            // Get response after delay
            setTimeout(() => {
                this.removeTypingIndicator();
                const response = this.getResponse(message);
                this.addMessage(response, 'bot');
            }, 800 + Math.random() * 800);
        }
    }

    processQuickReply(question) {
        document.getElementById('sam-user-input').value = question;
        this.sendMessage();
    }

    addMessage(text, sender) {
        const chatMessages = document.getElementById('sam-chat-messages');
        const messageDiv = document.createElement('div');
        
        messageDiv.className = `sam-message sam-${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.textContent = text;
        } else {
            messageDiv.innerHTML = text;
        }
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Update quick replies based on conversation
        this.updateQuickReplies(text, sender);
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('sam-chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'sam-typing-indicator';
        typingDiv.id = 'sam-typing-indicator';
        typingDiv.innerHTML = `
            <div class="sam-typing-dot"></div>
            <div class="sam-typing-dot"></div>
            <div class="sam-typing-dot"></div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('sam-typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    getResponse(userMessage) {
        const message = userMessage.toLowerCase().trim();
        
        // Check greetings
        if (this.knowledgeBase.keywords?.greetings?.some(keyword => 
            message.includes(keyword))) {
            return this.knowledgeBase.default_responses.greeting;
        }
        
        // Check farewell
        if (this.knowledgeBase.keywords?.farewell?.some(keyword => 
            message.includes(keyword))) {
            return this.knowledgeBase.default_responses.farewell;
        }
        
        // Check company info
        if (this.knowledgeBase.keywords?.company?.some(keyword => 
            message.includes(keyword))) {
            return this.searchInKnowledgeBase(message, 'company');
        }
        
        // Check products
        if (this.knowledgeBase.keywords?.products?.some(keyword => 
            message.includes(keyword))) {
            return this.searchInKnowledgeBase(message, 'products');
        }
        
        // Check services
        if (this.knowledgeBase.keywords?.services?.some(keyword => 
            message.includes(keyword))) {
            return this.searchInKnowledgeBase(message, 'services');
        }
        
        // Check contact
        if (this.knowledgeBase.keywords?.contact?.some(keyword => 
            message.includes(keyword))) {
            return this.knowledgeBase.company?.responses?.contact || 
                   this.knowledgeBase.default_responses.unknown;
        }
        
        // Check FAQ
        const faqResponse = this.searchFAQ(message);
        if (faqResponse) {
            return faqResponse;
        }
        
        // Deep search in all responses
        const deepSearchResponse = this.deepSearch(message);
        if (deepSearchResponse) {
            return deepSearchResponse;
        }
        
        // Default response
        return this.knowledgeBase.default_responses.unknown;
    }

    searchInKnowledgeBase(message, category) {
        if (!this.knowledgeBase[category]?.responses) {
            return this.knowledgeBase.default_responses.unknown;
        }
        
        const responses = this.knowledgeBase[category].responses;
        
        // Search for specific keywords in responses
        for (const [key, response] of Object.entries(responses)) {
            const searchKey = key.replace('_', ' ');
            if (message.includes(searchKey) || 
                message.includes(key.replace('_', ''))) {
                return response;
            }
        }
        
        // Return first response if no match found
        return Object.values(responses)[0] || 
               this.knowledgeBase.default_responses.unknown;
    }

    searchFAQ(message) {
        if (!this.knowledgeBase.faq?.questions) {
            return null;
        }
        
        for (const faq of this.knowledgeBase.faq.questions) {
            for (const keyword of faq.keywords) {
                if (message.includes(keyword)) {
                    return faq.answer;
                }
            }
        }
        
        return null;
    }

    deepSearch(message) {
        // Search in all categories
        const categories = ['company', 'products', 'services'];
        
        for (const category of categories) {
            if (this.knowledgeBase[category]?.responses) {
                for (const [key, response] of Object.entries(this.knowledgeBase[category].responses)) {
                    // Convert response to lowercase for searching
                    const responseLower = response.toLowerCase();
                    // Check if any word from message is in response
                    const words = message.split(' ');
                    for (const word of words) {
                        if (word.length > 3 && responseLower.includes(word)) {
                            return response;
                        }
                    }
                }
            }
        }
        
        return null;
    }

    updateQuickReplies(message, sender) {
        if (sender === 'user') {
            const quickReplies = document.getElementById('sam-quick-replies');
            
            // Update based on user's message
            if (message.toLowerCase().includes('service')) {
                quickReplies.innerHTML = `
                    <div class="sam-quick-reply" data-question="web development">Web Development</div>
                    <div class="sam-quick-reply" data-question="mobile app development">Mobile Apps</div>
                    <div class="sam-quick-reply" data-question="AI ML services">AI/ML Services</div>
                    <div class="sam-quick-reply" data-question="devops services">DevOps</div>
                `;
            } else if (message.toLowerCase().includes('product')) {
                quickReplies.innerHTML = `
                    <div class="sam-quick-reply" data-question="software solutions">Software</div>
                    <div class="sam-quick-reply" data-question="cloud services">Cloud</div>
                    <div class="sam-quick-reply" data-question="cybersecurity">Security</div>
                    <div class="sam-quick-reply" data-question="ERP solutions">ERP</div>
                `;
            } else if (message.toLowerCase().includes('contact')) {
                quickReplies.innerHTML = `
                    <div class="sam-quick-reply" data-question="email address">Email</div>
                    <div class="sam-quick-reply" data-question="phone number">Phone</div>
                    <div class="sam-quick-reply" data-question="office address">Address</div>
                    <div class="sam-quick-reply" data-question="working hours">Hours</div>
                `;
            }
            
            // Re-add event listeners
            document.querySelectorAll('.sam-quick-reply').forEach(button => {
                button.addEventListener('click', (e) => {
                    const question = e.target.getAttribute('data-question');
                    this.processQuickReply(question);
                });
            });
        }
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.samChatbot = new SamChatbot();
});