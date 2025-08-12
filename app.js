// ---------------- DOM Ready ----------------
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality when DOM is loaded
  initializeModals();
  initializeDarkMode();
  initializeLanguageDropdown();
  initializePlaceholderAnimation();
  initializeBuyingSection();
  initializeScrollEffects();
  initializeEnhancedSearch();
  initializeResponsiveFeatures();
  console.log('🚀 Enhanced Website initialized successfully!');
  
  // Welcome message
  setTimeout(() => {
    showPopup('স্বাগতম Your Business Ready তে! 🎉', 'success');
  }, 1500);
});

// ---------------- Page Navigation Data ----------------
const pageNavigationData = [
  { name: 'Home', url: 'index.html', icon: 'fa-home', keywords: ['home', 'homepage', 'main'] },
  { name: 'News', url: '1.html', icon: 'fa-newspaper', keywords: ['news', 'খবর', 'updates', 'latest'] },
  { name: 'Economy', url: '2.html', icon: 'fa-chart-line', keywords: ['economy', 'অর্থনীতি', 'economic'] },
  { name: 'Banking', url: '3.html', icon: 'fa-university', keywords: ['banking', 'ব্যাংকিং', 'bank'] },
  { name: 'Personal Finance', url: '4.html', icon: 'fa-wallet', keywords: ['personal finance', 'ব্যক্তিগত অর্থ', 'money'] },
  { name: 'Growth Hacking', url: '5.html', icon: 'fa-rocket', keywords: ['growth hacking', 'গ্রোথ হ্যাকিং', 'growth'] },
  { name: 'Marketing', url: '6.html', icon: 'fa-bullhorn', keywords: ['marketing', 'মার্কেটিং', 'promotion'] },
  { name: 'Business Finance', url: '7.html', icon: 'fa-coins', keywords: ['business finance', 'ব্যবসায়িক অর্থ', 'finance'] },
  { name: 'Find Business Idea', url: '8.html', icon: 'fa-lightbulb', keywords: ['business idea', 'আইডিয়া', 'idea'] },
  { name: 'Market Research', url: '9.html', icon: 'fa-search', keywords: ['market research', 'বাজার গবেষণা', 'research'] },
  { name: 'Target Audience', url: '10.html', icon: 'fa-users', keywords: ['target audience', 'টার্গেট দর্শক', 'audience'] },
  { name: 'Competitors', url: '11.html', icon: 'fa-chess', keywords: ['competitors', 'প্রতিযোগী', 'competition'] },
  { name: 'Roadmap', url: '12.html', icon: 'fa-map', keywords: ['roadmap', 'রোডম্যাপ', 'plan'] },
  { name: 'Business Model', url: '13.html', icon: 'fa-building', keywords: ['business model', 'ব্যবসায়িক মডেল', 'model'] },
  { name: 'USP', url: '14.html', icon: 'fa-star', keywords: ['usp', 'unique selling', 'বিশেষত্ব'] },
  { name: 'Legal', url: '15.html', icon: 'fa-gavel', keywords: ['legal', 'আইনি', 'law'] },
  { name: 'MVP', url: '16.html', icon: 'fa-cog', keywords: ['mvp', 'prototype', 'প্রোটোটাইপ'] },
  { name: 'Branding', url: '17.html', icon: 'fa-palette', keywords: ['branding', 'ব্র্যান্ডিং', 'brand'] },
  { name: 'Website', url: '18.html', icon: 'fa-globe', keywords: ['website', 'ওয়েবসাইট', 'web'] },
  { name: 'Social Media', url: '19.html', icon: 'fa-share-alt', keywords: ['social media', 'সামাজিক মিডিয়া', 'social'] },
  { name: 'Pricing', url: '21.html', icon: 'fa-tags', keywords: ['pricing', 'মূল্য', 'price'] },
  { name: 'Funding', url: '22.html', icon: 'fa-dollar-sign', keywords: ['funding', 'তহবিল', 'investment'] },
  { name: 'Launch', url: '23.html', icon: 'fa-rocket', keywords: ['launch', 'লঞ্চ', 'start'] },
  { name: 'Feedback', url: '24.html', icon: 'fa-comments', keywords: ['feedback', 'প্রতিক্রিয়া', 'review'] },
  { name: 'Scale', url: '25.html', icon: 'fa-expand', keywords: ['scale', 'স্কেল', 'grow'] }
];

// ---------------- Enhanced Search with Suggestions ----------------
function initializeEnhancedSearch() {
  const searchInputs = document.querySelectorAll('.nav-search input, .hero-search input');
  const searchButtons = document.querySelectorAll('.nav-search i, .hero-search button');
  
  searchInputs.forEach(input => {
    // Create suggestions container
    const suggestionsContainer = createSuggestionsContainer(input);
    
    // Input event for real-time suggestions
    input.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length > 0) {
        showSearchSuggestions(query, suggestionsContainer, input);
      } else {
        hideSuggestions(suggestionsContainer);
      }
    });
    
    // Enter key to search
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(input.value, suggestionsContainer);
      }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        hideSuggestions(suggestionsContainer);
      }
    });

    // Add voice search only to navbar search, NOT hero search
    if (input.closest('.nav-search')) {
      addVoiceSearchToInput(input);
    }
  });
  
  // Search button clicks
  searchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.closest('.nav-search, .hero-search').querySelector('input');
      if (input) {
        const suggestionsContainer = input.parentElement.querySelector('.search-suggestions');
        performSearch(input.value, suggestionsContainer);
      }
    });
  });
}

