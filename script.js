let list = [];

function addItem() {
  const item = document.getElementById('item-select').value;
  const quantity = document.getElementById('quantity-select').value;
  if (!item || !quantity) {
    alert('कृपया सामग्री और मात्रा दोनों चुनें।');
    return;
  }
  list.push({ item, quantity });
  renderList();
}

function renderList() {
  const ul = document.getElementById('item-list');
  ul.innerHTML = '';
  list.forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${entry.item} x ${entry.quantity} <button class="delete-btn" onclick="deleteItem(${index})">❌</button>`;
    ul.appendChild(li);
  });
}

function deleteItem(index) {
  list.splice(index, 1);
  renderList();
}

function nextPage(pageNumber) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  // Show the selected page
  document.getElementById(`page-${pageNumber}`).style.display = 'block';

  // If on page 2, show the preview list
  if (pageNumber === 2) {
    const previewList = document.getElementById('preview-list');
    previewList.innerHTML = '';
    list.forEach((entry, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${entry.item} x ${entry.quantity}`;
      previewList.appendChild(li);
    });
  }
}

function sendToWhatsApp() {
  const numberInput = document.getElementById('whatsapp-input').value.trim();
  if (!numberInput.match(/^[6-9]\d{9}$/)) {
    alert("कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें।");
    return;
  }
  const fullNumber = `91${numberInput}`;
  const panditName = document.getElementById('pandit-select').value;
  let message = `*🙏 पूजा सामग्री सूची*%0A%0A`;
  list.forEach((entry, index) => {
    message += `${index + 1}. ${entry.item} x ${entry.quantity}%0A`;
  });
  message += `%0A*पंडित जी का नाम*: ${panditName}`;
  const link = `https://wa.me/${fullNumber}?text=${message}`;
  window.open(link, '_blank');
}
