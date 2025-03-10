import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Paper, Button } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import Razorpay from 'react-razorpay'

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext); // Get the token
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Include the token
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, token]);

    const handlePayment = async () => {
        try {
            //1. Create Order
            const orderResponse = await axios.post(
                "http://localhost:5000/api/payment/createOrder",
                {
                    amount: product.price, //Ensure price is number
                    currency: "INR",
                    paymentFor: "product",
                    productId: product._id,
                    userId: "64b8d84e57b4b3362038b7a1"//Replace with actual user id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const order = orderResponse.data;
            // 2. Initialize Razorpay
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,//Key ID from Razorpay Dashboard,
                amount: order.amount.toString(),
                currency: order.currency,
                name: 'Pet Product',
                description: 'Payment for pet product',
                order_id: order.id,
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const verifyResponse = await axios.post(
                            "http://localhost:5000/api/payment/verifyPayment",
                            {
                                orderId: order.id,
                                paymentId: response.razorpay_payment_id,
                                signature: response.razorpay_signature
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );

                            if (verifyResponse.status === 200) {
                                alert("Payment Successful!");
                                // Redirect or update UI as needed
                            } else {
                                alert("Payment Verification Failed!");
                            }
                        } catch (verificationError) {
                            console.error("Payment Verification Error", verificationError);
                            alert("Payment Verification Failed!");
                        }
                    },
                    prefill: {
                        name: 'User Name',//Prefill customer name
                        email: 'test@example.com',//Prefill customer email
                        contact: '1234567890'//Prefill customer contact
                    },
                    notes: {
                        address: 'Razorpay Corporate Office'
                    },
                    theme: {
                        color: '#3399cc'
                    }
                };
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                console.error("Payment Error", error);
                alert("Payment Failed!");
            }
        };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
            <img src={product.imageurl} alt={product.name} style={{ width: "150px", height: "150px", objectFit: "cover" }} />
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              {product.Breed_name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Details</Typography>
            <Typography variant="body1">Category: {product.category}</Typography>
            <Typography variant="body1">Breed: {product.Breed_name}</Typography>
            <Typography variant="body1">Gender: {product.Gender}</Typography>
            <Typography variant="body1">Quality: {product.quality}</Typography>
            <Typography variant="body1">Age: {product.age}</Typography>
            <Typography variant="body1">Description: {product.description}</Typography>
            <Typography variant="body1">Price: {product.price}</Typography>
            {/* Display all product details here */}
            {token && ( //Conditionally render button
                <Button variant="contained" color="primary" onClick={handlePayment}>
                    Buy Product
                </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetails;