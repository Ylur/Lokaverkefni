Tilraun 293 á lokaverkefni.



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
4. **Receipt** → read **all** from query, do a final **POST** to store in DB or JSON, then display the final info.


tree -I "node_modules|.git"



Bakenda structure:


Authentication Routes (/api/register and /api/login):

Register: POST /api/register
Login: POST /api/login
Order Management Routes (/api/orders):

Get All Orders: GET /api/orders
Get Order by ID: GET /api/orders/order/id/:id
Create Order: POST /api/orders/create-order
Update Order: PUT /api/orders/order/id/:id
Delete Order by ID: DELETE /api/orders/order/id/:id
Delete All Orders by Email: DELETE /api/orders/order/email/:email

Til að búa til JWT secret notaði ég crypt sem er innbyggt í node: node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
Gott ráð er að breyta þessu reglulega.
Aldrei harðkóða og nota frekar t.d.

Vercel Environment Variables: Securely manage environment variables in Vercel.
HashiCorp Vault: A tool for securely accessing secrets.
AWS Secrets Manager: Manage secrets within AWS infrastructure.
Azure Key Vault: Securely store and access secrets in Azure.
Google Secret Manager: Manage secrets within Google Cloud Platform.

Bjó til email til að nota fyrir registering og senda email frá.
lokaverkefni0@gmail.com

Suspense bætt við
https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout

"Reading search parameters through useSearchParams() without a Suspense boundary will opt the entire page into client-side rendering. This could cause your page to be blank until the client-side JavaScript has loaded"



TODO
Are You Actually Using axiosInstance?

If your code never imports axiosInstance for calls, it might be dead code. Or maybe you planned to transition from fetch to Axios. Check if you really want two approaches.