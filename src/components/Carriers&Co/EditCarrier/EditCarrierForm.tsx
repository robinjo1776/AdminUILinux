import { useEditCarrier } from '../../../hooks/edit/useEditCarrier';
import EditGeneral from './EditGeneral';
import EditCarrierDetails from './EditCarrierDetails';
import EditLiabilityInsurance from './EditLiabilityInsurance';
import EditCargoInsurance from './EditCargoInsurance';
import EditPrimaryAddress from './EditPrimaryAddress';
import EditMailingAddress from './EditMailingAddress';
import { Carrier } from '../../../types/CarrierTypes';

interface EditCarrierFormProps {
  carrier: Carrier | null;
  onClose: () => void;
  onUpdate: (updatedCarrier: Carrier) => void;
}

function EditCarrierForm({ carrier, onClose, onUpdate }: EditCarrierFormProps) {
  const { formCarrier, setFormCarrier, updateCarrier } = useEditCarrier({ carrier, onUpdate, onClose });

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCarrier();
        }}
        className="form-main"
      >
        {formCarrier && (
          <>
            <EditGeneral formCarrier={formCarrier} setFormCarrier={setFormCarrier} />
            <EditCarrierDetails formCarrier={formCarrier} setFormCarrier={setFormCarrier} />
            <EditLiabilityInsurance formCarrier={formCarrier} setFormCarrier={setFormCarrier} />
            <EditCargoInsurance formCarrier={formCarrier} setFormCarrier={setFormCarrier} />
            <EditPrimaryAddress formCarrier={formCarrier} setFormCarrier={setFormCarrier} />
            <EditMailingAddress formCarrier={formCarrier} setFormCarrier={setFormCarrier} />
          </>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCarrierForm;
