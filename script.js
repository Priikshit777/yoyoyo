// script.js - enhanced interactions for Bharat Darpan

/* ---------- Sample dataset ----------
 We include an in-memory sample "states" dataset with minimal fields for demo.
 In production this would be loaded from a backend or large GeoJSON dataset.
 We've expanded the data here for a richer demo experience.
 -------------------------------------*/
const SAMPLE_STATES = [
    {
        id: 'tn',
        name: 'Tamil Nadu',
        coords: [11.1271, 78.6569],
        dance: 'Bharatanatyam',
        danceType: 'classical',
        festivals: ['Pongal', 'Mahamaham'],
        cuisine: ['Idli', 'Dosa', 'Chettinad Chicken'],
        media: { img: 'https://placehold.co/800x450/A52A2A/FFF?text=Bharatanatyam', yt: 'https://www.youtube.com/embed/VID_TN' }
    },
    {
        id: 'wb',
        name: 'West Bengal',
        coords: [22.9868, 87.8550],
        dance: 'Chhau',
        danceType: 'folk',
        festivals: ['Durga Puja', 'Pohela Boishakh'],
        cuisine: ['Panta Bhat', 'Rosogolla', 'Mishti Doi'],
        media: { img: 'https://placehold.co/800x450/228B22/FFF?text=Durga+Puja', yt: 'https://www.youtube.com/embed/VID_WB' }
    },
    {
        id: 'dl',
        name: 'Delhi',
        coords: [28.7041, 77.1025],
        dance: 'Kathak (North)',
        danceType: 'classical',
        festivals: ['Diwali', 'Holi'],
        cuisine: ['Chole Bhature', 'Paranthe'],
        media: { img: 'https://placehold.co/800x450/FFD700/000?text=Delhi+Culture', yt: 'https://www.youtube.com/embed/VID_DL' }
    },
    {
        id: 'rj',
        name: 'Rajasthan',
        coords: [27.0238, 74.2179],
        dance: 'Ghoomar',
        danceType: 'folk',
        festivals: ['Pushkar Fair', 'Teej'],
        cuisine: ['Dal Baati Churma', 'Laal Maas'],
        media: { img: 'https://placehold.co/800x450/FF9933/FFF?text=Ghoomar+Dance', yt: 'https://www.youtube.com/embed/VID_RJ' }
    },
    {
        id: 'kl',
        name: 'Kerala',
        coords: [10.8505, 76.2711],
        dance: 'Kathakali',
        danceType: 'classical',
        festivals: ['Onam', 'Thrissur Pooram'],
        cuisine: ['Appam with Stew', 'Kerala Sadya'],
        media: { img: 'https://placehold.co/800x450/8B0000/FFF?text=Kathakali+Art', yt: 'https://www.youtube.com/embed/VID_KL' }
    },
    {
        id: 'mh',
        name: 'Maharashtra',
        coords: [19.7515, 75.7139],
        dance: 'Lavani',
        danceType: 'folk',
        festivals: ['Ganesh Chaturthi', 'Gudi Padwa'],
        cuisine: ['Vada Pav', 'Misal Pav'],
        media: { img: 'https://placehold.co/800x450/B8860B/FFF?text=Lavani+Performance' } // No YT link for demo
    }
];

