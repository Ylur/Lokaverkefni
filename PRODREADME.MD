npx unimported

Hefðbundið setup:
Express, index.js server.js = hefðbundið
CommonJS (require/module.exports) = hefðbundið

Serverless setup:
Vercel serverless þarf routes undir API/ með öllum middleware ofl innbyggt í hverjum file.
serverless notar (req) and response (res).
ES Modules (import/export) 
Mögulega hægt að centralize eitthvað - þarf að skoða TODO


DevPlan:
Store orders in MongoDB via Mongoose.
Local dev is front-end on localhost:3001 and back-end on localhost:3000.
CORS is needed for credentialed requests from a different port.
User authentication is optional. 
real auth er optional,  maybe ill use dummy approach.
Setti líka inn .json file til að vista orders og users - svo ég deili ekki MongoDB cred
logs/combined.log - sér um að halda um err, info og warn 


Framtíðarplan:

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
npx tsc --noEmit

--MAC

Get-ChildItem -Recurse -Directory | Where-Object { $_.FullName -notmatch 'node_modules|\.git|vercel\\output' } | ForEach-Object { $_.FullName.Replace((Get-Location).Path, '').TrimStart('\') } > structure_cleaned.txt

---PC DRASL


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


CORS sér um að passa að fram og afturendi tali saman með því að tryggja að cookies séu sendar og mótteknar.




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





RESET PASSWORD FUNCITON.
Nodemailer Import:
Added import nodemailer from 'nodemailer'; to use Nodemailer for sending emails.

Email Configuration Check:
Before attempting to send an email, the code checks for the presence of EMAIL_USER and EMAIL_PASS in the environment variables. If they're not set, it logs an error and returns a 500 error response.

Email Transporter and Options:

A transporter is created using the Gmail service (you can adjust this based on your email provider).
The email is configured to be sent to the user's email (to: email) with a subject and body that confirms the password reset.
Email Sending After Password Reset:
Once the user's password is updated in the database, an email is sent to confirm the reset. The process occurs before sending the final successful API response.


checklisti 
Frontend Configuration:

 .env.local exists in the frontend project with NEXT_PUBLIC_API_BASE_URL set.
 Environment variable is set in Vercel frontend project settings.
 All API calls use process.env.NEXT_PUBLIC_API_BASE_URL.
 next.config.ts is updated to use images.remotePatterns.
 Frontend is rebuilt and redeployed after changes.
Backend Configuration:

 Backend is deployed on Vercel at https://lokaverkefni-bakendi.vercel.app/api.
 Environment variables (MONGO_URI, JWT_SECRET) are correctly set in Vercel backend project.
 CORS is properly configured to allow requests from https://www.appgo.is and https://framendi.vercel.app.
 API endpoints (/auth/login, /auth/register, /auth/verifyToken, /auth/logout, etc.) are correctly implemented and accessible.
Deployment:

 Frontend and backend are both deployed on Vercel.
 DNS settings for www.appgo.is and appgo.is are correctly configured.
 No DNS propagation issues (wait a few hours if recently updated).
Testing:

 Register and login flows are tested both locally and in production.
 Protected routes redirect unauthenticated users to the login page.
 Logout functionality correctly clears authentication state and cookies.
TypeScript and Code Quality:

 All necessary types are correctly exported and imported.
 No TypeScript errors remain in the codebase.
 Components use the correct and consistent API base URL.
Error Monitoring:

 Frontend shows meaningful error messages to users.
 Backend logs capture errors for debugging purposes.



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