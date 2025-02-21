interface Customer {
  cust_type: string;
  cust_name: string;
  cust_ref_no?: string;
  cust_website?: string;
  cust_email?: string;
  cust_contact_no?: string;
  cust_contact_no_ext?: string;
  cust_tax_id?: string;
}

interface CustomerInfoProps {
  formCustomer: Customer;
  setformCustomer: (customer: Customer) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ formCustomer, setformCustomer }) => {
  const customerTypeOptions = ['Manufacturer', 'Trader', 'Distributor', 'Retailer', 'Freight Forwarder'];

  return (
    <fieldset>
      <legend>Customer Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customerType">Customer Type</label>
          <select id="customerType" value={formCustomer.cust_type} onChange={(e) => setformCustomer({ ...formCustomer, cust_type: e.target.value })}>
            {customerTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customerName">Customer Name*</label>
          <input
            type="text"
            id="customerName"
            value={formCustomer.cust_name}
            onChange={(e) => setformCustomer({ ...formCustomer, cust_name: e.target.value })}
            required
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="customerRefNo">Customer Ref No.</label>
          <input
            type="text"
            id="customerRefNo"
            value={formCustomer.cust_ref_no || ''}
            onChange={(e) => setformCustomer({ ...formCustomer, cust_ref_no: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            value={formCustomer.cust_website || ''}
            onChange={(e) => setformCustomer({ ...formCustomer, cust_website: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formCustomer.cust_email || ''}
            onChange={(e) => setformCustomer({ ...formCustomer, cust_email: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="contactNo">Contact No</label>
          <input
            type="text"
            id="contactNo"
            value={formCustomer.cust_contact_no || ''}
            onChange={(e) => setformCustomer({ ...formCustomer, cust_contact_no: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="contactNoExt">Contact No Ext</label>
          <input
            type="text"
            id="contactNoExt"
            value={formCustomer.cust_contact_no_ext || ''}
            onChange={(e) => setformCustomer({ ...formCustomer, cust_contact_no_ext: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="taxId">Tax ID</label>
          <input
            type="text"
            id="taxId"
            value={formCustomer.cust_tax_id || ''}
            onChange={(e) => setformCustomer({ ...formCustomer, cust_tax_id: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <input type="hidden" />
        </div>
      </div>
    </fieldset>
  );
};

export default CustomerInfo;
