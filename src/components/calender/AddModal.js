import React from 'react';

const AddModal = (props) => {
  return(
    <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addModalLabel">Add Stock Price</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={props.formSubmit}>
              <div className="form-group">
                <p className="text-center">Date: {props.stockDate}</p>
              </div>
              <div className="form-group">
                <label htmlFor="add__price">Stock Price:</label>
                <input type="number" step="any" className="form-control" id="add__price" placeholder="Ex: 500" name="stockRate" required/>
              </div>
              <button type="submit" className="btn btn-primary">Add Price</button>
            </form>
          </div>
          {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default AddModal;
