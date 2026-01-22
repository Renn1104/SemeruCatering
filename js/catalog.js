// catalog.js
const productList = document.getElementById("productList");
const filterCategory = document.getElementById("filterCategory");
const searchInput = document.getElementById("searchInput");

const itemsPerPage = 8;
let currentPage = 1;
let filteredProducts = [];

function renderProducts(data) {
  productList.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = data.slice(start, end);

  if (paginated.length === 0) {
    productList.innerHTML = `
      <p class="col-span-full text-center text-sm text-gray-500">
        Produk tidak ditemukan
      </p>
    `;
    return;
  }

  paginated.forEach((p) => {
    productList.innerHTML += `
      <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-3">
        <img src="${p.image}" class="rounded mb-3 h-40 w-full object-cover">
        <h3 class="text-sm font-semibold">${p.name}</h3>
        <p class="text-xs text-primary font-medium">
          Rp ${p.price.toLocaleString("id-ID")}
        </p>
      </div>
    `;
  });

  renderPagination(data.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let paginationHTML = `<div class="flex justify-center gap-2 mt-8">`;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button
        class="px-3 py-1 rounded text-sm
        ${i === currentPage ? "bg-primary text-white" : "bg-gray-200"}"
        onclick="goToPage(${i})">
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
  const keyword = searchInput.value.toLowerCase();

  filteredProducts = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      p.name.toLowerCase().includes(keyword),
  );

  currentPage = 1;
  renderProducts(filteredProducts);
}

function initCatalog() {
  filteredProducts = products;
  renderProducts(products);

  filterCategory.addEventListener("change", filterProducts);
  searchInput.addEventListener("input", filterProducts);
}
