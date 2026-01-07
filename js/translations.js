// NESH Group Translation System
// Professional implementation with perfect Amharic support

class TranslationManager {
    constructor() {
        this.currentLang = 'en';
        this.translationData = {
            en: {},
            am: {}
        };
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        // Load translation data
        this.loadTranslations();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load saved language preference
        this.loadLanguagePreference();
        
        this.isInitialized = true;
        console.log('Translation Manager initialized');
    }
    
    loadTranslations() {
        // Comprehensive translation data
        this.translationData = {
            en: {
                // Navigation
                nav_home: "Home",
                nav_about: "About",
                nav_products: "Products",
                nav_businesses: "Businesses",
                nav_dashboard: "Dashboard",
                nav_contact: "Contact",
                nav_cart: "Cart",
                
                // Hero Section
                hero_title: "ETHIOPIA'S ULTIMATE INTEGRATED FOOD ECOSYSTEM",
                hero_subtitle: "Three vertically-integrated premium enterprises delivering operational excellence from Ethiopian highlands to global tables through sustainable practices.",
                hero_explore: "Explore Ecosystem",
                hero_investor: "Investor Deck",
                
                // Stats
                stat_revenue: "Projected Year 1 Revenue",
                stat_positions: "Premium Positions Created",
                stat_markets: "International Markets",
                stat_traceability: "Traceability Guaranteed",
                
                // Business Cards
                business_bakery_title: "Nesh Artisan Bakery",
                business_bakery_subtitle: "Mastercrafted breads & premium patisserie",
                business_dairy_title: "Nesh Premium Dairy",
                business_dairy_subtitle: "High-altitude luxury dairy products",
                business_teff_title: "Nesh Teff Heritage",
                business_teff_subtitle: "Revolutionizing Ethiopia's ancient super grain",
                
                business_investment: "Strategic Investment",
                business_units: "Daily Premium Units",
                business_artisans: "Master Artisans",
                business_capital: "Capital Investment",
                business_elite: "Holstein-Friesian Elite",
                business_capacity: "Daily Premium Capacity",
                business_tech: "Technology Investment",
                business_injeras: "Daily Artisan Injeras",
                business_export: "Export Margin Excellence",
                
                // Location
                location: "Flagship Location",
                location_bakery: "Bole, Addis Ababa | Gelan Production Hub",
                location_dairy: "Oromia Region (2,800m altitude)",
                location_teff: "Bole Lemi Industrial Park",
                
                // Target Market
                target_market: "Target Market",
                target_bakery: "Premium consumers, 5-star hotels, corporate elite",
                target_dairy: "Luxury urban market, premium hospitality, international export",
                target_teff: "Urban households, global diaspora, elite institutions",
                
                // Products
                products: "Signature Products",
                products_bakery: "Teff sourdough, heritage grain pastries, bespoke cakes",
                products_dairy: "Vitamin-D fortified milk, artisanal cheese, premium butter",
                products_teff: "TerraTeff Flour, frozen TerraInjera, gluten-free innovations",
                
                // Dashboard
                dashboard_title: "Live Operational Dashboard",
                dashboard_subtitle: "Real-time enterprise performance metrics from our integrated ecosystem",
                dashboard_bakery: "Premium Units Baked Today",
                dashboard_dairy: "Liters Premium Milk Processed",
                dashboard_teff: "Artisan Injeras Created",
                dashboard_export: "International Orders Today",
                capacity: "Capacity",
                target: "Target",
                
                // Contact
                contact_title: "Contact Our Executive Team",
                contact_subtitle: "Get in touch with our leadership for partnerships, investments, or inquiries",
                contact_hq: "Corporate Headquarters",
                contact_address: "Addis Ababa, Ethiopia",
                contact_phone: "Phone Number",
                contact_email: "Email Address",
                contact_hours: "Business Hours",
                contact_hours_detail: "Mon-Fri: 8:00 AM - 6:00 PM EAT",
                
                // Form
                form_name: "Your Name",
                form_email: "Email Address",
                form_subject: "Subject",
                form_message: "Your Message",
                form_send: "Send Message",
                
                // Footer
                footer_description: "A vertically-integrated premium food ecosystem delivering excellence from Ethiopian highlands to global tables.",
                footer_quick: "Quick Links",
                footer_units: "Enterprise Units",
                footer_legal: "Legal",
                footer_privacy: "Privacy Policy",
                footer_terms: "Terms of Service",
                footer_cookie: "Cookie Policy",
                footer_investor: "Investor Relations",
                footer_copyright: "© 2024 NESH Group Holdings. All rights reserved. | Enterprise Target: ETB 440M+ Year 1"
            },
            
            am: {
                // Navigation
                nav_home: "መነሻ",
                nav_about: "ስለ እኛ",
                nav_products: "ምርቶች",
                nav_businesses: "ንግዶች",
                nav_dashboard: "ዳሽቦርድ",
                nav_contact: "አግኙን",
                nav_cart: "ጋሪ",
                
                // Hero Section
                hero_title: "የኢትዮጵያ ዋና የምግብ ስርዓት መስተጋብር",
                hero_subtitle: "ሶስት ላይኛ ደረጃ ድርጅቶች የኢትዮጵያን ከፍተኛ ሜዳዎች ከዓለም ወደ ጠረጴዛዎች የሚያደርሱ የስራ አፈጻጸም ልሂቃንነት።",
                hero_explore: "ስርዓቱን ይመልከቱ",
                hero_investor: "የኢንቨስተር ማስረጃ",
                
                // Stats
                stat_revenue: "የመጀመሪያ ዓመት ገቢ ትንበያ",
                stat_positions: "የተፈጠሩ ላይኛ ደረጃ ሥራዎች",
                stat_markets: "ዓለም አቀፍ ገበያዎች",
                stat_traceability: "እንዲከተሉ የሚችሉት ዋስትና",
                
                // Business Cards
                business_bakery_title: "ኔሽ አርቲዛን ቦቂ",
                business_bakery_subtitle: "ሙሉ ጠቃሚ ዳቦዎች እና ላይኛ ደረጃ ዳቦ ምርቶች",
                business_dairy_title: "ኔሽ ላይኛ ደረጃ ወተት",
                business_dairy_subtitle: "ከፍተኛ ከፍታ ላይ የሚመረቱ የወተት ምርቶች",
                business_teff_title: "ኔሽ ጤፍ ቅርስ",
                business_teff_subtitle: "የኢትዮጵያን ጥንታዊ ሱፐር እህል እየቀየረ ነው",
                
                business_investment: "ስትራቴጂ ኢንቨስትመንት",
                business_units: "ዕለታዊ ላይኛ ደረጃ ክፍሎች",
                business_artisans: "አርቲዛን ሙያተኞች",
                business_capital: "የካፒታል ኢንቨስትመንት",
                business_elite: "ሆልስታይን-ፍሪዝያን ኤሊት",
                business_capacity: "ዕለታዊ ላይኛ ደረጃ አቅም",
                business_tech: "ቴክኖሎጂ ኢንቨስትመንት",
                business_injeras: "ዕለታዊ አርቲዛን እንጀራዎች",
                business_export: "የምርት ማውጣት ማርጅን ልሂቃንነት",
                
                // Location
                location: "ዋና ቦታ",
                location_bakery: "ቦሌ፣ አዲስ አበባ | ገላን የምርት ማዕከል",
                location_dairy: "ኦሮሚያ ክልል (2,800ሜ ከፍታ)",
                location_teff: "ቦሌ ለሚ ኢንዱስትሪያል ፓርክ",
                
                // Target Market
                target_market: "የግብይት ገበያ",
                target_bakery: "ላይኛ ደረጃ ፍጆች፣ 5 ኮከብ ሆቴሎች፣ ኮርፖሬት ኤሊት",
                target_dairy: "ላይኛ ደረጃ የከተማ ገበያ፣ ላይኛ ደረጃ ሆስፒታሊቲ",
                target_teff: "የከተማ ቤተሰቦች፣ ዓለም አቀፍ ዲያስፖራ",
                
                // Products
                products: "ምልክት ምርቶች",
                products_bakery: "ጤፍ ሳውርዶ፣ የቅርስ እህል ዳቦዎች፣ ልዩ ኬከ",
                products_dairy: "ቫይታሚን-ዲ የተጨመረ ወተት፣ አርቲዛን ፎርማጆ",
                products_teff: "ቴራጤፍ ዱቄት፣ በረዶ የተቀዘፈ ቴራእንጀራ",
                
                // Dashboard
                dashboard_title: "ቀጥታ የስራ ዳሽቦርድ",
                dashboard_subtitle: "ከላይኛ ደረጃ የተዋሃደ ስርዓታችን የሚመጡ የንግድ አፈጻጸም መለኪያዎች በእውን ጊዜ",
                dashboard_bakery: "ዛሬ የተጋገሩ ላይኛ ደረጃ ክፍሎች",
                dashboard_dairy: "የተከለሉ ላይኛ ደረጃ ወተት ሊተሮች",
                dashboard_teff: "የተፈጠሩ አርቲዛን እንጀራዎች",
                dashboard_export: "ዛሬ የመጡ ዓለም አቀፍ ትዕዛዞች",
                capacity: "አቅም",
                target: "ዒላማ",
                
                // Contact
                contact_title: "ከአስፈፃሚ ቡድናችን ጋር ይገናኙ",
                contact_subtitle: "ለአጋርነት፣ ኢንቨስትመንት ወይም ጥያቄዎች ከመሪነታችን ጋር ይገናኙ",
                contact_hq: "የኮርፖሬት መሥሪያ ቤት",
                contact_address: "አዲስ አበባ፣ ኢትዮጵያ",
                contact_phone: "ስልክ ቁጥር",
                contact_email: "ኢሜይል አድራሻ",
                contact_hours: "የስራ ሰዓት",
                contact_hours_detail: "ሰኞ-ዓርብ: 8:00 ጥዋት - 6:00 ማታ የምስራቅ አፍሪካ ጊዜ",
                
                // Form
                form_name: "ስምዎ",
                form_email: "ኢሜይል አድራሻ",
                form_subject: "ርዕሰ ጉዳይ",
                form_message: "መልእክትዎ",
                form_send: "መልእክት ላክ",
                
                // Footer
                footer_description: "ላይኛ ደረጃ የተዋሃደ የምግብ ስርዓት የኢትዮጵያን ከፍተኛ ሜዳዎች ከዓለም ወደ ጠረጴዛዎች የሚያደርስ ልሂቃንነት።",
                footer_quick: "ፈጣን አገናኞች",
                footer_units: "የንግድ ክፍሎች",
                footer_legal: "ህጋዊ",
                footer_privacy: "የግላዊነት ፖሊሲ",
                footer_terms: "የአገልግሎት ውሎች",
                footer_cookie: "ኩኪ ፖሊሲ",
                footer_investor: "የኢንቨስተር ግንኙነቶች",
                footer_copyright: "© 2024 NESH ግሩፕ ሆልዲንግስ. ሁሉም መብቶች የተጠበቁ ናቸው. | የንግድ ዒላማ: ETB 440M+ ዓመት 1"
            }
        };
    }
    
