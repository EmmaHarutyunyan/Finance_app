document.addEventListener("DOMContentLoaded", () => {
    const cryptoItems = document.querySelectorAll(".crypto-item");
    const stockItems = document.querySelectorAll(".stock-item");
    const trendingItems = document.querySelectorAll(".trending-item");

    function showDetails(item, name, price) {
        alert(`${name} is currently priced at ${price}!`);
    }

    const handleHover = (item) => {
        item.style.transform = "scale(1.1)";
        item.style.boxShadow = "0 8px 25px rgba(255, 255, 255, 0.3)";
    }

    const handleMouseLeave = (item) => {
        item.style.transform = "scale(1)";
        item.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.6)";
    }

    [...cryptoItems, ...stockItems, ...trendingItems].forEach(item => {
        item.addEventListener("click", () => {
            const name = item.querySelector(".crypto-name, .stock-name, .currency-name").textContent;
            const price = item.querySelector(".crypto-price, .stock-price, .currency-rate").textContent;
            showDetails(item, name, price);
        });

        item.addEventListener("mouseenter", () => handleHover(item));
        item.addEventListener("mouseleave", () => handleMouseLeave(item));
    });

    const cryptoList = document.querySelector(".crypto-list");
    if (cryptoList && cryptoList.children.length === 0) {
        const noDataMessage = document.createElement("li");
        noDataMessage.classList.add("no-data");
        noDataMessage.textContent = "No trending cryptocurrencies available at the moment.";
        cryptoList.appendChild(noDataMessage);
    }

    const stockList = document.querySelector("#stock-list");
    if (stockList && stockList.children.length === 0) {
        const noStockMessage = document.createElement("li");
        noStockMessage.classList.add("no-stocks");
        noStockMessage.textContent = "No trending stocks available at the moment.";
        stockList.appendChild(noStockMessage);
    }
});
