import { DeleteOutlined } from '@ant-design/icons';

function FuProductForm({ product, index, handleProductChange, handleRemoveProduct }) {
  return (
    <fieldset>
      <div className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={product.name} onChange={(e) => handleProductChange(index, e)} />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" value={product.quantity} onChange={(e) => handleProductChange(index, e)} />
        </div>

        <button type="button" onClick={() => handleRemoveProduct(index)} className="remove">
          <DeleteOutlined />
        </button>
      </div>
    </fieldset>
  );
}

export default FuProductForm;
