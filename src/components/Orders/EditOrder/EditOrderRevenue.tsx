type EditOrderRevenueProps = {
  formOrder: {
    currency: string;
    base_price: string;
  };
  setFormOrder: (updateFn: (prevOrder: any) => any) => void;
};

const EditOrderRevenue: React.FC<EditOrderRevenueProps> = ({ formOrder, setFormOrder }) => {
  const currencyOptions = ['CAD', 'USD'];

  return (
    <fieldset className="form-section">
      <legend>Revenue</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="currency">Currency</label>
          <select
            name="currency"
            id="currency"
            value={formOrder.currency}
            onChange={(e) =>
              setFormOrder((prevOrder) => ({
                ...prevOrder,
                currency: e.target.value,
              }))
            }
          >
            <option value="">Select...</option>
            {currencyOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="base_price">Base Price</label>
          <input
            type="text"
            id="base_price"
            name="base_price"
            value={formOrder.base_price}
            onChange={(e) =>
              setFormOrder((prevOrder) => ({
                ...prevOrder,
                base_price: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </fieldset>
  );
};

export default EditOrderRevenue;
