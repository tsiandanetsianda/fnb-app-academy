// Simple Pine City Zoo Interactions - No Image Interference!
document.addEventListener('DOMContentLoaded', function() {
    
    // Weather Modal
    const weatherBtn = document.querySelector('.bottom-nav-btn:first-child');
    const feedbackBtn = document.querySelector('.bottom-nav-btn:last-child');
    
    // Create and show weather modal
    weatherBtn.addEventListener('click', function() {
        showWeatherModal();
    });
    
    // Create and show feedback modal
    feedbackBtn.addEventListener('click', function() {
        showFeedbackModal();
    });
    
    function showWeatherModal() {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create weather modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🌤️ Pine City Weather</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="weather-content">
                    <div class="current-weather">
                        <img src="images/partly-cloudy.png" alt="Partly Cloudy" class="weather-icon">
                        <div class="weather-info">
                            <span class="temperature">25°C</span>
                            <span class="condition">Partly Cloudy</span>
                        </div>
                    </div>
                    <div class="weather-forecast">
                        <h4>5-Day Forecast</h4>
                        <div class="forecast-grid">
                            <div class="forecast-item">
                                <span class="day">Tue</span>
                                <img src="images/sunny.png" alt="Sunny">
                                <span class="temp">28°/17°</span>
                            </div>
                            <div class="forecast-item">
                                <span class="day">Wed</span>
                                <img src="images/partly-cloudy.png" alt="Partly Cloudy">
                                <span class="temp">26°/15°</span>
                            </div>
                            <div class="forecast-item">
                                <span class="day">Thu</span>
                                <img src="images/rain.png" alt="Rain">
                                <span class="temp">26°/17°</span>
                            </div>
                            <div class="forecast-item">
                                <span class="day">Fri</span>
                                <img src="images/sunny.png" alt="Sunny">
                                <span class="temp">25°/15°</span>
                            </div>
                            <div class="forecast-item">
                                <span class="day">Sat</span>
                                <img src="images/sunny.png" alt="Sunny">
                                <span class="temp">30°/16°</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    function showFeedbackModal() {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create feedback modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>💬 We'd Love Your Feedback</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <form class="feedback-form">
                    <div class="form-group">
                        <label for="name">Your Name</label>
                        <input type="text" id="name" placeholder="Enter your name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Your Message</label>
                        <textarea id="message" placeholder="Tell us about your experience..." rows="4" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Send Feedback</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Form submission
        const form = modal.querySelector('.feedback-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                submitBtn.textContent = '✓ Sent Successfully!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    modal.remove();
                }, 1500);
            }, 1000);
        });
    }
    
    // Simple map zoom on click
    const mapImg = document.querySelector('.zoo-map');
    let isZoomed = false;
    
    if (mapImg) {
        mapImg.addEventListener('click', function() {
            if (!isZoomed) {
                this.style.transform = 'scale(1.5)';
                this.style.cursor = 'zoom-out';
                isZoomed = true;
            } else {
                this.style.transform = 'scale(1)';
                this.style.cursor = 'zoom-in';
                isZoomed = false;
            }
        });
    }
    
    // Add zoom cursor initially
    if (mapImg) {
        mapImg.style.cursor = 'zoom-in';
    }
    
});