const stripe = require('stripe')('sk_test_51MwW2YKqLFfv80mnKqfe0Wb52NPtxT6tjyQKpL0PGC4ubBEpj2gjTsTptbPozhA7TDKbpACQhlxa1c62TYl4kQt800y5j81RXA'); // Replace with your Stripe secret key
const express = require("express");
const cors = require("cors");
const users = require("./Routes/user.js");
const products = require("./Routes/product.js");
const cart = require("./Routes/cart.js");
const category = require("./Routes/category.js");
const sequelize = require("./ORM/index.js");
const promotions = require("./Routes/admin.js");
const order = require('./Routes/order.js')

const app = express();

const path = require('path');
const multer = require('multer');

// Middleware
app.use(express.json());
app.use(cors());

// Set up multer for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// API endpoint for image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  // Process the uploaded image, generate the image URL
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

  // Return the image URL as the response
  res.json({ imageUrl: imageUrl });
});

// Serve the uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint to process payments
app.post('/api/payment', async (req, res) => {
  const { amount, token } = req.body;
  stripe.paymentMethods.create(
    {
      type: 'card',
      card: {
        token: token.card.token,
      },
    },
    async function(err, paymentMethod) {
      if (err) {
        console.log(err);
        // Handle error
      } else {
        console.log(paymentMethod);


        try {
          const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
            payment_method: paymentMethod.id,
            confirm: true
          });
          res.status(200).json({ paymentIntent });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Error creating payment intent' });
        }

        // PaymentMethod created successfully
      }
    }
  );
 
});

// Use the routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/admin/promotion", promotions);

app.use('/api/category',category)
app.use('/api/orders',order)

// Sync with the database and start the server
sequelize
  .sync()

  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
