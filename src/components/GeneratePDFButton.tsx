import React from 'react'
import axios from 'axios'

const downloadPDF = async () => {
    try {
      const response = await axios.post('/generate-pdf', {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        products: [
          { name: 'Product 1', quantity: 34, price: 120 },
          { name: 'Product 2', quantity: 34, price: 120 },
          { name: 'Product 3', quantity: 34, price: 120 },
        ],
      }, { responseType: 'blob' });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  


const GeneratePDFButton = () => {
  return (
    <div>
        <button onClick={downloadPDF}
            className="text-lg w-full py-2.5 mt-5 rounded-lg font-bold text-red-600 bg-white
          border-2 border-red-300 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in">
            Generate PDF
          </button>
    </div>
  )
}

export default GeneratePDFButton