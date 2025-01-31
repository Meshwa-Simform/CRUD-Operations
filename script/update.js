
// Update product details in localStorage
function productdetails(productId) {
    const productForm = document.getElementById("productForm");
    if (productForm) {
        const data = JSON.parse(localStorage.getItem(productId));
        if (data) {
            document.getElementById('productName').value = data.productName;
            document.getElementById('price').value = data.price;
            document.getElementById('description').value = data.description;
            document.getElementById('category').value = data.category;
            document.getElementById('mfdate').value = data.mfDate;
            document.getElementById('outofStock').checked = data.outOfStock;
            document.getElementById(`${data.pricing}`).checked = true;
            document.getElementById('productImage').src = data.productImage;
            var oldProductImage = data.productImage;

        } else {
            console.error(`No product found with ID: ${productId}`);
        }
    } else {
        console.error('Product form not found');
    }
    document.getElementById('productForm').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("Form submission triggered");
        const oldproductId = productId;

    // Capture form values
    const productName = document.getElementById("productName").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const outOfStock = document.getElementById("outofStock").checked;
    const mfDate = document.getElementById("mfdate").value;
    const pricing = document.querySelector('input[class="pricing"]:checked').value;

    // Log the collected data
    let data = { 'productId' : `product_${generateUUID()}`, productName, price, description, category, mfDate, pricing, outOfStock };
    console.log(data);

    // Capture image file
    const productImage = document.getElementById("productImage").files[0];
    if (productImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            data.productImage = e.target.result; // Store base64 image string
            console.log("Data with image:", data);
            saveToLocalStorage(data); // Save the data after the image is processed
            alert("Product saved successfully!"); // Show success message
            productForm.reset(); // Clear the form
            localStorage.removeItem(oldproductId);
            setTimeout(function() {
                window.location.href = './'; // Redirect to the homepage after a short delay
            }, 200);
        };
        reader.readAsDataURL(productImage); // Read image as a base64 URL
    } else {
        data.productImage = oldProductImage;
            saveToLocalStorage(data); // Save the data after the image is processed
            alert("Product saved successfully!"); // Show success message
            productForm.reset(); // Clear the form
            localStorage.removeItem(oldproductId);
            setTimeout(function() {
                window.location.href = './'; // Redirect to the homepage after a short delay
            }, 200);
    }
    });
}

function generateUUID() {
    return 'xxxx-xxxx'.replace(/[x]/g, function() {   // '/[x]/'' is a regular expression that matches the character x. g is a flag that means "global," so it will match all occurrences of x in the string, not just the first one.
        return Math.floor(Math.random() * 16).toString(16);
    });
}

function saveToLocalStorage(data) {
    let uniqueKey = `product_${generateUUID()}`;
    localStorage.setItem(uniqueKey, JSON.stringify(data));
    console.log(`Data saved with key: ${uniqueKey}`);
}

export { productdetails };