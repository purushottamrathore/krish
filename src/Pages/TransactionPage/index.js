import React, {useState, useEffect} from "react";
import Header from "../../customComponent/Header";
import AuthService from "../../api/services/AuthService";
import {$} from "react-jquery-plugin";
import {alertErrorMessage,alertSuccessMessage} from "../../customComponent/CustomAlertMessage";
import LoaderHelper from "../../customComponent/Loading/LoaderHelper";

const TransactionPage = () => {

    const [transactionsList, setTransactionsList] = useState([]);
    const [refId, setRefId] = useState('');
    const [tid, setTid] = useState('');
    const [status, setStatus] = useState('');

  useEffect(() => {
    handleTransaction();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTransaction = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getTransactions().then(async result => {
      //console.log(result.data, 'getTransactions');
      if (Object.keys(result).length > 1) {
        try {
          LoaderHelper.loaderStatus(false);
          setTransactionsList(result);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          //alertErrorMessage(error);
          //console.log('error', `${error}`);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        //alertErrorMessage(result.message);
      }
    });
  };

  const handleActionTrans = async (id, status, refId) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getActionTrans(id, status, refId).then(async result => {
      //console.log(result.data, 'getTransactions');
      if (result) {
        try {
          LoaderHelper.loaderStatus(false);
            $("#refList").modal("hide");
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          //alertErrorMessage(error);
          //console.log('error', `${error}`);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        //alertErrorMessage(result.message);
      }
    });
  };

  const handleSaveData = (id, status) => {
    setTid(id);
    setStatus(status);

  }

    return (
        <>
                <Header />
        <div id="layoutSidenav_content">
                    <main>
                        <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                            <div className="container-xl px-4">
                                <div className="page-header-content pt-4">
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-auto mt-4">
                                            <h1 className="page-header-title">
                                                <div className="page-header-icon"><i data-feather="activity"></i></div>
                                                Transaction
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        {/* Main page content */}
                        <div className="container-xl px-4 mt-n10">
                            {/* <div className="filter_bar" >
                                

                                    <form className="row" >
                                        <div class="mb-3 col ">
                                            <input class="form-control form-control-solid" id="exampleFormControlInput1" type="email" placeholder="Enter Name" />   
                                        </div>
                                        <div class="mb-3 col ">
                                            <input class="form-control form-control-solid" id="exampleFormControlInput1" type="email" placeholder="Email" />   
                                        </div>
                                        <div class="mb-3 col ">
                                            <input class="form-control form-control-solid" id="exampleFormControlInput1" type="email" placeholder="Phone No" />   
                                        </div>
                                        <div class="mb-3 col ">
                                            <input type="date" class="form-control form-control-solid" data-provide="datepicker" id="litepickerRangePlugin" placeholder="Select date range..." />
                                        </div>
                                        <div class="mb-3 col ">                                          
                                            <div className="row" >
                                                <div className="col" >
                                                        <button class="btn btn-indigo   btn-block w-100" type="button">Search</button>
                                                </div>
                                                <div className="col" >
                                                    <button class="btn btn-white-10 btn-block w-100 " type="button">Reset</button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </form>

            
                            </div> */}
                            <div className="card mb-4">
                            <div class="card-header">Order Management Details</div>   
                                <div className="card-body">
                                    <table className="table table-bordered" width="100%" >
                                        <thead>
                                            <tr>
                                                <th>Sr.</th>
                                                <th>Transaction Id(Vendor)</th>
                                                <th>Operator Name</th>
                                                <th>Transaction Type</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Our Referrance No.</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                        <tr>
                                            <th>Sr.</th>
                                            <th>Transaction Id(Vendor)</th>
                                            <th>Operator Name</th>
                                            <th>Transaction Type</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Our Referrance No.</th>
                                            <th>Action</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                                {transactionsList.length > 0 ?
                                                    transactionsList.map((item, index) =>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item?._id}</td>
                                                            <td>{item?.operator}</td>
                                                            <td>{item?.transType}</td>
                                                            <td>{item?.amount}</td>
                                                            <td>{item?.status}</td>
                                                            <td>{item?.refNo}</td>
                                                            <td>
                                                                <button
                                                                class="btn btn-danger btn-sm qwer"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#refList"
                                                                onClick={() => handleSaveData(item?._id, item?.status)}
                                                                >
                                                                    Approve
                                                                </button>
                                                                <td>
                                                                <button
                                                                    className="btn btn-dark btn-sm mt-1"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#refList"
                                                                    onClick={() => handleSaveData(item?._id, item?.status)}
                                                                >
                                                                    Reject
                                                                </button>
                                                                </td>
                                                            </td>
                                                        </tr>
                                                ) : undefined}
                                                
                                            </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div
        class="modal fade"
        id="refList"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            
              <h5 class="modal-title" id="exampleModalLabel">
                Enter Transaction Id
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              
            </div>
            <div className="modal-body">
                <input type="text" className="form-control" name="ref" value={refId} placeholder="Enter Transaction Id" onChange={(event) => setRefId(event.target.value)}/>
            </div>
            <div class="modal-footer">
        <button type="button" class="btn btn-primary" onClick={() => handleActionTrans(tid, status, refId)}>Save changes</button>
      </div>
          </div>
        </div>
      </div>
        </>
        
    )
}

export default TransactionPage;