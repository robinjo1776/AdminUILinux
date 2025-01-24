function General({ carrier, setCarrier }) {
  const currencyOptions = ['CAD', 'USD'];
  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="dba">DBA*</label>
          <input
            type="text"
            value={carrier.dba}
            onChange={(e) => setCarrier({ ...carrier, dba: e.target.value })}
            id="dba"
            required
            placeholder="DBA"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="legalName">Legal Name</label>
          <input
            type="text"
            value={carrier.legal_name}
            onChange={(e) => setCarrier({ ...carrier, legal_name: e.target.value })}
            id="legalName"
            placeholder="Legal Name"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="remitName">Remit Name</label>
          <input
            type="text"
            value={carrier.remit_name}
            onChange={(e) => setCarrier({ ...carrier, remit_name: e.target.value })}
            id="remitName"
            placeholder="Remit Name"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="accNo">Account Number</label>
          <input
            type="text"
            value={carrier.acc_no}
            onChange={(e) => setCarrier({ ...carrier, acc_no: e.target.value })}
            id="accNo"
            placeholder="Account Number"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            value={carrier.branch}
            onChange={(e) => setCarrier({ ...carrier, branch: e.target.value })}
            id="branch"
            placeholder="Branch"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            value={carrier.website}
            onChange={(e) => setCarrier({ ...carrier, website: e.target.value })}
            id="website"
            placeholder="Website"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="fedIdNo">Federal ID Number</label>
          <input
            type="text"
            value={carrier.fed_id_no}
            onChange={(e) => setCarrier({ ...carrier, fed_id_no: e.target.value })}
            id="fedIdNo"
            placeholder="Federal ID Number"
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="creditStatus">Preferred Currency</label>
          <select
            name="creditStatus"
            value={carrier.pref_curr}
            onChange={(e) =>
              setCarrier({
                ...carrier,
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
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="payTerms">Payment Terms</label>
          <input
            type="text"
            value={carrier.pay_terms}
            onChange={(e) => setCarrier({ ...carrier, pay_terms: e.target.value })}
            id="payTerms"
            placeholder="Payment Terms"
          />
        </div>
      </div>
      <div className="form-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
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
              checked={carrier.form_1099}
              onChange={(e) =>
                setCarrier({
                  ...carrier,
                  form_1099: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
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
              checked={carrier.advertise}
              onChange={(e) =>
                setCarrier({
                  ...carrier,
                  advertise: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="advertiseEmail">Advertise Email</label>
          <input
            type="email"
            value={carrier.advertise_email}
            onChange={(e) => setCarrier({ ...carrier, advertise_email: e.target.value })}
            id="advertiseEmail"
            placeholder="Advertise Email"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default General;
