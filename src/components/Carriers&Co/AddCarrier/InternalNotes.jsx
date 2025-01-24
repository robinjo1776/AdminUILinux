function InternalNotes({ carrier, setCarrier }) {
  return (
    <fieldset className="form-section">
      <legend>Internal Notes</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <input
            type="text"
            value={carrier.int_notes}
            onChange={(e) => setCarrier({ ...carrier, int_notes: e.target.value })}
            id="legalName"
            placeholder="Internal Notes"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <input type="hidden" />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <input type="hidden" />
        </div>
      </div>
    </fieldset>
  );
}

export default InternalNotes;
