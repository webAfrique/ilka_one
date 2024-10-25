document.addEventListener('DOMContentLoaded', () => {
    const addFlowerForm = document.getElementById('add-flower-form');
    const statusMsg = document.getElementById('status-msg');

    addFlowerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newFlower = {
            name: document.getElementById('name').value,
            stock: document.getElementById('stock').value,
            unitPrice: document.getElementById('unitPrice').value,
            site: document.getElementById('site').value
        };

        fetch('/add-flower', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFlower)
        })
        .then(response => response.json())
        .then(data => {
            statusMsg.textContent = data.message || 'Flower added successfully!';
        })
        .catch(error => {
            statusMsg.textContent = 'Error: ' + error.message;
        });
    });
});
