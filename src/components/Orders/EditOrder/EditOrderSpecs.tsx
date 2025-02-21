type EditOrderSpecsProps = {
  formOrder: {
    hot: boolean;
    team: boolean;
    air_ride: boolean;
    tarp: boolean;
    hazmat: boolean;
  };
  setFormOrder: (updateFn: (prevOrder: any) => any) => void;
};

const EditOrderSpecs: React.FC<EditOrderSpecsProps> = ({ formOrder, setFormOrder }) => {
  return (
    <fieldset className="form-section">
      <legend>Load Specifications</legend>
      <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
        {[
          { label: 'Hot', name: 'hot' },
          { label: 'Team', name: 'team' },
          { label: 'Air Ride', name: 'air_ride' },
          { label: 'TARP', name: 'tarp' },
          { label: 'Hazmat', name: 'hazmat' }
        ].map(({ label, name }) => (
          <div key={name} className="form-group" style={{ flex: 1 }}>
            <label htmlFor={name} style={{ display: 'inline-flex', alignItems: 'center', width: '100%' }}>
              {label}
              <input
                type="checkbox"
                id={name}
                checked={formOrder[name as keyof typeof formOrder]}
                onChange={(e) =>
                  setFormOrder((prevOrder) => ({
                    ...prevOrder,
                    [name]: e.target.checked,
                  }))
                }
              />
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default EditOrderSpecs;
