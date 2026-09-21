/* =========================================================
   SHOPZONE - JAVASCRIPT
   Interactive E-Commerce + Sorting Algorithms
   ========================================================= */


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let products = [];

let cart = [];

let currentCategory = "All";

let currentSearch = "";


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "ShopZone JavaScript Loaded Successfully!"
        );


        /*
         * Category page is initialized
         * separately by category.js
         */

        if (
            document.body.classList.contains(
                "category-page"
            )
        ) {

            initializeCart();

            initializeLogin();

            updateCartButton();

            return;

        }


        /* ---------- HOMEPAGE ---------- */

        initializeProducts();

        initializeSearch();

        initializeSorting();

        initializeCategories();

        initializeCart();

        initializeLogin();

        initializeButtons();

        updateCartButton();

        initializeFeaturedHomepage();

    }
);
/* =========================================================
   PRODUCT INITIALIZATION
   ========================================================= */

function initializeProducts() {

    const containers =
        document.querySelectorAll(".product-container");

    containers.forEach(function (container, categoryIndex) {

        /*
         * The heading immediately before each product container
         * tells us which category the products belong to.
         */

        let heading = container.previousElementSibling;

        let category = "Other";

        if (heading) {

            let headingText =
                heading.textContent.toLowerCase();

            if (headingText.includes("smartphone")) {
                category = "Phones";
            }

            else if (headingText.includes("laptop")) {
                category = "Laptops";
            }

            else if (headingText.includes("sneaker")) {
                category = "Sneakers";
            }

            else if (
                headingText.includes("sports") ||
                headingText.includes("running")
            ) {
                category = "Sports Shoes";
            }
        }


        const cards =
            container.querySelectorAll(".product-card");


        cards.forEach(function (card, index) {

            const nameElement =
                card.querySelector("h3");

            const priceElement =
                card.querySelector(".price");

            const ratingText =
                Array.from(card.querySelectorAll("p"))
                    .find(p =>
                        p.textContent.includes("Rating")
                    );

            const discountElement =
                card.querySelector(".discount");

            const brandElement =
                card.querySelector(".brand");


            /* ---------- PRODUCT NAME ---------- */

            let name =
                nameElement
                    ? nameElement.textContent.trim()
                    : "Unknown Product";


            /* ---------- BRAND ---------- */

            let brand =
                brandElement
                    ? brandElement.textContent.trim()
                    : "Unknown";


            /* ---------- PRICE ---------- */

            let price = 0;

            if (priceElement) {

                price =
                    parseFloat(
                        priceElement.textContent
                            .replace(/[₹,]/g, "")
                            .trim()
                    );

            }


            /* ---------- RATING ---------- */

            let rating = 0;

            if (ratingText) {

                const match =
                    ratingText.textContent.match(
                        /(\d+(\.\d+)?)/
                    );

                if (match) {

                    rating =
                        parseFloat(match[1]);

                }
            }


            /* ---------- DISCOUNT ---------- */

            let discount = 0;

            if (discountElement) {

                const match =
                    discountElement.textContent.match(
                        /(\d+)/
                    );

                if (match) {

                    discount =
                        parseInt(match[1]);

                }
            }


            /*
             * Popularity value.
             *
             * Later we can replace this with a real
             * popularity value from your product data.
             *
             * For now, products with higher ratings and
             * earlier catalogue positions get higher values.
             */

            let popularity =
                Math.round(
                    rating * 100 +
                    (70 - index) * 2
                );


            /* ---------- DATA ATTRIBUTES ---------- */

            card.dataset.name = name;

            card.dataset.brand = brand;

            card.dataset.category = category;

            card.dataset.price = price;

            card.dataset.rating = rating;

            card.dataset.discount = discount;

            card.dataset.popularity = popularity;


            /* ---------- SAVE PRODUCT ---------- */

            products.push({

                element: card,

                name: name,

                brand: brand,

                category: category,

                price: price,

                rating: rating,

                discount: discount,

                popularity: popularity,

                originalIndex: index

            });

        });

    });


    console.log(
        "Products Loaded:",
        products.length
    );

}


/* =========================================================
   SEARCH FUNCTION
   ========================================================= */

