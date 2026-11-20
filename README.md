# PeakFlow — fitness bottle store

A fast, mobile-friendly online store for training bottles. It's a plain static site: no server, no database, and free hosting on GitHub Pages. Card payments go through **Stripe Payment Links**.

## Going live checklist

### 1. Turn on hosting (free, about 2 minutes)
1. On GitHub, open the repo and go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open the **Actions** tab and re-run **Deploy website to GitHub Pages** (or push any change).
4. Your store is live at `https://<your-github-username>.github.io/<repo-name>/`.

### 2. Accept payments with Stripe
1. Create an account at <https://dashboard.stripe.com/register> and complete business verification so you can receive payouts.
2. For **each product**: go to **Payment Links → New**, then:
   - add the product with its name, price and photo
   - turn on **Let customers adjust quantity**
   - turn on **Collect customers' addresses → Shipping addresses**
   - under **After payment**, choose **Don't show confirmation page → Redirect** and enter
     `https://<your-site>/thank-you.html`
3. Copy each link (`https://buy.stripe.com/...`) into the matching `stripeLink` field in **`js/config.js`**.
4. Commit the change. The site redeploys automatically.

Until a product has a Stripe link, its **Buy now** button opens a pre-filled order email to you. You can still take orders that way and invoice customers manually.

Stripe emails you about every sale. You'll find the customer's shipping address under **Payments** in the Stripe dashboard.

### 3. Make it yours: edit `js/config.js`
- `brand`, `tagline`, `email` (**change `orders@example.com` to your real email**)
- `currency`, `freeShippingFrom`, `instagram`
- products: names, prices, colors, features, badges

Prices on the site are for display only. Stripe charges the price you set in each Payment Link, so keep them the same.

### 4. Custom domain (optional, about $10–15 a year)
1. Buy a domain from a registrar such as Cloudflare, Namecheap or Porkbun (for example `peakflowbottles.com`).
2. In your registrar's DNS settings, add:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `<your-github-username>.github.io`
3. In GitHub, go to **Settings → Pages → Custom domain**, enter your domain, then tick **Enforce HTTPS** once it's available.
4. Update the Stripe redirect URLs to use the new domain.

### 5. Before launch
- Review `terms.html` and `privacy.html` and adjust shipping times, return terms and your legal business name. Local laws vary, so check what applies to you.
- Place a test order in Stripe **test mode** first, then switch the links to live mode.

## Files
| File | What it is |
|---|---|
| `index.html` | Store homepage (hero, products, features, FAQ, contact) |
| `js/config.js` | **All your settings and products** |
| `js/app.js` | Renders products and handles checkout |
| `css/styles.css` | Design |
| `terms.html`, `privacy.html` | Policies |
| `thank-you.html` | Page shown after a successful payment |
| `.github/workflows/pages.yml` | Auto-deploys to GitHub Pages on every push |

To preview locally, run `python3 -m http.server` in this folder and open <http://localhost:8000>.
