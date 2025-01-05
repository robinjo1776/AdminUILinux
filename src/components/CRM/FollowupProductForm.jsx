function FollowupProductForm({ formFollowup, setformFollowup }) {
  const handleAddProduct = () => {
    setformFollowup((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          name: '',
          quantity: '',
        },
      ],
    }));
  };

  const handleRemoveProduct = (index) => {
    setformFollowup((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = formFollowup.products.map((product, i) => (i === index ? { ...product, [name]: value } : product));
    setformFollowup((prev) => ({ ...prev, products: updatedProducts }));
  };

  return (
    <fieldset>
      {formFollowup.products.map((product, index) => (
        <div key={index} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name" // Ensure the name attribute is present
              value={product.name}
              onChange={(e) => handleProductChange(index, e)}
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity" // Ensure the name attribute is present
              value={product.quantity}
              onChange={(e) => handleProductChange(index, e)}
            />
          </div>

          <button type="button" onClick={() => handleRemoveProduct(index)} className="remove">
            Remove
          </button>
        </div>
      ))}
    </fieldset>
  );
}

export default FollowupProductForm;
