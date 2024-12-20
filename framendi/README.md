Tilraun 293 á lokaverkefni.

Homepage->Dish page->Drink page->Booking page -> Receipt page.

Select Dish Page:
User selects a dish and specifies a quantity.
Dish details (strMeal, quantity) are passed to the receipt page as a query parameter.


Receipt Page:
The dish details are decoded and displayed along with dynamically calculated totals.


Total Calculation:
Dish total is calculated based on price per person and quantity.
Drinks total is calculated from the hardcoded values.
Grand total combines the dish total and drinks total.
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