$(document).ready(function() {
    var selectedParent = $('#parentSelect').val();
    updateSubjects(selectedParent);
});

document.getElementById('parentSelect').addEventListener('change', function() {
    var selectedParent = this.value;
    updateSubjects(selectedParent);
});

function updateSubjects(selectedParent) {
    var subjectsContainer = document.getElementById('subjectsContainer');
    subjectsContainer.innerHTML = '';

    {% for record in discover %}
    if ('{{ record.parent }}' === selectedParent) {
        var card = document.createElement('div');
        card.classList.add('col-md-2', 'mb-4', 'card'); 
        card.innerHTML = `
            <img src="{{ record.subject_image }}" class="card-img-top" alt="{{ record.subject_name }}">
            <div class="card-body">
                <h5 class="card-title">{{ record.subject_name }}</h5>
            </div>
        `;
        subjectsContainer.appendChild(card);
    }
    {% endfor %}
}
