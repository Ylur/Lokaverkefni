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