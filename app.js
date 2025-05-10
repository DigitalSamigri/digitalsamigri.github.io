let list = [];

function addItem() {
  const item = document.getElementById('item-select').value;
  const quantity = document.getElementById('quantity-select').value;
  
  // Check if item and quantity are selected
  if (!item || !quantity) {
    alert('कृपया सामग्री और मात्रा दोनों चुनें।');
    return;
  }

  // Add item to the list
  list.push({ item, quantity });
  renderList();
}

function renderList() {
  const ul = document.getElementById('item-list');
  ul.innerHTML = '';  // Clear current list
  list.forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${entry.item} x ${entry.quantity} <button class="delete-btn" onclick="deleteItem(${index})">❌</button>`;
    ul.appendChild(li);
  });
}

function deleteItem(index) {
  // Remove item from list
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

  // If on page 2 (Preview page), show the preview list
  if (pageNumber === 2) {
    const previewList = document.getElementById('preview-list');
    previewList.innerHTML = '';  // Clear previous preview
    list.forEach((entry, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${entry.item} x ${entry.quantity}`;
      previewList.appendChild(li);
    });
  }
}

function sendToWhatsApp() {
  const numberInput = document.getElementById('whatsapp-input').value.trim();

  // Validate phone number
  if (!numberInput.match(/^[6-9]\d{9}$/)) {
    alert("कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें।");
    return;
  }

  const fullNumber = `91${numberInput}`;  // Add India country code
  const panditName = document.getElementById('pandit-select').value;

  // Construct the message with proper formatting for WhatsApp
  let message = `*🙏 पूजा सामग्री सूची*%0A%0A`;
  list.forEach((entry, index) => {
    message += `${index + 1}. ${entry.item} x ${entry.quantity}%0A`;
  });

  // Add the Pandit name
  message += `%0A*पंडित जी का नाम*: ${panditName}`;
  
  // Generate the WhatsApp link
  const link = `https://wa.me/${fullNumber}?text=${message}`;
  
  // Open the WhatsApp chat with the prefilled message
  window.open(link, '_blank');
}
