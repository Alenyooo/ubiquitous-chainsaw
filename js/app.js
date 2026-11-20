(function () {
  "use strict";
  var S = window.STORE || {};

  function money(n) {
    try {
      return new Intl.NumberFormat(S.locale || "en-US", { style: "currency", currency: S.currency || "USD", maximumFractionDigits: n % 1 ? 2 : 0 }).format(n);
    } catch (e) { return "$" + n; }
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Bottle illustrations (inline SVG, no image files needed) ---------- */
  function bottle(shape, color, x, scale) {
    x = x || 0; scale = scale || 1;
    var g = '<g transform="translate(' + x + ',0) scale(' + scale + ')">';
    if (shape === "shaker") {
      g += '<rect x="58" y="40" width="84" height="26" rx="6" fill="#1b1f24"/>' +
           '<rect x="88" y="26" width="24" height="18" rx="4" fill="#1b1f24"/>' +
           '<path d="M54 70 h92 l-8 150 a10 10 0 0 1 -10 9 h-56 a10 10 0 0 1 -10 -9z" fill="' + color + '" opacity=".92"/>' +
           '<g fill="#0e1114" opacity=".35"><rect x="66" y="110" width="22" height="3"/><rect x="66" y="140" width="22" height="3"/><rect x="66" y="170" width="22" height="3"/></g>' +
           '<path d="M70 80 l-6 130" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".25"/>';
    } else if (shape === "jug") {
      g += '<rect x="78" y="12" width="44" height="20" rx="5" fill="#1b1f24"/>' +
           '<path d="M60 40 q0 -10 10 -10 h60 q10 0 10 10 v185 q0 10 -10 10 h-60 q-10 0 -10 -10z" fill="' + color + '" opacity=".9"/>' +
           '<path d="M140 55 h12 q10 0 10 10 v40 q0 10 -10 10 h-12" fill="none" stroke="#1b1f24" stroke-width="9"/>' +
           '<g fill="#0e1114" opacity=".45" font-family="Archivo,sans-serif" font-size="9" font-weight="700">' +
           '<rect x="70" y="70" width="18" height="3"/><text x="92" y="74">8AM</text>' +
           '<rect x="70" y="110" width="18" height="3"/><text x="92" y="114">12PM</text>' +
           '<rect x="70" y="150" width="18" height="3"/><text x="92" y="154">4PM</text>' +
           '<rect x="70" y="190" width="18" height="3"/><text x="92" y="194">8PM</text></g>' +
           '<path d="M70 45 v170" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".25"/>';
    } else { /* steel */
      g += '<rect x="82" y="14" width="36" height="26" rx="6" fill="#1b1f24"/>' +
           '<rect x="94" y="6" width="12" height="12" rx="3" fill="#1b1f24"/>' +
           '<path d="M84 40 h32 q0 18 20 30 v150 q0 12 -12 12 h-48 q-12 0 -12 -12 v-150 q20 -12 20 -30z" fill="' + color + '"/>' +
           '<rect x="64" y="120" width="72" height="40" fill="#0e1114" opacity=".85"/>' +
           '<text x="100" y="145" text-anchor="middle" fill="' + color + '" font-family="Archivo,sans-serif" font-weight="900" font-size="13" letter-spacing="1">' + esc((S.brand || "").toUpperCase().slice(0, 9)) + '</text>' +
           '<path d="M74 80 v130" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".3"/>';
    }
    return g + "</g>";
  }
  function art(p) {
    var inner;
    if (p.shape === "bundle") {
      inner = bottle("shaker", "#3dd6ff", -55, 0.8) + bottle("jug", "#ff7a3d", 100, 0.8) + bottle("steel", "#c6ff3d", 22, 0.95);
      inner = '<g transform="translate(0,10)">' + inner + "</g>";
    } else inner = bottle(p.shape, p.color);
    return '<svg viewBox="0 0 200 245" role="img" aria-label="' + esc(p.name) + '">' + inner + "</svg>";
  }

  /* ---------- Fill in brand text ---------- */
  document.querySelectorAll("[data-brand]").forEach(function (el) { el.textContent = S.brand; });
  document.querySelectorAll("[data-tagline]").forEach(function (el) { el.textContent = S.tagline; });
  document.title = S.brand + " — Training Bottles";
  document.getElementById("year").textContent = new Date().getFullYear();

  var banner = document.getElementById("banner");
  if (S.freeShippingFrom > 0) banner.textContent = "Free shipping on orders over " + money(S.freeShippingFrom);
  else banner.remove();

  var mail = "mailto:" + S.email + "?subject=" + encodeURIComponent("Question for " + S.brand);
  document.getElementById("contactBtn").href = mail;
  document.getElementById("contactEmail").textContent = S.email;
  if (S.instagram) { var ig = document.getElementById("igLink"); ig.href = S.instagram; ig.hidden = false; }

  var heroColors = (S.products || []).filter(function (p) { return p.shape !== "bundle"; });
  document.getElementById("heroArt").innerHTML =
    '<svg viewBox="-60 0 320 245">' +
    (heroColors[1] ? bottle(heroColors[1].shape, heroColors[1].color, -60, 0.85) : "") +
    (heroColors[2] ? bottle(heroColors[2].shape, heroColors[2].color, 120, 0.85) : "") +
    (heroColors[0] ? bottle(heroColors[0].shape, heroColors[0].color, 25, 1) : "") + "</svg>";

  /* ---------- Products ---------- */
  var grid = document.getElementById("products");
  grid.innerHTML = (S.products || []).map(function (p) {
    return '<article class="card" style="--accent:' + esc(p.color) + '">' +
      (p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "") +
      '<div class="card-art">' + art(p) + "</div>" +
      '<div class="card-body">' +
        "<h3>" + esc(p.name) + "</h3>" +
        '<p class="muted">' + esc(p.short) + "</p>" +
        "<ul>" + (p.features || []).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
        '<div class="buy-row">' +
          '<div class="price">' + money(p.price) + (p.oldPrice ? " <s>" + money(p.oldPrice) + "</s>" : "") + "</div>" +
          '<div class="qty" aria-label="Quantity"><button type="button" data-step="-1" aria-label="Decrease">−</button><span data-qty>1</span><button type="button" data-step="1" aria-label="Increase">+</button></div>' +
        "</div>" +
        '<button class="btn btn-block" data-buy="' + esc(p.id) + '">Buy now</button>' +
      "</div></article>";
  }).join("");

  grid.addEventListener("click", function (e) {
    var step = e.target.closest("[data-step]");
    if (step) {
      var q = step.parentNode.querySelector("[data-qty]");
      q.textContent = Math.min(20, Math.max(1, +q.textContent + +step.dataset.step));
      return;
    }
    var buy = e.target.closest("[data-buy]");
    if (!buy) return;
    var p = S.products.find(function (x) { return x.id === buy.dataset.buy; });
    var qty = +buy.closest(".card").querySelector("[data-qty]").textContent;
    checkout(p, qty);
  });

  function checkout(p, qty) {
    if (p.stripeLink) {
      /* Stripe Payment Link — customer can confirm/adjust quantity on the Stripe page */
      var url = p.stripeLink + (p.stripeLink.indexOf("?") > -1 ? "&" : "?") +
        "client_reference_id=" + encodeURIComponent(p.id + "-x" + qty);
      toast("Redirecting to secure checkout…");
      window.location.href = url;
      return;
    }
    /* Fallback until Stripe is connected: pre-filled order email */
    var body = "Hi " + S.brand + ",\n\nI'd like to order:\n\n" +
      qty + " x " + p.name + " (" + money(p.price) + " each) = " + money(p.price * qty) +
      "\n\nName:\nShipping address:\nPhone:\n\nThanks!";
    window.location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Order: " + qty + " x " + p.name) +
      "&body=" + encodeURIComponent(body);
    toast("Opening your email app to place the order…");
  }

  var t;
  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(t); t = setTimeout(function () { el.classList.remove("show"); }, 3500);
  }
})();
