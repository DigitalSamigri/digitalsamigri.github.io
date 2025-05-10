document.getElementById('addButton').addEventListener('click', addNewItem);
document.getElementById('sendToWhatsappButton').addEventListener('click', sendToWhatsapp);

let samigriList = [];

// Function to add the selected item to the list
function addNewItem() {
    const selectMenu = document.getElementById('itemSelect');
    const selectedItem = selectMenu.value;

    if (selectedItem !== "") {
        samigriList.push(selectedItem);
        updateItemList();
        selectMenu.value = ""; // Reset dropdown after adding item
    } else {
        alert("कृपया पूजा सामग्री चुनें!");
    }
}

// Function to update the displayed list
function updateItemList() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ""; // Clear the list

    samigriList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${item}`;
        itemList.appendChild(li);
    });
}

// Function to send the list to WhatsApp
function sendToWhatsapp() {
    const whatsappNumber = document.getElementById('whatsappNumber').value.trim();

    if (whatsappNumber === "") {
        alert("कृपया व्हाट्सएप नंबर दर्ज करें!");
        return;
    }

    // Add +91 before the number if not already present
    let formattedNumber = whatsappNumber;
    if (!formattedNumber.startsWith("+91")) {
        formattedNumber = "+91" + formattedNumber;
    }

    // Create the message from the list
    let message = "पूजा सामग्री सूची:\n\n";
    samigriList.forEach((item, index) => {
        message += `${index + 1}. ${item}\n`;
    });

    // Encode the message to make it URL-safe
    message = encodeURIComponent(message);

    // WhatsApp API link to send the message
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${message}`;

    // Redirect to the WhatsApp link
    window.open(whatsappUrl, "_blank");
}
