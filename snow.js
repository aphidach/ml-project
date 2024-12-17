function createSnowflakes() {
    // Remove any existing snowflakes first
    const existingSnowflakes = document.querySelectorAll('.snowflake');
    existingSnowflakes.forEach(flake => flake.remove());

    // Create snowflakes that start from the top of the page
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Randomize horizontal position across the entire width
        snowflake.style.left = `${Math.random() * 100}%`;
        
        // Position absolutely at the top of the page
        snowflake.style.position = 'fixed';
        snowflake.style.top = '0';
        
        // Randomize size
        const size = Math.random() * 5 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Randomize fall speed and delay
        snowflake.style.animationDuration = `${Math.random() * 10 + 10}s`;
        snowflake.style.animationDelay = `-${Math.random() * 10}s`; // Stagger start times
        snowflake.style.opacity = Math.random() * 0.7 + 0.3; // Vary opacity
        
        document.body.appendChild(snowflake);
    }
}

// Create snowflakes when the page loads
window.addEventListener('load', createSnowflakes);

// Recreate snowflakes if window is resized
window.addEventListener('resize', createSnowflakes);