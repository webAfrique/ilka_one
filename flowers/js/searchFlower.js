document.addEventListener('DOMContentLoaded', () => {
    const searchFlowerForm = document.getElementById('search-flower-form');
    const flowerDetails = document.getElementById('flower-details');
    const statusMsg = document.getElementById('status-msg');

    searchFlowerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const flowerId = document.getElementById('flowerId').value;

        fetch(`/search-flower?id=${flowerId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Flower not found');
                }
                return response.json();
            })
            .then(flower => {
                flowerDetails.innerHTML = `
                    <p><strong>Name:</strong> ${flower.name}</p>
                    <p><strong>Stock:</strong> ${flower.stock}</p>
                    <p><strong>Unit Price:</strong> ${flower.unitPrice}</p>
                    <p><strong>Site:</strong> ${flower.site}</p>`;
                statusMsg.textContent = '';
            })
            .catch(error => {
                statusMsg.textContent = error.message;
                flowerDetails.innerHTML = '';
            });
    });
});