// Define custom user feedback message element
const userMessage = document.createElement('div');
userMessage.id = 'user-message';
userMessage.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--dark-charcoal);
    color: var(--white);
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 5000;
`;
document.body.appendChild(userMessage);

/**
 * Displays a user message on the UI.
 * @param {string} message The message to display.
 */
function showUserMessage(message) {
    userMessage.textContent = message;
    userMessage.style.opacity = 1;
    userMessage.style.visibility = 'visible';
    setTimeout(() => {
        userMessage.style.opacity = 0;
        userMessage.style.visibility = 'hidden';
    }, 3000);
}

// Map initialization and layers
const map = L.map('leaflet-map', { center: [22.0, 79.0], zoom: 5, minZoom: 4 });
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const danceLayer = L.layerGroup().addTo(map);
const festivalLayer = L.layerGroup();
const cuisineLayer = L.layerGroup();

/**
 * Creates a Leaflet marker for a given state.
 * @param {object} state The state data object.
 * @returns {L.Marker} A Leaflet marker object.
 */
function createStateMarker(state) {
    const color = state.danceType === 'classical' ? 'var(--maroon)' : state.danceType === 'folk' ? 'var(--saffron)' : 'var(--emerald)';
    const marker = L.circleMarker(state.coords, {
        radius: 8,
        color,
        fillColor: color,
        fillOpacity: 0.9
    });

    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
        <strong>${state.name}</strong><br/>
        Dance: ${state.dance}<br/>
        <button class="open-media btn small" data-id="${state.id}">Open Media</button>
    `;
    marker.bindPopup(popupContent);

    // Event listener for the popup button
    marker.on('popupopen', () => {
        const btn = popupContent.querySelector('.open-media');
        if (btn) {
            btn.addEventListener('click', () => openMediaModal(state));
        }
    });

    return marker;
}

/**
 * Populates the map layers and the culture card grid.
 */
function populateData() {
    danceLayer.clearLayers();
    festivalLayer.clearLayers();
    cuisineLayer.clearLayers();

    const grid = document.getElementById('culture-cards');
    grid.innerHTML = '';

    SAMPLE_STATES.forEach(s => {
        // Add dance marker
        createStateMarker(s).addTo(danceLayer);

        // Add festival marker (smaller, different style)
        L.marker(s.coords, { title: s.name, icon: L.divIcon({ className: 'custom-icon', html: '🎉' }) }).addTo(festivalLayer).bindPopup(`<strong>${s.name}</strong><br/>Festivals: ${s.festivals.join(', ')}`);

        // Add cuisine marker
        L.circleMarker([s.coords[0] + 0.4, s.coords[1] + 0.4], { radius: 6, color: '#ff8a65', fillColor: '#ff8a65', fillOpacity: 0.8 }).addTo(cuisineLayer).bindPopup(`<strong>${s.name}</strong><br/>Popular: ${s.cuisine.join(', ')}`);

        // Create and append culture card
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <img src="${s.media.img || 'https://placehold.co/400x300/FDF5E6/000?text=Image+Coming+Soon'}" alt="Image of ${s.name}">
            <div class="card-content">
                <h3>${s.name}</h3>
                <p><strong>Dance:</strong> ${s.dance} (${s.danceType})</p>
                <p><strong>Festivals:</strong> ${s.festivals.join(', ')}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            map.setView(s.coords, 6);
            openMediaModal(s);
        });
        grid.appendChild(card);
    });
}

// Initial population of the map and cards
populateData();

// Toggle overlay visibility
document.getElementById('toggle-dance').addEventListener('change', (e) => {
    if (e.target.checked) map.addLayer(danceLayer); else map.removeLayer(danceLayer);
});
document.getElementById('toggle-festivals').addEventListener('change', (e) => {
    if (e.target.checked) map.addLayer(festivalLayer); else map.removeLayer(festivalLayer);
});
document.getElementById('toggle-cuisine').addEventListener('change', (e) => {
    if (e.target.checked) map.addLayer(cuisineLayer); else map.removeLayer(cuisineLayer);
});

// Modal logic for media
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');

function openMediaModal(state) {
    let mediaHTML = '';
    if (state.media.yt) {
        mediaHTML = `<div class="media-card"><iframe src="${state.media.yt}" allowfullscreen></iframe></div>`;
    } else if (state.media.img) {
        mediaHTML = `<img src="${state.media.img}" alt="Media for ${state.name}" style="width:100%; height:auto; border-radius:8px;">`;
    } else {
        mediaHTML = `<p class="muted">Media for this state is coming soon!</p>`;
    }

    modalContent.innerHTML = `
        <h2>${state.name} — ${state.dance}</h2>
        <p class="muted">Festivals: ${state.festivals.join(', ')} · Cuisine: ${state.cuisine.join(', ')}</p>
        ${mediaHTML}
        <div style="margin-top:20px; text-align:center;">
          <button class="btn" id="trail-from-state">Create Cuisine Trail from here</button>
        </div>
    `;
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');

    const trailBtn = document.getElementById('trail-from-state');
    if (trailBtn) {
        trailBtn.addEventListener('click', () => createCuisineTrail(state));
    }
}

