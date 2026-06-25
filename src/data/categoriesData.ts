export interface L3Category {
  id: string;
  name: string;
  queries: string[];
  description: string;
  iconName: string;
  actionType: 'booking' | 'investment' | 'purchase' | 'billpay' | 'reservation';
  placeholder: string;
  meta: {
    label: string;
    value: string;
    options?: string[];
  };
}

export interface L2Category {
  id: string;
  name: string;
  subcategories: L3Category[];
}

export interface L1Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  colorTheme: string; // e.g., 'amber', 'emerald', 'sky', 'indigo', 'rose'
  subcategories: L2Category[];
}

export const categoriesData: L1Category[] = [
  {
    id: 'escapes',
    name: 'CRED Escapes',
    description: 'Travel & Experiences',
    iconName: 'Compass',
    colorTheme: 'amber',
    subcategories: [
      {
        id: 'heritage_luxury',
        name: 'Heritage & Luxury Stays',
        subcategories: [
          {
            id: 'palace_fort',
            name: 'Palace & Fort Retreats',
            queries: ['Romantic getaways in Udaipur', 'Rajasthan heritage properties'],
            description: 'Live like royalty in carefully restored palaces and historic forts across Rajasthan.',
            iconName: 'Castle',
            actionType: 'booking',
            placeholder: 'Taj Lake Palace, Udaipur',
            meta: {
              label: 'Property',
              value: 'Taj Lake Palace, Udaipur',
              options: ['Taj Lake Palace, Udaipur', 'Rambagh Palace, Jaipur', 'Umaid Bhawan Palace, Jodhpur', 'Fort Barwara, Sawai Madhopur']
            }
          },
          {
            id: 'boutique_luxury',
            name: 'Boutique Luxury Hotels',
            queries: ['Boutique hotel weekend stays', 'Premium designer boutique stays'],
            description: 'Indulge in design-forward, intimate luxury retreats featuring high-end curation.',
            iconName: 'Hotel',
            actionType: 'booking',
            placeholder: 'The Machan, Lonavala',
            meta: {
              label: 'Destination',
              value: 'The Machan, Lonavala',
              options: ['The Machan, Lonavala', 'Ahilya Fort, Maheshwar', 'Glenburn Tea Estate, Darjeeling', 'Wildflower Hall, Shimla']
            }
          }
        ]
      },
      {
        id: 'nature_wildlife',
        name: 'Nature & Wildlife Escapes',
        subcategories: [
          {
            id: 'safari_lodges',
            name: 'Safari & Jungle Lodges',
            queries: ['Ranthambore safari', 'Jungle lodges in Corbett', 'Kabini safari stays'],
            description: 'Luxury jungle lodges overlooking natural reserves. Includes guided jeep safaris.',
            iconName: 'Flame',
            actionType: 'booking',
            placeholder: 'Evolve Back Kuruba Safari, Kabini',
            meta: {
              label: 'Safari Lodge',
              value: 'Evolve Back, Kabini',
              options: ['Evolve Back, Kabini', 'Aman-i-Khas, Ranthambore', 'The Oberoi Vanyavilas, Ranthambore', 'Jim Corbett Hideaway']
            }
          },
          {
            id: 'hill_plantation',
            name: 'Hill Station & Plantation Retreats',
            queries: ['Coorg tea estate stays', 'Munnar boutique plantation resort'],
            description: 'Wake up to the aroma of fresh coffee and tea in pristine misty estates.',
            iconName: 'Mountain',
            actionType: 'booking',
            placeholder: 'The Tamara, Coorg',
            meta: {
              label: 'Resort',
              value: 'The Tamara, Coorg',
              options: ['The Tamara, Coorg', 'Windermere Estate, Munnar', 'Evolve Back Chikkana Halli, Coorg', 'Briar Tea Bungalows, Valparai']
            }
          }
        ]
      },
      {
        id: 'international_getaways',
        name: 'International Getaways',
        subcategories: [
          {
            id: 'beach_island',
            name: 'Beach & Island Resorts',
            queries: ['Maldives honeymoon', 'Bali private pool villas'],
            description: 'Overwater bungalows and beachfront luxury at the world\'s finest islands.',
            iconName: 'Palmtree',
            actionType: 'booking',
            placeholder: 'Soneva Jani, Maldives',
            meta: {
              label: 'Island Destination',
              value: 'Soneva Jani, Maldives',
              options: ['Soneva Jani, Maldives', 'Amandari, Bali', 'Four Seasons Landaa Giraavaru, Maldives', 'The Mulia, Bali']
            }
          },
          {
            id: 'city_breaks',
            name: 'Short-Haul Premium City Breaks',
            queries: ['Dubai luxury weekends', 'Singapore premium staycation'],
            description: 'Fast-paced, high-luxury breaks in glamorous global metropolises.',
            iconName: 'Plane',
            actionType: 'booking',
            placeholder: 'Marina Bay Sands, Singapore',
            meta: {
              label: 'Hotel',
              value: 'Marina Bay Sands, Singapore',
              options: ['Marina Bay Sands, Singapore', 'Armani Hotel, Dubai', 'The Ritz-Carlton, Millenia Singapore', 'Burj Al Arab, Dubai']
            }
          }
        ]
      },
      {
        id: 'curated_niche_travel',
        name: 'Curated & Niche Travel',
        subcategories: [
          {
            id: 'wellness_ayurveda',
            name: 'Wellness & Ayurveda Retreats',
            queries: ['Kerala Panchakarma wellness', 'Himalayan healing retreats'],
            description: 'Detox, rejuvenate, and find peace with certified holistic master therapies.',
            iconName: 'Heart',
            actionType: 'booking',
            placeholder: 'Ananda in the Himalayas',
            meta: {
              label: 'Wellness Program',
              value: 'Ananda in the Himalayas',
              options: ['Ananda in the Himalayas', 'Somatheeram Ayurveda, Kerala', 'CGH Earth Kalari Rasayana, Kerala', 'Vana, Dehradun']
            }
          },
          {
            id: 'pet_friendly',
            name: 'Pet-Friendly Accommodations',
            queries: ['Pet-friendly hotels near me', 'Dog-friendly stays for weekend'],
            description: 'Premium hotels designed for you and your companion with specialized pet services.',
            iconName: 'Dog',
            actionType: 'booking',
            placeholder: 'Taj Exotica Resort & Spa',
            meta: {
              label: 'Pet-Friendly Stay',
              value: 'Taj Exotica, Goa',
              options: ['Taj Exotica, Goa', 'The Grand Hyatt, Kochi', 'Andaz Delhi, Aerocity', 'The Lilac, Bangalore']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'cash_mint',
    name: 'CRED Cash & Mint',
    description: 'Financial Services',
    iconName: 'Coins',
    colorTheme: 'emerald',
    subcategories: [
      {
        id: 'wealth_investments',
        name: 'Wealth & Investments (CRED Mint)',
        subcategories: [
          {
            id: 'p2p_lending',
            name: 'P2P Lending (CRED Mint)',
            queries: ['high yield investments india', 'CRED Mint returns calculator'],
            description: 'Earn high inflation-beating yields up to 9.5% p.a. fully secured by top credit profiles.',
            iconName: 'TrendingUp',
            actionType: 'investment',
            placeholder: 'Enter Amount to Invest (₹)',
            meta: {
              label: 'Minimum Investment',
              value: '₹10,000',
              options: ['₹10,000', '₹50,000', '₹1,000', '₹5,00,000']
            }
          },
          {
            id: 'mutual_funds',
            name: 'Mutual Funds & SIPs',
            queries: ['best mutual funds in india', 'direct growth mutual funds SIP'],
            description: 'Zero commission direct mutual funds. Seamless partner integrations for single-tap investing.',
            iconName: 'PieChart',
            actionType: 'investment',
            placeholder: 'Monthly SIP Amount (₹)',
            meta: {
              label: 'Fund Category',
              value: 'Index Fund Basket (Low Cost)',
              options: ['Index Fund Basket (Low Cost)', 'Nifty 50 Direct Plan', 'Small Cap Aggressive Growth', 'Balanced Hybrid Fund']
            }
          },
          {
            id: 'digital_gold',
            name: 'Digital Gold & Alternative Assets',
            queries: ['gold investment options online', 'buy 24k digital gold online'],
            description: 'Purchase 24K 99.9% pure gold stored in secured vaults. Instant sellback anytime.',
            iconName: 'CircleDollarSign',
            actionType: 'purchase',
            placeholder: 'Amount of Gold (₹)',
            meta: {
              label: 'Asset Type',
              value: '24K pure physical gold',
              options: ['24K physical gold (vaulted)', 'Gold Sovereign Bonds', 'Silver alternative assets', 'REIT Real Estate Units']
            }
          }
        ]
      },
      {
        id: 'credit_liquidity',
        name: 'Credit & Liquidity (CRED Cash)',
        subcategories: [
          {
            id: 'personal_credit',
            name: 'Instant Personal Lines of Credit',
            queries: ['instant personal loan online', 'best credit line interest rate'],
            description: 'Pre-approved credit line up to ₹5,00,000. Interest charged strictly on what you withdraw.',
            iconName: 'Wallet',
            actionType: 'investment',
            placeholder: 'Withdrawal Amount (₹)',
            meta: {
              label: 'Interest Rate',
              value: 'Starting from 11.9% p.a.',
              options: ['₹50,000 (Short term)', '₹1,50,000 (Medium)', '₹3,00,000 (Premium)', '₹5,00,000 (Full Limit)']
            }
          },
          {
            id: 'credit_score_health',
            name: 'Credit Score Health & Advisory',
            queries: ['debt-to-income ratio help', 'how to improve credit score'],
            description: 'Get deep personalized insights into Experian and CRIF data. Custom score enhancement plans.',
            iconName: 'ShieldAlert',
            actionType: 'billpay',
            placeholder: 'Your Email ID',
            meta: {
              label: 'Advisory Mode',
              value: 'Instant Full Report + Free Specialist Call',
              options: ['Instant Full Report + Free Specialist Call', 'Continuous Monitoring Alerts', 'Debt Consolidation Review']
            }
          }
        ]
      },
      {
        id: 'protection_insurance',
        name: 'Protection & Insurance (CRED Protect)',
        subcategories: [
          {
            id: 'travel_insurance',
            name: 'Travel & Transit Insurance',
            queries: ['international travel insurance online', 'flight delay cancellation protection'],
            description: 'Comprehensive medical and baggage cover for your next flight or vacation.',
            iconName: 'Umbrella',
            actionType: 'purchase',
            placeholder: 'Travel Destination',
            meta: {
              label: 'Coverage Premium',
              value: '₹349 / trip onwards',
              options: ['Worldwide (excl USA/Canada)', 'USA & Canada Premium', 'Domestic Flight Cover (₹99)', 'South East Asia Package']
            }
          },
          {
            id: 'health_life_insurance',
            name: 'Premium Health & Life Insurance Policies',
            queries: ['term life insurance rates india', 'best private family health cover'],
            description: 'Highly customized term and health policies with direct claim assistance portals.',
            iconName: 'HeartHandshake',
            actionType: 'purchase',
            placeholder: 'Sum Assured (e.g. ₹1 Crore)',
            meta: {
              label: 'Age Bracket',
              value: '25-35 years old',
              options: ['18-25 years old', '25-35 years old', '35-45 years old', '45+ years old']
            }
          },
          {
            id: 'device_protection',
            name: 'Purchase & Device Protection',
            queries: ['iphone accidental damage cover', 'gadget screen insurance'],
            description: 'Insure your expensive laptops, iPads, or iPhones against screen cracking and liquid spills.',
            iconName: 'Smartphone',
            actionType: 'purchase',
            placeholder: 'Device Serial Number',
            meta: {
              label: 'Device Type',
              value: 'iPhone 15/16 Pro Series',
              options: ['iPhone 15/16 Pro Series', 'MacBook Air/Pro', 'iPad Pro/Air', 'Premium Flagship Android']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'store',
    name: 'CRED Store',
    description: 'D2C Brand Discovery',
    iconName: 'ShoppingBag',
    colorTheme: 'sky',
    subcategories: [
      {
        id: 'premium_tech',
        name: 'Premium Tech & Audio',
        subcategories: [
          {
            id: 'personal_audio',
            name: 'Personal Audio',
            queries: ['best gaming phone', 'noise-canceling headphones', 'premium TWS earbuds'],
            description: 'Studio-grade noise-canceling headphones and audiophile true wireless systems.',
            iconName: 'Headphones',
            actionType: 'purchase',
            placeholder: 'Select Product model',
            meta: {
              label: 'Exclusive Deal',
              value: 'Sony WH-1000XM5 (40% OFF)',
              options: ['Sony WH-1000XM5 (40% OFF)', 'Bose QuietComfort Ultra', 'Apple AirPods Pro Gen 2', 'Sennheiser Momentum 4']
            }
          },
          {
            id: 'smart_home',
            name: 'Smart Home & Automation',
            queries: ['best air purifiers india', 'smart home security cameras'],
            description: 'Air purifiers, robotic vacuums, and seamless IoT systems for automated luxury.',
            iconName: 'Home',
            actionType: 'purchase',
            placeholder: 'Select Product',
            meta: {
              label: 'Special Member Price',
              value: 'Dyson Pure Cool Link Purifier',
              options: ['Dyson Pure Cool Link Purifier', 'Eufy RoboVac L35', 'Philips Air Purifier Series 3000i', 'Ring Security Camera Kit']
            }
          },
          {
            id: 'gaming_productivity',
            name: 'Gaming & Productivity Gear',
            queries: ['Keychron wireless mechanical keyboard', 'MX Master ergonomic mouse'],
            description: 'Mechanical keyboards, custom desk pads, and hyper-premium ergonomic workspace setups.',
            iconName: 'Keyboard',
            actionType: 'purchase',
            placeholder: 'Select Gear',
            meta: {
              label: 'Select Accessory',
              value: 'Keychron K2 Mechanical Keyboard',
              options: ['Keychron K2 Mechanical Keyboard', 'Logitech MX Master 3S', 'BenQ ScreenBar Halo', 'Asus ROG Gaming Monitor']
            }
          }
        ]
      },
      {
        id: 'beauty_grooming',
        name: 'Beauty, Grooming & Wellness',
        subcategories: [
          {
            id: 'conscious_beauty',
            name: 'Conscious Beauty',
            queries: ['cruelty-free makeup brands', 'vegan natural makeup kit'],
            description: 'Clean, toxic-free cosmetics sourced from ethical sustainable manufacturers.',
            iconName: 'Sparkles',
            actionType: 'purchase',
            placeholder: 'Select Bundle',
            meta: {
              label: 'Brand Partner',
              value: 'Forest Essentials Organic Kit',
              options: ['Forest Essentials Organic Kit', 'Kora Organics Glow Set', 'The Body Shop Hemp Series', 'Plum Green Tea Selection']
            }
          },
          {
            id: 'advanced_skincare',
            name: 'Advanced Skincare',
            queries: ['korean skincare routine order', 'best hyaluronic acid anti aging'],
            description: 'World-renowned Korean formulations, high-impact Retinol, and luxury skin boosters.',
            iconName: 'Droplets',
            actionType: 'purchase',
            placeholder: 'Skin Type (e.g. Dry, Oily)',
            meta: {
              label: 'Specialty Formulation',
              value: 'Laneige Water Sleeping Mask Pack',
              options: ['Laneige Water Sleeping Mask Pack', 'COSRX Snail Mucin Power Essence', 'Sulwhasoo First Care Activating Serum', 'Kiehl\'s Midnight Recovery']
            }
          },
          {
            id: 'supplements_monitors',
            name: 'Supplements & Health Monitors',
            queries: ['best fitness trackers smart ring', 'organic plant protein powder'],
            description: 'Premium organic proteins, micro-nutrient blends, and wearable wellness sensors.',
            iconName: 'Zap',
            actionType: 'purchase',
            placeholder: 'Select Item',
            meta: {
              label: 'Sensor Wellness',
              value: 'Ultrahuman Ring AIR (10% Coin Discount)',
              options: ['Ultrahuman Ring AIR (10% Coin Discount)', 'Cosmix Healthy Hair Supplements', 'Oziva Organic Plant Protein (1kg)', 'OnePlus Smart Band 2']
            }
          }
        ]
      },
      {
        id: 'food_beverage',
        name: 'Gourmet Food & Beverages',
        subcategories: [
          {
            id: 'specialty_coffee',
            name: 'Specialty Coffee & Teas',
            queries: ['specialty coffee subscriptions', 'home espresso brewing kits'],
            description: 'Single-estate organic coffee beans and precision premium brewing kits.',
            iconName: 'Coffee',
            actionType: 'purchase',
            placeholder: 'Grind Type (e.g. Aeropress, Beans)',
            meta: {
              label: 'Curated Brand',
              value: 'Blue Tokai Roasters - Attikan Estate',
              options: ['Blue Tokai Roasters - Attikan Estate', 'Araku Grand Reserve (100% Organic)', 'Sleepy Owl Cold Brew Pitcher Kit', 'Vahdam Royal Tea Assortment']
            }
          },
          {
            id: 'conscious_snacking',
            name: 'Conscious Snacking',
            queries: ['keto snacks buy online', 'vegan gluten free chips'],
            description: 'Delicious zero-sugar, high-protein snacks designed for mindful living.',
            iconName: 'Apple',
            actionType: 'purchase',
            placeholder: 'Diet Preference',
            meta: {
              label: 'Snack Assortment',
              value: 'The Whole Truth Protein Bar Pack (8)',
              options: ['The Whole Truth Protein Bar Pack (8)', 'Ketofy Low Carb Keto Chips', 'Happilo Premium Trail Mix Nut Box', 'Open Secret Nutty Cookies Box']
            }
          },
          {
            id: 'subscription_boxes',
            name: 'Curated Exotic Subscription Boxes',
            queries: ['monthly gourmet chocolate subscription', 'exotic snack box india'],
            description: 'Unwrap worldwide curations of artisanal cheese, chocolates, or dark teas monthly.',
            iconName: 'Gift',
            actionType: 'purchase',
            placeholder: 'Select Duration',
            meta: {
              label: 'Monthly Theme',
              value: 'Global Single-Origin Chocolate Box',
              options: ['Global Single-Origin Chocolate Box (3 Months)', 'Artisanal Cheese & Olives Board Box', 'Japanese Rare Matcha Selection Box', 'The Sommelier Vineyard Wine-free Curation']
            }
          }
        ]
      },
      {
        id: 'home_living',
        name: 'Home & Living',
        subcategories: [
          {
            id: 'kitchenware',
            name: 'Premium Kitchenware',
            queries: ['cast iron skillet pan buy', 'best smart digital air fryers'],
            description: 'Pre-seasoned heavy cast iron skillets and rapid air-fry technology.',
            iconName: 'Utensils',
            actionType: 'purchase',
            placeholder: 'Select Appliance',
            meta: {
              label: 'Kitchen Masterpiece',
              value: 'Le Creuset Cast Iron Round Casserole',
              options: ['Le Creuset Cast Iron Round Casserole', 'Philips Premium Airfryer XXL', 'Staub Grill Pan (10-inch)', 'NutriBullet High Speed Blender']
            }
          },
          {
            id: 'workspace_decor',
            name: 'Ergonomic Workspace & Decor',
            queries: ['ergonomic desk chair office', 'aesthetic solid wood work desk'],
            description: 'Enhance focus with executive ergonomic backrests and dynamic ambient desk lights.',
            iconName: 'Layers',
            actionType: 'purchase',
            placeholder: 'Select Item',
            meta: {
              label: 'Office Furniture',
              value: 'The Featherlite Ergonomic Task Chair',
              options: ['The Featherlite Ergonomic Task Chair', 'Solid Walnut Wood Monitor Riser', 'Govee RGBIC Glide Smart Wall Lights', 'Minimal Felt Desk Mat (Large)']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'max',
    name: 'CRED Max',
    description: 'High-Value Recurring Spends',
    iconName: 'CreditCard',
    colorTheme: 'indigo',
    subcategories: [
      {
        id: 'housing_property',
        name: 'Housing & Property',
        subcategories: [
          {
            id: 'rent_payments',
            name: 'Rent & Security Deposit Payments',
            queries: ['paying rent with credit card', 'instant house rent transfer'],
            description: 'Transfer house rent instantly to landlord accounts using your premium cards for cashbacks.',
            iconName: 'Home',
            actionType: 'billpay',
            placeholder: 'Landlord UPI ID / Account Number',
            meta: {
              label: 'Monthly Rent',
              value: '₹35,000',
              options: ['₹15,000', '₹25,000', '₹35,000', '₹50,000+']
            }
          },
          {
            id: 'society_maintenance',
            name: 'Society Maintenance Fees',
            queries: ['apartment society maintenance pay', 'mygate billing online'],
            description: 'Direct integrations with major society management platforms like MyGate and NoBroker.',
            iconName: 'Building',
            actionType: 'billpay',
            placeholder: 'Flat & Apartment Society Name',
            meta: {
              label: 'Due Amount',
              value: '₹6,200',
              options: ['₹4,500', '₹6,200', '₹8,900', 'Custom Amount']
            }
          }
        ]
      },
      {
        id: 'education_learning',
        name: 'Education & Learning',
        subcategories: [
          {
            id: 'tuition_fees',
            name: 'School & College Tuition Fees',
            queries: ['pay school fees with credit card', 'college tuition online portal'],
            description: 'Pay university or school terms directly via card. Earn major reward miles.',
            iconName: 'GraduationCap',
            actionType: 'billpay',
            placeholder: 'Student Admission Number / Institute',
            meta: {
              label: 'Fee Amount',
              value: '₹75,000',
              options: ['₹25,000', '₹50,000', '₹75,000', '₹1,50,000']
            }
          },
          {
            id: 'edtech_courses',
            name: 'Premium EdTech & Professional Courses',
            queries: ['best management diploma online', 'advanced coding course cert'],
            description: 'Enroll in Ivy League executive tracks and professional certifications with direct credits.',
            iconName: 'BookOpen',
            actionType: 'purchase',
            placeholder: 'Course Domain Preference',
            meta: {
              label: 'Elite Track Partner',
              value: 'Wharton Executive Management (20% Off)',
              options: ['Wharton Executive Management (20% Off)', 'Upgrad Advanced AI & ML Diploma', 'Coursera Plus Annual Membership', 'Harvard Leadership Program']
            }
          }
        ]
      },
      {
        id: 'utilities_subscriptions',
        name: 'Utilities & Subscriptions',
        subcategories: [
          {
            id: 'broadband_bills',
            name: 'Broadband & Postpaid Bills',
            queries: ['broadband internet service provider', 'postpaid mobile bill recharge'],
            description: 'Single-tap auto-payment for Airtel Fiber, Jio Fiber, Act Fibernet, and postpaid plans.',
            iconName: 'Wifi',
            actionType: 'billpay',
            placeholder: 'Broadband Connection Account Number',
            meta: {
              label: 'Provider',
              value: 'Airtel Xstream Fiber',
              options: ['Airtel Xstream Fiber', 'JioFiber Premium', 'ACT Fibernet Gigahome', 'Tata Play Fiber']
            }
          },
          {
            id: 'electricity_gas',
            name: 'Electricity & Piped Gas',
            queries: ['pay electricity bill online', 'piped natural gas bill booking'],
            description: 'National BBPS gateway support. Automatically alerts you when bills are generated.',
            iconName: 'Zap',
            actionType: 'billpay',
            placeholder: 'Consumer Number / CA Number',
            meta: {
              label: 'Utility Board',
              value: 'Adani Electricity Mumbai',
              options: ['Adani Electricity Mumbai', 'BESCOM Bangalore', 'MSEDCL Maharashtra', 'IGL Indraprastha Gas']
            }
          }
        ]
      },
      {
        id: 'auto_transit',
        name: 'Auto & Transit',
        subcategories: [
          {
            id: 'fastag_recharge',
            name: 'FASTag Recharges',
            queries: ['fastag recharge online instantly', 'check fastag balance check'],
            description: 'Add money instantly to your vehicle\'s FASTag with automatic balance check and low balance alerts.',
            iconName: 'Car',
            actionType: 'billpay',
            placeholder: 'Vehicle Registration Number (e.g. MH02FA1234)',
            meta: {
              label: 'Recharge Value',
              value: '₹1,000',
              options: ['₹500', '₹1,000', '₹2,500', '₹5,000']
            }
          },
          {
            id: 'car_rentals',
            name: 'Premium Car Rentals & Chauffeur Services',
            queries: ['luxury car rentals for weekend', 'book hourly professional chauffeur'],
            description: 'Rent premium SUVs (Fortuner, Mercedes) or hire professional background-verified uniform drivers.',
            iconName: 'Key',
            actionType: 'booking',
            placeholder: 'Pickup Location & Date',
            meta: {
              label: 'Select Service',
              value: 'Audi A6 (Self-drive - 24 hours)',
              options: ['Audi A6 (Self-drive - 24 hours)', 'Fortuner Sigma4 (Weekend Package)', 'Verified Chauffeur (8 Hours Local)', 'Airport Transfer Elite Mercedes']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'dineout',
    name: 'CRED Dineout',
    description: 'Gourmet Food & Nightlife',
    iconName: 'Wine',
    colorTheme: 'rose',
    subcategories: [
      {
        id: 'fine_dining',
        name: 'Fine Dining & Premium Experiences',
        subcategories: [
          {
            id: 'luxury_hotel_dining',
            name: 'Luxury Hotel Dining & Tasting Menus',
            queries: ['Restaurants with vegan options in Hyderabad', 'Luxury chef table tasting menus'],
            description: 'Curated reservations with complimentary house beverages and Chef interactions.',
            iconName: 'GlassWater',
            actionType: 'reservation',
            placeholder: 'Preferred Date & Time',
            meta: {
              label: 'Venue Selected',
              value: 'The Taj Falaknuma Palace (Hyderabad)',
              options: ['The Taj Falaknuma Palace (Hyderabad)', 'Le Cirque Signature (Leela Mumbai)', 'Dum Pukht (ITC Maurya Delhi)', 'Zodiac Temple (Taj Bengal)']
            }
          },
          {
            id: 'critically_acclaimed',
            name: 'Michelin-Starred / Critically Acclaimed Venues',
            queries: ['Michelin star restaurant Mumbai', 'Best fine dining award venues'],
            description: 'Unlocks priority booking slots at the absolute top-ranked dining destinations in India.',
            iconName: 'Award',
            actionType: 'reservation',
            placeholder: 'Number of Guests',
            meta: {
              label: 'Elite Venue',
              value: 'Indian Accent, New Delhi (Award-Winner)',
              options: ['Indian Accent, New Delhi (Award-Winner)', 'Avartana, ITC Grand Chola Chennai', 'The Table, Colaba Mumbai', 'Tresind, Bandra Kurla Complex']
            }
          }
        ]
      },
      {
        id: 'nightlife_mixology',
        name: 'Nightlife & Mixology',
        subcategories: [
          {
            id: 'rooftop_bars',
            name: 'Rooftop Bars & Premium Lounges',
            queries: ['best rooftop bar near me', 'high-end cocktail lounge reservations'],
            description: 'Breathtaking high-elevation scenic city views paired with bespoke international cocktail masteries.',
            iconName: 'Sunset',
            actionType: 'reservation',
            placeholder: 'Seating Preference (Rooftop, Indoor)',
            meta: {
              label: 'Lounge Venue',
              value: 'Aer Rooftop Lounge (Four Seasons Mumbai)',
              options: ['Aer Rooftop Lounge (Four Seasons Mumbai)', 'Byg Brewski (Bangalore)', 'High Ultra Lounge (Bangalore)', 'PCO Speakeasy (Delhi)']
            }
          },
          {
            id: 'breweries_speakeasies',
            name: 'Craft Breweries & Speakeasies',
            queries: ['best craft breweries with vegan options', 'secret entry password speakeasy'],
            description: 'Unlocks the secret door codes and exclusive tasting flights at premier hidden speakeasies.',
            iconName: 'Beer',
            actionType: 'reservation',
            placeholder: 'Select Speakeasy / Brewery',
            meta: {
              label: 'Secret Access',
              value: 'The Library Bar Speakeasy (Password Required)',
              options: ['The Library Bar Speakeasy (Password Required)', 'Windmills Craftworks (Bangalore)', 'Toit Microbrewery', 'Whisky Samba (Gurgaon)']
            }
          }
        ]
      },
      {
        id: 'niche_conscious_dining',
        name: 'Niche & Conscious Dining',
        subcategories: [
          {
            id: 'vegan_cafes',
            name: 'Vegan & Plant-Based Cafes',
            queries: ['Restaurants with vegan options in Bangalore', 'gluten-free healthy cafes'],
            description: 'Superb health-first culinary art featuring award-winning plant milk coffees, keto sweets, and vegan burgers.',
            iconName: 'Leaf',
            actionType: 'reservation',
            placeholder: 'Dietary Specifications',
            meta: {
              label: 'Bistro Cafe',
              value: 'Greenr Cafe, Gurgaon/Delhi',
              options: ['Greenr Cafe, Gurgaon/Delhi', 'Copper Chimney Vegan Menu', 'The Yoga House, Mumbai', 'Carrots Plant-Based Bistro']
            }
          },
          {
            id: 'keto_healthy',
            name: 'Keto-Friendly & Health-Focused Eateries',
            queries: ['low carb high fat restaurants', 'healthy organic salads and macro bowls'],
            description: 'Menu curations detailed with precise carb counts and organic, hormone-free ingredients.',
            iconName: 'Heart',
            actionType: 'reservation',
            placeholder: 'Meal Preference (e.g. High Protein, Keto)',
            meta: {
              label: 'Selected Diner',
              value: 'The Salad-Co Clean Eating Hub',
              options: ['The Salad-Co Clean Eating Hub', 'Keto Kitchen Premium', 'Sassy Spoon Healthy Curation', 'Kitchen Garden by Suzette']
            }
          }
        ]
      },
      {
        id: 'culinary_events',
        name: 'Culinary Events',
        subcategories: [
          {
            id: 'chef_tables',
            name: 'Exclusive Chef Tables & Pop-ups',
            queries: ['guest chef multi-course tasting event', 'live masterclass pop-up dinner'],
            description: 'Highly intimate, ultra-limited 8-seat direct interactions with visiting Michelin chefs.',
            iconName: 'ChefHat',
            actionType: 'reservation',
            placeholder: 'Attendee Name & Diet',
            meta: {
              label: 'Chef Series Event',
              value: 'Massimo Bottura Mumbai Pop-up (Limited)',
              options: ['Massimo Bottura Mumbai Pop-up (Limited)', 'Gaggan Anand Residency Delhi Tour', 'Chef Garima Arora Masterclass Table', 'Sake & Sushi Pairing Masterclass']
            }
          },
          {
            id: 'food_walks',
            name: 'Curated Food Walks',
            queries: ['Old Delhi heritage gourmet food tour', 'guided street food walk safety'],
            description: 'Guided street food masterclasses deep inside historical spots. Hygenic and premium security.',
            iconName: 'Footprints',
            actionType: 'reservation',
            placeholder: 'Select Walk City & Batch',
            meta: {
              label: 'Gourmet Food Walk',
              value: 'Old Delhi Heritage Culinary Walk (Sunday Morning)',
              options: ['Old Delhi Heritage Culinary Walk (Sunday Morning)', 'Amritsar Golden Temple Food Trail', 'Kolkata Cabin & Street Food Tour', 'Goan Portuguese Heritage Tour']
            }
          }
        ]
      }
    ]
  }
];