function initializeSearch() {

    const searchForm =
        document.querySelector(".search-section form");

    const searchInput =
        document.querySelector(
            ".search-section input"
        );


    if (!searchForm || !searchInput) {
        return;
    }


    searchForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            currentSearch =
                searchInput.value
                    .trim()
                    .toLowerCase();


            filterProducts();


            /*
             * Move the user to the products section
             * after searching.
             */

            document
                .querySelector("#products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /*
     * Live search while typing.
     */

    searchInput.addEventListener(
        "input",
        function () {

            currentSearch =
                searchInput.value
                    .trim()
                    .toLowerCase();

            filterProducts();

        }
    );

}


/* =========================================================
   PRODUCT FILTERING
   ========================================================= */

function filterProducts() {

    products.forEach(function (product) {

        let matchesSearch = true;

        let matchesCategory = true;


        /* ---------- SEARCH ---------- */

        if (currentSearch !== "") {

            matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(currentSearch)

                ||

                product.brand
                    .toLowerCase()
                    .includes(currentSearch)

                ||

                product.category
                    .toLowerCase()
                    .includes(currentSearch);

        }


        /* ---------- CATEGORY ---------- */

        if (currentCategory !== "All") {

            matchesCategory =
                product.category === currentCategory;

        }


        /* ---------- DISPLAY ---------- */

        if (
            matchesSearch &&
            matchesCategory
        ) {

            product.element.style.display = "";

        }

        else {

            product.element.style.display = "none";

        }

    });

}


/* =========================================================
   CATEGORY BUTTONS
   ========================================================= */

function initializeCategories() {

    const buttons =
        document.querySelectorAll(
            ".category-container button"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const text =
                    button.textContent.toLowerCase();


                if (text.includes("phone")) {

                    currentCategory = "Phones";

                }

                else if (text.includes("laptop")) {

                    currentCategory = "Laptops";

                }

                else if (text.includes("sneaker")) {

                    currentCategory = "Sneakers";

                }

                else if (
                    text.includes("sports") ||
                    text.includes("shoe")
                ) {

                    currentCategory = "Sports Shoes";

                }


                filterProducts();


                document
                    .querySelector("#products")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });

}


/* =========================================================
   SORTING INITIALIZATION
   ========================================================= */

function initializeSorting() {

    const sortSelect =
        document.querySelector("#sort");


    if (!sortSelect) {
        return;
    }


    sortSelect.addEventListener(
        "change",
        function () {

            const option =
                sortSelect.value;


            switch (option) {

                case "price-low":

                    sortProducts(
                        "price",
                        "ascending"
                    );

                    break;


                case "price-high":

                    sortProducts(
                        "price",
                        "descending"
                    );

                    break;


                case "rating":

                    sortProducts(
                        "rating",
                        "descending"
                    );

                    break;


                case "popularity":

                    sortProducts(
                        "popularity",
                        "descending"
                    );

                    break;


                case "discount":

                    sortProducts(
                        "discount",
                        "descending"
                    );

                    break;


                default:

                    restoreOriginalOrder();

            }


            filterProducts();

        }
    );

}


/* =========================================================
   MAIN SORT FUNCTION
   ========================================================= */

function sortProducts(
    property,
    order
) {

    let data =
        products.slice();


    /*
     * QUICK SORT
     *
     * Used for general price sorting.
     */

    if (property === "price") {

        data =
            quickSort(
                data,
                property
            );

    }


    /*
     * RADIX SORT
     *
     * Used for large numerical values such as price.
     */

    else if (property === "popularity") {

        data =
            radixSort(
                data,
                property
            );

    }


    /*
     * BUCKET SORT
     *
     * Ratings are ideal for bucket-style grouping.
     */

    else if (property === "rating") {

        data =
            bucketSort(
                data,
                property
            );

    }


    /*
     * MERGE SORT
     *
     * Used for stable sorting.
     */

    else if (property === "discount") {

        data =
            mergeSort(
                data,
                property
            );

    }


    if (order === "descending") {

        data.reverse();

    }


    renderProducts(data);

}


/* =========================================================
   QUICK SORT
   =========================================================
   
   Average:
   O(n log n)

   Worst:
   O(n²)

   Space:
   O(log n) average recursion stack
   ========================================================= */

function quickSort(
    array,
    property
) {

    if (array.length <= 1) {

        return array;

    }


    const pivot =
        array[
            Math.floor(array.length / 2)
        ];


    const left = [];

    const right = [];

    const equal = [];


    for (let item of array) {

        if (
            item[property] <
            pivot[property]
        ) {

            left.push(item);

        }

        else if (
            item[property] >
            pivot[property]
        ) {

            right.push(item);

        }

        else {

            equal.push(item);

        }

    }


    return [

        ...quickSort(left, property),

        ...equal,

        ...quickSort(right, property)

    ];

}


