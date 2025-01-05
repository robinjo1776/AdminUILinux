function EditGeneral({ formCarrier, setformCarrier }) {
  const currencyOptions = ['CAD', 'USD'];
  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dba">DBA*</label>
          <input type="text" value={formCarrier.dba} onChange={(e) => setformCarrier({ ...formCarrier, dba: e.target.value })} id="dba" required />
        </div>
        <div className="form-group">
          <label htmlFor="legalName">Legal Name</label>
          <input
            type="text"
            value={formCarrier.legal_name}
            onChange={(e) => setformCarrier({ ...formCarrier, legal_name: e.target.value })}
            id="legalName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Remit Name</label>
          <input
            type="text"
            value={formCarrier.remit_name}
            onChange={(e) => setformCarrier({ ...formCarrier, remit_name: e.target.value })}
            id="remitName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Account Number</label>
          <input type="text" value={formCarrier.acc_no} onChange={(e) => setformCarrier({ ...formCarrier, acc_no: e.target.value })} id="accNo" />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <input type="text" value={formCarrier.branch} onChange={(e) => setformCarrier({ ...formCarrier, branch: e.target.value })} id="branch" />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input type="text" value={formCarrier.website} onChange={(e) => setformCarrier({ ...formCarrier, website: e.target.value })} id="website" />
        </div>
        <div className="form-group">
          <label htmlFor="fedIdNo">Federal ID Number</label>
          <input
            type="text"
            value={formCarrier.fed_id_no}
            onChange={(e) => setformCarrier({ ...formCarrier, fed_id_no: e.target.value })}
            id="fedIdNo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="creditStatus">Preferred Currency</label>
          <select
            name="creditStatus"
            value={formCarrier.pref_curr}
            onChange={(e) =>
              setformCarrier({
                ...formCarrier,
                pref_curr: e.target.value,
              })
            }
          >
            <option value="">Select..</option>
            {currencyOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="payTerms">Payment Terms</label>
          <input
            type="text"
            value={formCarrier.pay_terms}
            onChange={(e) => setformCarrier({ ...formCarrier, pay_terms: e.target.value })}
            id="payTerms"
          />
        </div>
        <div className="form-group">
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            1099
            <input
              type="checkbox"
              id="creditApplication"
              checked={formCarrier.form_1099}
              onChange={(e) =>
                setformCarrier({
                  ...formCarrier,
                  form_1099: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group">
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Advertise
            <input
              type="checkbox"
              id="creditApplication"
              checked={formCarrier.advertise}
              onChange={(e) =>
                setformCarrier({
                  ...formCarrier,
                  advertise: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="advertiseEmail">Advertise Email</label>
          <input
            type="email"
            value={formCarrier.advertise_email}
            onChange={(e) =>
              setformCarrier({
                ...formCarrier,
                advertise_email: e.target.value,
              })
            }
            id="advertiseEmail"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditGeneral;
