import useCustomerHandler from './useCustomerHandler';
import ViewCustomerInfo from './ViewCustomerInfo';
import ViewAccountsPayable from './ViewAccountsPayable';
import ViewPrimaryAddress from './ViewPrimaryAddress';
import ViewMailingAddressForm from './ViewMailingAddress';
import ViewCustomBroker from './ViewCustomBroker';
import ViewCustomerCredit from './ViewCustomerCredit';
import ViewCustomerContact from './ViewCustomerContact';
import ViewCustomerEquipment from './ViewCustomerEquipment';

function ViewCustomerForm({ customer, onClose,  }) {
  const { formCustomer, setformCustomer, } = useCustomerHandler({ customer, onClose,  });

  return (
    <div className="form-container">
      <form

        className="form-main"
      >
        <ViewCustomerInfo formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <ViewPrimaryAddress formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <ViewMailingAddressForm formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <ViewAccountsPayable formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <ViewCustomBroker formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <ViewCustomerCredit formCustomer={formCustomer} setformCustomer={setformCustomer} />
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {formCustomer.cust_contact.map((contact, index) => (
              <ViewCustomerContact key={index} contact={contact} index={index} />
            ))}
   
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Equipments</legend>
          <div className="form-row">
            {formCustomer.cust_equipment.map((equipment, index) => (
              <ViewCustomerEquipment
                key={index}
                formCustomer={formCustomer}
                setformCustomer={setformCustomer}
                equipment={equipment}
                index={index}

              />
            ))}
 
          </div>
        </fieldset>
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ViewCustomerForm;