function addVoiceSearchToInput(input) {
  // Only add voice search if supported and not already added
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
  if (input.parentElement.querySelector('.voice-search-btn')) return;
  
  const voiceBtn = document.createElement('button');
  voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
  voiceBtn.className = 'voice-search-btn';
  voiceBtn.type = 'button';
  
  input.parentElement.style.position = 'relative';
  input.parentElement.appendChild(voiceBtn);
  
  voiceBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    startVoiceRecognition(input);
  });
}

function createSuggestionsContainer(input) {
  const container = document.createElement('div');
  container.className = 'search-suggestions';
  input.parentElement.appendChild(container);
  return container;
}

function showSearchSuggestions(query, container, input) {
  // Filter pages based on query
  const suggestions = pageNavigationData.filter(page => 
    page.name.toLowerCase().includes(query) ||
    page.keywords.some(keyword => keyword.toLowerCase().includes(query))
  ).slice(0, 6); // Show max 6 suggestions
  
  if (suggestions.length === 0) {
    hideSuggestions(container);
    return;
  }
  
  // Build suggestions HTML
  let suggestionsHTML = '';
  suggestions.forEach(page => {
    suggestionsHTML += `
      <div class="search-suggestion-item" data-url="${page.url}" data-name="${page.name}">
        <i class="fas ${page.icon}"></i>
        <span>${page.name}</span>
      </div>
    `;
  });
  
  container.innerHTML = suggestionsHTML;
  container.classList.add('show');
  
  // Add click events to suggestions
  container.querySelectorAll('.search-suggestion-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const url = e.currentTarget.dataset.url;
      const name = e.currentTarget.dataset.name;
      input.value = name;
      navigateToPage(url, name);
      hideSuggestions(container);
    });
  });
}

function hideSuggestions(container) {
  container.classList.remove('show');
  container.innerHTML = '';
}

function performSearch(query, suggestionsContainer) {
  if (!query.trim()) {
    showPopup('অনুগ্রহ করে একটি search term লিখুন', 'error');
    return;
  }
  
  // Find exact or partial matches
  const exactMatch = pageNavigationData.find(page => 
    page.name.toLowerCase() === query.toLowerCase() ||
    page.keywords.includes(query.toLowerCase())
  );
  
  if (exactMatch) {
    navigateToPage(exactMatch.url, exactMatch.name);
    hideSuggestions(suggestionsContainer);
    return;
  }
  
  // Find partial matches
  const partialMatches = pageNavigationData.filter(page => 
    page.name.toLowerCase().includes(query.toLowerCase()) ||
    page.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
  );
  
  if (partialMatches.length === 1) {
    navigateToPage(partialMatches[0].url, partialMatches[0].name);
    hideSuggestions(suggestionsContainer);
  } else if (partialMatches.length > 1) {
    showPopup(`"${query}" এর জন্য ${partialMatches.length}টি পেজ পাওয়া গেছে। আরো specific করুন।`, 'info');
    showSearchSuggestions(query.toLowerCase(), suggestionsContainer);
  } else {
    showPopup(`"${query}" পেজটি খুঁজে পাওয়া যায়নি।`, 'error');
  }
}

function navigateToPage(url, name) {
  // Show loading message
  showPopup(`${name} পেজে যাচ্ছি...`, 'success');
  
  // Add loading delay for better UX
  setTimeout(() => {
    window.location.href = url;
  }, 800);
  
  // Track navigation
  trackEvent('page_navigation', {
    page_name: name,
    page_url: url,
    source: 'search'
  });
}

// ---------------- Enhanced Language Dropdown - FIXED ----------------
function initializeLanguageDropdown() {
  // Remove old language toggle if exists
  const oldLangToggle = document.getElementById("langToggle");
  if (oldLangToggle) {
    // Create new dropdown structure - FIXED positioning
    const dropdownHTML = `
      <div class="language-dropdown">
        <button class="toggle-btn" id="langDropdown">
          <i class="fas fa-globe"></i> বাংলা
        </button>
        <div class="language-dropdown-content">
          <a href="#" data-lang="en" class="lang-option">
            <i class="fas fa-flag-usa"></i> English
          </a>
          <a href="#" data-lang="bn" class="lang-option active">
            <i class="fas fa-flag"></i> বাংলা
          </a>
        </div>
      </div>
    `;
    
    oldLangToggle.outerHTML = dropdownHTML;
  }
  
  // Initialize language functionality
  let currentLang = localStorage.getItem('language') || 'bn';
  
  const langDropdown = document.getElementById('langDropdown');
  const langOptions = document.querySelectorAll('.lang-option');
  
  // Set initial language
  updateLanguageButton(currentLang);
  updateActiveLanguage(currentLang);
  translatePage(currentLang);
  
  // Handle language selection
  langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = e.currentTarget.dataset.lang;
      
      if (selectedLang !== currentLang) {
        currentLang = selectedLang;
        updateLanguageButton(currentLang);
        updateActiveLanguage(currentLang);
        translatePage(currentLang);
        
        localStorage.setItem('language', currentLang);
        showPopup(`ভাষা পরিবর্তন করা হয়েছে ${currentLang === 'bn' ? 'বাংলা' : 'English'} তে`, 'success');
      }
    });
  });
}

function updateLanguageButton(lang) {
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    langDropdown.innerHTML = `<i class="fas fa-globe"></i> ${lang === 'bn' ? 'বাংলা' : 'English'}`;
  }
}

function updateActiveLanguage(lang) {
  const langOptions = document.querySelectorAll('.lang-option');
  langOptions.forEach(option => {
    option.classList.remove('active');
    if (option.dataset.lang === lang) {
      option.classList.add('active');
    }
  });
}

