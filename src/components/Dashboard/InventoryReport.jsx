import React from 'react';
import './InventoryReport.css';

const InventoryReport = ({ products }) => {
  const totalProducts = products.length;

  // Calculate total quantities of products
  const totalQuantities = products.reduce((acc, curr) => {
    const quantity = parseFloat(curr.Quantities);
    return isNaN(quantity) ? acc : acc + quantity;
  }, 0);

  // Calculate total product value in PHP currency format
  const totalProductValue = products.reduce((acc, curr) => acc + curr.price * curr.Quantities, 0);
  const totalProductValuePHP = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(totalProductValue);

  // Get products needing attention and their remarks
  const productsNeedingAttention = products.filter(product => product.Quantities < 10);

  // Function to generate report data in CSV format
  const generateReportData = () => {
    const csvHeader = 'Product,Quantities\n'; // CSV header
    const csvData = products.map(product => `${product.Product},${product.Quantities}`).join('\n'); // CSV rows
    return csvHeader + csvData;
  };

  // Function to handle download
  const handleDownload = () => {
    const reportData = generateReportData();
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
    <div className="inventory-report">
      <h2>Overall Report</h2>
      <p>Total Products: {totalProducts}</p>
      <p>Total Quantities: {totalQuantities}</p>
      <p>Total Product Value: {totalProductValuePHP}</p>
      {/* Download button */}
      <button onClick={handleDownload}>Download Report</button>
      {productsNeedingAttention.length > 0 && (
        <div className="attention-alert">
          <h3>Products Needing Attention</h3>
          <ul>
            {productsNeedingAttention.map(product => (
              <li key={product.id}>
                {product.Product} - Quantities: {product.Quantities}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InventoryReport;
