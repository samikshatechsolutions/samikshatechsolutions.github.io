// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Knowledge base for Samiksha Tech Solutions
const knowledgeBase = {
  products: {
    "software solutions": "Samiksha Tech Solutions offers custom software development, ERP solutions, CRM systems, and mobile applications tailored to your business needs.",
    "cloud services": "We provide cloud migration, AWS/Azure consulting, cloud infrastructure setup, and managed cloud services.",
    "cybersecurity": "Our cybersecurity services include vulnerability assessment, penetration testing, security monitoring, and compliance management.",
    "it consulting": "We offer IT strategy consulting, digital transformation, technology assessment, and implementation planning."
  },
  
  services: {
    "web development": "We build responsive, scalable websites using modern technologies like React, Angular, Node.js, and PHP frameworks.",
    "mobile app development": "iOS and Android app development using native and cross-platform technologies.",
    "ai/ml solutions": "Custom AI/ML solutions including chatbots, predictive analytics, and computer vision applications.",
    "devops": "CI/CD pipeline setup, containerization with Docker, Kubernetes orchestration, and infrastructure automation.",
    "support": "24/7 technical support, maintenance services, and SLAs for all our products."
  },
  
  company: {
    "about": "Samiksha Tech Solutions is a technology consulting and services company founded in [Year]. We specialize in delivering innovative tech solutions.",
    "mission": "Our mission is to empower businesses with cutting-edge technology solutions that drive growth and efficiency.",
    "team": "Our team consists of certified professionals with expertise in various technologies and industry domains.",
    "contact": "You can reach us at: Email: contact@samikshatechsolutions.com | Phone: +91-XXXXXXXXXX | Address: [Your Address]"
  },
  
  features: {
    "customization": "All our solutions are fully customizable to meet specific business requirements.",
    "scalability": "Our architectures are designed to scale with your business growth.",
    "security": "Enterprise-grade security protocols implemented in all our solutions.",
    "support": "Comprehensive support and maintenance packages available."
  }
};

// FAQ responses
const faqResponses = {
  "pricing": "Our pricing depends on project requirements. Contact us for a customized quote.",
  "timeline": "Project timelines vary based on complexity. Typically 2-6 weeks for standard projects.",
  "technologies": "We work with React, Angular, Vue.js, Node.js, Python, .NET, Java, AWS, Azure, and more.",
  "industries": "We serve retail, healthcare, finance, education, manufacturing, and logistics industries.",
  "process": "Our process includes: 1. Requirement Analysis 2. Planning 3. Development 4. Testing 5. Deployment 6. Support"
};

app.post('/api/sam-chatbot', (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let response = "I'm here to help with Samiksha Tech Solutions. ";
  
  // Check for greetings
  if (userMessage.includes('hello') || userMessage.includes('hi')) {
    response = "Hello! I'm Sam, your AI assistant for Samiksha Tech Solutions. How can I help you today?";
  }
  
  // Check for products
  else if (userMessage.includes('product') || userMessage.includes('what do you offer')) {
    response = knowledgeBase.products["software solutions"] + " " + 
               "We also offer: " + Object.keys(knowledgeBase.products).join(', ');
  }
  
  // Check for services
  else if (userMessage.includes('service') || userMessage.includes('what services')) {
    response = knowledgeBase.services["web development"] + " " +
               "Our services include: " + Object.keys(knowledgeBase.services).join(', ');
  }
  
  // Check specific product/service queries
  else {
    let found = false;
    
    // Search in all knowledge base categories
    for (const category in knowledgeBase) {
      for (const key in knowledgeBase[category]) {
        if (userMessage.includes(key)) {
          response = knowledgeBase[category][key];
          found = true;
          break;
        }
      }
      if (found) break;
    }
    
    // Check FAQ
    if (!found) {
      for (const key in faqResponses) {
        if (userMessage.includes(key)) {
          response = faqResponses[key];
          found = true;
          break;
        }
      }
    }
    
    // Default response if nothing matches
    if (!found) {
      response += "You can ask me about: \n" +
                  "• Our products and services \n" +
                  "• Company information \n" +
                  "• Technology stack \n" +
                  "• Pricing and timelines \n" +
                  "• Contact information";
    }
  }
  
  res.json({ response: response });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sam chatbot API running on port ${PORT}`);
});