// ---------------- Enhanced Translation System ----------------
function translatePage(lang) {
  const translations = {
    en: {
      // Navigation
      home: "Home",
      news: "News",
      economy: "Economy", 
      banking: "Banking",
      personalFinance: "Personal Finance",
      growthHacking: "Growth Hacking",
      marketing: "Marketing",
      businessFinance: "Business Finance",
      
      // Hero Section
      findYourBusiness: "Find Your Problem And <br>Work On It!",
      heroSearchPlaceholder: "Find your business ideas and work on it?",
      howIsItFind: "How to Find It?",
      
      // Sidebar
      businessSteps: "Business Steps",
      marketingSection: "Marketing Section", 
      financeSection: "Finance Section",
      managementSection: "Management Section",
      securitySection: "Security Section",
      
      // Auth
      signIn: "Sign in",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      
      // Content
      businessPlans: "Your Business Plans",
      basicPlan: "Basic",
      standardPlan: "Standard", 
      premiumPlan: "Premium",
      buyNow: "Buy Now",
      businessGrowthContent: "📈 Business Growth Content",
      futureContent: "More content will be added here...",
      businessIdeas: "Business Ideas",
      businessIdeasDesc: "Find new business ideas",
      growthStrategy: "Growth Strategy",
      growthStrategyDesc: "Learn business growth strategies",
      financeTips: "Finance Tips",
      financeTipsDesc: "Plan your finances",
      
      // Footer
      subscribeNewsletter: "Subscribe to Our Newsletter",
      enterEmail: "Enter your email",
      subscribe: "Subscribe",
      contactUs: "Contact Us",
      
      // Search
      searchPlaceholder: "Search your business ideas..."
    },
    bn: {
      // Navigation  
      home: "হোম",
      news: "সংবাদ",
      economy: "অর্থনীতি",
      banking: "ব্যাংকিং", 
      personalFinance: "ব্যক্তিগত অর্থব্যবস্থা",
      growthHacking: "গ্রোথ হ্যাকিং",
      marketing: "মার্কেটিং",
      businessFinance: "ব্যবসায়িক অর্থব্যবস্থা",
      
      // Hero Section
      findYourBusiness: "আপনার সমস্যা খুঁজুন এবং <br>কাজ করুন!",
      heroSearchPlaceholder: "আপনার ব্যবসায়িক আইডিয়া খুঁজুন এবং কাজ করুন?",
      howIsItFind: "কিভাবে খুঁজবেন?",
      
      // Sidebar
      businessSteps: "ব্যবসার ধাপসমূহ",
      marketingSection: "মার্কেটিং বিভাগ",
      financeSection: "অর্থ বিভাগ", 
      managementSection: "ব্যবস্থাপনা বিভাগ",
      securitySection: "নিরাপত্তা বিভাগ",
      
      // Auth
      signIn: "সাইন ইন",
      darkMode: "ডার্ক মোড",
      lightMode: "লাইট মোড",
      
      // Content
      businessPlans: "আপনার ব্যবসায়িক পরিকল্পনা",
      basicPlan: "বেসিক",
      standardPlan: "স্ট্যান্ডার্ড",
      premiumPlan: "প্রিমিয়াম", 
      buyNow: "এখনই কিনুন",
      businessGrowthContent: "📈 ব্যবসায়িক বৃদ্ধির কনটেন্ট",
      futureContent: "এখানে আরও কনটেন্ট যোগ করা হবে...",
      businessIdeas: "ব্যবসায়িক আইডিয়া",
      businessIdeasDesc: "নতুন ব্যবসার আইডিয়া খুঁজুন", 
      growthStrategy: "বৃদ্ধির কৌশল",
      growthStrategyDesc: "ব্যবসা বৃদ্ধির কৌশল শিখুন",
      financeTips: "আর্থিক পরামর্শ",
      financeTipsDesc: "আর্থিক পরিকল্পনা করুন",
      
      // Footer
      subscribeNewsletter: "আমাদের নিউজলেটার সাবস্ক্রাইব করুন",
      enterEmail: "আপনার ইমেইল লিখুন",
      subscribe: "সাবস্ক্রাইব",
      contactUs: "যোগাযোগ করুন",
      
      // Search
      searchPlaceholder: "আপনার ব্যবসায়িক আইডিয়া খুঁজুন..."
    }
  };

  // Update elements with translations
  const elements = {
    // Navigation
    '.nav-left li:nth-child(1) a': translations[lang].home,
    '.nav-left li:nth-child(2) a': translations[lang].news,
    '.nav-left li:nth-child(3) a': translations[lang].economy,
    '.nav-left li:nth-child(4) a': translations[lang].banking,
    '.nav-left li:nth-child(5) a': translations[lang].personalFinance,
    '.nav-left li:nth-child(6) a': translations[lang].growthHacking,
    '.nav-left li:nth-child(7) a': translations[lang].marketing,
    '.nav-left li:nth-child(8) a': translations[lang].businessFinance,
    
    // Hero Section
    '.hero-section h1': translations[lang].findYourBusiness,
    '.hero-section .hey': translations[lang].howIsItFind,
    
    // Content
    '.pricing-section h2': translations[lang].businessPlans,
    '.content-placeholder h2': translations[lang].businessGrowthContent,
    '.content-placeholder p': translations[lang].futureContent,
    
    // Footer
    '.footer-middle h3': translations[lang].subscribeNewsletter,
    '.footer-right h3': translations[lang].contactUs
  };

  // Apply translations
  Object.keys(elements).forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = elements[selector];
    }
  });

  // Update sidebar headings
  const sidebarHeadings = document.querySelectorAll('.sidebar h2');
  if (sidebarHeadings.length >= 5) {
    sidebarHeadings[0].innerHTML = translations[lang].businessSteps;
    sidebarHeadings[1].innerHTML = translations[lang].marketingSection;
    sidebarHeadings[2].innerHTML = translations[lang].financeSection;
    sidebarHeadings[3].innerHTML = translations[lang].managementSection;
    sidebarHeadings[4].innerHTML = translations[lang].securitySection;
  }

  // Update search placeholders
  const searchInputs = document.querySelectorAll('.nav-search input, .hero-search input');
  searchInputs.forEach(input => {
    input.placeholder = translations[lang].searchPlaceholder;
  });

  // Update sign in button
  const signInBtn = document.querySelector('.nav-right a.sign_in');
  if (signInBtn) {
    signInBtn.innerHTML = `<i class="fa-solid fa-user"></i> ${translations[lang].signIn}`;
  }

  // Update content cards
  const contentCards = document.querySelectorAll('.content-card');
  if (contentCards.length >= 3) {
    contentCards[0].querySelector('h3').textContent = translations[lang].businessIdeas;
    contentCards[0].querySelector('p').textContent = translations[lang].businessIdeasDesc;
    contentCards[1].querySelector('h3').textContent = translations[lang].growthStrategy;
    contentCards[1].querySelector('p').textContent = translations[lang].growthStrategyDesc;
    contentCards[2].querySelector('h3').textContent = translations[lang].financeTips;
    contentCards[2].querySelector('p').textContent = translations[lang].financeTipsDesc;
  }

  // Update pricing cards
  const pricingCards = document.querySelectorAll('.card');
  if (pricingCards.length >= 3) {
    pricingCards[0].querySelector('h3').textContent = translations[lang].basicPlan;
    pricingCards[1].querySelector('h3').textContent = translations[lang].standardPlan;
    pricingCards[2].querySelector('h3').textContent = translations[lang].premiumPlan;
    
    pricingCards.forEach(card => {
      const buyBtn = card.querySelector('.buy-btn');
      if (buyBtn) buyBtn.textContent = translations[lang].buyNow;
    });
  }

  // Update newsletter form
  const newsletterInput = document.querySelector('.newsletter-form input');
  const newsletterButton = document.querySelector('.newsletter-form button');
  if (newsletterInput) newsletterInput.placeholder = translations[lang].enterEmail;
  if (newsletterButton) newsletterButton.textContent = translations[lang].subscribe;

  // Update dark mode button
  const darkToggle = document.getElementById("darkToggle");
  if (darkToggle) {
    const isDark = document.body.classList.contains("dark");
    darkToggle.textContent = isDark ? translations[lang].lightMode : translations[lang].darkMode;
  }
}

