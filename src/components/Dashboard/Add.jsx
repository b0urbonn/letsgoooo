import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ products, setProducts, setIsAdding }) => {
  const [Product, setProduct] = useState('');
  const [Category, setCategory] = useState('');
  const [Quantities, setQuantities] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!Product || !Category || !Quantities || !price || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = products.length + 1;
    const newProduct = {
      id,
      Product,
      Category,
      Quantities,
      price,
      date,
    };

    const updatedProducts = [...products, newProduct];

    localStorage.setItem('products_data', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${Product}'s data has been added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container">
      <div className="small-container">
        <form onSubmit={handleAdd}>
          <h1 className="add-heading">Add Product</h1>
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
            type= "number"
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
          <div className="button-group">
            <input type="submit" value="Add" className="button" />
            <input
              type="button"
              value="Cancel"
              className="muted-button"
              onClick={() => setIsAdding(false)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
