import { useEffect } from 'react';

interface OrderForm {
  base_price?: string;
  gst?: string;
  pst?: string;
  hst?: string;
  qst?: string;
  final_price?: string;
  notes?: string;
}

interface EditOrderTaxProps {
  formOrder: OrderForm;
  setFormOrder: (order: OrderForm) => void;
}

function EditOrderTax({ formOrder, setFormOrder }: EditOrderTaxProps) {
  useEffect(() => {
    const gst = parseFloat(formOrder.gst || '0') || 0;
    const pst = parseFloat(formOrder.pst || '0') || 0;
    const hst = parseFloat(formOrder.hst || '0') || 0;
    const qst = parseFloat(formOrder.qst || '0') || 0;
    const basePrice = parseFloat(formOrder.base_price || '0') || 0;

    const total = basePrice + gst + pst + hst + qst;
    setFormOrder({ ...formOrder, final_price: total.toFixed(2) });
  }, [formOrder.gst, formOrder.pst, formOrder.hst, formOrder.qst, formOrder.base_price]);

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
              value={formOrder[field as keyof OrderForm] || ''}
              onChange={(e) => setFormOrder({ ...formOrder, [field]: e.target.value })}
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
          <textarea value={formOrder.notes || ''} onChange={(e) => setFormOrder({ ...formOrder, notes: e.target.value })} id="notes"></textarea>
        </div>
      </div>
    </fieldset>
  );
}

export default EditOrderTax;
