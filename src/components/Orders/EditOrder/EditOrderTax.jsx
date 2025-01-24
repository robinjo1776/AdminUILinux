import { useEffect } from 'react';

function EditOrderTax({ formOrder, setFormOrder }) {
  // Helper function to calculate the total price
  useEffect(() => {
    const gst = parseFloat(formOrder.gst) || 0;
    const pst = parseFloat(formOrder.pst) || 0;
    const hst = parseFloat(formOrder.hst) || 0;
    const qst = parseFloat(formOrder.qst) || 0;
    const basePrice = parseFloat(formOrder.base_price) || 0;

    const total = basePrice + gst + pst + hst + qst;
    setFormOrder({ ...formOrder, final_price: total.toFixed(2) }); // Update final_price
  }, [formOrder.gst, formOrder.pst, formOrder.hst, formOrder.qst, formOrder.base_price]); // Dependencies for recalculating total

  return (
    <fieldset className="form-section">
      <legend>Tax</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="basePrice">Base Price</label>
          <input
            type="number"
            step="0.01"
            value={formOrder.base_price || ''}
            onChange={(e) => setFormOrder({ ...formOrder, base_price: e.target.value })}
            id="basePrice"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="gst">GST</label>
          <input
            type="number"
            step="0.01"
            value={formOrder.gst || ''}
            onChange={(e) => setFormOrder({ ...formOrder, gst: e.target.value })}
            id="gst"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="pst">PST</label>
          <input
            type="number"
            step="0.01"
            value={formOrder.pst || ''}
            onChange={(e) => setFormOrder({ ...formOrder, pst: e.target.value })}
            id="pst"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="hst">HST</label>
          <input
            type="number"
            step="0.01"
            value={formOrder.hst || ''}
            onChange={(e) => setFormOrder({ ...formOrder, hst: e.target.value })}
            id="hst"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="qst">QST</label>
          <input
            type="number"
            step="0.01"
            value={formOrder.qst || ''}
            onChange={(e) => setFormOrder({ ...formOrder, qst: e.target.value })}
            id="qst"
          />
        </div>
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
