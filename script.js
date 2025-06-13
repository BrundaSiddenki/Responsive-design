document.addEventListener('DOMContentLoaded', () => {
    // 1. Dummy Art Piece Data (Realistic images from Pexels, with 'rating')
    const artPieces = [
        { id: 1, title: 'Abstract Harmony', artist: 'Anya Sharma', medium: 'Oil on Canvas', year: 2023, price: 12500.00, rating: 4.5, image: 'https://images.pexels.com/photos/1760460/pexels-photo-1760460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 2, title: 'City of Dreams', artist: 'Ravi Kumar', medium: 'Watercolor', year: 2022, price: 7800.00, rating: 4.2, image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 3, title: 'Eternal Embrace', artist: 'Priya Singh', medium: 'Sculpture', year: 2024, price: 25000.00, rating: 4.8, image: 'https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 4, title: 'Coastal Serenity', artist: 'Vikram Das', medium: 'Photography', year: 2023, price: 4200.00, rating: 3.9, image: 'https://images.pexels.com/photos/1572459/pexels-photo-1572459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 5, title: 'Forest Whisper', artist: 'Anya Sharma', medium: 'Watercolor', year: 2024, price: 8900.00, rating: 4.7, image: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 6, title: 'Urban Echoes', artist: 'Ravi Kumar', medium: 'Oil on Canvas', year: 2021, price: 18000.00, rating: 4.1, image: 'https://images.pexels.com/photos/235615/pexels-photo-235615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 7, title: 'Celestial Dance', artist: 'Priya Singh', medium: 'Sculpture', year: 2023, price: 35000.00, rating: 4.9, image: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 8, title: 'Morning Dew', artist: 'Vikram Das', medium: 'Photography', year: 2024, price: 5500.00, rating: 4.0, image: 'https://images.pexels.com/photos/401584/pexels-photo-401584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 9, title: 'Vibrant Chaos', artist: 'Anya Sharma', medium: 'Oil on Canvas', year: 2022, price: 11000.00, rating: 3.8, image: 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 10, title: 'Old Town Charm', artist: 'Ravi Kumar', medium: 'Watercolor', year: 2023, price: 9500.00, rating: 4.3, image: 'https://images.pexels.com/photos/236171/pexels-photo-236171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 11, title: 'Ascension', artist: 'Priya Singh', medium: 'Sculpture', year: 2024, price: 48000.00, rating: 4.6, image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 12, title: 'Desert Bloom', artist: 'Vikram Das', medium: 'Photography', year: 2023, price: 6200.00, rating: 4.4, image: 'https://images.pexels.com/photos/401490/pexels-photo-401490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
    ];

    let filteredArt = [...artPieces]; // Current list of art pieces after filters
    let currentSort = 'default';
    let selectedArtists = [];
    let selectedMediums = [];
    let selectedPriceRange = '';

    // Cart array to store items
    let cart = [];

    // 2. Get DOM Elements
    const artContainer = document.getElementById('art-container');
    const artistCheckboxes = document.querySelectorAll('.filter-artist');
    const mediumCheckboxes = document.querySelectorAll('.filter-medium');
    const priceRadios = document.querySelectorAll('.filter-price');
    const sortBySelect = document.getElementById('sort-by');
    const clearAllFiltersBtn = document.getElementById('clear-all-filters');
    const clearPriceFilterBtn = document.getElementById('clear-price-filter');
    const noArtMessage = document.getElementById('no-art-message');

    // Cart Elements
    const viewCartBtn = document.getElementById('view-cart-btn');
    const cartItemCountSpan = document.getElementById('cart-item-count');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalPriceSpan = document.getElementById('cart-total-price');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const closeCartBtn = cartModal.querySelector('.close-button');

    // Order Confirmation Elements
    const orderConfirmationModal = document.getElementById('order-confirmation-modal');
    const closeOrderBtn = orderConfirmationModal.querySelector('.close-order-button');
    const continueShoppingBtn = orderConfirmationModal.querySelector('.continue-shopping-btn');


    // 3. Function to Render Art Pieces
    function renderArtPieces(artToRender) {
        artContainer.innerHTML = ''; // Clear existing art
        if (artToRender.length === 0) {
            noArtMessage.classList.remove('hidden');
            return;
        } else {
            noArtMessage.classList.add('hidden');
        }

        artToRender.forEach(art => {
            const artCard = document.createElement('div');
            artCard.classList.add('art-card');
            artCard.innerHTML = `
                <img src="${art.image}" alt="${art.title} by ${art.artist}">
                <div class="art-info">
                    <h3>${art.title}</h3>
                    <p class="artist-name">Artist: ${art.artist}</p>
                    <p>Medium: ${art.medium}</p>
                    <p>Year: ${art.year}</p>
                    <div class="rating">Rating: ${'⭐'.repeat(Math.floor(art.rating))} ${art.rating.toFixed(1)}</div>
                    <div class="price">₹${art.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <button class="add-to-cart-btn" data-id="${art.id}">Add to Cart</button>
                </div>
            `;
            artContainer.appendChild(artCard);
        });

        // Add event listeners for "Add to Cart" buttons after rendering
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const artId = parseInt(event.target.dataset.id);
                addToCart(artId);
            });
        });
    }

    // 4. Function to Apply Filters and Sort
    function applyFiltersAndSort() {
        let tempArt = [...artPieces]; // Start with the full art list

        // Apply Artist Filters
        if (selectedArtists.length > 0) {
            tempArt = tempArt.filter(art =>
                selectedArtists.includes(art.artist)
            );
        }

        // Apply Medium Filters
        if (selectedMediums.length > 0) {
            tempArt = tempArt.filter(art =>
                selectedMediums.includes(art.medium)
            );
        }

        // Apply Price Range Filter
        if (selectedPriceRange) {
            tempArt = tempArt.filter(art => {
                const [minStr, maxStr] = selectedPriceRange.split('-');
                const min = parseFloat(minStr);
                const max = maxStr === 'inf' ? Infinity : parseFloat(maxStr);
                return art.price >= min && art.price <= max;
            });
        }

        // Apply Sorting
        switch (currentSort) {
            case 'rating-desc': // New Rating Sort
                tempArt.sort((a, b) => b.rating - a.rating);
                break;
            case 'price-asc':
                tempArt.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                tempArt.sort((a, b) => b.price - a.price);
                break;
            case 'artist-asc':
                tempArt.sort((a, b) => a.artist.localeCompare(b.artist));
                break;
            case 'year-desc':
                tempArt.sort((a, b) => b.year - a.year);
                break;
            case 'default':
            default:
                // No specific sort, rely on original order
                break;
        }

        filteredArt = tempArt;
        renderArtPieces(filteredArt);
    }

    // 5. Cart Management Functions
    function addToCart(artId) {
        const artToAdd = artPieces.find(art => art.id === artId);
        if (artToAdd && !cart.some(item => item.id === artId)) { // Prevent adding same item multiple times
            cart.push(artToAdd);
            updateCartDisplay();
            alert(`${artToAdd.title} by ${artToAdd.artist} added to cart!`); // Simple confirmation
        } else if (artToAdd) {
            alert(`${artToAdd.title} is already in your cart!`);
        }
    }

    function removeFromCart(artId) {
        cart = cart.filter(item => item.id !== artId);
        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            emptyCartMessage.classList.remove('hidden');
            placeOrderBtn.classList.add('hidden');
        } else {
            emptyCartMessage.classList.add('hidden');
            placeOrderBtn.classList.remove('hidden');
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <p>by ${item.artist}</p>
                    </div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <button class="remove-from-cart-btn" data-id="${item.id}">&times;</button>
                `;
                cartItemsDiv.appendChild(cartItemDiv);
                total += item.price;
            });

            // Add event listeners for remove buttons
            document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const artId = parseInt(event.target.dataset.id);
                    removeFromCart(artId);
                });
            });
        }

        cartTotalPriceSpan.textContent = `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        cartItemCountSpan.textContent = cart.length; // Update count in main view
    }

    function placeOrder() {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before placing an order.");
            return;
        }
        // Simulate order placement
        // In a real application, you'd send cart data to a server here.
        
        cart = []; // Clear the cart
        updateCartDisplay(); // Update display to show empty cart
        cartModal.classList.add('hidden'); // Hide cart modal

        orderConfirmationModal.classList.remove('hidden'); // Show order confirmation
        console.log("Order Placed! Cart has been cleared.");
    }

    // 6. Event Listeners

    // Artist Filter Listener
    artistCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const artist = event.target.value;
            if (event.target.checked) {
                selectedArtists.push(artist);
            } else {
                selectedArtists = selectedArtists.filter(a => a !== artist);
            }
            applyFiltersAndSort();
        });
    });

    // Medium Filter Listener
    mediumCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const medium = event.target.value;
            if (event.target.checked) {
                selectedMediums.push(medium);
            } else {
                selectedMediums = selectedMediums.filter(m => m !== medium);
            }
            applyFiltersAndSort();
        });
    });

    // Price Filter Listener
    priceRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            selectedPriceRange = event.target.value;
            applyFiltersAndSort();
        });
    });

    // Clear Price Filter Button
    clearPriceFilterBtn.addEventListener('click', () => {
        selectedPriceRange = '';
        priceRadios.forEach(radio => radio.checked = false);
        applyFiltersAndSort();
    });

    // Sort By Listener
    sortBySelect.addEventListener('change', (event) => {
        currentSort = event.target.value;
        applyFiltersAndSort();
    });

    // Clear All Filters Button
    clearAllFiltersBtn.addEventListener('click', () => {
        selectedArtists = [];
        selectedMediums = [];
        selectedPriceRange = '';
        currentSort = 'default';

        artistCheckboxes.forEach(checkbox => checkbox.checked = false);
        mediumCheckboxes.forEach(checkbox => checkbox.checked = false);
        priceRadios.forEach(radio => radio.checked = false);
        sortBySelect.value = 'default';

        applyFiltersAndSort(); // Re-render with all filters cleared
    });

    // Cart Modal Event Listeners
    viewCartBtn.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
        updateCartDisplay(); // Ensure cart display is fresh when opened
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    // Close modal if user clicks outside of content
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.classList.add('hidden');
        }
        if (event.target === orderConfirmationModal) {
            orderConfirmationModal.classList.add('hidden');
        }
    });

    // Place Order Button Listener
    placeOrderBtn.addEventListener('click', placeOrder);

    // Order Confirmation Modal Event Listeners
    closeOrderBtn.addEventListener('click', () => {
        orderConfirmationModal.classList.add('hidden');
    });

    continueShoppingBtn.addEventListener('click', () => {
        orderConfirmationModal.classList.add('hidden');
    });

    // Initial render when the page loads
    applyFiltersAndSort();
    updateCartDisplay(); // Initialize cart display
});