// ---------------- Modal Management ----------------
function initializeModals() {
  const modal = document.getElementById("signInModal");
  const openBtn = document.getElementById("openSignIn");
  const closeBtn = document.getElementById("closeModal");

  const signInTab = document.getElementById("signInTab");
  const signUpTab = document.getElementById("signUpTab");
  const signInForm = document.getElementById("signInForm");
  const signUpForm = document.getElementById("signUpForm");

  // Open Modal
  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("show");
      signInForm.classList.remove("hidden");
      signUpForm.classList.add("hidden");
      signInTab.classList.add("active");
      signUpTab.classList.remove("active");
      trackEvent('modal_open', { modal_type: 'sign_in' });
    });
  }

  // Close Modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      trackEvent('modal_close', { modal_type: 'sign_in' });
    });
  }

  // Click outside closes modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      trackEvent('modal_close', { modal_type: 'sign_in', method: 'outside_click' });
    }
  });

  // Tab Switch
  if (signInTab) {
    signInTab.addEventListener("click", () => {
      signInForm.classList.remove("hidden");
      signUpForm.classList.add("hidden");
      signInTab.classList.add("active");
      signUpTab.classList.remove("active");
      trackEvent('tab_switch', { tab: 'sign_in' });
    });
  }

  if (signUpTab) {
    signUpTab.addEventListener("click", () => {
      signUpForm.classList.remove("hidden");
      signInForm.classList.add("hidden");
      signUpTab.classList.add("active");
      signInTab.classList.remove("active");
      trackEvent('tab_switch', { tab: 'sign_up' });
    });
  }
}

// ---------------- Buying Section ----------------
function initializeBuyingSection() {
  const openModalBtns = document.querySelectorAll(".open-modal");
  const buyModal = document.getElementById("buyModal");
  const closeBuyModal = document.getElementById("closeBuyModal");

  openModalBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      buyModal.style.display = "flex";
      const planName = btn.closest('.card').querySelector('h3').textContent;
      trackEvent('buy_modal_open', { 
        plan_name: planName,
        plan_index: index 
      });
    });
  });

  if (closeBuyModal) {
    closeBuyModal.addEventListener("click", () => {
      buyModal.style.display = "none";
      trackEvent('buy_modal_close', { method: 'close_button' });
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === buyModal) {
      buyModal.style.display = "none";
      trackEvent('buy_modal_close', { method: 'outside_click' });
    }
  });

  // Handle buy form submission
  const buyForm = document.querySelector('.buy-form');
  if (buyForm) {
    buyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(buyForm);
      const planSelect = buyForm.querySelector('select');
      const selectedPlan = planSelect ? planSelect.value : 'unknown';
      
      showPopup('কেনাকাটা সফল হয়েছে! আমাদের প্ল্যাটফর্মে স্বাগতম।', 'success');
      buyModal.style.display = "none";
      buyForm.reset();
      
      trackEvent('purchase_completed', { 
        plan: selectedPlan,
        method: 'form_submission'
      });
    });
  }
}

