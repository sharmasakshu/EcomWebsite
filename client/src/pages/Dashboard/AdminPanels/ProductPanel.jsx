import React, { useState } from "react";
import {
  Box,
  Pagination,
  Typography,
  Modal,
  Button as MuiButton,
  TextField,
  Switch,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../../slices/ProductSlice";

import { paginate } from "../../../utils/utils";
import Title from "./Title";

import ProductPanelItem from "../../../components/ProductPanelItem";
import { Button } from "../../../styles/Button";
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";

const ProductPanel = () => {
  
const { products } = useSelector((state) => state.productstate);
const { user } = useSelector((state) => state.userstate);
const [pageSize, setPageSize] = useState(5);
const [currentPage, setCurrentPage] = useState(1);
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const dispatch=useDispatch();

const initialState={
  name: "",
  brand: "",
  category: "",
  price: 0,
  description: "",
  image: "",
  countInStock: 0,
  featured: false,
}

const [formData, setFormData] = useState(initialState);  

const handleSubmit=(e)=>{
  e.preventDefault();
  if(formData.name && formData.price && formData.brand && formData.category && formData.description && formData.image && formData.countInStock)
  {
    dispatch(
      addProduct({
        formData :{
          ...formData,
          price: parseInt(formData.price),
          countInStock: parseInt(formData.countInStock)
        },
        token: user.token,
      })
    );
    handleClose();
    setFormData(initialState)
  }
 
}

const handlePageChange = (e, value) => {
    setCurrentPage(value);
};



  const paginatedResult = paginate(products, currentPage - 1, pageSize);

  return (
    <Box
      sx={{
        padding: "30px 60px",
      }}
    >
      <Title heading={"Products"} />
      <Box textAlign={"right"} mt={0}><Button onClick={handleOpen}> Add Product</Button></Box>
      <Box mt={4} bgcolor={"whitesmoke"}>
        {products &&
          paginatedResult &&
          paginatedResult.map((product) => (
            <ProductPanelItem  key={product._id} product={product} />
          ))}
        {products && (
          <Box
            py={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Pagination
              count={Math.ceil(products.length / pageSize)}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component={"form"}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            bgcolor: "#F4EDF2",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "24px",
              fontFamily: "'Jost', sans-serif",
              fontWeight: "500",
              textAlign : "center",
              mb : 4
            }}
          >
            Add Product
          </Typography>
          <Box display={"flex"} gap={3} mb={2}>
            <TextField
              variant="outlined"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              size="small"
              sx={{
                width: "50%",
              }}
            />
            <TextField
              variant="outlined"
              placeholder="Product Image"
              value={formData.image}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.value,
                })
              }
              size="small"
              sx={{
                width: "50%",
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="Product Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              size="small"
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Box display={"flex"} gap={3} mb={2}>
            <TextField
              variant="outlined"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
              type="number"
              placeholder="Product Price"
              size="small"
              sx={{
                width: "50%",
              }}
            />
            <TextField
              variant="outlined"
              value={formData.countInStock}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  countInStock: e.target.value,
                })
              }
              type="number"
              placeholder="Count In Stock"
              size="small"
              sx={{
                width: "50%",
              }}
            />
          </Box>
          <Box display={"flex"} gap={3} mb={2}>
            {/* <TextField
              variant="outlined"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              placeholder="Product Category"
              size="small"
              sx={{
                width: "50%",
              }}
            /> */}
             <FormControl variant="outlined" placeholder="Product Category" fullWidth size="small" sx={{
      width: "50%",
    }}>
        {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
  <Select
    placeholder="Product Category"
    value={formData.category}
    onChange={(e) =>
      setFormData({
        ...formData,
        category: e.target.value,
      })
    }   
  >
    <MenuItem value="Mobile Phones">Mobile Phones</MenuItem>
    <MenuItem value="PCs and Laptops">PCs and Laptops</MenuItem>
    <MenuItem value="Cameras" >Cameras</MenuItem>
    <MenuItem value="Watches">Watches</MenuItem>
  </Select>
  </FormControl>

            <TextField
              variant="outlined"
              placeholder="Brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  brand: e.target.value,
                })
              }
              size="small"
              sx={{
                width: "50%",
              }}
            />
          </Box>
           <Box>
           <Switch checked={formData.featured}
          // onChange={handleChange}
          onChange={(e) =>
            setFormData({
              ...formData,
              featured: e.target.checked,
            })
          }
          inputProps={{ 'aria-label': 'controlled' }}/>
           </Box>
          < MuiButton onClick={handleSubmit} variant="contained">
            Add
          </MuiButton>
          <MuiButton onClick={handleClose} sx={{marginLeft : "30px"}} variant="contained">
            Close
          </MuiButton>
        </Box>
      </Modal>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component={"form"}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            bgcolor: "#F4EDF2",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box display={"flex"} gap={3} mb={2}>
            <TextField
              variant="outlined"
              placeholder="Product Name"
              size="small"
              sx={{
                width: "50%",
              }}
            />
            <TextField
              variant="outlined"
              placeholder="Product Image"
              size="small"
              sx={{
                width: "50%",
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="Product Description"
              size="small"
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Box display={"flex"} gap={3} mb={2}>
            <TextField
              variant="outlined"
              type="number"
              placeholder="Product Price"
              size="small"
              sx={{
                width: "50%",
              }}
            />
            <TextField
              variant="outlined"
              type="number"
              placeholder="Count In Stock"
              size="small"
              sx={{
                width: "50%",
              }}
            />
          </Box>
          <Box display={"flex"} gap={3} mb={2}>
            <TextField
              variant="outlined"
              placeholder="Product Category"
              size="small"
              sx={{
                width: "50%",
              }}
            />
            <TextField
              variant="outlined"
              placeholder="Brand"
              size="small"
              sx={{
                width: "50%",
              }}
            />
          </Box>

          <MuiButton variant="contained">Submit</MuiButton>
        </Box>
      </Modal> */}
    </Box>
  );
};

export default ProductPanel;
