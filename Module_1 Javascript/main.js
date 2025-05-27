// main.js

// Task 1: Log "Welcome to the Community Portal" using console.log()
console.log("Welcome to the Community Portal");

// Task 2: Store event details using const and let
// Task 5: Define Event constructor or class
class Event {
    constructor(id, name, date, seats, category, description = "") {
        this.id = id;
        // Task 2: Use const for event name and date (within the object context)
        this.name = name;
        this.date = new Date(date); // Store as Date object for easier comparison
        // Task 2: Use let for seats (as it will change)
        this.seats = seats;
        this.category = category;
        this.description = description;
    }

    // Task 5: Add checkAvailability() to prototype
    checkAvailability() {
        return this.seats > 0;
    }

    // Task 2: Concatenate event info using template literals
    getEventInfo() {
        return `${this.name} on ${this.date.toLocaleDateString()}. Seats available: ${this.seats}. Category: ${this.category}.`;
    }
}

// Global array to hold all events
let allEvents = [];
// Object to track total registrations for each category (Task 4: Closure for tracking)
const categoryRegistrations = (() => {
    const registrations = {};
    return {
        increment: (category) => {
            registrations[category] = (registrations[category] || 0) + 1;
            console.log(`Total registrations for ${category}: ${registrations[category]}`);
        },
        get: (category) => registrations[category] || 0
    };
})();


// Task 4: Create addEvent() function
// Task 10: Use default parameters in functions
function addEvent(id, name, date, seats, category, description = "No description provided.") {
    const newEvent = new Event(id, name, date, seats, category, description);
    allEvents.push(newEvent); // Task 6: Add new events using .push()
    console.log(`Added event: ${newEvent.getEventInfo()}`);
}

// Task 4: Create registerUser() function
// Task 10: Use destructuring to extract event details
async function registerUser(eventToRegister, { fullName, email }) {
    // Task 3: Wrap registration logic in try-catch to handle errors
    try {
        if (!eventToRegister) {
            throw new Error("No event selected for registration.");
        }
        if (!eventToRegister.checkAvailability()) {
            throw new Error(`Sorry, ${eventToRegister.name} is fully booked.`);
        }

        // Simulate API call for registration
        const registrationData = {
            eventId: eventToRegister.id,
            eventName: eventToRegister.name,
            userName: fullName,
            userEmail: email,
            registrationDate: new Date().toISOString()
        };

        // Task 12: Use fetch() to POST user data to a mock API
        // Task 9: Show loading spinner
        const registrationConfirmationOutput = document.getElementById('registrationConfirmation');
        registrationConfirmationOutput.textContent = "Processing registration...";
        registrationConfirmationOutput.style.backgroundColor = '#FFFACD'; // Light yellow for loading

        const response = await new Promise(resolve => setTimeout(() => {
            // Simulate a successful or failed response
            const success = Math.random() > 0.1; // 90% success rate
            if (success) {
                eventToRegister.seats--; // Task 2: Use -- to manage seat count
                categoryRegistrations.increment(eventToRegister.category); // Task 4: Use closure
                resolve({ status: 200, message: `Successfully registered for ${eventToRegister.name}! Remaining seats: ${eventToRegister.seats}.` });
            } else {
                resolve({ status: 500, message: `Failed to register for ${eventToRegister.name}. Please try again.` });
            }
        }, 2000)); // Task 12: Use setTimeout() to simulate a delayed response

        // Task 12: Show success/failure message after submission
        if (response.status === 200) {
            registrationConfirmationOutput.textContent = response.message;
            registrationConfirmationOutput.style.backgroundColor = '#D4EDDA'; // Light green
            // Task 7: Update UI when user registers
            renderEvents(allEvents); // Re-render events to show updated seat count
            updateEventSelectDropdown(); // Update dropdown with new seat counts
        } else {
            throw new Error(response.message);
        }

    } catch (error) {
        console.error("Registration Error:", error.message);
        const registrationConfirmationOutput = document.getElementById('registrationConfirmation');
        registrationConfirmationOutput.textContent = `Registration failed: ${error.message}`;
        registrationConfirmationOutput.style.backgroundColor = '#FFDDC1'; // Light orange for error
    }
}

// Task 4: Create filterEventsByCategory()
// Task 4: Pass callbacks to filter functions for dynamic search
function filterEventsByCategory(category, eventsList, callback) {
    // Task 10: Use spread operator to clone event list before filtering
    let filtered = [...eventsList];
    if (category !== "all") {
        filtered = filtered.filter(event => event.category.toLowerCase() === category.toLowerCase()); // Task 6: Use .filter()
    }
    if (callback && typeof callback === 'function') {
        callback(filtered);
    }
    return filtered;
}