/* =========================================================
   RADIX SORT
   =========================================================
   
   Used for non-negative integer values.

   Time:
   O(d × n)

   Space:
   O(n)

   d = number of digits
   ========================================================= */

function radixSort(
    array,
    property
) {

    if (array.length <= 1) {

        return array;

    }


    let result =
        array.slice();


    let max =
        Math.max(
            ...result.map(
                item =>
                    Math.floor(item[property])
            )
        );


    for (
        let place = 1;
        Math.floor(max / place) > 0;
        place *= 10
    ) {

        result =
            countingSortByDigit(
                result,
                property,
                place
            );

    }


    return result;

}


/* ---------- RADIX COUNTING SORT ---------- */

function countingSortByDigit(
    array,
    property,
    place
) {

    const output =
        new Array(array.length);

    const count =
        new Array(10).fill(0);


    /* Count digits */

    for (let item of array) {

        const number =
            Math.floor(item[property]);

        const digit =
            Math.floor(
                number / place
            ) % 10;

        count[digit]++;

    }


    /* Prefix sum */

    for (
        let i = 1;
        i < 10;
        i++
    ) {

        count[i] += count[i - 1];

    }


    /* Build output */

    for (
        let i = array.length - 1;
        i >= 0;
        i--
    ) {

        const number =
            Math.floor(
                array[i][property]
            );

        const digit =
            Math.floor(
                number / place
            ) % 10;


        output[
            count[digit] - 1
        ] = array[i];


        count[digit]--;

    }


    return output;

}


/* =========================================================
   BUCKET SORT
   =========================================================
   
   Used for customer ratings.

   Time:
   O(n + k)

   Average space:
   O(n + k)

   k = number of buckets
   ========================================================= */

function bucketSort(
    array,
    property
) {

    if (array.length <= 1) {

        return array;

    }


    const bucketCount = 10;

    const buckets =
        Array.from(
            { length: bucketCount },
            () => []
        );


    for (let item of array) {

        let value =
            item[property];


        /*
         * Ratings are between 0 and 5.
         */

        let index =
            Math.floor(
                value / 5 * bucketCount
            );


        if (
            index >= bucketCount
        ) {

            index =
                bucketCount - 1;

        }


        if (index < 0) {

            index = 0;

        }


        buckets[index].push(item);

    }


    /*
     * Sort each bucket.
     */

    for (
        let bucket of buckets
    ) {

        bucket.sort(
            (a, b) =>
                a[property] -
                b[property]
        );

    }


    /*
     * Combine buckets.
     */

    return buckets.flat();

}


/* =========================================================
   MERGE SORT
   =========================================================
   
   Stable sorting algorithm.

   Time:
   O(n log n)

   Space:
   O(n)

   ========================================================= */

function mergeSort(
    array,
    property
) {

    if (array.length <= 1) {

        return array;

    }


    const middle =
        Math.floor(
            array.length / 2
        );


    const left =
        mergeSort(
            array.slice(0, middle),
            property
        );


    const right =
        mergeSort(
            array.slice(middle),
            property
        );


    return merge(
        left,
        right,
        property
    );

}


/* ---------- MERGE ---------- */

function merge(
    left,
    right,
    property
) {

    const result = [];

    let i = 0;

    let j = 0;


    while (
        i < left.length &&
        j < right.length
    ) {

        /*
         * <= keeps Merge Sort stable.
         */

        if (
            left[i][property] <=
            right[j][property]
        ) {

            result.push(
                left[i]
            );

            i++;

        }

        else {

            result.push(
                right[j]
            );

            j++;

        }

    }


    return result.concat(
        left.slice(i),
        right.slice(j)
    );

}


/* =========================================================
   RENDER SORTED PRODUCTS
   ========================================================= */

function renderProducts(
    sortedProducts
) {

    /*
     * Group products by their original
     * product container.
     */

    const containers =
        document.querySelectorAll(
            ".product-container"
        );


    containers.forEach(
        function (container) {

            const category =
                getCategoryFromContainer(
                    container
                );


            const categoryProducts =
                sortedProducts.filter(
                    product =>
                        product.category ===
                        category
                );


            categoryProducts.forEach(
                function (product) {

                    container.appendChild(
                        product.element
                    );

                }
            );

        }
    );

}


