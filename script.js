// This function runs once the entire HTML document has been loaded.
document.addEventListener('DOMContentLoaded', function () {

    // 1. INITIALIZE THE MAP
    // We create a map instance in the 'leaflet-map' div.
    // Notice there is NO tile layer. This map will be "plain".
    const map = L.map('leaflet-map', {
        crs: L.CRS.Simple // Use a simple coordinate system as there are no tiles
    }).setView([22.5937, 82.9629], 5); // Center the view on India

    // The L.tileLayer code block has been completely REMOVED as requested.

    // This variable will hold our GeoJSON layer once it's loaded.
    let geojsonLayer;

    // 2. DEFINE INTERACTIVE STYLES FOR THE STATES
    // This is the default style for all Indian states on the map.
    const defaultStyle = {
        fillColor: 'rgba(113, 88, 226, 0.5)', // A semi-transparent purple
        weight: 1, // Border width
        opacity: 1,
        color: 'rgba(255, 107, 222, 0.8)', // A glowing pink border
        fillOpacity: 0.6
    };

    // This style is applied when a user hovers their mouse over a state.
    const hoverStyle = {
        weight: 3, // Bolder border
        color: '#FFFFFF', // A bright white border to make it pop
        fillColor: 'rgba(255, 107, 222, 0.7)', // A pink fill color
        fillOpacity: 0.8
    };

    // 3. FETCH AND DISPLAY MAP DATA FROM in.json
    // We use the modern `fetch` API to load the map data from your 'in.json' file.
    fetch('in.json')
        .then(response => {
            // Check if the file was found and the response is okay.
            if (!response.ok) {
                throw new Error('Network response was not ok. Could not find in.json.');
            }
            // Convert the response to JSON format.
            return response.json();
        })
        .then(data => {
            // Create a Leaflet GeoJSON layer with the loaded data.
            geojsonLayer = L.geoJSON(data, {
                style: defaultStyle, // Apply the default style to all states.
                onEachFeature: function (feature, layer) {
                    // This function runs for each state, adding interactive listeners.
                    layer.on({
                        // MOUSEOVER: When the cursor enters a state's boundary.
                        mouseover: function (e) {
                            const targetLayer = e.target;
                            targetLayer.setStyle(hoverStyle); // Apply the hover style.
                            targetLayer.bringToFront(); // Bring the state to the front layer.
                        },
                        // MOUSEOUT: When the cursor leaves the state's boundary.
                        mouseout: function (e) {
                            // Reset the style back to the default.
                            geojsonLayer.resetStyle(e.target);
                        },
                        // CLICK: When a user clicks on a state.
                        click: function (e) {
                            // This function is now empty, so nothing will happen on click.
                        }
                    });
                }
            }).addTo(map); // Add the completed GeoJSON layer to the map.
            
            // Set the map view to fit the bounds of the loaded GeoJSON data
            map.fitBounds(geojsonLayer.getBounds());
        })
        .catch(error => {
            // If the fetch fails, log the error and alert the user.
            console.error('Error loading or parsing map data:', error);
            alert('Failed to load map data. Please ensure the in.json file is in the same directory as your HTML file.');
        });
        
    // 4. MANAGE THE DETAILS PANEL'S CLOSE BUTTON
    const closePanelBtn = document.getElementById('close-panel-btn');
    const detailsPanel = document.getElementById('details-panel');

    if(closePanelBtn) {
        // Add a click listener to the close button.
        closePanelBtn.addEventListener('click', () => {
            // Hide the panel when the button is clicked.
            detailsPanel.classList.remove('is-visible');
            detailsPanel.classList.add('details-panel-hidden');
        });
    }
});