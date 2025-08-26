let energy = 0;
let powerLevel = 0;
let maxEnergy = 100;
let chargingActive = false;
let expelPower = 5;
let chargeMult = 1;
let limit = 100;

const elements = {
    chargeBtn: document.getElementById("chargeBtn"),
    expelBtn: document.getElementById("expelBtn"),
    chargeBar: document.getElementById("chargeForground"),
    powerText: document.getElementById("powerLevel"),
    limitText: document.getElementById("limit"),
    player: document.getElementById("player")
};

let displayedEnergy = 0;

function startCharging() {
    if (!elements.chargeBtn.disabled) chargingActive = true;
}
function stopCharging() { chargingActive = false; }

function tryExpel() {
    if (chargingActive || elements.expelBtn.disabled) return;

    let change;
    if (energy - (maxEnergy * (expelPower / 100)) <= 0) {
        change = energy;
        energy = 0;
    } else {
        change = maxEnergy * expelPower / 100;
        energy -= change;
    }

    animateNumber(powerLevel, powerLevel + change, 400, (val) => {
        elements.powerText.textContent = `PL: ${Math.floor(val)}`;
    });

    powerLevel += change;

    if (powerLevel >= limit) {
        powerLevel = limit;
        energy = 0;
        elements.chargeBtn.disabled = true;
        elements.expelBtn.disabled = true;
        if (elements.limitText) {
            elements.limitText.style.color = "#ea6464ff";
            elements.limitText.textContent = "LIMIT REACHED";
        }
        if (elements.player) {
            elements.player.style.backgroundColor = "#ea6464ff";
        }
    }
}

function animateNumber(from, to, duration, onUpdate) {
    const start = performance.now();
    function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = from + (to - from) * progress;
        onUpdate(value);
        if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

function animate() {
    if (chargingActive && energy < maxEnergy) {
        energy += 0.5 * chargeMult;
        if (energy > maxEnergy) energy = maxEnergy;
    }

    displayedEnergy += (energy - displayedEnergy) * 0.1;

    elements.chargeBar.style.width = `${(displayedEnergy / maxEnergy) * 100}%`;

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

elements.chargeBtn.addEventListener("mousedown", startCharging);
elements.chargeBtn.addEventListener("mouseup", stopCharging);
elements.chargeBtn.addEventListener("mouseleave", stopCharging);
elements.chargeBtn.addEventListener("touchstart", startCharging);
elements.chargeBtn.addEventListener("touchend", stopCharging);
elements.expelBtn.addEventListener("click", tryExpel);

(function initParticles(){
  const container = document.getElementById("particles");
  const count = 40;

  for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.className = "dot";

    d.style.left = Math.random() * 100 + "%";
    d.style.top = Math.random() * 100 + "%";
    d.style.animationDuration = (8 + Math.random() * 10) + "s";
    d.style.opacity = String(0.2 + Math.random() * 0.35);

    container.appendChild(d);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const sideMenu = document.getElementById('sideMenu');
  const menuButtons = document.querySelectorAll('.menuBtn');
  const sections = {
    'Main': document.getElementById('main'),
    'Settings': document.getElementById('settings'),
    'Achievements': document.getElementById('achievements')
  };

  // Initialize - show main section, hide others
  Object.values(sections).forEach(section => {
    if (section.id === 'main') {
      section.hidden = false;
    } else {
      section.hidden = true;
    }
  });

  hamburgerIcon.addEventListener('click', () => {
    sideMenu.classList.add('open');
    hamburgerIcon.style.display = 'none';
  });

  menuButtons.forEach(button => {
    button.addEventListener('click', () => {
      const sectionName = button.textContent;
      
      // Hide all sections
      Object.values(sections).forEach(section => {
        section.hidden = true;
      });

      // Show selected section
      sections[sectionName].hidden = false;

      // Close menu
      sideMenu.classList.remove('open');
      hamburgerIcon.style.display = 'flex';
    });
  });

  document.addEventListener('click', (e) => {
    if (
      sideMenu.classList.contains('open') &&
      !sideMenu.contains(e.target) &&
      e.target !== hamburgerIcon
    ) {
      sideMenu.classList.remove('open');
      hamburgerIcon.style.display = 'flex';
    }
  });
});