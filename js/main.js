/**
 * Danifas Catering & Events - Main JavaScript
 * Handles navigation, menu filter, gallery preview, modal reservation, and form validation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar shadow on scroll
    const navbar = document.querySelector('.main-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Menu Category Filtering (for Menu Page)
    const menuFilterButtons = document.querySelectorAll('.menu-filter-btn');
    const menuItemCards = document.querySelectorAll('.menu-item-card');

    if (menuFilterButtons.length > 0 && menuItemCards.length > 0) {
        menuFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                menuFilterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                menuItemCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // 3. Gallery Category Filtering & Lightbox (for Gallery Page)
    const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('galleryLightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    if (galleryFilterButtons.length > 0 && galleryItems.length > 0) {
        galleryFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Lightbox open trigger
    if (lightboxModal && lightboxImg) {
        const previewButtons = document.querySelectorAll('.gallery-preview-btn');
        previewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = btn.getAttribute('data-img');
                const title = btn.getAttribute('data-title') || 'Danifas Event Gallery';
                
                lightboxImg.src = imgSrc;
                if (lightboxCaption) {
                    lightboxCaption.textContent = title;
                }

                const modal = new bootstrap.Modal(lightboxModal);
                modal.show();
            });
        });
    }

    // 4. Booking & Contact Form Submission Feedback
    const reservationForms = document.querySelectorAll('.danifas-form');
    reservationForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...';
            }

            setTimeout(() => {
                // Show success alert
                const alertBox = document.createElement('div');
                alertBox.className = 'alert alert-success mt-3';
                alertBox.role = 'alert';
                alertBox.innerHTML = '<strong>Thank you!</strong> Your request has been received. Our event coordinator will contact you shortly.';
                
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }

                // If inside modal, auto close after feedback
                const parentModal = form.closest('.modal');
                if (parentModal) {
                    form.prepend(alertBox);
                    setTimeout(() => {
                        const bsModal = bootstrap.Modal.getInstance(parentModal);
                        if (bsModal) {
                            bsModal.hide();
                        }
                        alertBox.remove();
                    }, 2500);
                } else {
                    form.prepend(alertBox);
                    setTimeout(() => {
                        alertBox.remove();
                    }, 5000);
                }
            }, 800);
        });
    });

    // 5. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"]):not([data-bs-toggle])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
