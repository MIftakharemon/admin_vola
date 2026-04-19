import React, { useEffect, useState } from 'react';

//redux
import { connect, useDispatch, useSelector } from 'react-redux';

//action


//routing
import { Link } from 'react-router-dom';
//MUI
import { Tooltip } from '@mui/material';
// type
import { OPEN_SG_DIALOG } from '../../store/suggestMessage/types';

// dialog

//sweet alert
import { alert, permissionError, warning } from '../../util/Alert';
import { usePermission } from '../../context/PermissionProvider';
import { deleteSuggestMsg, getSuggestedMsgs } from '../../store/suggestMessage/action';
import SuggestMsgDialog from '../dialog/SuggestMsgDialog';

const SuggestMessageTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  
  const { can } = usePermission();
  const canCreate = can('admin/suggestMessage', 'Create');
  const canEdit = can('admin/suggestMessage', 'Edit');
  const canDelete = can('admin/suggestMessage', 'Delete');

  useEffect(() => {
    dispatch(getSuggestedMsgs());
  }, [dispatch]);

  const { suggestMessages } = useSelector((state) => state.suggestMessage);

  useEffect(() => {
    setData(suggestMessages);
  }, [suggestMessages]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase()
      ? e.target.value.trim().toUpperCase()
      : e.target.value.trim();
    if (value) {
      const data = suggestMessages.filter((data) => {
        return (
          data?.message?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(suggestMessages);
    }
  };

  const handleDelete = (msgId) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          props.deleteSuggestMsg(msgId);
          alert('Deleted!', `Suggested Message has been deleted!`, 'success');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_SG_DIALOG, payload: data });
  };

  const handleOpen = () => {
    dispatch({ type: OPEN_SG_DIALOG });
  };

  return (
    <>
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3 className="mb-3 text-white">Suggested Message</h3>
          </div>
          <div className="col-12 col-md-6 order-md-2 order-first">
            <nav
              aria-label="breadcrumb"
              className="breadcrumb-header float-start float-lg-end"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/dashboard" className="text-danger">
                    Dashboard
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Suggested Message
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header pb-0">
              <div className="row my-3">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 float-left">
                  {canCreate && (
                    <button
                      type="button"
                      className="btn waves-effect waves-light btn-danger btn-sm float-left"
                      onClick={handleOpen}
                      id="bannerDialog"
                    >
                      <i className="fa fa-plus"></i>
                      <span className="icon_margin">New</span>
                    </button>
                  )}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 float-right mt-3 mt-lg-0 mt-xl-0">
                  <form action="">
                    <div className="input-group mb-3 border rounded-pill">
                      <div className="input-group-prepend border-0">
                        <div id="button-addon4" className="btn text-danger">
                          <i className="fas fa-search mt-2"></i>
                        </div>
                      </div>
                      <input
                        type="search"
                        placeholder="What're you searching for?"
                        aria-describedby="button-addon4"
                        className="form-control bg-none border-0 rounded-pill searchBar"
                        onChange={handleSearch}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="card-body card-overflow">

              <table className="table table-striped">
                <thead className="text-white">
                  <tr>
                    <th>No.</th>
                    <th>Message</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {data?.length > 0 ? (
                    data?.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.message}</td>
                          <td>
                            {canEdit && (
                              <Tooltip title="Edit">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary"
                                  onClick={() => handleEdit(data)}
                                >
                                  <i className="fa fa-edit"></i>
                                </button>
                              </Tooltip>
                            )}
                          </td>
                          <td>
                            {canDelete && (
                              <Tooltip title="Delete">
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDelete(data._id)}
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </Tooltip>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" align="center">
                        Nothing to show!!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <SuggestMsgDialog />
    </>
  );
};

export default connect(null, {
  getSuggestedMsgs,
  deleteSuggestMsg,
})(SuggestMessageTable);