// ---------------- Firebase Authentication ----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBBnXyOvG4I8h62ovo-L46LGeArpVGV_2o",
  authDomain: "businessguidewebsite.firebaseapp.com",
  projectId: "businessguidewebsite",
  storageBucket: "businessguidewebsite.firebasestorage.app",
  messagingSenderId: "550782058564",
  appId: "1:550782058564:web:76540a6acf543ff38f7c11",
  measurementId: "G-F06S1X7JDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ---------------- Enhanced SweetAlert2 Popup Function ----------------
function showPopup(message, type = "success") {
  const config = {
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: type === 'error' ? 4000 : 3000,
    toast: true,
    position: "top-end",
    timerProgressBar: true,
    showCloseButton: true,
    customClass: {
      popup: 'custom-toast',
      title: 'custom-toast-title'
    }
  };

  // Set colors based on type
  switch(type) {
    case 'success':
      config.background = '#d4edda';
      config.color = '#155724';
      break;
    case 'error':
      config.background = '#f8d7da';
      config.color = '#721c24';
      break;
    case 'info':
      config.background = '#d1ecf1';
      config.color = '#0c5460';
      break;
    case 'warning':
      config.background = '#fff3cd';
      config.color = '#856404';
      break;
  }

  Swal.fire(config);
}

// ---------------- Firebase Authentication Functions ----------------
document.addEventListener("DOMContentLoaded", () => {
  const signUpFormEl = document.getElementById("signUpForm");
  const signInFormEl = document.getElementById("signInForm");
  const signInModal = document.getElementById("signInModal");

  // Sign Up Handler
  if (signUpFormEl) {
    signUpFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullName = signUpFormEl.querySelector('input[type="text"]').value.trim();
      const email = signUpFormEl.querySelector('input[type="email"]').value.trim();
      const password = signUpFormEl.querySelector('input[type="password"]').value;

      if (!fullName || !email || !password) {
        showPopup('অনুগ্রহ করে সব ফিল্ড পূরণ করুন', 'error');
        return;
      }

      if (password.length < 6) {
        showPopup('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে', 'error');
        return;
      }

      // Show loading state
      const submitBtn = signUpFormEl.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'অপেক্ষা করুন...';
      submitBtn.disabled = true;

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          showPopup(`স্বাগতম, ${fullName}! সাইন আপ সফল হয়েছে।`);
          signUpFormEl.reset();
          signInModal.classList.remove("show");
          trackEvent('user_signup', { method: 'email' });
        })
        .catch((error) => {
          showPopup(`ত্রুটি: ${getErrorMessage(error.code)}`, "error");
          trackEvent('signup_error', { error_code: error.code });
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // Sign In Handler
  if (signInFormEl) {
    signInFormEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = signInFormEl.querySelector('input[type="email"]').value.trim();
      const password = signInFormEl.querySelector('input[type="password"]').value;

      if (!email || !password) {
        showPopup('অনুগ্রহ করে সব ফিল্ড পূরণ করুন', 'error');
        return;
      }

      // Show loading state
      const submitBtn = signInFormEl.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'অপেক্ষা করুন...';
      submitBtn.disabled = true;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          showPopup(`স্বাগতম, ${userCredential.user.email}`);
          signInFormEl.reset();
          signInModal.classList.remove("show");
          trackEvent('user_signin', { method: 'email' });
        })
        .catch((error) => {
          showPopup(`ত্রুটি: ${getErrorMessage(error.code)}`, "error");
          trackEvent('signin_error', { error_code: error.code });
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // Auth State Observer
  onAuthStateChanged(auth, (user) => {
    const signInBtn = document.getElementById('openSignIn');
    if (user) {
      if (signInBtn) {
        signInBtn.innerHTML = '<i class="fa-solid fa-user-check"></i> প্রোফাইল';
        signInBtn.style.background = '#28a745';
      }
      trackEvent('user_authenticated', { user_id: user.uid });
    } else {
      if (signInBtn) {
        const currentLang = localStorage.getItem('language') || 'bn';
        signInBtn.innerHTML = `<i class="fa-solid fa-user"></i> ${currentLang === 'bn' ? 'সাইন ইন' : 'Sign in'}`;
        signInBtn.style.background = 'var(--accent)';
      }
    }
  });
});

// Firebase error message translator
function getErrorMessage(errorCode) {
  const errorMessages = {
    'auth/email-already-in-use': 'এই ইমেইল ইতিমধ্যে ব্যবহৃত হচ্ছে',
    'auth/weak-password': 'পাসওয়ার্ড খুব দুর্বল',
    'auth/invalid-email': 'ইমেইল ভুল',
    'auth/user-not-found': 'ব্যবহারকারী পাওয়া যায়নি',
    'auth/wrong-password': 'ভুল পাসওয়ার্ড',
    'auth/too-many-requests': 'অনেকবার চেষ্টা করেছেন। পরে চেষ্টা করুন',
    'auth/network-request-failed': 'ইন্টারনেট সংযোগের সমস্যা'
  };
  return errorMessages[errorCode] || 'অজানা ত্রুটি ঘটেছে';
}

// ---------------- Enhanced Search Placeholder Animation ----------------
function initializePlaceholderAnimation() {
  const searchInputs = document.querySelectorAll('.nav-search input, .hero-search input');
  const currentLang = localStorage.getItem('language') || 'bn';
  
  const placeholderTexts = {
    bn: [
      "আপনার ব্যবসায়িক আইডিয়া খুঁজুন...",
      "মার্কেটিং কৌশল খুঁজুন...",
      "অর্থ সংক্রান্ত পরামর্শ দেখুন...",
      "গ্রোথ হ্যাক আবিষ্কার করুন...",
      "ব্যবসা পরিকল্পনা শিখুন...",
      "তহবিলের পরামর্শ নিন..."
    ],
    en: [
      "Search your business ideas...",
      "Find marketing strategies...", 
      "Explore finance tips...",
      "Discover growth hacks...",
      "Learn business planning...",
      "Get funding advice..."
    ]
  };

  searchInputs.forEach((searchInput, index) => {
    let placeholderIndex = 0;
    let charIndex = 0;
    let typing = true;
    let animationTimeout;

    function animatePlaceholder() {
      if (!searchInput) return;

      const currentTexts = placeholderTexts[currentLang] || placeholderTexts['bn'];
      const currentText = currentTexts[placeholderIndex];
      
      if (typing) {
        searchInput.setAttribute("placeholder", currentText.slice(0, charIndex++));
        if (charIndex > currentText.length) {
          typing = false;
          animationTimeout = setTimeout(animatePlaceholder, 2500);
          return;
        }
      } else {
        searchInput.setAttribute("placeholder", currentText.slice(0, --charIndex));
        if (charIndex === 0) {
          typing = true;
          placeholderIndex = (placeholderIndex + 1) % currentTexts.length;
        }
      }

      animationTimeout = setTimeout(animatePlaceholder, typing ? 120 : 60);
    }

    // Start animation with different delays for multiple inputs
    setTimeout(animatePlaceholder, 1500 + (index * 500));
    
    // Store timeout reference for cleanup
    searchInput.animationTimeout = animationTimeout;
  });
}

// ---------------- Enhanced Dark Mode Toggle ----------------
function initializeDarkMode() {
  const darkToggle = document.getElementById("darkToggle");
  
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentLang = localStorage.getItem('language') || 'bn';
  
  const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
  
  if (initialTheme === 'dark') {
    document.body.classList.add('dark');
    if (darkToggle) darkToggle.textContent = currentLang === 'bn' ? 'লাইট মোড' : 'Light Mode';
  } else {
    if (darkToggle) darkToggle.textContent = currentLang === 'bn' ? 'ডার্ক মোড' : 'Dark Mode';
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      const currentLang = localStorage.getItem('language') || 'bn';
      
      darkToggle.textContent = isDark ? 
        (currentLang === 'bn' ? 'লাইট মোড' : 'Light Mode') : 
        (currentLang === 'bn' ? 'ডার্ক মোড' : 'Dark Mode');
      
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      const modeText = isDark ? 
        (currentLang === 'bn' ? 'ডার্ক মোড' : 'Dark Mode') : 
        (currentLang === 'bn' ? 'লাইট মোড' : 'Light Mode');
      
      showPopup(`${modeText} সক্রিয় করা হয়েছে`, 'success');
      trackEvent('theme_change', { theme: isDark ? 'dark' : 'light' });
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.body.classList.toggle('dark', e.matches);
      if (darkToggle) {
        const currentLang = localStorage.getItem('language') || 'bn';
        darkToggle.textContent = e.matches ? 
          (currentLang === 'bn' ? 'লাইট মোড' : 'Light Mode') : 
          (currentLang === 'bn' ? 'ডার্ক মোড' : 'Dark Mode');
      }
    }
  });
}