    setupEventListeners() {
        // Language switcher buttons
        const langEn = document.getElementById('langEn');
        const langAm = document.getElementById('langAm');
        
        if (langEn) {
            langEn.addEventListener('click', () => this.setLanguage('en'));
        }
        
        if (langAm) {
            langAm.addEventListener('click', () => this.setLanguage('am'));
        }
        
        // Listen for manual language change requests
        document.addEventListener('languageChange', (e) => {
            if (e.detail && e.detail.lang) {
                this.setLanguage(e.detail.lang);
            }
        });
    }
    
    loadLanguagePreference() {
        const savedLang = localStorage.getItem('nesh_language') || 'en';
        this.setLanguage(savedLang, true); // true = initial load
    }
    
    setLanguage(lang, initialLoad = false) {
        if (!['en', 'am'].includes(lang)) {
            console.error('Invalid language code:', lang);
            return;
        }
        
        if (lang === this.currentLang && !initialLoad) return;
        
        this.currentLang = lang;
        
        // Update body class
        document.body.classList.remove('amharic');
        if (lang === 'am') {
            document.body.classList.add('amharic');
        }
        
        // Update active button
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.getElementById(`lang${lang.toUpperCase()}`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Save preference
        localStorage.setItem('nesh_language', lang);
        
        // Update all translatable elements
        this.updatePageContent();
        
        // Dispatch event
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
        
        console.log(`Language changed to: ${lang}`);
    }
    
    updatePageContent() {
        // Update data attributes first
        this.updateDataAttributes();
        
        // Update specific elements
        this.updateTextElements();
        
        // Update form placeholders
        this.updateFormElements();
        
        // Update page title if needed
        this.updatePageTitle();
    }
    
    updateDataAttributes() {
        const elements = document.querySelectorAll('[data-en], [data-am]');
        
        elements.forEach(element => {
            const translationKey = this.currentLang === 'am' ? 'data-am' : 'data-en';
            const translation = element.getAttribute(translationKey);
            
            if (!translation) return;
            
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'IMG') {
                element.alt = translation;
            } else {
                // Preserve HTML structure for buttons with icons
                if (element.classList.contains('btn') || element.closest('.btn')) {
                    const spans = element.querySelectorAll('span[data-en], span[data-am]');
                    if (spans.length > 0) {
                        spans.forEach(span => {
                            const spanTranslation = this.currentLang === 'am' 
                                ? span.getAttribute('data-am') 
                                : span.getAttribute('data-en');
                            if (spanTranslation) {
                                span.textContent = spanTranslation;
                            }
                        });
                    } else {
                        element.textContent = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });
    }
    
    updateTextElements() {
        // Update elements that don't use data attributes
        const textMap = this.translationData[this.currentLang];
        
        Object.keys(textMap).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                element.textContent = textMap[key];
            });
        });
    }
    
    updateFormElements() {
        // Update form placeholders and labels
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                const name = input.getAttribute('name');
                if (name && this.translationData[this.currentLang][`form_${name}`]) {
                    input.placeholder = this.translationData[this.currentLang][`form_${name}`];
                }
            });
        });
    }
    
    updatePageTitle() {
        // Optionally update page title based on language
        const titleMap = {
            en: "NESH | Ethiopia's Ultimate Premium Food Ecosystem",
            am: "ኔሽ | የኢትዮጵያ ዋና የምግብ ስርዓት"
        };
        
        if (titleMap[this.currentLang]) {
            document.title = titleMap[this.currentLang];
        }
    }
    
    translate(key) {
        return this.translationData[this.currentLang][key] || key;
    }
    
    getCurrentLanguage() {
        return this.currentLang;
    }
    
    // Utility method to get translation for dynamic content
    getTranslation(key, lang = this.currentLang) {
        return this.translationData[lang][key] || key;
    }
}

// Initialize Translation Manager
let translationManager;

document.addEventListener('DOMContentLoaded', function() {
    translationManager = new TranslationManager();
    
    // Expose to window for debugging
    window.translationManager = translationManager;
});

// Helper function to set language from anywhere
function setLanguage(lang) {
    if (translationManager) {
        translationManager.setLanguage(lang);
    } else {
        // Fallback if manager isn't initialized yet
        localStorage.setItem('nesh_language', lang);
        location.reload();
    }
}

// Helper function to get current language
function getCurrentLanguage() {
    return translationManager ? translationManager.getCurrentLanguage() : 'en';
}