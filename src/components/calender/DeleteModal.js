import React from 'react';

const AddModal = (props) => {
  return (
    <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">Delete Record?</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this record?
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-danger" onClick={props.deleteRecord}>Yes</button>
            <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>            
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddModal;
