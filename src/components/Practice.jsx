import React, { useEffect, useState } from "react";
import { TextField, CircularProgress, List, ListItem, ListItemText, Container, Typography } from "@mui/material";

const SearchWithDebounce = () => {
  const [query, setQuery] = useState(""); // Store input value
  const [results, setResults] = useState([]); // Store search results
  const [loading, setLoading] = useState(false); // Show loader
  const api = "https://dummyjson.com/products/search?q="; // API endpoint

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true); // Show loader

    const timer = setTimeout(() => {
      fetch(api + query)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.products);
          setLoading(false); // Hide loader
        })
        .catch((err) => {
          console.error("Error fetching search results:", err);
          setLoading(false);
        });
    }, 500); // Debounce time: 500ms

    return () => clearTimeout(timer); // Cleanup timeout when query changes
  }, [query]); // Runs when `query` changes

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Search Products
      </Typography>

      <TextField
        fullWidth
        label="Search..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      {loading && <CircularProgress size={24} sx={{ display: "block", mx: "auto" }} />} {/* Show loader */}

      <List>
        {results.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SearchWithDebounce;
