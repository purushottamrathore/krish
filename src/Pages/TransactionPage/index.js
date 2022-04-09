import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";     
import Header from "../../customComponent/Header";
import AuthService from "../../api/services/AuthService";
import { $ } from "react-jquery-plugin";
import {
  alertErrorMessage,
  alertSuccessMessage,
} from "../../customComponent/CustomAlertMessage";
import LoaderHelper from "../../customComponent/Loading/LoaderHelper";

const TransactionPage = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [refId, setRefId] = useState("");
  const [tid, setTid] = useState("");
  const [status, setStatus] = useState("");
  let CheckList = [];

  useEffect(() => {
    handleTransaction();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTransaction = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getTransactions().then(async (result) => {
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
    await AuthService.getActionTrans(id, status, refId).then(async (result) => {
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
  };

  const handleCheckTrans = (id) => {
    console.log(id)
    CheckList.push(id);
  }

  const handleCheckSelect = async (chId, refId) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getCheckSelect(chId, refId).then(async (result) => {
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
  console.log(CheckList);

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
                      <div className="page-header-icon">
                        <i data-feather="activity"></i>
                      </div>
                      Transaction
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* Main page content */}
          <div className="container-xl px-4 mt-n10">
            <div className="filter_bar">
              <form className="row">
                <div class="mb-3 col ">
                  <input
                    class="form-control form-control-solid"
                    id="exampleFormControlInput1"
                    type="email"
                    placeholder="Enter Name"
                  />
                </div>
                <div class="mb-3 col ">
                  <input
                    class="form-control form-control-solid"
                    id="exampleFormControlInput1"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div class="mb-3 col ">
                  <input
                    class="form-control form-control-solid"
                    id="exampleFormControlInput1"
                    type="email"
                    placeholder="Phone No"
                  />
                </div>
                <div class="mb-3 col ">
                  <input
                    type="date"
                    class="form-control form-control-solid"
                    data-provide="datepicker"
                    id="litepickerRangePlugin"
                    placeholder="Select date range..."
                  />
                </div>
                <div class="mb-3 col ">
                  <div className="row">
                    <div className="col">
                      <button
                        class="btn btn-indigo   btn-block w-100"
                        type="button"
                      >
                        Search
                      </button>
                    </div>
                    <div className="col">
                      <button
                        class="btn btn-white-10 btn-block w-100 "
                        type="button"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="card mb-4">
                  <div class="card-header">Transactions</div>
                  <div className="card-body">

            <ul className="nav nav-tabs das_tabs" id="das_tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="Favourite-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Favourite"
                  type="button"
                  role="tab"
                  aria-controls="Favourite"
                  aria-selected="true"
                >
                  Pending
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Spot-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Spot"
                  type="button"
                  role="tab"
                  aria-controls="Spot"
                  aria-selected="false"
                >
                  Transfer History
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="Favourite"
                role="tabpanel"
                aria-labelledby="Favourite-tab"
              >
                
                    <table className="table table-bordered" width="100%" id="myTable">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Transaction Id(Vendor)</th>
                          <th>Product</th>
                          <th>Transaction Type</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Our Referrance No.</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                        <th>Select</th>
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
                        {transactionsList.length > 0
                          ? transactionsList.map((item, index) => (
                              <tr key={index}>
                                <td><input type="checkbox" onClick={() => handleCheckTrans(item?._id)}/></td>
                                <td>{item?.transId}</td>
                                <td>{item?.product}</td>
                                <td>{item?.transType}</td>
                                <td>{item?.amount}</td>
                                <td>{item?.status}</td>
                                <td>{item?.refNo}</td>
                                <td>
                                  <button
                                    class="btn btn-success btn-sm qwer"
                                    data-bs-toggle="modal"
                                    data-bs-target="#refList"
                                    onClick={() =>
                                      handleSaveData(item?._id, item?.status)
                                    }
                                  >
                                    Approve
                                  </button>
                                  <td>
                                    <button
                                      className="btn btn-danger btn-sm mt-1"
                                      data-bs-toggle="modal"
                                      data-bs-target="#refList"
                                      onClick={() =>
                                        handleSaveData(item?._id, item?.status)
                                      }
                                    >
                                      Reject
                                    </button>
                                  </td>
                                </td>
                              </tr>
                            ))
                          : undefined}
                      </tbody>
                    </table>

                    <button class="btn btn-indigo   btn-block" type="button"  data-bs-toggle="modal" data-bs-target="#checkList">Submit</button>

              </div>    
              <div
                className="tab-pane fade"
                id="Spot"
                role="tabpanel"
                aria-labelledby="Spot-tab"
              >

                 <DataTable value={transactionsList}>
                    <Column field="transId" header="Transaction Id(Vendor)"></Column>
                    <Column field="product" header="Operator Name"></Column>
                    <Column field="transType" header="Transaction Type"></Column>
                    <Column field="amount" header="Amount"></Column>
                    <Column field="refNo" header="Our Referrance No"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
                
                    {/* <table className="table table-bordered" id="myTable" width="100%">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Transaction Id(Vendor)</th>
                          <th>Operator Name</th>
                          <th>Transaction Type</th>
                          <th>Amount</th>
                          <th>Our Referrance No.</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>Sr.</th>
                          <th>Transaction Id(Vendor)</th>
                          <th>Product</th>
                          <th>Transaction Type</th>
                          <th>Amount</th>
                          <th>Our Referrance No.</th>
                          <th>Status</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        {transactionsList.length > 0
                          ? transactionsList.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item?.transId}</td>
                                <td>{item?.product}</td>
                                <td>{item?.transType}</td>
                                <td>{item?.amount}</td>
                                <td>{item?.refNo}</td>
                                <td>{item?.status}</td>
                              </tr>
                            ))
                          : undefined}
                      </tbody>
                    </table> */}
                  
            </div>

            </div>
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
              <input
                type="text"
                className="form-control"
                name="ref"
                value={refId}
                placeholder="Enter Transaction Id"
                onChange={(event) => setRefId(event.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleActionTrans(tid, status, refId)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="checkList"
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
              <input
                type="text"
                className="form-control"
                name="ref"
                value={refId}
                placeholder="Enter Transaction Id"
                onChange={(event) => setRefId(event.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleCheckSelect(CheckList, refId)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionPage;
