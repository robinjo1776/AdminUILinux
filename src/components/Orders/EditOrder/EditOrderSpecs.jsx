function EditOrderSpecs({ formOrder, setFormOrder }) {
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
            <input type="checkbox" checked={formOrder.hot} onChange={(e) => setFormOrder({ ...formOrder, hot: e.target.checked })} id="hot" />
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
            <input type="checkbox" checked={formOrder.team} onChange={(e) => setFormOrder({ ...formOrder, team: e.target.checked })} id="team" />
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
            <input type="checkbox" checked={formOrder.air_ride} onChange={(e) => setFormOrder({ ...formOrder, air_ride: e.target.checked })} id="air_ride" />
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
            <input type="checkbox" checked={formOrder.tarp} onChange={(e) => setFormOrder({ ...formOrder, tarp: e.target.checked })} id="tarp" />
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
            <input type="checkbox" checked={formOrder.hazmat} onChange={(e) => setFormOrder({ ...formOrder, hazmat: e.target.checked })} id="hazmat" />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default EditOrderSpecs;