/* =========================================================
   FIND CATEGORY FROM CONTAINER
   ========================================================= */

function getCategoryFromContainer(
    container
) {

    const heading =
        container.previousElementSibling;


    if (!heading) {

        return "Other";

    }


    const text =
        heading.textContent.toLowerCase();


    if (text.includes("smartphone")) {

        return "Phones";

    }

    if (text.includes("laptop")) {

        return "Laptops";

    }

    if (text.includes("sneaker")) {

        return "Sneakers";

    }

    if (
        text.includes("sports") ||
        text.includes("running")
    ) {

        return "Sports Shoes";

    }


    return "Other";

}


/* =========================================================
   RESTORE ORIGINAL PRODUCT ORDER
   ========================================================= */

function restoreOriginalOrder() {

    const containers =
        document.querySelectorAll(
            ".product-container"
        );


    containers.forEach(
        function (container) {

            const category =
                getCategoryFromContainer(
                    container
                );


            const originalProducts =
                products
                    .filter(
                        product =>
                            product.category ===
                            category
                    )
                    .sort(
                        (a, b) =>
                            a.originalIndex -
                            b.originalIndex
                    );


            originalProducts.forEach(
                function (product) {

                    container.appendChild(
                        product.element
                    );

                }
            );

        }
    );

}


/* =========================================================
   CART SYSTEM
   ========================================================= */

function initializeCart() {

    /*
     * Load previous cart from browser.
     */

    const savedCart =
        localStorage.getItem(
            "shopzoneCart"
        );


    if (savedCart) {

        try {

            cart =
                JSON.parse(savedCart);

        }

        catch {

            cart = [];

        }
            // Bottom cart section
    const bottomCartCheckout =
        document.querySelector("#cart-page-content");

    if (bottomCartCheckout) {
        renderCartPage();
    }

    // Continue shopping button
    const continueShopping =
        document.querySelector("#continue-shopping");

    if (continueShopping) {
        continueShopping.addEventListener(
            "click",
            function () {
                document
                    .querySelector("#products")
                    .scrollIntoView({
                        behavior: "smooth"
                    });
            }
        );
    }

    }


    /*
     * Add to Cart buttons.
     */

    const buttons =
        document.querySelectorAll(
            ".product-card button"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        button.closest(
                            ".product-card"
                        );


                    if (!card) {
                        return;
                    }


                    addToCart(card);

                }
            );

        }
    );


    /*
     * Cart button.
     */

    const cartButton =
        document.querySelector(
            ".cart-btn"
        );


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            showCart
        );

    }

}


/* =========================================================
   ADD PRODUCT TO CART
   ========================================================= */

function addToCart(card) {

    const name =
        card.dataset.name;

    const price =
        parseFloat(
            card.dataset.price
        );

    // Get product image
    const imageElement =
        card.querySelector("img");

    const image =
        imageElement
            ? imageElement.src
            : "";

    // Get brand
    const brand =
        card.dataset.brand ||
        "";

    // Get description
    const descriptionElement =
        card.querySelector(".description");

    const description =
        descriptionElement
            ? descriptionElement.textContent.trim()
            : "Premium quality product from ShopZone.";


    const existing =
        cart.find(
            item =>
                item.name === name
        );


    if (existing) {

        existing.quantity++;

        // Update missing product information
        existing.image = image;
        existing.brand = brand;
        existing.description = description;

    }

    else {

        cart.push({

            name: name,

            price: price,

            quantity: 1,

            image: image,

            brand: brand,

            description: description

        });

    }


    saveCart();

    updateCartButton();

    renderCartPage();

    showNotification(
        name + " added to cart!"
    );

}

