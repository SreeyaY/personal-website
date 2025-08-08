// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const getInTouchBtn = document.querySelector('a[href="#contact"]');
    
    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create email body with just the message
            const emailBody = message;
            
            // Open default email client
            const mailtoLink = `mailto:sreeya.yakkala@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            window.open(mailtoLink);
            
            // Show success message
            showNotification('Form submitted! Your email client should open.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Handle Get In Touch button
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smooth scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Notification function
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Set background color based on type
        if (type === 'success') {
            notification.style.backgroundColor = '#28a745';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#dc3545';
        } else {
            notification.style.backgroundColor = '#667eea';
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Add click handlers to contact info items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                // If it's a link, let it work normally
                return;
            }
            
            // For email and phone, copy to clipboard
            const text = this.querySelector('p').textContent;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showNotification(`${text} copied to clipboard!`, 'success');
                });
            }
        });
    });
});

// Carousel functionality
let slideIndexes = [1, 1, 1]; // Track current slide for each carousel

function changeSlide(n, carouselIndex) {
    showSlides(slideIndexes[carouselIndex] + n, carouselIndex);
}

function currentSlide(n, carouselIndex) {
    showSlides(n, carouselIndex);
}

function showSlides(n, carouselIndex) {
    const carousels = document.querySelectorAll('.photo-carousel');
    const carousel = carousels[carouselIndex];
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    
    if (n > slides.length) {
        slideIndexes[carouselIndex] = 1;
    } else if (n < 1) {
        slideIndexes[carouselIndex] = slides.length;
    } else {
        slideIndexes[carouselIndex] = n;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    slides[slideIndexes[carouselIndex] - 1].classList.add('active');
    dots[slideIndexes[carouselIndex] - 1].classList.add('active');
} 