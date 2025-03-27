import React,{useEffect,useState} from "react";
import { Container, TextField, Button, List, ListItem, ListItemText, CircularProgress, IconButton } from "@mui/material";
import { Delete,Edit } from "@mui/icons-material";

const apiUrl="https://dummyjson.com/products";
const CrudApp=()=>{
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [productName,setProductName]=useState("");
    const [productPrice,setProductPrice]=useState("");
    const [editId,setEditId]=useState(null);
}