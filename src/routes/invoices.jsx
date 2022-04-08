import { useLocation, NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { getInvoices } from '../data';

function QueryNavLink({ to, ...props }) {
    let location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
  }

export default function Invoices() {
    let invoices = getInvoices(); //an array of objects that are invoices
    let [searchParams, setSearchParams] = useSearchParams(); //works like the useState()
    return (
      <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
        <input //this will grab the filter method below and instate this in the params of the url
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
          {invoices
            .filter((invoice) => { //this will search/filter the list of invoices that is mapped over below
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryNavLink
              style={({ isActive }) => {
                  return { //this is returning this style in a string-- this can also be done with className
                   display: "block", 
                   margin: "1rem 0",
                   color: isActive ? "red" : "",};
                }}
              to={`/invoices/${invoice.number}`} //to the route with a params of the data set "number" - this is like the id
              key={invoice.number} //this key is needed to map over elements and it comes into the URL bc it is the unique id
            >
              {invoice.name} 
            </QueryNavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    );
}