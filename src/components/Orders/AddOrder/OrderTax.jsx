import { useEffect } from 'react';

function OrderTax({ order, setOrder }) {
  // Helper function to calculate the total price
  useEffect(() => {
    const gst = parseFloat(order.gst) || 0;
    const pst = parseFloat(order.pst) || 0;
    const hst = parseFloat(order.hst) || 0;
    const qst = parseFloat(order.qst) || 0;
    const basePrice = parseFloat(order.base_price) || 0;

    const total = basePrice + gst + pst + hst + qst;
    setOrder({ ...order, final_price: total.toFixed(2) }); // Update final_price
  }, [order.gst, order.pst, order.hst, order.qst, order.base_price]); // Dependencies for recalculating total

  return (
    <fieldset className="form-section">
      <legend>Tax</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="basePrice">Base Price</label>
          <input
            type="number"
            step="0.01"
            value={order.base_price || ''}
            onChange={(e) => setOrder({ ...order, base_price: e.target.value })}
            id="basePrice"
            placeholder="Base Price"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="gst">GST</label>
          <input
            type="number"
            step="0.01"
            value={order.gst || ''}
            onChange={(e) => setOrder({ ...order, gst: e.target.value })}
            id="gst"
            placeholder="GST"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="pst">PST</label>
          <input
            type="number"
            step="0.01"
            value={order.pst || ''}
            onChange={(e) => setOrder({ ...order, pst: e.target.value })}
            id="pst"
            placeholder="PST"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="hst">HST</label>
          <input
            type="number"
            step="0.01"
            value={order.hst || ''}
            onChange={(e) => setOrder({ ...order, hst: e.target.value })}
            id="hst"
            placeholder="HST"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="qst">QST</label>
          <input
            type="number"
            step="0.01"
            value={order.qst || ''}
            onChange={(e) => setOrder({ ...order, qst: e.target.value })}
            id="qst"
            placeholder="QST"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="finalPrice">Final Price</label>
          <input type="text" value={order.final_price || ''} readOnly id="finalPrice" />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="notes">Notes</label>
          <textarea
            value={order.notes || ''}
            onChange={(e) => setOrder({ ...order, notes: e.target.value })}
            id="notes"
            placeholder="Notes"
          ></textarea>
        </div>
      </div>
    </fieldset>
  );
}

export default OrderTax;
