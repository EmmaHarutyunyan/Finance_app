document.addEventListener("DOMContentLoaded", () => {
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.style.display = 'block';
    loadingSpinner.classList.add("spin-in");

    fetch('/api/getApiUrl')
        .then(response => response.json())
        .then(data => {
            const API_URL = data.apiUrl;

            fetch(API_URL)
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'success') {
                        const exchangeRates = data.conversion_rates;
                        const labels = Object.keys(exchangeRates);
                        const values = Object.values(exchangeRates);

                        const chartData = {
                            labels: labels,
                            datasets: [{
                                label: 'Exchange Rates',
                                data: values,
                                borderColor: '#3498db',
                                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                                borderWidth: 2
                            }]
                        };

                        const ctx = document.getElementById('exchangeRatesChart').getContext('2d');
                        const chart = new Chart(ctx, {
                            type: 'line',
                            data: chartData,
                            options: {
                                responsive: true,
                                animation: {
                                    duration: 1500, 
                                    easing: 'easeOutElastic'
                                },
                                plugins: {
                                    legend: { position: 'top' },
                                    tooltip: { mode: 'index', intersect: false }
                                },
                                scales: {
                                    x: { beginAtZero: true },
                                    y: { beginAtZero: true }
                                }
                            }
                        });

                        chart.canvas.style.opacity = 0;  
                        chart.canvas.style.transition = 'opacity 1s ease-out';
                        setTimeout(() => chart.canvas.style.opacity = 1, 500);  
                    } else {
                        console.error("Error fetching data:", data.error);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                })
                .finally(() => {
                    loadingSpinner.classList.add("fade-out");
                    setTimeout(() => loadingSpinner.style.display = 'none', 500);  
                });
        })
        .catch(error => {
            console.error("Error fetching API URL:", error);
        });

    const fadeInCards = document.querySelectorAll(".fade-in-card");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-visible");

                if (index === 2) {
                    setTimeout(() => {
                        entry.target.classList.add("fade-in-visible");
                    }, 300); 
                }

                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    fadeInCards.forEach(card => observer.observe(card));

    const scrollButtons = document.querySelectorAll(".scroll-to");
    scrollButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 20,  
                behavior: 'smooth'
            });
        });
    });

    const hero = document.querySelector('.hero');
    const parallaxSpeed = 0.3;
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });

    const navbar = document.querySelector('.navbar');
    navbar.classList.add('fade-in-visible');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

const toggleButton = document.createElement('button');
toggleButton.textContent = "Toggle Total Amount";
toggleButton.style.backgroundColor = "#8e44ad";
toggleButton.style.color = "white";
toggleButton.style.padding = "10px 20px";
toggleButton.style.border = "none";
toggleButton.style.borderRadius = "8px";
toggleButton.style.marginTop = "20px";
toggleButton.style.cursor = "pointer";
toggleButton.style.fontSize = "16px";
toggleButton.style.transition = "background-color 0.3s ease";

document.querySelector('.dashboard-container').appendChild(toggleButton);

toggleButton.addEventListener('mouseenter', () => {
    toggleButton.style.backgroundColor = "#9b59b6"; 
});
toggleButton.addEventListener('mouseleave', () => {
    toggleButton.style.backgroundColor = "#8e44ad"; 
});

toggleButton.addEventListener('click', () => {
    const totalAmountSection = document.querySelector('.total-amount');
    if (totalAmountSection.style.display === 'none' || totalAmountSection.style.display === '') {
        totalAmountSection.style.display = 'block';
        totalAmountSection.style.animation = 'fadeIn 1s forwards';
    } else {
        totalAmountSection.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => {
            totalAmountSection.style.display = 'none';
        }, 1000); 
    }
});

const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(styleSheet);
