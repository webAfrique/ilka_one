document.addEventListener('DOMContentLoaded', () => {
    const fetchFlowerForm = document.getElementById('fetch-flower-form');
    const updateFlowerForm = document.getElementById('update-flower-form');
    const statusMsg = document.getElementById('status-msg');
    let flowerIdToUpdate;

    // Fetch flower data when user submits flower ID
    fetchFlowerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        flowerIdToUpdate = document.getElementById('flowerId').value;

        fetch(`/search-flower?id=${flowerIdToUpdate}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Flower not found');
                }
                return response.json();
            })
            .then(data => {
                const flower = data[0];
                // Populate the form with the flower's current details
                document.getElementById('name').value = flower.name;
                document.getElementById('stock').value = flower.stock;
                document.getElementById('unitPrice').value = flower.unitPrice;
                document.getElementById('site').value = flower.site;

                // Show the update form
                updateFlowerForm.style.display = 'block';
            })
            .catch(error => {
                statusMsg.textContent = error.message;
                updateFlowerForm.style.display = 'none';
            });
    });

    // Handle update flower form submission
    updateFlowerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedFlower = {
            flowerId: flowerIdToUpdate,
            name: document.getElementById('name').value,
            stock: document.getElementById('stock').value,
            unitPrice: document.getElementById('unitPrice').value,
            site: document.getElementById('site').value
        };

        fetch('/update-flower', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFlower)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update flower');
            }
            return response.json();
        })
        .then(data => {
            statusMsg.textContent = data.message || 'Flower updated successfully!';
        })
        .catch(error => {
            statusMsg.textContent = error.message;
        });
    });
});
