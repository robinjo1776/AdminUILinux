import { useEffect } from 'react';
import { Order } from '../../../types/OrderTypes';

interface EditOrderTaxProps {
  formOrder: Order;
  setFormOrder: (updateFn: (prevOrder: Order) => Order) => void;
}

function EditOrderTax({ formOrder, setFormOrder }: EditOrderTaxProps) {
  useEffect(() => {
    setFormOrder((prevOrder) => {
      const gst = Number(prevOrder.gst) || 0;
      const pst = Number(prevOrder.pst) || 0;
      const hst = Number(prevOrder.hst) || 0;
      const qst = Number(prevOrder.qst) || 0;
      const basePrice = Number(prevOrder.base_price) || 0;

      const total = basePrice + gst + pst + hst + qst;
      return { ...prevOrder, final_price: Number(total.toFixed(2)) };
    });
  }, [formOrder.gst, formOrder.pst, formOrder.hst, formOrder.qst, formOrder.base_price, setFormOrder]);

  return (
    <fieldset className="form-section">
      <legend>Tax</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {['base_price', 'gst', 'pst', 'hst', 'qst'].map((field) => (
          <div key={field} className="form-group" style={{ flex: 1 }}>
            <label htmlFor={field}>{field.toUpperCase()}</label>
            <input
              type="number"
              step="0.01"
              value={
                typeof formOrder[field as keyof Order] === 'number' || typeof formOrder[field as keyof Order] === 'string'
                  ? (formOrder[field as keyof Order] as string | number)
                  : ''
              }
              onChange={(e) =>
                setFormOrder((prevOrder) => ({
                  ...prevOrder,
                  [field]: Number(e.target.value),
                }))
              }
              id={field}
            />
          </div>
        ))}
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="finalPrice">Final Price</label>
          <input type="text" value={formOrder.final_price || ''} readOnly id="finalPrice" />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="notes">Notes</label>
          <textarea
            value={formOrder.notes || ''}
            onChange={(e) =>
              setFormOrder((prevOrder) => ({
                ...prevOrder,
                notes: e.target.value,
              }))
            }
            id="notes"
          ></textarea>
        </div>
      </div>
    </fieldset>
  );
}

export default EditOrderTax;
