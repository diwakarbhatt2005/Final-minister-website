class AutoTranslationSystem {
  constructor() {
    this.currentLang = localStorage.getItem('preferred-language') || 'en';
    this.originalTexts = new Map();
    this.translationCache = new Map();
    this.isTranslating = false;
    this.loadCacheFromStorage();
  }

  // Store original texts before translation
  storeOriginalTexts() {
    const elements = this.getAllTextElements();
    elements.forEach((element, index) => {
      const id = `element_${index}`;
      element.setAttribute('data-translate-id', id);
      this.originalTexts.set(id, {
        textContent: element.textContent.trim(),
        placeholder: element.placeholder || '',
        title: element.title || '',
        ariaLabel: element.getAttribute('aria-label') || ''
      });
    });
  }

  // Get all translatable elements
  getAllTextElements() {
    return document.querySelectorAll(`
      h1:not(.no-translate), h2:not(.no-translate), h3:not(.no-translate), 
      h4:not(.no-translate), h5:not(.no-translate), h6:not(.no-translate),
      p:not(.no-translate), span:not(.no-translate):not(.typed-cursor),
      a:not(.no-translate), button:not(.no-translate), 
      label:not(.no-translate), li:not(.no-translate),
      input[placeholder]:not(.no-translate), 
      textarea[placeholder]:not(.no-translate),
      [data-translate]:not(.no-translate)
    `);
  }

  // Simulate translation (since we can't use real API in this environment)
  async simulateTranslation(text, targetLang) {
    // Simple Hindi translations for demo
    const translations = {
      // Navigation
      "Home": "मुख्य",
      "About": "परिचय",
      "Initiatives": "पहल",
      "News & Events": "समाचार और कार्यक्रम",
      "Gallery": "गैलरी",
      "Contact": "संपर्क",
      "FAQ": "सामान्य प्रश्न",
      
      // Hero Section
      "Leading with Vision": "दूरदर्शिता के साथ नेतृत्व",
      "Building a Stronger Future": "एक मजबूत भविष्य का निर्माण",
      "Serving with Integrity": "ईमानदारी के साथ सेवा",
      "Transforming Communities": "समुदायों का रूपांतरण",
      "Together, we build a stronger future for our nation and its people.": "मिलकर, हम अपने राष्ट्र और इसके लोगों के लिए एक मजबूत भविष्य का निर्माण करते हैं।",
      "Dedicated to serving the people with integrity, transparency, and unwavering commitment to progress.": "ईमानदारी, पारदर्शिता और प्रगति के लिए अटूट प्रतिबद्धता के साथ लोगों की सेवा करने के लिए समर्पित।",
      "Learn More": "और जानें",
      "Explore Initiatives": "पहलों का अन्वेषण करें",
      "Scroll to explore": "अन्वेषण के लिए स्क्रॉल करें",
      
      // About Section
      "About the Minister": "मंत्री के बारे में",
      "Chat with Minister's AI Assistant": "मंत्री के AI सहायक से चैट करें",
      "Get immediate answers to common questions about policies, initiatives, and more.": "नीतियों, पहलों और अन्य के बारे में सामान्य प्रश्नों के तुरंत उत्तर प्राप्त करें।",
      "Start a Conversation": "बातचीत शुरू करें",
      "Excellence in Public Service": "सार्वजनिक सेवा में उत्कृष्टता",
      "Community Leadership Award": "सामुदायिक नेतृत्व पुरस्कार",
      "International Cooperation Medal": "अंतर्राष्ट्रीय सहयोग पदक",
      "Citizens Served": "नागरिकों की सेवा की गई",
      "Policies Implemented": "नीतियां लागू की गईं",
      "Satisfaction Rate": "संतुष्टि दर",
      "Awards Received": "प्राप्त पुरस्कार",
      
      // Chatbot
      "Hello! How can I assist you today regarding the Minister's work?": "नमस्ते! मैं आज मंत्री के कार्य के संबंध में आपकी कैसे सहायता कर सकता हूं?",
      "Ask something...": "कुछ पूछें...",
      "Send": "भेजें",
      "What are the current policy initiatives?": "वर्तमान नीतिगत पहल क्या हैं?",
      "How can I get involved in community programs?": "मैं सामुदायिक कार्यक्रमों में कैसे शामिल हो सकता हूं?",
      "What is the healthcare reform about?": "स्वास्थ्य सुधार के बारे में क्या है?",
      "Tell me about education initiatives": "शिक्षा पहलों के बारे में बताएं",
      
      // Common
      "Minister's Office": "मंत्री कार्यालय",
      "English": "अंग्रेजी",
      "हिंदी": "हिंदी"
    };

    if (targetLang === 'hi' && translations[text]) {
      return translations[text];
    }
    
    return text; // Return original if no translation found
  }

  // Main translation function
  async translatePage(targetLang) {
    if (this.isTranslating) return;
    this.isTranslating = true;

    // Show loading indicator
    this.showLoadingIndicator();

    try {
      if (targetLang === 'en') {
        this.restoreOriginalTexts();
      } else {
        await this.translateAllElements(targetLang);
      }
      
      this.currentLang = targetLang;
      localStorage.setItem('preferred-language', targetLang);
      document.documentElement.lang = targetLang;
      
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      this.hideLoadingIndicator();
      this.isTranslating = false;
    }
  }

  // Translate all elements
  async translateAllElements(targetLang) {
    const elements = this.getAllTextElements();
    
    for (const element of elements) {
      await this.translateElement(element, targetLang);
    }
  }

  // Translate individual element
  async translateElement(element, targetLang) {
    const text = element.textContent.trim();
    if (!text || element.hasAttribute('data-no-translate')) return;

    try {
      const cacheKey = `${text}_${targetLang}`;
      let translatedText;

      if (this.translationCache.has(cacheKey)) {
        translatedText = this.translationCache.get(cacheKey);
      } else {
        translatedText = await this.simulateTranslation(text, targetLang);
        this.translationCache.set(cacheKey, translatedText);
      }

      element.textContent = translatedText;

      // Handle placeholders
      if (element.placeholder) {
        const translatedPlaceholder = await this.simulateTranslation(element.placeholder, targetLang);
        element.placeholder = translatedPlaceholder;
      }

    } catch (error) {
      console.error('Translation failed for element:', element, error);
    }
  }

  // Restore original texts
  restoreOriginalTexts() {
    this.originalTexts.forEach((data, id) => {
      const element = document.querySelector(`[data-translate-id="${id}"]`);
      if (element) {
        element.textContent = data.textContent;
        if (data.placeholder) element.placeholder = data.placeholder;
        if (data.title) element.title = data.title;
        if (data.ariaLabel) element.setAttribute('aria-label', data.ariaLabel);
      }
    });
  }

  // Show loading indicator
  showLoadingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'translation-loading';
    indicator.innerHTML = `
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">Translating... / अनुवाद हो रहा है...</div>
      </div>
    `;
    document.body.appendChild(indicator);
  }

  // Hide loading indicator
  hideLoadingIndicator() {
    const indicator = document.getElementById('translation-loading');
    if (indicator) {
      indicator.remove();
    }
  }

  // Cache management
  saveCacheToStorage() {
    localStorage.setItem('translationCache', JSON.stringify([...this.translationCache]));
  }

  loadCacheFromStorage() {
    const stored = localStorage.getItem('translationCache');
    if (stored) {
      this.translationCache = new Map(JSON.parse(stored));
    }
  }
}

// Initialize translation system
const translator = new AutoTranslationSystem();

// Export for use in other files
window.translator = translator;

export default translator;