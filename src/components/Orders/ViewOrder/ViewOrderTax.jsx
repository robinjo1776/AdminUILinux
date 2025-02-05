import { useEffect } from 'react';

function ViewOrderTax({ formOrder, setFormOrder }) {
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
          <label>Base Price</label>
          <div>{formOrder.base_price || ''}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>GST</label>
          <div>{formOrder.gst || ''}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>PST</label>
          <div>{formOrder.pst || ''}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>HST</label>
          <div>{formOrder.hst || ''}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>QST</label>
          <div>{formOrder.qst || ''}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Final Price</label>
          <div>{formOrder.final_price || ''}</div>
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Notes</label>
          <div>{formOrder.notes || ''}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewOrderTax;
