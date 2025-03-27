document.addEventListener('DOMContentLoaded', function() {
    // Initialize filter collapsible functionality
    initFilterCollapsible();
    
    // Initialize animations
    initAnimations();
});

function initFilterCollapsible() {
    // Add filter header to filter containers
    const filterContainers = document.querySelectorAll('.filter-container');
    
    filterContainers.forEach(container => {
        // Create filter header if it doesn't exist
        if (!container.querySelector('.filter-header')) {
            const firstChild = container.firstChild;
            
            // Create header element
            const header = document.createElement('div');
            header.className = 'filter-header';
            header.innerHTML = `
                <h3>Filters</h3>
                <span class="filter-toggle"><i class="fas fa-chevron-up"></i></span>
            `;
            
            // Insert header at the beginning of container
            container.insertBefore(header, firstChild);
            
            // Add click event to toggle collapse
            header.addEventListener('click', function() {
                container.classList.toggle('collapsed');
            });
        }
        
        // Make filter groups collapsible
        const filterGroups = container.querySelectorAll('.filter-group');
        filterGroups.forEach(group => {
            const heading = group.querySelector('h4');
            if (heading) {
                heading.addEventListener('click', function(e) {
                    // Only toggle if the heading itself was clicked (not a child element)
                    if (e.target === heading || e.target === heading.querySelector('::after')) {
                        group.classList.toggle('collapsed');
                    }
                });
            }
        });
    });
}

function initAnimations() {
    // Add staggered animation to cards
    const cards = document.querySelectorAll('.location-card, .gear-card, .category-card, .featured-card');
    
    cards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Add transition properties
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Stagger the animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50)); // Stagger by 50ms per card
    });
    
    // Add hover effect to rating stars
    const ratingContainers = document.querySelectorAll('.rating');
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('i.fa-star, i.fa-star-half-alt');
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                // Animate stars on hover
                for (let i = 0; i <= index; i++) {
                    if (stars[i]) {
                        stars[i].style.transform = 'scale(1.3)';
                        stars[i].style.color = '#ffd700';
                    }
                }
            });
            
            star.addEventListener('mouseleave', () => {
                // Reset animation
                stars.forEach(s => {
                    s.style.transform = '';
                    s.style.color = '';
                });
            });
        });
    });
    
    // Add page transition effect
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#') || href === '') return;
                
                e.preventDefault();
                
                // Fade out
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        }
    });
    
    // Initialize body for page transitions
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Fade in the page
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Add scroll reveal animations
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.filter-container, .location-card, .gear-card, .category-card, .featured-card');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('in-view');
        }
    });
});

// Add button click animations
document.addEventListener('click', function(e) {
    if (e.target.matches('button') || e.target.closest('button')) {
        const button = e.target.matches('button') ? e.target : e.target.closest('button');
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        // Set ripple position
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        // Add ripple to button
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});