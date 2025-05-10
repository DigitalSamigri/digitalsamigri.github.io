function addItem() {
  const item = document.getElementById('item-select').value;
  const quantity = document.getElementById('quantity-select').value;

  if (item && quantity) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item} - ${quantity}</span>
      <button class="delete-btn" onclick="this.parentElement.remove()">×</button>
    `;
    document.getElementById('item-list').appendChild(li);
  }
}

function nextPage(pageNum) {
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`page-${i}`).style.display = 'none';
  }
  document.getElementById(`page-${pageNum}`).style.display = 'block';

  if (pageNum === 2) {
    const itemList = document.querySelectorAll('#item-list li');
    const previewList = document.getElementById('preview-list');
    previewList.innerHTML = '';
    itemList.forEach(item => {
      const clone = item.cloneNode(true);
      clone.querySelector('.delete-btn')?.remove();
      previewList.appendChild(clone);
    });
  }
}

function sendToWhatsApp() {
  const number = document.getElementById('whatsapp-input').value;
  const pandit = document.getElementById('pandit-select').value;
  const items = Array.from(document.querySelectorAll('#preview-list li')).map(li => li.innerText).join('\n');

  const message = `🙏 *पूजा सामग्री लिस्ट* 🙏\n\n${items}\n\n📿 पंडित जी: ${pandit}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${number}?text=${encodedMessage}`;

  window.open(whatsappURL, '_blank');
}
