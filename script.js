// Prevent text selection on mobile devices
document.addEventListener('DOMContentLoaded', function() {
  // Prevent context menu (long press) on mobile
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Prevent text selection on touch devices
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
  });

  // Prevent iOS text selection
  document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });
});

// Additional prevention for drag events that might cause selection
document.addEventListener('dragstart', function(e) {
  e.preventDefault();
  return false;
});

// Your original code below
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".intro");
  const menu = document.querySelector(".menu");

  // Check if we should skip the intro (when coming from back button)
  if (sessionStorage.getItem('skipIntro') === 'true') {
    // Skip the intro and show menu directly
    intro.style.display = "none";
    menu.classList.remove("hidden");
    addTopLeftName();

    // Clear the flag
    sessionStorage.removeItem('skipIntro');
  } else {
    // Normal behavior - first load
    function showMenu() {
      intro.style.display = "none";
      menu.classList.remove("hidden");
      addTopLeftName();
    }

    const timer = setTimeout(showMenu, 3000);
    intro.addEventListener("click", () => {
      clearTimeout(timer);
      showMenu();
    });

    // Add touch event for mobile
    intro.addEventListener('touchstart', function() {
      clearTimeout(timer);
      showMenu();
    });
  }
});

// Helper function to add the top-left name
function addTopLeftName() {
  // Check if already exists
  if (document.querySelector('.top-left-name')) return;

  const nameDiv = document.createElement("div");
  nameDiv.className = "top-left-name";
  nameDiv.textContent = "CHIRANJIT CHAKMA";
  nameDiv.onclick = function() {
    // Clear the flag to ensure animation plays when clicking the name
    sessionStorage.removeItem('skipIntro');
    window.location.href = "index.html";
  };
  document.body.appendChild(nameDiv);
}

// Set flag when navigating away from index page via menu items
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('menu-item') &&
      !e.target.href.includes('index.html')) {
    sessionStorage.setItem('skipIntro', 'true');
  }
});

// Handle browser back/forward navigation
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    // Page was loaded from back/forward cache
    sessionStorage.setItem('skipIntro', 'true');
  }
});

// Toggle function for expandable cards
function toggleExpand(card) {
  card.classList.toggle('expanded');
}
