interface Discount {
  type?: string;
  charge?: string;
  percent?: string;
}

interface EditOrderDiscountsProps {
  setFormOrder: React.Dispatch<React.SetStateAction<any>>;
  order: any;
  discount?: Discount;
  index: number;
  onRemove: (index: number) => void;
}

const EditOrderDiscounts: React.FC<EditOrderDiscountsProps> = ({ setFormOrder, order, discount = {}, index, onRemove }) => {
  const rateOptions = ['Flat', 'Percentage'];

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormOrder((prevOrder: any) => ({
      ...prevOrder,
      discounts: prevOrder.discounts.map((loc: Discount, idx: number) =>
        idx === index ? { ...loc, [name]: value } : loc
      ),
    }));
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Type</label>
        <input type="text" name="type" value={discount.type || ''} onChange={handleOrderChange} />
      </div>
      <div className="form-group">
        <label>Charge</label>
        <input type="text" name="charge" value={discount.charge || ''} onChange={handleOrderChange} />
      </div>
      <div className="form-group">
        <label htmlFor="percent">Percent/Flat Rate</label>
        <select name="percent" value={discount.percent || ''} onChange={handleOrderChange}>
          <option value="">Select..</option>
          {rateOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="button" onClick={() => onRemove(index)} className="remove">
        Remove
      </button>
    </div>
  );
};

export default EditOrderDiscounts;
