import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { productData } from '../../data';
import InventoryReport from './InventoryReport';
import './index.css';

const Index = ({ setIsAuthenticated }) => {
  const [products, setProducts] = useState(productData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showReport, setShowReport] = useState(false); // State for showing/hiding the report

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('products_data'));
    if (data !== null && Object.keys(data).length !== 0) setProducts(data);
  }, []);

  const handleEdit = id => {
    const [product] = products.filter(product => product.id === id);
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [product] = products.filter(product => product.id === id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${product.Product}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        const updatedProducts = products.filter(product => product.id !== id);
        localStorage.setItem('products_data', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
      }
    });
  };

  const generateReportData = () => {
    // Generate report data here (if needed)
    // This function can be used to generate data for the report
  };

  const handleDownloadReport = () => {
    // Generate report data and handle download
    const reportData = generateReportData(); // Modify this to generate the actual report data
    const blob = new Blob([reportData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'inventory_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      {/* Button to toggle showing/hiding the report */}
      <button onClick={() => setShowReport(!showReport)}>
        {showReport ? 'Hide Report' : 'Generate Report'}
      </button>

      {/* Render InventoryReport if showReport is true */}
      {showReport && <InventoryReport products={products} onDownload={handleDownloadReport} />}

      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} setIsAuthenticated={setIsAuthenticated} />
          <Table products={products} handleEdit={handleEdit} handleDelete={handleDelete} />
        </>
      )}
      {isAdding && (
        <Add products={products} setProducts={setProducts} setIsAdding={setIsAdding} />
      )}
      {isEditing && (
        <Edit
          products={products}
          selectedProduct={selectedProduct}
          setProducts={setProducts}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Index;
