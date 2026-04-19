import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting } from '../../../store/setting/action';
import Diamond from '../../../assets/images/diamond.png';
import { IconCopy } from "@tabler/icons-react";



const PurchaseCoinPlan = (props) => {
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
          <th> User Name</th>
          <th>Diamond</th>
          <th>{`Amount (${setting?.currency?.symbol || '$'})`}</th>
          {/* <th>Rupee</th> */}
          <th>Payment Gateway</th>
          <th>Purchase Date</th>
        </tr>
      </thead>
      <tbody>
        {props?.data?.length > 0 ? (
          props?.data?.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}  <IconCopy
                  size={16}
                  className="ms-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => copyToClipboard(data.name)}
                /></td>
                <td className="text-primary"><img src={Diamond} width="15" height="15" style={{ verticalAlign: "middle", marginRight: "1px" }} /> {data.diamond}</td>
                <td className="text-info">{data.dollar} {setting?.currency?.symbol || '$'}</td>
                {/* <td className="text-success">{data.rupee}</td> */}
                <td className="text-danger">{data.paymentGateway}</td>
                <td>{data.purchaseDate}</td>
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
  );
};

export default PurchaseCoinPlan;
