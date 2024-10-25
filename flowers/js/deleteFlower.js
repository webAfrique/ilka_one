document.addEventListener('DOMContentLoaded', () => {
    const deleteFlowerForm = document.getElementById('delete-flower-form');
    const statusMsg = document.getElementById('status-msg');

    deleteFlowerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const flowerId = document.getElementById('flowerId').value;

        fetch(`/delete-flower?id=${flowerId}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete flower');
                }
                return response.json();
            })
            .then(data => {
                statusMsg.textContent = data.message;
            })
            .catch(error => {
                statusMsg.textContent = error.message;
            });
    });
});
