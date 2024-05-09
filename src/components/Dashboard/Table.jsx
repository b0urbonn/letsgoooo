import React from 'react';
import './Table.css';

const Table = ({ products, handleEdit, handleDelete }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: null,
  });

  const getRemarks = (quantities) => {
    if (quantities >= 10) {
      return 'In Stock';
    } else if (quantities > 0 && quantities < 10) {
      return 'Low Stock - Reorder Soon';
    } else {
      return 'Out of Stock';
    }
  };

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantities</th>
            <th>Remarks</th>
            <th>Price</th>
            <th>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, i) => (
              <tr key={product.id}>
                <td>{i + 1}</td>
                <td>{product.Product}</td>
                <td>{product.Category}</td>
                <td style={{ color: product.Quantities < 10 ? 'red' : 'inherit' }}>
                  {product.Quantities} {product.Quantities < 10 ? '⚠️' : ''}
                </td>
                <td>{getRemarks(product.Quantities)}</td>
                <td>{formatter.format(product.price)}</td>
                <td>{product.date}</td>
                <td className="text-right">
                  <button onClick={() => handleEdit(product.id)} className="button muted-button">
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button onClick={() => handleDelete(product.id)} className="button muted-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No Products</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;


