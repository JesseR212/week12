// URL of the json-server API
const API_URL = "http://localhost:3000/items";

// DOM elements
const createForm = document.getElementById("createForm");
const itemNameInput = document.getElementById("itemName");
const itemList = document.getElementById("itemList");

// Function to fetch and display items from the API
async function fetchItems() {
  try {
    const response = await fetch(API_URL);
    const items = await response.json();

    // Clear the current list
    itemList.innerHTML = "";

    // Display items from the API
    items.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML = `${item.name} <button class="btn btn-danger btn-sm float-right" onclick="deleteItem(${item.id})">Delete</button>`;
      itemList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

// Function to create a new item
async function createItem(event) {
  event.preventDefault(); // Prevent form submission

  const itemName = itemNameInput.value.trim();
  if (itemName) {
    try {
      // Send a POST request to the API to create a new item
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: itemName }),
      });

      // Refresh the list of items
      fetchItems();

      // Clear the input field
      itemNameInput.value = "";
    } catch (error) {
      console.error("Error creating item:", error);
    }
  }
}

// Function to delete an item
async function deleteItem(id) {
  try {
    // Send a DELETE request to the API to remove the item
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    // Refresh the list of items after deletion
    fetchItems();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

// Event listener for form submission to create a new item
createForm.addEventListener("submit", createItem);

// Fetch and display items when the page loads
fetchItems();
