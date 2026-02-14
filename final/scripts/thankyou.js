function displayFormData() {
  const params = new URLSearchParams(window.location.search);
  const summary = document.getElementById('formSummary');

  if (!summary) return;

  // Check if there are parameters
  if (!params.has('senderName')) {
    summary.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">No form data found. Please submit the form first.</p>';
    return;
  }

  // Build summary using template literals
  const fields = [
    { label: 'From', key: 'senderName' },
    { label: 'To', key: 'recipientName' },
    { label: 'Email', key: 'email' },
    { label: 'Relationship', key: 'relationship' },
    { label: 'Message', key: 'message' },
    { label: 'Anonymous', key: 'anonymous' },
    { label: 'Delivery', key: 'delivery' }
  ];

  // Use map and filter to build the display
  const summaryHTML = fields
    .filter(field => params.get(field.key))
    .map(field => {
      let value = params.get(field.key);

      // Format special values
      if (field.key === 'anonymous') value = 'Yes — Secret Admirer';
      if (field.key === 'delivery') value = value === 'digital' ? 'Digital Card' : 'Printed Card';
      if (field.key === 'relationship') value = value.charAt(0).toUpperCase() + value.slice(1);

      return `
        <div class="summary-item">
          <span class="summary-label">${field.label}:</span>
          <span class="summary-value">${value}</span>
        </div>
      `;
    })
    .join('');

  summary.innerHTML = summaryHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  displayFormData();
});
