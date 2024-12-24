Runtime Environment: Node.js
Web Framework: Express.js
Database: MongoDB (using Mongoose ODM)
Password Hashing: bcrypt
Authentication Tokens: JSON Web Tokens (JWT)
Email Service: Nodemailer (for sending password reset emails)

Environment Variables Management: dotenv
express: Web framework for Node.js
mongoose: MongoDB ODM for schema definitions and data modeling
bcrypt: Library for hashing passwords
jsonwebtoken: For creating and verifying JWTs
nodemailer: For sending emails (used in password reset)
dotenv: For managing environment variables
cors: To handle Cross-Origin Resource Sharing

tree -I "node_modules|.git"


npm install --save-dev nodemon - til að restarta server eftir code changes

api/ sér um öll functions

Express er webframework og ekki notað í serverless eins og á vercel
TL;DR
Key Takeaway: Do not use Express routers or middleware inside Vercel serverless functions.

Varðandi Middleware:

In a serverless environment like Vercel's, each API route operates as an independent function. 
Unlike traditional Express.js applications, you cannot chain middleware directly. 
Therefore, centralizing middleware allows you to apply common functionalities (like CORS, cookie parsing, etc.) 
across all your serverless functions efficiently.







MÖGULEGA UPPFÆRA ÞETTA
I would like to enhance my backend for these suggestions.

not sure about this, if im duplicating it or not.

middleware/validateLogin.js
Comments & Suggestions
Straightforward express-validator chain for login.
If you’re applying this in your route, it’s good. If you also have inline validations in your api/auth/login.js, ensure you’re not duplicating. If you prefer the middleware approach, that’s totally fine.

- not sure what ephemeral means.

1.File-based logs won’t persist on Vercel—use console logs or external logging.
2.Rate limiting might behave differently on ephemeral instances.
3.If you wanted to allow optional fields or additional data (e.g. price, description), you can extend these sub-schemas.