/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart() {

    localStorage.setItem(
        "shopzoneCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   UPDATE CART BUTTON
   ========================================================= */

function updateCartButton() {

    const cartButton =
        document.querySelector(
            ".cart-btn"
        );


    if (!cartButton) {
        return;
    }


    const totalItems =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartButton.textContent =
        `🛒 Cart (${totalItems})`;

}


/* =========================================================
   DISPLAY CART
   ========================================================= */

function showCart() {

    // Open the dedicated cart page
    window.location.href = "cart.html";

}


/* =========================================================
   LOGIN SYSTEM
   ========================================================= */

function initializeLogin() {

    const loginButton =
        document.querySelector(
            ".login-btn"
        );


    if (!loginButton) {
        return;
    }


    loginButton.addEventListener(
        "click",
        showLogin
    );

}


/* =========================================================
   LOGIN POPUP
   ========================================================= */

function showLogin() {

    const modal =
        createModal(
            "🔐 Login to ShopZone"
        );


    const content =
        modal.querySelector(
            ".modal-content"
        );


    content.innerHTML += `

        <form id="loginForm">

            <input
                type="email"
                id="loginEmail"
                placeholder="Email Address"
                required
            >

            <input
                type="password"
                id="loginPassword"
                placeholder="Password"
                minlength="6"
                required
            >

            <button
                type="submit"
                class="login-submit">
                Login
            </button>

        </form>

        <p class="login-note">
            Demo login for ShopZone project
        </p>

    `;


    const form =
        content.querySelector(
            "#loginForm"
        );


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.querySelector(
                    "#loginEmail"
                ).value;


            showNotification(
                `Welcome to ShopZone, ${email}!`
            );


            modal.remove();

        }
    );

}


/* =========================================================
   GENERAL BUTTONS
   ========================================================= */

function initializeButtons() {

    /*
     * Shop Now
     */

    const shopNow =
        document.querySelector(
            ".shop-now"
        );


    if (shopNow) {

        shopNow.addEventListener(
            "click",
            function () {

                document
                    .querySelector("#products")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }


    /*
     * View Deals
     */

    const viewDeals =
        document.querySelector(
            ".view-deals"
        );


    if (viewDeals) {

        viewDeals.addEventListener(
            "click",
            function () {

                document
                    .querySelector("#deals")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }


    /*
     * Today's Deals button.
     */

    const dealsButton =
        document.querySelector(
            "#deals button"
        );


    if (dealsButton) {

        dealsButton.addEventListener(
            "click",
            function () {

                currentCategory = "All";

                currentSearch = "";

                /*
                 * Display only products
                 * having discounts.
                 */

                products.forEach(
                    function (product) {

                        if (
                            product.discount > 0
                        ) {

                            product.element.style.display =
                                "";

                        }

                        else {

                            product.element.style.display =
                                "none";

                        }

                    }
                );


                document
                    .querySelector("#products")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }

}


/* =========================================================
   MODAL CREATOR
   ========================================================= */

function createModal(title) {

    /*
     * Remove existing modal.
     */

    const oldModal =
        document.querySelector(
            ".shopzone-modal"
        );


    if (oldModal) {

        oldModal.remove();

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.className =
        "shopzone-modal";


    modal.innerHTML = `

        <div class="modal-box">

            <button
                class="modal-close">
                ×
            </button>

            <h2>
                ${title}
            </h2>

            <div class="modal-content">

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    /*
     * Close button.
     */

    modal
        .querySelector(
            ".modal-close"
        )
        .addEventListener(
            "click",
            function () {

                modal.remove();

            }
        );


    /*
     * Click outside modal.
     */

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                modal.remove();

            }

        }
    );


    return modal;

}


/* =========================================================
   NOTIFICATION
   ========================================================= */

function showNotification(
    message
) {

    const oldNotification =
        document.querySelector(
            ".shopzone-notification"
        );


    if (oldNotification) {

        oldNotification.remove();

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "shopzone-notification";


    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    setTimeout(
        function () {

            notification.classList.add(
                "hide"
            );


            setTimeout(
                function () {

                    notification.remove();

                },
                300
            );

        },
        2500
    );

}
/* =========================================================
   BOTTOM CART PAGE
   ========================================================= */

function renderCartPage() {

    const container =
        document.querySelector("#cart-page-content");

    if (!container) {
        return;
    }

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="cart-empty-page">

                <div class="cart-big-icon">🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                    Add products from our collection and
                    they will appear here.
                </p>

                <button id="continue-shopping">
                    Continue Shopping
                </button>

            </div>
        `;

        document
            .querySelector("#continue-shopping")
            .addEventListener(
                "click",
                function () {

                    document
                        .querySelector("#products")
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );

        return;
    }


    let total = 0;

    let html = `
        <div class="cart-page-items">
    `;


    cart.forEach(function (item, index) {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;


        html += `
            <div class="cart-page-item">

              <div class="cart-product-image">

    <img
        src="${item.image}"
        alt="${item.name}"
    >

</div>


<div class="cart-page-product">

    <h3>
        ${item.name}
    </h3>

    <p class="cart-brand">
        ${item.brand || ""}
    </p>

    <p class="cart-description">
        ${item.description || "Premium quality product from ShopZone."}
    </p>

    <p class="cart-price">
        ₹${item.price.toLocaleString("en-IN")}
    </p>

</div>


                <div class="cart-page-actions">

                    <strong>
                        ₹${subtotal.toLocaleString("en-IN")}
                    </strong>

                    <div class="quantity-controls">

                        <button
                            class="quantity-btn"
                            data-index="${index}"
                            data-action="decrease">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-btn"
                            data-index="${index}"
                            data-action="increase">
                            +
                        </button>

                    </div>

                    <button
                        class="remove-page-cart"
                        data-index="${index}">
                        Remove
                    </button>

                </div>

            </div>
        `;

    });


    html += `
        </div>

        <div class="cart-page-summary">

            <div>
                <span>Subtotal</span>

                <strong>
                    ₹${total.toLocaleString("en-IN")}
                </strong>
            </div>


            <div>
                <span>Delivery</span>

                <strong>
                    FREE
                </strong>
            </div>


            <div class="cart-page-total">

                <span>
                    Total
                </span>

                <strong>
                    ₹${total.toLocaleString("en-IN")}
                </strong>

            </div>

            <button
                id="bottom-checkout"
                class="checkout-page-button">

                Proceed to Checkout →

            </button>

        </div>
    `;


    container.innerHTML = html;


    /* ---------- INCREASE / DECREASE ---------- */

    container
        .querySelectorAll(".quantity-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        parseInt(
                            button.dataset.index
                        );

                    const action =
                        button.dataset.action;


                    if (action === "increase") {

                        cart[index].quantity++;

                    }

                    else if (
                        action === "decrease"
                    ) {

                        cart[index].quantity--;

                        if (
                            cart[index].quantity <= 0
                        ) {

                            cart.splice(index, 1);

                        }

                    }


                    saveCart();

                    updateCartButton();

                    renderCartPage();

                }
            );

        });


    /* ---------- REMOVE ---------- */

    container
        .querySelectorAll(".remove-page-cart")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        parseInt(
                            button.dataset.index
                        );

                    cart.splice(index, 1);

                    saveCart();

                    updateCartButton();

                    renderCartPage();

                    showNotification(
                        "Product removed from cart"
                    );

                }
            );

        });


    /* ---------- CHECKOUT ---------- */

    const checkout =
        document.querySelector(
            "#bottom-checkout"
        );


    if (checkout) {

        checkout.addEventListener(
            "click",
            function () {

                showPaymentOptions();

            }
        );

    }

}
/* =========================================================
   HOMEPAGE FEATURED PRODUCTS
   ========================================================= */