// Function to filter events by search term
function filterEventsByName(searchTerm, eventsList, callback) {
    let filtered = [...eventsList];
    if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(event =>
            event.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            event.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }
    if (callback && typeof callback === 'function') {
        callback(filtered);
    }
    return filtered;
}

// Task 7: Access DOM elements using querySelector()
const eventsListContainer = document.querySelector('#events-list');
const categoryFilterSelect = document.getElementById('categoryFilter');
const eventSearchInput = document.getElementById('eventSearch');
const registrationForm = document.getElementById('eventRegistrationForm');
const eventSelectDropdown = document.getElementById('eventSelect');
const loadingSpinner = document.getElementById('loading-spinner');

// Function to render events dynamically
// Task 7: Create and append event cards using createElement()
function renderEvents(eventsToDisplay) {
    eventsListContainer.innerHTML = ''; // Clear previous events
    if (eventsToDisplay.length === 0) {
        eventsListContainer.innerHTML = '<p>No events found matching your criteria.</p>';
        return;
    }

    // Task 3: Loop through the event list and display using forEach()
    eventsToDisplay.forEach(event => {
        // Task 3: Use if-else to hide past or full events
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to compare only date part

        if (event.date < today || !event.checkAvailability()) {
            // console.log(`Skipping event: ${event.name} (Past or Full)`);
            return; // Skip rendering if past or full
        }

        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        // Task 6: Use .map() to format display cards (e.g., "Workshop on Baking")
        const eventNameFormatted = event.name.includes('Workshop') ? `Workshop on ${event.name.replace('Workshop ', '')}` : event.name;

        eventCard.innerHTML = `
            <h4>${eventNameFormatted}</h4>
            <p><strong>Date:</strong> ${event.date.toLocaleDateString()}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <div class="card-footer">
                <span>Seats: ${event.seats}</span>
                <button class="register-button" data-event-id="${event.id}" ${event.seats === 0 ? 'disabled' : ''}>Register</button>
            </div>
        `;
        eventsListContainer.appendChild(eventCard);
    });

    // Attach event listeners to dynamically created register buttons
    // Task 8: Use onclick for "Register" buttons
    $('.register-button').off('click').on('click', function() { // Task 14: Use jQuery click handler
        const eventId = $(this).data('event-id'); // Task 14: Use jQuery data()
        const selectedEvent = allEvents.find(e => e.id === eventId);

        if (selectedEvent) {
            // Populate registration form fields for the selected event
            $('#eventSelect').val(selectedEvent.id); // Task 14: Use jQuery val()
            // Simulate user details for quick registration
            const mockUser = {
                fullName: "Jane Doe",
                email: "jane.doe@example.com"
            };
            // Task 13: Log form submission steps
            console.log("Attempting to register user:", mockUser.fullName, "for event:", selectedEvent.name);
            registerUser(selectedEvent, mockUser);
        }
    });

    // Task 14: Use .fadeIn() for event cards
    $('.event-card').hide().fadeIn(800);
}

// Function to populate the event selection dropdown for registration form
function updateEventSelectDropdown() {
    eventSelectDropdown.innerHTML = '<option value="">--Select an Event--</option>';
    allEvents.forEach(event => {
        // Only add events that are upcoming and have seats
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (event.date >= today && event.checkAvailability()) {
            const option = document.createElement('option');
            option.value = event.id;
            option.textContent = `${event.name} (${event.seats} seats left)`;
            eventSelectDropdown.appendChild(option);
        }
    });
}

