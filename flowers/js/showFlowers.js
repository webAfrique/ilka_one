document.addEventListener('DOMContentLoaded', () => {
    const flowerList = document.getElementById('flower-list');

    fetch('http://localhost:5000/all-flowers')
        .then(response => response.json())
        .then(flowers => {
            flowers.forEach(flower => {
                const flowerDiv = document.createElement('div');
                flowerDiv.innerHTML = `
                    <p><strong>Name:</strong> ${flower.name}</p>
                    <p><strong>Stock:</strong> ${flower.stock}</p>
                    <p><strong>Unit Price:</strong> ${flower.unitPrice}</p>
                    <p><strong>Site:</strong> ${flower.site}</p>
                    <hr>`;
                flowerList.appendChild(flowerDiv);
            });
        })
        .catch(error => {
            flowerList.innerHTML = 'Failed to load flowers';
        });
});