// ---------------- Enhanced Scroll Effects ----------------
function initializeScrollEffects() {
  // Add smooth scrolling to page
  document.documentElement.style.scrollBehavior = 'smooth';

  // Enhanced intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // Add staggered animation for multiple elements
        const siblings = entry.target.parentElement?.children;
        if (siblings) {
          Array.from(siblings).forEach((sibling, index) => {
            setTimeout(() => {
              sibling.classList.add('fade-in');
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll('.content-card, .card, .hero-section, .content-area, .pricing-section');
  elementsToAnimate.forEach(el => observer.observe(el));

  // Enhanced navbar background on scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const navbar = document.querySelector('.navbar');
      const scrolled = window.scrollY > 100;
      
      if (scrolled) {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.borderBottom = '1px solid rgba(230, 126, 34, 0.3)';
      } else {
        navbar.style.backgroundColor = 'var(--primary)';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = 'none';
      }
    }, 10);
  });

  // Add scroll-to-top button
  createScrollToTopButton();
}

function createScrollToTopButton() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent);
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(230, 126, 34, 0.3);
  `;
  
  document.body.appendChild(scrollBtn);

  // Show/hide scroll button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.transform = 'translateY(0)';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.transform = 'translateY(20px)';
    }
  });

  // Scroll to top functionality
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    trackEvent('scroll_to_top', {});
  });
}

// ---------------- Voice Recognition for Navbar Search Only ----------------
function startVoiceRecognition(input) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.lang = localStorage.getItem('language') === 'bn' ? 'bn-BD' : 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;
  
  recognition.onstart = () => {
    input.placeholder = 'শুনছি...';
    input.style.borderColor = 'var(--accent)';
    trackEvent('voice_search_started');
  };
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
    input.focus();
    
    // Trigger search suggestions
    const inputEvent = new Event('input', { bubbles: true });
    input.dispatchEvent(inputEvent);
    
    trackEvent('voice_search_completed', { 
      transcript: transcript,
      confidence: event.results[0][0].confidence 
    });
  };
  
  recognition.onerror = (event) => {
    showPopup('ভয়েস রিকগনিশনে সমস্যা হয়েছে', 'error');
    trackEvent('voice_search_error', { error: event.error });
  };
  
  recognition.onend = () => {
    const currentLang = localStorage.getItem('language') || 'bn';
    input.placeholder = currentLang === 'bn' ? 'আপনার ব্যবসায়িক আইডিয়া খুঁজুন...' : 'Search your business ideas...';
    input.style.borderColor = '#ddd';
  };
  
  try {
    recognition.start();
  } catch (error) {
    showPopup('ভয়েস রিকগনিশন সাপোর্ট করা হয় না', 'error');
  }
}

// ---------------- Responsive Features ----------------
function initializeResponsiveFeatures() {
  const mobileBreakpoint = 768;
  
  function handleResize() {
    const width = window.innerWidth;
    
    if (width <= mobileBreakpoint) {
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.remove('mobile-view');
    }
  }

  handleResize();
  
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
  });

  // Touch gestures for mobile
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    initializeTouchGestures();
  }
}

function initializeTouchGestures() {
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Swipe gestures
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        trackEvent('gesture_swipe', { direction: 'right' });
      } else {
        trackEvent('gesture_swipe', { direction: 'left' });
      }
    }
  });
}

// ---------------- Newsletter Subscription ----------------
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value.trim();
      const button = newsletterForm.querySelector('button');
      
      if (!email) {
        showPopup('অনুগ্রহ করে আপনার ইমেইল ঠিকানা লিখুন', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showPopup('অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা লিখুন', 'error');
        return;
      }
      
      // Show loading
      const originalText = button.textContent;
      button.textContent = 'অপেক্ষা করুন...';
      button.disabled = true;
      
      // Simulate newsletter subscription
      setTimeout(() => {
        showPopup('নিউজলেটার সাবস্ক্রিপশন সফল হয়েছে!', 'success');
        newsletterForm.reset();
        button.textContent = originalText;
        button.disabled = false;
        trackEvent('newsletter_subscribe', { email_domain: email.split('@')[1] });
      }, 1500);
    });
  }
});

// ---------------- Enhanced User Experience Features ----------------
document.addEventListener("DOMContentLoaded", () => {
  // Add loading states to buttons
  const buttons = document.querySelectorAll('button, .buy-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.classList.contains('loading') && !this.disabled) {
        this.classList.add('loading');
        setTimeout(() => {
          this.classList.remove('loading');
        }, 2000);
      }
    });
  });
  
  // Enhanced hover effects for cards
  const cards = document.querySelectorAll('.card, .content-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.zIndex = '1';
    });
  });
  
  // Add ripple effect to buttons
  const rippleButtons = document.querySelectorAll('.buy-btn, .submit-btn, .toggle-btn');
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    // ESC to close modals
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal.show');
      openModals.forEach(modal => modal.classList.remove('show'));
      
      const openDropdowns = document.querySelectorAll('.search-suggestions.show');
      openDropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    }
    
    // Ctrl+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.hero-search input') || document.querySelector('.nav-search input');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });
});

// ---------------- Analytics and Tracking ----------------
function trackEvent(eventName, eventData = {}) {
  // Enhanced tracking with more details
  const trackingData = {
    ...eventData,
    timestamp: new Date().toISOString(),
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    screen_resolution: `${screen.width}x${screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    language: localStorage.getItem('language') || 'bn',
    theme: document.body.classList.contains('dark') ? 'dark' : 'light'
  };
  
  console.log('📊 Event tracked:', eventName, trackingData);
  
  // Integration with analytics services
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, trackingData);
  }
  
  // Facebook Pixel integration (if available)
  if (typeof fbq !== 'undefined') {
    fbq('track', eventName, trackingData);
  }
}

