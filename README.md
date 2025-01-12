Tilraun 293 á lokaverkefni.
ORDERS_FILE_PATH=src/data/orders.json
C:\Users\Notandi\Lokaverkefni-1\.env.local


Orderflow:
Homepage->Dish page->Drink page->Booking page -> Receipt page.
Creating new orders:
const newOrder = {
  _id: Date.now().toString(),
  email,
  dishes: dishes || [],
  drinks: drinks || [],
  total: total || 0,
  date: date || null,
  time: time || null,
  people: people || 1,
  status: "pending",
  createdAt: new Date().toISOString(),
};

Saved:
orders.push(newOrder);
writeOrdersFile(orders);

Looking up orders:
let orders = readOrdersFile();
This function (imported from utils/files) reads the current list of orders from a JSON file.
function handleGetOrders(req: NextApiRequest, res: NextApiResponse) {
  const email = req.query.email as string | undefined;
  let orders = readOrdersFile(); // read from JSON

  if (email) {
    orders = orders.filter((o) => o.email === email);
  }

  return res.status(200).json({ success: true, orders });
}



Framendi sækir upplýsingar í /api/orders

Select Dish Page:
User selects a dish and specifies a quantity.
Dish details (strMeal, quantity) are passed to the receipt page as a query parameter.


Receipt Page:
The dish details are decoded and displayed along with dynamically calculated totals.


Total Calculation:
Dish total is calculated based on price per person and quantity.
Drinks total is calculated from the hardcoded values.
Grand total combines the dish total and drinks total.



VIRKNIN Á PÖNTUNARFERLI
1. **SelectDish** → user picks dishes, hits Next → pass `dishes` as JSON in query.  
2. **SelectDrinks** → user picks drinks, hits Next → pass `dishes` + `drinks` in query.  
3. **Booking** → user sets date/time/people/email, hits Next → pass `dishes`, `drinks`, plus booking info in query.  
4. **Receipt** → read **all** from query, do a final **POST** to store in JSON, then display the final info.
5. **Older-orders** → gets orders that matches the Email from data/orders.json else shows no-order/page.


tree -I "node_modules|.git"



