document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('noteModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.getElementById('modalClose');

    // Form submission handling
    const noteForm = document.querySelector('form');
    noteForm.addEventListener('submit', function(e) {
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        
        if (!title || !content) {
            e.preventDefault();
            alert('Please fill in both title and content');
        }
    });

    // Modal handling
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title') || '';
            const content = btn.getAttribute('data-content') || '';
            
            modalTitle.textContent = title;
            modalContent.textContent = content;
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            // Add smooth fade-in effect
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        });
    });

    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            modalTitle.textContent = '';
            modalContent.textContent = '';
        }, 200);
    }

    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});