// Track important user interactions
document.addEventListener("DOMContentLoaded", () => {
  // Track pricing card clicks
  const pricingCards = document.querySelectorAll('.buy-btn');
  pricingCards.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const planName = btn.closest('.card').querySelector('h3').textContent;
      const price = btn.closest('.card').querySelector('.price').textContent;
      trackEvent('pricing_plan_click', {
        plan_name: planName,
        plan_index: index,
        price: price
      });
    });
  });
  
  // Track navigation clicks
  const navLinks = document.querySelectorAll('.nav-left a, .sidebar a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('navigation_click', {
        page: link.textContent.trim(),
        href: link.getAttribute('href'),
        location: link.closest('.nav-left') ? 'navbar' : 'sidebar'
      });
    });
  });
  
  // Track hero section interactions
  const heroLink = document.querySelector('.hero-section .hey');
  if (heroLink) {
    heroLink.addEventListener('click', () => {
      trackEvent('hero_link_click', { 
        text: heroLink.textContent.trim() 
      });
    });
  }

  // Track social media clicks
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach(link => {
    link.addEventListener('click', () => {
      const platform = link.querySelector('i').className.includes('facebook') ? 'facebook' : 
                      link.querySelector('i').className.includes('github') ? 'github' :
                      link.querySelector('i').className.includes('whatsapp') ? 'whatsapp' : 'unknown';
      trackEvent('social_media_click', { platform });
    });
  });
});

// ---------------- Utility Functions ----------------
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format numbers with Bengali or English numerals
function formatNumber(num, lang = 'bn') {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  if (lang === 'bn') {
    return num.toString().replace(/\d/g, (digit) => bnDigits[parseInt(digit)]);
  }
  return num.toString();
}