function closeModal() {
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    modalContent.innerHTML = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Cuisine trail (simple example)
function createCuisineTrail(state) {
    const trailBox = document.getElementById('cuisine-trails');
    trailBox.innerHTML = `<div class="card"><h3>Trail: Flavors from ${state.name}</h3><p class="muted">Includes: ${state.cuisine.join(', ')}</p></div>`;
    closeModal();
    showUserMessage(`A new cuisine trail for ${state.name} has been created!`);
}

// VR grid sample items (populated)
const vrGrid = document.getElementById('vr-grid');
SAMPLE_STATES.forEach(s => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <img src="${s.media.img || 'https://placehold.co/400x300/FDF5E6/000?text=VR+Tour+Coming+Soon'}" alt="VR Tour of ${s.name}">
        <div class="card-content">
            <h3>${s.name}</h3>
            <p><strong>Dance:</strong> ${s.dance}</p>
        </div>
    `;
    div.addEventListener('click', () => openMediaModal(s));
    vrGrid.appendChild(div);
});

// Smooth scrolling for header links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.getElementById('main-menu')?.classList.remove('show');
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
    const menu = document.getElementById('main-menu');
    const expanded = menu.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', expanded);
});

// Intersection Observer for fade-in effect
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.12 });
document.querySelectorAll('.section').forEach(s => {
    s.classList.add('fade-in');
    io.observe(s);
});

// Contact form - simple UX
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (!fd.get('name') || !fd.get('email') || !fd.get('message')) {
        showUserMessage('Please fill all fields.');
        return;
    }
    showUserMessage('Thanks — your message has been received!');
    e.target.reset();
});

// COMPARE PANEL
const compareBtn = document.getElementById('compare-btn');
const comparePanel = document.getElementById('compare-panel');
const compareClose = document.querySelector('.compare-close');

compareBtn.addEventListener('click', () => {
    comparePanel.classList.add('is-visible');
    comparePanel.setAttribute('aria-hidden', 'false');
    const a = document.getElementById('compare-a');
    const b = document.getElementById('compare-b');
    a.innerHTML = '<option value="">Select A</option>';
    b.innerHTML = '<option value="">Select B</option>';
    SAMPLE_STATES.forEach(s => {
        a.innerHTML += `<option value="${s.id}">${s.name}</option>`;
        b.innerHTML += `<option value="${s.id}">${s.name}</option>`;
    });
});
compareClose.addEventListener('click', () => {
    comparePanel.classList.remove('is-visible');
    comparePanel.setAttribute('aria-hidden', 'true');
});

document.getElementById('do-compare').addEventListener('click', () => {
    const a = document.getElementById('compare-a').value;
    const b = document.getElementById('compare-b').value;
    if (!a || !b || a === b) {
        showUserMessage('Please choose two different states to compare.');
        return;
    }
    const sa = SAMPLE_STATES.find(x => x.id === a);
    const sb = SAMPLE_STATES.find(x => x.id === b);
    const out = `
        <div class="card-grid">
            <div class="card">
                <h3>${sa.name}</h3>
                <p><strong>Dance:</strong> ${sa.dance}</p>
                <p><strong>Festivals:</strong> ${sa.festivals.join(', ')}</p>
                <p><strong>Cuisine:</strong> ${sa.cuisine.join(', ')}</p>
            </div>
            <div class="card">
                <h3>${sb.name}</h3>
                <p><strong>Dance:</strong> ${sb.dance}</p>
                <p><strong>Festivals:</strong> ${sb.festivals.join(', ')}</p>
                <p><strong>Cuisine:</strong> ${sb.cuisine.join(', ')}</p>
            </div>
        </div>
    `;
    document.getElementById('compare-result').innerHTML = out;
});

// Accessibility: close modals with ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        comparePanel.classList.remove('is-visible');
    }
});
