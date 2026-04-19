import React, { useEffect, useState } from 'react'

// redux
import { connect, useDispatch, useSelector } from 'react-redux'

// actions (mirrors banner but for broadcastgift)
import { getBroadcastGift, deleteBroadcastGift, handleVIPSwitchBroadcastGift } from '../../store/BroadcastGift/action'

// config
import { baseURL } from '../../util/Config'

// routing
import { Link } from 'react-router-dom'

// MUI
import { TablePagination, Tooltip } from '@mui/material'

// types (mirrors banner but for broadcastgift)
import { OPEN_BROADCASTGIFT_DIALOG } from '../../store/BroadcastGift/types'

// dialog (mirrors banner but for broadcastgift)
import BroadcastGiftDialog from '../dialog/BroadcastGiftDialogue'

// sweet alert helpers
import { alert, permissionError, warning } from '../../util/Alert'

import $ from 'jquery'

// image fallback
import noImage from '../../assets/images/noImage.png'
import Pagination from '../../pages/Pagination'
import { usePermission } from '../../context/PermissionProvider'

const TablePaginationActions = React.lazy(() => import('./TablePagination'))

const BroadcastGiftTable = (props) => {
  const dispatch = useDispatch()


  const { can } = usePermission();
  const canCreate = can('admin/broadcastgift', 'Create');
  const canEdit = can('admin/broadcastgift', 'Edit');
  const canDelete = can('admin/broadcastgift', 'Delete');

  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(getBroadcastGift())
  }, [dispatch])

  // follow banner state shape: state.banner.banner -> state.broadcastgift.broadcastgift
  const broadcastgift = useSelector(state => state.broadcastgift.broadcastgift)

  useEffect(() => {
    setData(broadcastgift)
  }, [broadcastgift])

  $(document).ready(function () {
    $('img').bind('error', function () {
      $(this).attr('src', noImage)
    })
  })

  const handleSearch = (e) => {
    const value = e.target.value.trim().toUpperCase()
    if (value) {
      const filtered = broadcastgift.filter((row) => {
        return row?.URL?.toUpperCase()?.indexOf(value) > -1
      })
      setData(filtered)
    } else {
      setData(broadcastgift)
    }
  } 

  const handleIsTop = (id) => {
    dispatch(handleVIPSwitchBroadcastGift(id));
  };
  

  const handleOpen = () => {
    dispatch({ type: OPEN_BROADCASTGIFT_DIALOG });
  };

  const handleDelete = (id) => {
    const ask = warning()
    ask
      .then((isDeleted) => {
        if (isDeleted) {
          props.deleteBroadcastGift(id)
          alert('Deleted!', 'Broadcast gift has been deleted!', 'success')
        }
      })
      .catch((err) => console.log(err))
  }

  const handleEdit = (row) => {
    dispatch({ type: OPEN_BROADCASTGIFT_DIALOG, payload: row });
  };

  return (
    <>
      <div className='page-title'>
        <div className='row'>
          <div className='col-12 col-md-6 order-md-1 order-last'>
            <h3 className='mb-3 text-white'>Broadcast Gift</h3>
          </div>
          <div className='col-12 col-md-6 order-md-2 order-first'>
            <nav aria-label='breadcrumb' className='breadcrumb-header float-start float-lg-end'>
              <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to='/admin/dashboard' className='text-danger'>
                    Dashboard
                  </Link>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  Broadcast Gift
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <div className='card'>
            <div className='card-header pb-0'>
              <div className='row my-3'>
                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-8 float-left'>
                  {canCreate && (
                    <button
                      type='button'
                      className='btn waves-effect waves-light btn-danger btn-sm float-left'
                      onClick={handleOpen}
                      id='broadcastGiftDialog'
                    >
                      <i className='fa fa-plus'></i>
                      <span className='icon_margin'>New</span>
                    </button>
                  )}
                </div>

                <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 float-right mt-3 mt-lg-0 mt-xl-0'>
                  {/* Mirror banner's optional search UI */}
                  {/* <form action=''>
                    <div className='input-group mb-3 border rounded-pill'>
                      <div className='input-group-prepend border-0'>
                        <div id='button-addon4' className='btn text-danger'>
                          <i className='fas fa-search mt-2'></i>
                        </div>
                      </div>
                      <input
                        type='search'
                        placeholder={`What're you searching for?`}
                        aria-describedby='button-addon4'
                        className='form-control bg-none border-0 rounded-pill searchBar'
                        onChange={handleSearch}
                      />
                    </div>
                  </form> */}
                </div>
              </div>
            </div>

            <div className='card-body card-overflow'>
              <table className='table table-striped'>
                <thead className='text-center'>
                  <tr>
                    <th>No.</th>
                    <th>Image</th>
                    <th>URL</th>
                    <th>Is Active</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody className='text-center'>
                  {data?.length > 0 ? (
                    data.map((row, index) => (
                      <tr key={row?._id || index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            height='70px'
                            width='100px'
                            alt='broadcastgift'
                            src={row?.imageUrl ? baseURL + row?.imageUrl : noImage}
                            style={{
                              boxShadow: '0 5px 15px 0 rgb(105 103 103 / 0%)',
                              border: '2px solid #fff',
                              borderRadius: 10,
                              display: 'block'
                            }}
                            className='mx-auto'
                          />
                        </td>
                        <td>
                          <Link to={row?.URL || '#'} target='_blank'>
                            {row?.redirectUrl ? row?.redirectUrl : '-'}
                          </Link>
                        </td>
                        <td>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={row?.isActive}
                                onChange={() => handleIsTop(row?._id)}
                              />
                              <span className="slider">
                                <p
                                 style={{
                                    fontSize: 12,
                                    marginLeft: `${
                                      row?.isActive ? "-24px" : "35px"
                                    }`,
                                    color: "#000",
                                    marginTop: "6px",
                                  }}
                                >
                                  {row?.isActive ? "Yes" : "No"}
                                </p>
                              </span>
                            </label>
                          </td>
                        <td>
                          {canEdit && (
                            <Tooltip title='Edit'>
                              <button
                                type='button'
                                className='btn btn-sm btn-info'
                                onClick={() => handleEdit(row)}
                              >
                                <i className='fa fa-edit fa-lg'></i>
                              </button>
                            </Tooltip>
                          )}
                        </td>
                        <td>
                          {canDelete && (
                            <Tooltip title='Delete'>
                              <button
                                type='button'
                                className='btn btn-danger btn-sm'
                                onClick={() => handleDelete(row?._id)}
                              >
                                <i className='fas fa-trash-alt fa-lg'></i>
                              </button>
                            </Tooltip>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='6' align='center'>
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

      <BroadcastGiftDialog />
    </>
  )
}

export default connect(null, { getBroadcastGift, deleteBroadcastGift })(BroadcastGiftTable)