// ---------------- Error Handling & Performance ----------------
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  trackEvent('javascript_error', {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno
  });
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
  trackEvent('promise_rejection', {
    reason: e.reason?.toString() || 'Unknown'
  });
});

// Performance monitoring
window.addEventListener('load', () => {
  // Measure page load performance
  if ('performance' in window) {
    const perfData = performance.getEntriesByType('navigation')[0];
    trackEvent('page_performance', {
      load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
      dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
      first_paint: Math.round(performance.getEntriesByType('paint').find(p => p.name === 'first-paint')?.startTime || 0)
    });
  }
});

// ---------------- Local Storage Management ----------------
const StorageManager = {
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify({
        data: value,
        timestamp: Date.now()
      }));
      return true;
    } catch (e) {
      console.error('localStorage not available:', e);
      return false;
    }
  },
  
  get(key, maxAge = Infinity) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      const age = Date.now() - parsed.timestamp;
      
      if (age > maxAge) {
        localStorage.removeItem(key);
        return null;
      }
      
      return parsed.data;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return null;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing from localStorage:', e);
      return false;
    }
  },
  
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Error clearing localStorage:', e);
      return false;
    }
  }
};

// ---------------- Progressive Web App Features ----------------
function initializePWAFeatures() {
  // Service Worker registration (if service worker file exists)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('Service Worker registered successfully');
      trackEvent('pwa_service_worker_registered');
    }).catch(err => {
      console.log('Service Worker registration failed');
    });
  }

  // Add to home screen prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show custom install button or prompt
    const installBtn = document.createElement('button');
    installBtn.textContent = 'অ্যাপ ইনস্টল করুন';
    installBtn.className = 'install-app-btn toggle-btn';
    installBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 1000;
      animation: bounce 2s infinite;
    `;
    
    installBtn.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        trackEvent('pwa_install_prompt', { 
          outcome: choiceResult.outcome 
        });
        deferredPrompt = null;
        installBtn.remove();
      });
    });
    
    document.body.appendChild(installBtn);
    
    // Auto-remove after 10 seconds if not clicked
    setTimeout(() => {
      if (installBtn.parentElement) {
        installBtn.remove();
      }
    }, 10000);
  });

  // App installed event
  window.addEventListener('appinstalled', () => {
    showPopup('অ্যাপ সফলভাবে ইনস্টল হয়েছে!', 'success');
    trackEvent('pwa_app_installed');
  });
}

// ---------------- Dynamic Content Loading ----------------
async function loadDynamicContent() {
  try {
    // Simulate loading business tips or news
    const contentArea = document.querySelector('.content-placeholder');
    if (contentArea) {
      // Add loading skeleton
      const loadingSkeleton = createLoadingSkeleton();
      contentArea.appendChild(loadingSkeleton);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Remove loading skeleton
      loadingSkeleton.remove();
      
      // Add dynamic content
      const dynamicContent = createDynamicContent();
      contentArea.appendChild(dynamicContent);
      
      trackEvent('dynamic_content_loaded');
    }
  } catch (error) {
    console.error('Error loading dynamic content:', error);
    trackEvent('dynamic_content_error', { error: error.message });
  }
}

function createLoadingSkeleton() {
  const skeleton = document.createElement('div');
  skeleton.className = 'loading-skeleton';
  skeleton.style.cssText = `
    display: flex;
    gap: 30px;
    margin-top: 40px;
    animation: pulse 1.5s ease-in-out infinite alternate;
  `;
  
  for (let i = 0; i < 3; i++) {
    const skeletonItem = document.createElement('div');
    skeletonItem.style.cssText = `
      flex: 1;
      height: 120px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      border-radius: 10px;
      background-size: 200% 100%;
      animation: loading-shimmer 2s ease-in-out infinite;
    `;
    skeleton.appendChild(skeletonItem);
  }
  
  return skeleton;
}

function createDynamicContent() {
  const currentLang = localStorage.getItem('language') || 'bn';
  const content = document.createElement('div');
  content.className = 'dynamic-content';
  
  const tips = {
    bn: [
      'আজকের টিপ: গ্রাহক সেবায় মনোযোগ দিন',
      'মার্কেট রিসার্চ করুন নিয়মিত',
      'ডিজিটাল মার্কেটিং শিখুন'
    ],
    en: [
      'Today\'s Tip: Focus on customer service',
      'Do regular market research',
      'Learn digital marketing'
    ]
  };
  
  content.innerHTML = `
    <div class="business-tips">
      <h3>${currentLang === 'bn' ? '📝 আজকের ব্যবসায়িক টিপস' : '📝 Today\'s Business Tips'}</h3>
      <ul>
        ${tips[currentLang].map(tip => `<li>${tip}</li>`).join('')}
      </ul>
    </div>
  `;
  
  content.style.cssText = `
    margin-top: 40px;
    animation: fadeInUp 0.6s ease-out;
  `;
  
  return content;
}

// ---------------- Initialize All Features ----------------
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all features
  initializePWAFeatures();
  
  console.log('🚀 All enhanced features initialized successfully!');
  
  // Performance optimization - defer heavy operations
  setTimeout(() => {
    loadDynamicContent();
  }, 3000);
  
  // Track page view
  trackEvent('page_view', {
    page: document.title,
    referrer: document.referrer,
    user_language: navigator.language
  });
});

// Export functions for potential external use
window.BusinessWebsite = {
  showPopup,
  trackEvent,
  StorageManager,
  translatePage,
  performSearch,
  navigateToPage
};