function initializeFeaturedHomepage() {

    /*
     * Do not run this on category.html
     */

    if (
        document.body.dataset.page ===
        "category"
    ) {

        return;

    }


    const containers =
        document.querySelectorAll(
            ".product-container"
        );


    containers.forEach(
        function (container) {

            const cards =
                Array.from(
                    container.querySelectorAll(
                        ".product-card"
                    )
                );


            /*
             * Show only first 4 products.
             */

            cards.forEach(
                function (card, index) {

                    if (index < 4) {

                        card.style.display = "";

                    }

                    else {

                        card.style.display =
                            "none";

                    }

                }
            );


            /*
             * Add Explore button.
             */

            addExploreButton(
                container
            );

        }
    );

}

/* =========================================================
   HOMEPAGE FEATURED PRODUCTS
   Show only 4 products per category
   ========================================================= */

function initializeFeaturedHomepage() {

    // Do not limit products on category page
    if (
        document.body.classList.contains("category-page") ||
        window.location.pathname.includes("category.html")
    ) {
        return;
    }

    const containers =
        document.querySelectorAll(".product-container");

    containers.forEach(function (container) {

        const cards =
            Array.from(
                container.querySelectorAll(".product-card")
            );

        // Show first 4 products
        cards.forEach(function (card, index) {

            if (index < 4) {
                card.style.display = "";
            }
            else {
                card.style.display = "none";
            }

        });

    });
}

/* =========================================================
   END OF SHOPZONE JAVASCRIPT
   ========================================================= */
