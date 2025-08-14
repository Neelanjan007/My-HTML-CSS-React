
function createPortfolio() {
  
  const positions = new Map();          
  let realizedProceeds = 0;              

  const fmt = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format;

  
  function buyShare(company, qty, price) {
    if (!company || qty <= 0 || price <= 0) {
      return "Invalid buy order.";
    }
    const key = company.trim().toUpperCase();
    const existing = positions.get(key) || { qty: 0, avgPrice: price };

    const totalCost = existing.qty * existing.avgPrice + qty * price;
    const newQty = existing.qty + qty;
    const newAvg = totalCost / newQty;

    positions.set(key, { qty: newQty, avgPrice: newAvg });
    return `Bought ${qty} shares of ${key} at ${fmt(price)} each.`;
  }

  
  function sellShare(company, qty) {
    const key = company.trim().toUpperCase();
    const pos = positions.get(key);
    if (!pos || qty <= 0 || qty > pos.qty) {
      return `Cannot sell ${qty} shares of ${key}.`;
    }
    pos.qty -= qty;
    realizedProceeds += qty * pos.avgPrice;

    if (pos.qty === 0) positions.delete(key);
    else positions.set(key, pos);

    return `Sold ${qty} shares of ${key}.`;
  }

  
  function totalValue() {
    let holdings = 0;
    positions.forEach(({ qty, avgPrice }) => {
      holdings += qty * avgPrice;
    });
    return holdings + realizedProceeds;
  }

 
  return { buyShare, sellShare, totalValue };
}


const portfolio = createPortfolio();
const logEl = document.getElementById("log");

function log(line) {
  logEl.textContent += (line + "\n");
  logEl.scrollTop = logEl.scrollHeight;
}

document.getElementById("buyForm").addEventListener("submit", e => {
  e.preventDefault();
  const company = document.getElementById("buyCompany").value;
  const qty = Number(document.getElementById("buyQty").value);
  const price = Number(document.getElementById("buyPrice").value);
  log(portfolio.buyShare(company, qty, price));
  e.target.reset();
});

document.getElementById("sellForm").addEventListener("submit", e => {
  e.preventDefault();
  const company = document.getElementById("sellCompany").value;
  const qty = Number(document.getElementById("sellQty").value);
  log(portfolio.sellShare(company, qty));
  e.target.reset();
});

document.getElementById("valueBtn").addEventListener("click", () => {
  const fmt = new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
  }).format;
  log(`Portfolio Value: ${fmt(portfolio.totalValue())}`);
});

document.getElementById("exampleBtn").addEventListener("click", () => {
  // Run the EXACT expected output example on a fresh private portfolio
  const demo = createPortfolio();
  const fmt = new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
  }).format;

  log(demo.buyShare("TCS", 10, 3500));
  log(demo.buyShare("Infosys", 5, 1500));
  log(demo.sellShare("TCS", 3));
  log(`Portfolio Value: ${fmt(demo.totalValue())}`); // -> ₹42500
});

document.getElementById("clearLogBtn").addEventListener("click", () => {
  logEl.textContent = "";
});
