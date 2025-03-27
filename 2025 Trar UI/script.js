document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Date picker functionality (using flatpickr if available)
    if (typeof flatpickr !== 'undefined') {
        flatpickr('.date-picker input', {
            dateFormat: 'Y-m-d',
            minDate: 'today'
        });
    }
    
    // Add animation effects on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.category-card, .featured-card, .location-card, .gear-card, .gear-list-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize animation styles
    const elementsToAnimate = document.querySelectorAll('.category-card, .featured-card, .location-card, .gear-card, .gear-list-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
    
    // Search functionality placeholder
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchQuery = document.querySelector('.search-bar input').value;
            const location = document.querySelector('.location-selector input').value;
            const startDate = document.querySelector('.date-picker input:first-of-type').value;
            const endDate = document.querySelector('.date-picker input:last-of-type').value;
            
            // In a real application, this would send the search parameters to a server
            console.log('Search parameters:', { searchQuery, location, startDate, endDate });
            
            // For demo purposes, show an alert
            alert(`Searching for: ${searchQuery}\nLocation: ${location}\nDates: ${startDate} to ${endDate}`);
        });
    }
    
    // View toggle functionality (Grid/List/Map)
    const viewBtns = document.querySelectorAll('.view-btn');
    if (viewBtns.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all view buttons
                viewBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get the view type
                const viewType = btn.getAttribute('data-view');
                
                // Handle different view types
                if (viewType === 'grid') {
                    // Show grid view, hide others
                    const gridResults = document.querySelector('.location-results, .gear-results');
                    const mapView = document.querySelector('.map-view');
                    const listView = document.querySelector('.list-view');
                    
                    if (gridResults) gridResults.style.display = 'grid';
                    if (mapView) mapView.style.display = 'none';
                    if (listView) listView.style.display = 'none';
                } else if (viewType === 'map') {
                    // Show map view, hide others
                    const gridResults = document.querySelector('.location-results');
                    const mapView = document.querySelector('.map-view');
                    
                    if (gridResults) gridResults.style.display = 'none';
                    if (mapView) mapView.style.display = 'block';
                } else if (viewType === 'list') {
                    // Show list view, hide others
                    const gridResults = document.querySelector('.gear-results');
                    const listView = document.querySelector('.list-view');
                    
                    if (gridResults) gridResults.style.display = 'none';
                    if (listView) listView.style.display = 'block';
                }
            });
        });
    }
    
    // Price range slider functionality
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        // Update the price value display when slider changes
        priceRange.addEventListener('input', () => {
            priceValue.textContent = `$${priceRange.value}`;
        });
    }
    
    // Apply filters button functionality
    const applyFiltersBtn = document.querySelector('.apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            // Get all selected filters
            const typeFilters = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(input => input.value);
            const priceFilter = document.getElementById('priceRange')?.value;
            const amenitiesFilters = Array.from(document.querySelectorAll('input[name="amenities"]:checked')).map(input => input.value);
            const sizeFilters = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(input => input.value);
            const brandFilters = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(input => input.value);
            const conditionFilters = Array.from(document.querySelectorAll('input[name="condition"]:checked')).map(input => input.value);
            
            // In a real application, this would filter the results based on the selected filters
            console.log('Applied filters:', { 
                type: typeFilters, 
                price: priceFilter, 
                amenities: amenitiesFilters, 
                size: sizeFilters,
                brand: brandFilters,
                condition: conditionFilters
            });
            
            // For demo purposes, show an alert
            alert('Filters applied! In a real application, this would filter the results.');
        });
    }
    
    // Make cards tappable for mobile users
    const cards = document.querySelectorAll('.location-card, .gear-card, .category-card, .featured-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // In a real application, this would navigate to the detail page
            const title = card.querySelector('h4')?.textContent || 'Item';
            alert(`You selected: ${title}\nIn a real application, this would open the detail page.`);
        });
    });
    
    // Pagination functionality
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    if (paginationBtns.length > 0) {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all pagination buttons
                paginationBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button if it's not the next button
                if (!btn.querySelector('.fa-chevron-right')) {
                    btn.classList.add('active');
                }
                
                // In a real application, this would load the next page of results
                alert('In a real application, this would load the next page of results.');
            });
        });
    }
});