// Task 9: Fetch events from a mock JSON endpoint
// Task 9: Rewrite using async/await and show loading spinner
async function fetchEvents() {
    loadingSpinner.style.display = 'block'; // Show loading spinner
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockEventsData = [
            { id: 'e001', name: 'Summer Music Fest', date: '2025-07-15', seats: 100, category: 'Music', description: 'Annual summer music festival with local bands.' },
            { id: 'e002', name: 'Art Workshop', date: '2025-08-01', seats: 20, category: 'Workshop', description: 'Learn painting techniques with local artists.' },
            { id: 'e003', name: 'Community Charity Run', date: '2025-06-20', seats: 50, category: 'Sports', description: 'A fun run to support local charities.' },
            { id: 'e004', name: 'Farmers Market Day', date: '2025-05-25', seats: 0, category: 'Market', description: 'Fresh produce and local crafts. (Past event)' }, // Past event
            { id: 'e005', name: 'Book Club Meetup', date: '2025-09-10', seats: 15, category: 'Social', description: 'Discussing the latest bestsellers.' },
            { id: 'e006', name: 'Coding Bootcamp', date: '2025-10-05', seats: 30, category: 'Workshop', description: 'Intensive coding workshop for beginners.' },
            { id: 'e007', name: 'Jazz Night', date: '2025-07-20', seats: 40, category: 'Music', description: 'Relaxing evening with live jazz music.' },
            { id: 'e008', name: 'Yoga in the Park', date: '2025-06-01', seats: 25, category: 'Sports', description: 'Outdoor yoga session for all levels.' }
        ];

        // Task 9: Use .then() and .catch() (conceptual, integrated into async/await)
        // This is where you'd typically fetch from a real API:
        // const response = await fetch('your-mock-api-endpoint.json');
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();

        allEvents = mockEventsData.map(data => new Event(data.id, data.name, data.date, data.seats, data.category, data.description));
        renderEvents(allEvents);
        updateEventSelectDropdown();
        console.log("Events fetched successfully!");
    } catch (error) {
        console.error("Failed to fetch events:", error);
        eventsListContainer.innerHTML = '<p>Error loading events. Please try again later.</p>';
    } finally {
        loadingSpinner.style.display = 'none'; // Hide loading spinner
    }
}

// Task 8: Use onchange to filter events by category
categoryFilterSelect.addEventListener('change', () => {
    const selectedCategory = categoryFilterSelect.value;
    filterEventsByCategory(selectedCategory, allEvents, (filtered) => {
        renderEvents(filtered);
    });
});

// Task 8: Use keydown to allow quick search by name
eventSearchInput.addEventListener('keydown', (event) => {
    // Only filter on Enter key press for better performance
    if (event.key === 'Enter') {
        const searchTerm = eventSearchInput.value;
        filterEventsByName(searchTerm, allEvents, (filtered) => {
            renderEvents(filtered);
        });
    }
});

// Task 11: Working with Forms
// Task 7: Update UI when user registers or cancels (registration handled by registerUser)
registrationForm.addEventListener('submit', async (event) => {
    // Task 11: Prevent default form behavior using event.preventDefault()
    event.preventDefault();

    // Task 11: Capture name, email, and selected event using form.elements
    const fullName = registrationForm.elements.fullName.value;
    const email = registrationForm.elements.email.value;
    const selectedEventId = registrationForm.elements.eventSelect.value;
    const message = registrationForm.elements.message.value;

    // Task 11: Validate inputs and show errors inline
    const registrationConfirmationOutput = document.getElementById('registrationConfirmation');
    if (!fullName || !email || !selectedEventId) {
        registrationConfirmationOutput.textContent = "Please fill in all required registration fields.";
        registrationConfirmationOutput.style.backgroundColor = '#FFDDC1';
        return;
    }

    const selectedEvent = allEvents.find(event => event.id === selectedEventId);
    if (!selectedEvent) {
        registrationConfirmationOutput.textContent = "Selected event not found.";
        registrationConfirmationOutput.style.backgroundColor = '#FFDDC1';
        return;
    }

    // Task 13: Log form submission steps and check fetch request payload
    console.log("Form submitted. User:", fullName, "Email:", email, "Event ID:", selectedEventId, "Message:", message);

    await registerUser(selectedEvent, { fullName, email });
});


// Existing functions from the original HTML, moved to main.js
// Made these functions global by attaching them to the window object
// to resolve "is not defined" errors when called directly from HTML attributes.
window.validatePhoneNumber = function() {
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/; // Simple pattern: XXX-XXX-XXXX

    if (phoneInput.value === "") {
        phoneError.textContent = ""; // Clear error if empty
        return;
    }

    if (!phonePattern.test(phoneInput.value)) {
        phoneError.textContent = "Please enter a valid phone number (e.g., 123-456-7890)";
    } else {
        phoneError.textContent = "";
    }
}

window.countCharacters = function(textarea) {
    const maxLength = 500;
    const currentLength = textarea.value.length;
    const charsRemaining = maxLength - currentLength;
    document.getElementById('charCount').textContent = Math.max(0, charsRemaining); // Ensure it doesn't go below 0
    if (charsRemaining < 0) {
        textarea.value = textarea.value.substring(0, maxLength); // Truncate if over limit
    }
}

// Task 7: Media Events (oncanplay)
window.displayVideoReady = function() {
    document.getElementById('videoMessage').textContent = "Video ready to play!";
    console.log("Video is ready to play!"); // For debugging
}

// Task 7: onbeforeunload - This is already on the window object, no change needed.
// window.onbeforeunload = function() { ... };

