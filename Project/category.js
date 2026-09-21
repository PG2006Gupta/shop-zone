/* =========================================================
   SHOPZONE CATEGORY PAGE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log(
            "ShopZone Category Page Loaded"
        );

        const params =
            new URLSearchParams(
                window.location.search
            );

        const category =
            params.get("category") || "phones";

        loadCategory(category);

    }
);


/* =========================================================
   CATEGORY INFORMATION
   ========================================================= */

const categoryData = {

    phones: {

        title: "📱 Smartphones",

        description:
            "Explore all smartphones available on ShopZone.",

        heading: "Smartphones"

    },

    laptops: {

        title: "💻 Laptops",

        description:
            "Explore powerful laptops for work, study and entertainment.",

        heading: "Laptops"

    },

    sneakers: {

        title: "👟 Sneakers",

        description:
            "Explore stylish sneakers from popular brands.",

        heading: "Sneakers"

    },

    "sports-shoes": {

        title: "🏃 Sports Shoes",

        description:
            "Explore running and sports shoes for active lifestyles.",

        heading: "Sports Shoes"

    }

};


/* =========================================================
   LOAD CATEGORY
   ========================================================= */

async function loadCategory(category) {

    const data =
        categoryData[category];

    if (!data) {

        document.querySelector(
            "#category-title"
        ).textContent =
            "Category Not Found";

        return;

    }


    document.querySelector(
        "#category-title"
    ).textContent =
        data.title;


    document.querySelector(
        "#category-description"
    ).textContent =
        data.description;


    try {

        const response =
            await fetch("index.html");

        if (!response.ok) {

            throw new Error(
                "Unable to load index.html"
            );

        }


        const html =
            await response.text();


        const parser =
            new DOMParser();


        const documentHTML =
            parser.parseFromString(
                html,
                "text/html"
            );


        const headings =
            documentHTML.querySelectorAll(
                ".product-category"
            );


        let selectedContainer = null;


        headings.forEach(
            function (heading) {

                const headingText =
                    heading.textContent
                        .toLowerCase();


                let matches = false;


                if (
                    category === "phones" &&
                    headingText.includes(
                        "smartphone"
                    )
                ) {

                    matches = true;

                }


                else if (
                    category === "laptops" &&
                    headingText.includes(
                        "laptop"
                    )
                ) {

                    matches = true;

                }


                else if (
                    category === "sneakers" &&
                    headingText.includes(
                        "sneaker"
                    )
                ) {

                    matches = true;

                }


                else if (
                    category === "sports-shoes" &&
                    (
                        headingText.includes(
                            "sports"
                        ) ||
                        headingText.includes(
                            "running"
                        )
                    )
                ) {

                    matches = true;

                }


                if (matches) {

                    selectedContainer =
                        heading
                            .nextElementSibling;

                }

            }
        );


        if (!selectedContainer) {

            throw new Error(
                "Category products not found"
            );

        }


        const categoryProducts =
            document.querySelector(
                "#category-products"
            );


        categoryProducts.innerHTML = "";


        const newHeading =
            document.createElement("h2");

        newHeading.className =
            "product-category";

        newHeading.textContent =
            data.title;


        categoryProducts.appendChild(
            newHeading
        );


        const newContainer =
            selectedContainer.cloneNode(
                true
            );

        newContainer.className =
            "product-container category-product-container";


        categoryProducts.appendChild(
            newContainer
        );


        /*
         * Reinitialize ShopZone products
         */

        products = [];


        initializeProducts();


        initializeCart();


        updateCartButton();


        initializeCategorySorting();

        initializeCategorySearch();


        console.log(
            "Category loaded:",
            data.heading
        );

    }

    catch (error) {

        console.error(
            error
        );


        document.querySelector(
            "#category-products"
        ).innerHTML = `

            <div class="category-error">

                <h2>
                    ⚠️ Unable to load products
                </h2>

                <p>
                    Please run the website using
                    VS Code Live Server.
                </p>

            </div>

        `;

    }

}


/* =========================================================
   CATEGORY SEARCH
   ========================================================= */

function initializeCategorySearch() {

    const form =
        document.querySelector(
            "#category-search-form"
        );


    const input =
        document.querySelector(
            "#category-search"
        );


    if (!form || !input) {

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            currentSearch =
                input.value
                    .trim()
                    .toLowerCase();


            filterProducts();

        }
    );


    input.addEventListener(
        "input",
        function () {

            currentSearch =
                input.value
                    .trim()
                    .toLowerCase();


            filterProducts();

        }
    );

}


/* =========================================================
   CATEGORY SORTING
   ========================================================= */

function initializeCategorySorting() {

    const sort =
        document.querySelector(
            "#category-sort"
        );


    if (!sort) {

        return;

    }


    sort.addEventListener(
        "change",
        function () {

            switch (sort.value) {

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