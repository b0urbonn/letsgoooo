import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Edit.css';

const Edit = ({ products, selectedProduct, setProducts, setIsEditing }) => {
  const [Product, setProduct] = useState(selectedProduct.Product);
  const [Category, setCategory] = useState(selectedProduct.Category);
  const [Quantities, setQuantities] = useState(selectedProduct.Quantities);
  const [price, setPrice] = useState(selectedProduct.price);
  const [date, setDate] = useState(selectedProduct.date);
  const [reorderStatus, setReorderStatus] = useState(false);

  useEffect(() => {
    if (Quantities < 10) {
      setReorderStatus(true);
    } else {
      setReorderStatus(false);
    }
  }, [Quantities]);

  const handleUpdate = e => {
    e.preventDefault();

    if (!Product || !Category || !Quantities || !price || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const product = {
      id: selectedProduct.id,
      Product,
      Category,
      Quantities,
      price,
      date,
    };

    const updatedProducts = products.map(p => (p.id === selectedProduct.id ? product : p));

    localStorage.setItem('products_data', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${product.Product}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Product</h1>
        <label htmlFor="Product">Product</label>
        <input
          id="Product"
          type="text"
          name="Product"
          value={Product}
          onChange={e => setProduct(e.target.value)}
        />
        <label htmlFor="Category">Category</label>
        <input
          id="Category"
          type="text"
          name="Category"
          value={Category}
          onChange={e => setCategory(e.target.value)}
        />
        <label htmlFor="Quantities">Quantities</label>
        <input
          id="Quantities"
          type="number"
          name="Quantities"
          value={Quantities}
          onChange={e => setQuantities(e.target.value)}
        />
        <label htmlFor="price">Price ($)</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        {reorderStatus && (
          <p style={{ color: 'red', marginTop: '10px' }}>Quantities below reorder point. Please reorder.</p>
        )}
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
