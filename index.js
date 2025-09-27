 const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    let counterStarted = false;

    function startCounters() {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const isDecimal = target % 1 !== 0;
        let count = 0;
        const speed = 200;
        const step = target / speed;

        const updateCounter = () => {
          if (count < target) {
            count += step;
            counter.textContent = isDecimal ? count.toFixed(1) : Math.floor(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
          }
        };
        updateCounter();
      });
    }

    const statsSection = document.querySelector('.stats');
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counterStarted) {
        startCounters();
        counterStarted = true;
      }
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
