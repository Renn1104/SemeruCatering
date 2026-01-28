// ==================== catalog.js ====================

const productList = document.getElementById("productList");
const filterCategory = document.getElementById("filterCategory");
const filterPrice = document.getElementById("filterPrice");
const searchInput = document.getElementById("searchInput");

const productModal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

const itemsPerPage = 20;
let currentPage = 1;
let filteredProducts = [];

function renderProducts(data) {
  productList.innerHTML = "";

  const oldPagination = document.querySelector("#paginationContainer");
  if (oldPagination) oldPagination.remove();

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = data.slice(start, end);

  if (paginated.length === 0) {
    productList.innerHTML = `
      <p class="col-span-full text-center text-sm text-gray-500 dark:text-gray-300">
        Produk tidak ditemukan
      </p>
    `;
    return;
  }

  paginated.forEach((p, index) => {
    productList.innerHTML += `
      <div
        class="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
               rounded-2xl overflow-hidden shadow-md hover:shadow-xl 
               dark:shadow-[0_0_15px_rgba(59,130,246,0.2)]
               transition-all duration-500 transform 
               hover:-translate-y-2 hover:scale-[1.03] cursor-pointer"
      >
        <img
          src="${p.image}"
          alt="${p.name}"
          class="rounded-t-2xl h-40 w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div class="p-4 text-center">
          <h3 class="text-sm font-semibold mb-1">${p.name}</h3>
          <p class="text-xs text-[#1e3a8a] dark:text-blue-400 font-medium mb-3">
            Rp ${p.price.toLocaleString("id-ID")}
          </p>
          <button
            class="detailBtn bg-[#1e3a8a] dark:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#243fa7] dark:hover:bg-blue-400 transition duration-300"
            data-index="${index}"
          >
            Detail
          </button>
        </div>
      </div>
    `;
  });

  renderPagination(data.length);

  const detailButtons = document.querySelectorAll(".detailBtn");
  detailButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      openModal(paginated[index]);
    });
  });
}

function openModal(product) {
  modalImage.src = product.image;
  productModal.classList.remove("hidden");

  setTimeout(() => {
    modalImage.classList.remove("opacity-0", "scale-95");
    modalImage.classList.add("opacity-100", "scale-100");
  }, 10);
}

function closeModalWindow() {
  modalImage.classList.add("opacity-0", "scale-95");
  setTimeout(() => {
    productModal.classList.add("hidden");
  }, 200);
}

closeModal.addEventListener("click", closeModalWindow);
productModal.addEventListener("click", (e) => {
  if (e.target === productModal) closeModalWindow();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalWindow();
});

// === Pagination ===
function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return;

  let paginationHTML = `<div id="paginationContainer" class="flex justify-center gap-2 mt-8">`;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button
        class="px-3 py-1 rounded text-sm font-medium transition 
          ${
            i === currentPage
              ? "bg-[#1e3a8a] text-white dark:bg-blue-500"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }"
        onclick="goToPage(${i})"
      >
        ${i}
      </button>
    `;
  }

  paginationHTML += `</div>`;
  productList.insertAdjacentHTML("afterend", paginationHTML);
}

function goToPage(page) {
  currentPage = page;
  renderProducts(filteredProducts);
}

function filterProducts() {
  const category = filterCategory.value;
  const priceFilter = filterPrice.value;
  const keyword = searchInput.value.toLowerCase();

  filteredProducts = products.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const matchKeyword = p.name.toLowerCase().includes(keyword);

    let matchPrice = true;
    if (priceFilter === "under10") {
      matchPrice = p.price < 10000;
    } else if (priceFilter === "above10") {
      matchPrice = p.price >= 10000;
    }

    return matchCategory && matchKeyword && matchPrice;
  });

  currentPage = 1;
  renderProducts(filteredProducts);
}

function initCatalog() {
  filteredProducts = products;
  renderProducts(products);
  filterCategory.addEventListener("change", filterProducts);
  filterPrice.addEventListener("change", filterProducts);
  searchInput.addEventListener("input", filterProducts);
}

document.addEventListener("DOMContentLoaded", initCatalog);
