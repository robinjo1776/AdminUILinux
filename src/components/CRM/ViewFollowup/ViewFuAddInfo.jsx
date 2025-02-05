function ViewFuAddInfo({ followupEdit }) {
  return (
    <fieldset className="form-section">
      <legend>Additional Information</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Equipment</label>
          <div>{followupEdit.equipment}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Remarks</label>
          <div>{followupEdit.remarks}</div>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Notes</label>
          <div>{followupEdit.notes}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewFuAddInfo;
