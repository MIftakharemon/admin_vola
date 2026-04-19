import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '../../../store/setting/action';
import { IconCopy } from "@tabler/icons-react";


const PurchaseVipPlan = (props) => {
  const dispatch = useDispatch();
  const { setting } = useSelector((state) => state.setting);
  

  useEffect(() => {
    dispatch(getSetting());
  }, []);

  const copyToClipboard = (Text) => {
    navigator.clipboard.writeText(Text);
  };

  return (
    <table className="table table-striped mt-5">
      <thead>
        <tr>
          <th>No.</th>
          <th>User Name</th>
          <th>{`Amount (${setting?.currency?.symbol || '$'})`}</th>
          {/* <th>Rupee</th> */}
          <th>Validity</th>
          <th>ValidityType</th>
          <th>Payment Gateway</th>
          <th>Purchase Date</th>
        </tr>
      </thead>
      <tbody>
        {props.data?.length > 0 ? (
          props.data.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name} <IconCopy
                  size={16}
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => copyToClipboard(data.name)}
                /></td>
                <td className="text-primary">{data.dollar} {setting?.currency?.symbol || '$'}</td>
                {/* <td className="text-info">{data.rupee}</td> */}
                <td>{data.validity}</td>
                <td>{data.validityType}</td>
                <td className="text-success">{data.paymentGateway}</td>
                <td>{data.purchaseDate}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="8" align="center">
              Nothing to show!!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PurchaseVipPlan;
