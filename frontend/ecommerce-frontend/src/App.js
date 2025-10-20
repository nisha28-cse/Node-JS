import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

export default function App() {
  const [productList, setProductList] = useState([]);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        E-Commerce Frontend 🛍️
      </Typography>

      {/* Register Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" color="secondary" gutterBottom>
          Register
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Password" type="password" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Contact" fullWidth />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Register
        </Button>
      </Paper>

      {/* Verify OTP Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" color="secondary" gutterBottom>
          Verify OTP
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="OTP" fullWidth />
          </Grid>
        </Grid>
        <Button variant="contained" color="success" sx={{ mt: 2 }}>
          Verify OTP
        </Button>
      </Paper>

      {/* Login Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" color="secondary" gutterBottom>
          Login
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Password" type="password" fullWidth />
          </Grid>
        </Grid>
        <Button variant="contained" color="info" sx={{ mt: 2 }}>
          Login
        </Button>
      </Paper>

      {/* Add Product Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" color="secondary" gutterBottom>
          Add Product
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Description" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Price" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Category" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Stock" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Image URL" fullWidth />
          </Grid>
        </Grid>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
          Add Product
        </Button>
      </Paper>

      {/* Product List Section */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" color="secondary" gutterBottom>
          Product List
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {productList.length === 0 ? (
          <Typography color="text.secondary">No products yet...</Typography>
        ) : (
          productList.map((product, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{product.price}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </Container>
  );
}
