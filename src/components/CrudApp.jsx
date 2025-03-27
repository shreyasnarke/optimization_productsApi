import React, { useEffect, useState } from "react";
import { Container, TextField, Button, List, ListItem, ListItemText, CircularProgress, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const apiUrl = "https://dummyjson.com/products";

const CrudApp = () => {
  const [products, setProducts] = useState([]); // Store products
  const [loading, setLoading] = useState(false); // Loader
  const [productName, setProductName] = useState(""); // New product input
  const [editId, setEditId] = useState(null); // Track edit product ID
  const [editName, setEditName] = useState(""); // Track edit name

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // Add a product
  const addProduct = async () => {
    if (!productName) return;

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: productName }),
      });
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      setProductName("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
    setLoading(false);
  };

  // Delete a product
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setLoading(false);
  };

  // Start editing a product
  const startEdit = (product) => {
    setEditId(product.id);
    setEditName(product.title);
  };

  // Update a product
  const updateProduct = async () => {
    if (!editName) return;

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editName }),
      });
      const updatedProduct = await res.json();

      setProducts(products.map((p) => (p.id === editId ? updatedProduct : p)));
      setEditId(null);
      setEditName("");
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <h2>CRUD Operations - Products</h2>

      {/* Add Product */}
      <TextField
        label="Add Product"
        variant="outlined"
        fullWidth
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={addProduct}>
        Add Product
      </Button>

      {/* Loader */}
      {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />}

      {/* Product List */}
      <List>
        {products.map((product) => (
          <ListItem key={product.id} divider>
            {editId === product.id ? (
              <>
                <TextField
                  fullWidth
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <Button variant="contained" color="success" onClick={updateProduct}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <ListItemText primary={product.title} />
                <IconButton color="primary" onClick={() => startEdit(product)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => deleteProduct(product.id)}>
                  <Delete />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CrudApp;
