import { Link, Outlet } from 'react-router-dom';
import { getInvoices } from '../data';

export default function Invoices() {
    let invoices = getInvoices(); //an array of objects that are invoices
    return (
      <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          {invoices.map((invoice) => (
            <Link
              style={{ display: "block", margin: "1rem 0" }}
              to={`/invoices/${invoice.number}`} //to the route with a params of the data set "number" - this is like the id
              key={invoice.number} //this key is needed to map over elements and it comes into the URL bc it is the unique id
            >
              {invoice.name} 
            </Link>
          ))}
        </nav>
        <Outlet />
      </div>
    );
}