import { useSelector, useDispatch } from 'react-redux';
import { getAllUserProductsAPI } from "../services/operations/productAPI";
import { AppDispatch } from '../services/operations/productAPI';
import { RootState } from '../reducer';
// import axios from 'axios';
import { apiConnector } from '../services/apiconnector';

const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;

const GeneratePDF = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.profile.user);
  const products = useSelector((state: RootState) => state.product.products);

  console.log("Printing products", products);

  const downloadPDF = async (user: any, products: any, token: string | null) => {
    console.log("Printing user: ", user);
    try {
      // const response = await axios.post(BASE_URL + `/generate-pdf`, {
      //   user,
      //   products,
      //   token,
      // }, { responseType: 'blob' });

      const response = await apiConnector(
        "POST",
        `${BASE_URL}/generate-pdf`,
        { user, products, token },
        undefined,
        null,
        'blob' // Specify responseType as 'blob'
    );

      const pdfData = response.data;
      console.log(pdfData);
  
      const url = window.URL.createObjectURL(new Blob([response.data as any]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  
  const handleGeneratePDF = async() => {
    await dispatch(getAllUserProductsAPI(token));
    console.log("Printing products", products);
    downloadPDF(user, products, token);
  };

  return (
    <div className='bg-black flex flex-col items-center justify-center h-screen'>
      <h2 className="text-white text-4xl mx-auto font-bold text-center mb-8">Do you want to generate a PDF?</h2>
      <button onClick={handleGeneratePDF}
              className="text-lg w-56 py-2.5 rounded-lg font-bold text-red-600 bg-white
          border-2 border-red-300 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in"
            >
              Generate PDF
      </button>
    </div>
  );
}

export default GeneratePDF;

