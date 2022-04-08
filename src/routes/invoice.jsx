import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getInvoice, deleteInvoice } from '../data';

export default function Invoice() {
    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams(); 
    let invoice = getInvoice(parseInt(params.invoiceId, 10)); //Note that we used parseInt around the param. It's very common for your data lookups to use a number type, but URL params are always string
    return (
        <main style={{ padding: "1rem" }}>
          <h2>Total Due: {invoice.amount}</h2>
          <p>
            {invoice.name}: {invoice.number}
          </p>
          <p>Due Date: {invoice.due}</p>
          <p>
          <button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate("/invoices" + location.search);//this will, again, persist the query string
          }}
        >
          Delete
        </button>
          </p>
        </main>
      );
  }