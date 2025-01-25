// Get the canvas element by its ID
const canvas = document.getElementById('myCanvas');

// Check if the canvas element exists
if (!canvas) {
    console.error('Canvas element not found!');
} else {
    // Get the 2D context of the canvas
    const context = canvas.getContext('2d');
    
    // Check if the context is successfully created
    if (!context) {
        console.error('Failed to get canvas context!');
    } else {
        console.log('Canvas context is available!');
        
        // Function to stop drawing and close the path
        function stopDrawing() {
            // Check if context is available before calling closePath
            if (context) {
                context.closePath(); // Safe to call closePath
                console.log('Path closed successfully.');
            } else {
                console.error('Canvas context is null or undefined');
            }
        }
        
        // Optionally, you can add event listeners here
        canvas.addEventListener('mouseup', stopDrawing); // For example, stop drawing on mouse up
    }
}
