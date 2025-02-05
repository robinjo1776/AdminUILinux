function ViewFuProductForm({ product }) {
  return (
    <fieldset>
      <div className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <div>{product.name || 'N/A'}</div>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <div>{product.quantity || 'N/A'}</div>
        </div>
      </div>
    </fieldset>
  );
}

export default ViewFuProductForm;