// Task 9: Geolocation
window.findNearbyEvents = function() {
    const locationDisplay = document.getElementById('locationDisplay');
    if (navigator.geolocation) {
        locationDisplay.textContent = "Finding your location...";
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                locationDisplay.textContent = `Your coordinates: Latitude ${lat}, Longitude ${lon}. We'll show nearby events here soon!`;
                console.log(`Geolocation successful: Lat ${lat}, Lon ${lon}`); // For debugging
            },
            (error) => {
                let errorMessage = "Could not retrieve your location.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location access denied. Please enable it in your browser settings.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        errorMessage = "An unknown error occurred.";
                        break;
                }
                locationDisplay.textContent = errorMessage;
                console.error("Geolocation error:", error); // For debugging
            },
            {
                enableHighAccuracy: true,
                timeout: 10000, // 10 seconds
                maximumAge: 0 // No cached position
            }
        );
    } else {
        locationDisplay.textContent = "Geolocation is not supported by your browser.";
    }
}

// The original `showConfirmation` function was called via `onclick` in HTML.
// It's better to handle form submission via an event listener on the form itself,
// which is already done for `registrationForm.addEventListener('submit', ...)`.
// However, if the user explicitly wants to keep the inline `onclick` for `showConfirmation`,
// it needs to be globally accessible. Given the existing form submission listener,
// the inline `onclick` for `showConfirmation` on the button is redundant and can be removed
// or the function made global if it's intended for a different purpose.
// For now, making it global to resolve potential `is not defined` if it's still used.
window.showConfirmation = function(event) {
    // This function is largely superseded by the 'submit' event listener on the form.
    // Keeping it global if other parts of the HTML still reference it directly.
    event.preventDefault(); // Prevent default button behavior
    console.warn("showConfirmation() called. Note: Form submission is primarily handled by the 'submit' event listener on the form.");
    // The actual form submission logic is in the 'submit' event listener for registrationForm.
    // This function will just provide a basic alert if called directly.
    const fullName = document.getElementById('fullName').value;
    const confirmationOutput = document.getElementById('registrationConfirmation');
    if (fullName) {
        confirmationOutput.textContent = `Quick confirmation for ${fullName}. Full registration handled by form submit.`;
        confirmationOutput.style.backgroundColor = '#D4EDDA';
    } else {
        confirmationOutput.textContent = "Please enter your full name.";
        confirmationOutput.style.backgroundColor = '#FFDDC1';
    }
};


// Task 8: Save User Preferences (localStorage) - Modified to work with new event selection
document.addEventListener('DOMContentLoaded', () => {
    // Task 1: Use an alert to notify when the page is fully loaded
    // NOTE: In a real application, consider using a custom modal or toast notification
    // instead of alert() for better user experience and non-blocking behavior.
    alert("Page fully loaded!");

    // Restore preferred event type from localStorage on page load (if applicable to new structure)
    // The original `displayEventFee` logic was tied to a specific select,
    // this will now be handled by the dynamic event rendering and selection.
    // However, the `clearPreferencesBtn` still clears localStorage.

    // Task 6: ondblclick on image to enlarge - existing logic
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(img => {
        img.ondblclick = function() {
            const originalSrc = this.src;
            const largeSrc = originalSrc.replace('180x120', '800x600'); // Assuming a larger placeholder size exists
            window.open(largeSrc, '_blank'); // Open in new tab for simplicity
        };
    });

    // Task 8: Clear Preferences button - existing logic
    const clearPreferencesBtn = document.getElementById('clearPreferences');
    clearPreferencesBtn.onclick = function() {
        localStorage.clear();
        sessionStorage.clear();
        alert('All stored preferences cleared!');
        // Reset form fields
        registrationForm.reset();
        document.getElementById('registrationConfirmation').textContent = '';
        document.getElementById('phoneError').textContent = '';
        document.getElementById('feedbackTextarea').value = ''; // Clear feedback textarea
        document.getElementById('charCount').textContent = '500'; // Reset char count
        updateEventSelectDropdown(); // Re-populate dropdown
    };

    // Initial fetch of events when the page loads
    fetchEvents();
});

// Task 14: Mention one benefit of moving to frameworks like React or Vue
/*
Benefit of moving to frameworks like React or Vue:
These frameworks provide a component-based architecture, which makes it easier to build complex UIs
by breaking them down into small, reusable, and manageable pieces. They offer efficient DOM updates
(Virtual DOM in React, reactivity in Vue) leading to better performance, and provide powerful state
management solutions, making application state predictable and easier to debug. This leads to
more maintainable, scalable, and performant web applications compared to traditional vanilla JS DOM manipulation.
*/
