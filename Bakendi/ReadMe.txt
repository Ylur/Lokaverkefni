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