Tilraun 2 á lokaverkefni.

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