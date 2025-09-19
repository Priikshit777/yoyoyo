document.addEventListener('DOMContentLoaded', () => {

    const mainSection = document.getElementById('main-cultures-section');
    const detailsSection = document.getElementById('state-details-section');
    const stateSelectionGrid = document.getElementById('state-selection-grid');

    // --- HACKATHON DATA STORE ---
    // This object now contains rich data for all major states and UTs.
    // Each state has an image, description, and key cultural features with icons.
    const culturalData = {
        "Andhra Pradesh": {
            image: "https://images.unsplash.com/photo-1622350739934-e43f053d26a2?q=80&w=2070&auto=format&fit=crop",
            description: "Known as the 'Rice Bowl of India', Andhra Pradesh is a blend of rich heritage, ancient temples like Tirupati, and flavorful, spicy cuisine.",
            features: [
                { name: "Dance", description: "Home to Kuchipudi, one of the eight major Indian classical dances.", icon: "💃" },
                { name: "Cuisine", description: "Famous for spicy dishes like Hyderabadi Biryani and tangy Gongura pickles.", icon: "🌶️" },
                { name: "Festival", description: "Sankranti is celebrated with immense fervor, featuring kite flying and traditional feasts.", icon: "🪁" },
                { name: "Landmark", description: "The Tirumala Venkateswara Temple is a world-renowned pilgrimage site.", icon: "🏛️" }
            ]
        },
        "Arunachal Pradesh": {
            image: "https://images.unsplash.com/photo-1605648437159-835a5b51a5a3?q=80&w=1974&auto=format&fit=crop",
            description: "The 'Land of the Dawn-Lit Mountains', this state is a serene paradise of lush green forests, deep river valleys, and diverse tribal culture.",
            features: [
                { name: "Nature", description: "Pristine landscapes with attractions like the Tawang Monastery and Sela Pass.", icon: "🏞️" },
                { name: "Tribes", description: "Home to 26 major tribes, each with unique traditions, dialects, and lifestyles.", icon: "🧑‍🤝‍🧑" },
                { name: "Festival", description: "The Losar Festival, a Tibetan New Year celebration, is marked by vibrant music and dance.", icon: "🎉" },
                { name: "Adventure", description: "A top destination for trekking, river rafting, and exploring untouched natural beauty.", icon: "🧗" }
            ]
        },
        "Assam": {
            image: "https://images.unsplash.com/photo-1594488550181-79e0a0a41b5a?q=80&w=2070&auto=format&fit=crop",
            description: "Famous for its world-class tea, vibrant Bihu dance, and the mighty Brahmaputra river, Assam is the gateway to Northeast India.",
            features: [
                { name: "Wildlife", description: "Kaziranga National Park, a UNESCO site, is home to the one-horned rhinoceros.", icon: "🦏" },
                { name: "Tea Gardens", description: "Vast, sprawling tea estates that produce some of the world's finest tea.", icon: "🍵" },
                { name: "Dance", description: "The Bihu dance is a joyful and energetic folk dance celebrating the agricultural cycle.", icon: "💃" },
                { name: "River", description: "The Brahmaputra river shapes the landscape and culture of the entire state.", icon: "🌊" }
            ]
        },
        "Bihar": {
            image: "https://images.unsplash.com/photo-1591300743455-7413778a4628?q=80&w=1933&auto=format&fit=crop",
            description: "An ancient land of learning and spirituality, Bihar is the birthplace of Buddhism and Jainism, with a rich history of powerful empires.",
            features: [
                { name: "History", description: "Home to Nalanda, an ancient center of learning, and the Mahabodhi Temple in Bodh Gaya.", icon: "📜" },
                { name: "Cuisine", description: "Known for its rustic and delicious food like Litti Chokha and Thekua.", icon: "🍲" },
                { name: "Festival", description: "Chhath Puja, a festival dedicated to the Sun God, is celebrated with immense devotion.", icon: "☀️" },
                { name: "Art", description: "Famous for Madhubani painting, a traditional art form characterized by its intricate patterns.", icon: "🎨" }
            ]
        },
        "Goa": {
            image: "https://images.unsplash.com/photo-1570246322359-da5f3844f210?q=80&w=2070&auto=format&fit=crop",
            description: "India's party capital, known for its sun-kissed beaches, vibrant nightlife, Portuguese architecture, and laid-back tropical vibe.",
            features: [
                { name: "Beaches", description: "From the bustling Baga beach to the serene Palolem, a coastline for every mood.", icon: "🏖️" },
                { name: "Architecture", description: "Charming churches and colonial-era buildings reflect its Portuguese heritage.", icon: "⛪" },
                { name: "Cuisine", description: "Delicious seafood curries and Vindaloo showcase a blend of Indian and European flavors.", icon: "🍤" },
                { name: "Nightlife", description: "Famous for its beach shacks, clubs, and vibrant music festivals.", icon: "🎉" }
            ]
        },
        "Gujarat": {
            image: "https://images.unsplash.com/photo-1603531988228-98e878519143?q=80&w=2070&auto=format&fit=crop",
            description: "A land of vibrant culture, rich history, and entrepreneurial spirit. Famous for the colorful Navratri festival and the Asiatic lions of Gir.",
            features: [
                { name: "Festival", description: "Navratri is a spectacular nine-night dance festival celebrated with Garba and Dandiya Raas.", icon: "🕺" },
                { name: "Wildlife", description: "Gir National Park is the only place in the world to see Asiatic lions in the wild.", icon: "🦁" },
                { name: "Cuisine", description: "A predominantly vegetarian cuisine with a unique sweet and savory taste, featuring Dhokla and Thepla.", icon: "🫓" },
                { name: "Heritage", description: "Home to ancient sites like the Rani ki Vav stepwell and the Indus Valley civilization city of Dholavira.", icon: "🏛️" }
            ]
        },
        "Jammu and Kashmir": {
            image: "https://images.unsplash.com/photo-1595822572412-a7229e585f62?q=80&w=2070&auto=format&fit=crop",
            description: "Often called 'Paradise on Earth', this region is blessed with breathtaking landscapes, serene lakes, and majestic snow-capped mountains.",
            features: [
                { name: "Scenery", description: "Iconic Dal Lake with its houseboats, stunning valleys of Gulmarg and Pahalgam.", icon: "🏞️" },
                { name: "Cuisine", description: "Rich and aromatic dishes form the Wazwan, a multi-course meal, with Rogan Josh as a highlight.", icon: "🥘" },
                { name: "Handicrafts", description: "Famous for its intricate Pashmina shawls, carpets, and walnut wood carvings.", icon: "🧣" },
                { name: "Adventure", description: "A hub for skiing, trekking, and mountaineering amidst the Himalayas.", icon: "🎿" }
            ]
        },
        "Kerala": {
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop",
            description: "'God's Own Country', a lush tropical paradise of serene backwaters, palm-fringed beaches, and rejuvenating Ayurvedic traditions.",
            features: [
                { name: "Backwaters", description: "A network of tranquil canals and lakes, best explored on a traditional houseboat.", icon: "🛶" },
                { name: "Dance", description: "Kathakali, a classical dance-drama known for its elaborate costumes and makeup.", icon: "🎭" },
                { name: "Cuisine", description: "Delicious cuisine dominated by coconut and spices, with Sadya (feast) being a cultural highlight.", icon: "🥥" },
                { name: "Ayurveda", description: "A global center for traditional Ayurvedic treatments and wellness therapies.", icon: "🌿" }
            ]
        },
        "Punjab": {
            image: "https://images.unsplash.com/photo-1541434389-21513158043c?q=80&w=2070&auto=format&fit=crop",
            description: "The 'Land of Five Rivers', known for its fertile fields, hearty cuisine, vibrant Bhangra music, and the spiritual serenity of the Golden Temple.",
            features: [
                { name: "Spirituality", description: "Home to the Golden Temple in Amritsar, the holiest shrine in Sikhism.", icon: "🙏" },
                { name: "Dance", description: "Bhangra, a high-energy folk dance that celebrates prosperity and the harvest.", icon: "🕺" },
                { name: "Cuisine", description: "Rich and robust flavors with dishes like Butter Chicken, Sarson da Saag, and Makki di Roti.", icon: "🧈" },
                { name: "Culture", description: "A culture of hospitality, bravery, and a deep connection to its agricultural roots.", icon: "🌾" }
            ]
        },
        "Rajasthan": {
            image: "https://images.unsplash.com/photo-1599661046223-e06588264371?q=80&w=2070&auto=format&fit=crop",
            description: "The 'Land of Kings', a majestic state of grand forts, opulent palaces, vast deserts, and a rich history of Rajput valor and romance.",
            features: [
                { name: "Forts & Palaces", description: "Magnificent structures like Amer Fort in Jaipur and Mehrangarh Fort in Jodhpur.", icon: "🏰" },
                { name: "Dance", description: "Graceful Ghoomar and energetic Kalbelia folk dances are integral to its culture.", icon: "💃" },
                { name: "Desert", description: "The Thar Desert offers unique experiences like camel safaris and desert camping.", icon: "🐪" },
                { name: "Cities", description: "The 'Pink City' of Jaipur, 'Blue City' of Jodhpur, and 'City of Lakes' Udaipur.", icon: "🏙️" }
            ]
        },
        "Uttar Pradesh": {
            image: "https://images.unsplash.com/photo-1532371983287-937224a48be4?q=80&w=1974&auto=format&fit=crop",
            description: "The heartland of India, home to the iconic Taj Mahal, the sacred Ganges river, and ancient cities that are a cradle of Hindu culture.",
            features: [
                { name: "Landmark", description: "The Taj Mahal in Agra, an eternal monument of love and a wonder of the world.", icon: "🕌" },
                { name: "Spirituality", description: "The holy city of Varanasi, where pilgrims perform rituals along the ghats of the Ganges.", icon: "🌊" },
                { name: "Cuisine", description: "Rich Awadhi and Mughlai cuisine, famous for its succulent kebabs and aromatic biryanis.", icon: "🍖" },
                { name: "History", description: "A land of epics, with cities like Ayodhya and Mathura central to Hindu mythology.", icon: "📜" }
            ]
        },
        "West Bengal": {
            image: "https://images.unsplash.com/photo-1598324789736-482f1052d9a8?q=80&w=2070&auto=format&fit=crop",
            description: "A hub of culture, intellect, and arts, known for its colonial architecture in Kolkata, the Sundarbans tigers, and delicious sweets.",
            features: [
                { name: "Festival", description: "Durga Puja, a grand ten-day festival celebrated with artistic pandals and cultural fervor.", icon: "🎉" },
                { name: "Literature", description: "The land of poets and thinkers like Rabindranath Tagore, with a deep literary heritage.", icon: "📖" },
                { name: "Cuisine", description: "Famous for its fish preparations like Machher Jhol and iconic sweets like Rosogolla.", icon: " मिठाई" },
                { name: "Wildlife", description: "The Sundarbans, the world's largest mangrove forest and home to the Royal Bengal Tiger.", icon: "🐅" }
            ]
        }
    };

    // --- Function to create and display state selection cards ---
    function renderStateSelection() {
        stateSelectionGrid.innerHTML = ''; // Clear previous content
        for (const stateName in culturalData) {
            const state = culturalData[stateName];
            const card = document.createElement('a');
            card.href = '#';
            card.className = 'state-card';
            card.style.backgroundImage = `url(${state.image})`;
            card.dataset.state = stateName;
            card.innerHTML = `<h3>${stateName}</h3>`;
            stateSelectionGrid.appendChild(card);
        }
    }

    // --- Function to create and display the details of a selected state ---
    function renderStateDetails(stateName) {
        const state = culturalData[stateName];
        if (!state) return;

        // Create the HTML for the details page
        let detailsHTML = `
            <a href="#" class="back-button" id="back-button">← Back to States</a>
            <header class="state-details-header" style="background-image: url(${state.image})">
                <h2 class="state-title">${stateName}</h2>
                <p class="state-description">${state.description}</p>
            </header>
            <div class="features-grid">
        `;

        state.features.forEach(feature => {
            detailsHTML += `
                <div class="card">
                    <div class="feature-icon">${feature.icon}</div>
                    <h4>${feature.name}</h4>
                    <p>${feature.description}</p>
                </div>
            `;
        });

        detailsHTML += `</div>`;
        detailsSection.innerHTML = detailsHTML;

        // Add event listener to the newly created back button
        document.getElementById('back-button').addEventListener('click', (e) => {
            e.preventDefault();
            mainSection.classList.remove('hidden');
            detailsSection.classList.add('hidden');
            detailsSection.innerHTML = ''; // Clear content to be rebuilt next time
        });
    }

    // --- Initial Page Load ---
    renderStateSelection();

    // --- Event Listener for State Selection ---
    stateSelectionGrid.addEventListener('click', (e) => {
        e.preventDefault();
        const clickedCard = e.target.closest('.state-card');
        if (clickedCard && clickedCard.dataset.state) {
            const stateName = clickedCard.dataset.state;
            renderStateDetails(stateName);
            mainSection.classList.add('hidden');
            detailsSection.classList.remove('hidden');
            window.scrollTo(0, 0); // Scroll to top
        }
    });

    // --- Aurora Card Hover Effect Listener ---
    document.body.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
