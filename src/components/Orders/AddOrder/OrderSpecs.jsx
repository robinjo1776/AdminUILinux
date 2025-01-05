function OrderSpecs({ order, setOrder }) {
  return (
    <fieldset className="form-section">
      <legend>Load Specifications</legend>
      <div className="form-row">
        <div className="form-group">
          <label
            htmlFor="hot"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Hot
            <input type="checkbox" checked={order.hot} onChange={(e) => setOrder({ ...order, hot: e.target.checked })} id="hot" />
          </label>
        </div>
        <div className="form-group">
          <label
            htmlFor="team"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Team
            <input type="checkbox" checked={order.team} onChange={(e) => setOrder({ ...order, team: e.target.checked })} id="team" />
          </label>
        </div>
        <div className="form-group">
          <label
            htmlFor="air_ride"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Air Ride
            <input type="checkbox" checked={order.air_ride} onChange={(e) => setOrder({ ...order, air_ride: e.target.checked })} id="air_ride" />
          </label>
        </div>
        <div className="form-group">
          <label
            htmlFor="tarp"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            TARP
            <input type="checkbox" checked={order.tarp} onChange={(e) => setOrder({ ...order, tarp: e.target.checked })} id="tarp" />
          </label>
        </div>
        <div className="form-group">
          <label
            htmlFor="hazmat"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Hazmat
            <input type="checkbox" checked={order.hazmat} onChange={(e) => setOrder({ ...order, hazmat: e.target.checked })} id="hazmat" />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default OrderSpecs;
