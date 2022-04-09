import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as moment from "moment";
import { CSVLink } from "react-csv";
import "primereact/resources/primereact.min.css"; //core css
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let [checkList, setCheckList] = useState([]);
  let [pendData, setPendData] = useState([]);
  const [product, setProduct] = useState([]);
  let [success, setSuccess] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  const headers = [
    { label: "Transaction Id(Vendor)", key: "transId" },
    { label: "Date", key: "createdAt" },
    { label: "Product", key: "product" },
    { label: "Customer", key: "customer" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "status" },
    { label: "Our Referrance No", key: "refNo" },
    { label: "Wallet", key: "wallet" },
    { label: "Route", key: "route" },
  ];

  useEffect(() => {
    handleTransaction();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (transactionsList && Object.keys(transactionsList).length > 0) {
      let data = transactionsList.filter(
        (item) => item?.status?.toLowerCase() === "pending"
      );
      setPendData(data);
    }
    let data = transactionsList.filter(
      (item) => item?.status?.toLowerCase() === "success"
    );
    setSuccess(data);

    console.log(transactionsList, "lastJsonMessagerathore");
  }, [transactionsList]);

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
          handleTransaction();
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
    console.log(id);
    let a = checkList;
    a.push(id);
    console.log(checkList, "checklist");
  };

  const handleCheckSelect = async (chId, refId) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getCheckSelect(chId, refId).then(async (result) => {
      //console.log(result.data, 'getTransactions');
      if (result.msg === "done") {
        try {
          LoaderHelper.loaderStatus(false);
          $("#checkList").modal("hide");
          handleTransaction();
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
  console.log(checkList);

  function dateFilter(startDate, endDate, type1) {
    let type;
    type = transactionsList.filter((e) => {
      if (e.status.toLowerCase() == type1) {
        console.log(type1);
        console.log(startDate, new Date(endDate), new Date(e.createdAt));
        return (
          new Date(e.createdAt) >= new Date(startDate) &&
          new Date(e.createdAt) <= new Date(endDate).setHours(24, 0, 0, 0)
        );
      }
      //console.log(e, new Date(e.WorkDescription.startDate), this.filterStartDate);
    });
    type1 == "pending" ? setPendData(type) : setSuccess(type);
    console.log(type, pendData);
  }

  function productFilter(product, type1) {
    let type;
    type = transactionsList.filter((e) => e?.product?.toLowerCase() == product);
    type1 == "pending" ? setPendData(type) : setSuccess(type);
    console.log(type, pendData);
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
                    type="text"
                    value={product}
                    placeholder="Enter Product"
                    onChange={(event) => setProduct(event.target.value)}
                  />
                </div>
                <div class="mb-3 col ">
                  <div className="row">
                    <div className="col">
                      <button
                        class="btn btn-indigo   btn-block w-100"
                        type="button"
                        onClick={() => productFilter(product, activeTab)}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mb-3 col ">
                  <input
                    type="date"
                    class="form-control form-control-solid"
                    data-provide="datepicker"
                    id="litepickerRangePlugin"
                    value={startDate}
                    placeholder="Select date range..."
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </div>
                <div class="mb-3 col ">
                  <input
                    type="date"
                    class="form-control form-control-solid"
                    data-provide="datepicker"
                    id="litepickerRangePlugin"
                    value={endDate}
                    placeholder="Select date range..."
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </div>
                <div class="mb-3 col ">
                  <div className="row">
                    <div className="col">
                      <button
                        class="btn btn-indigo   btn-block w-100"
                        type="button"
                        onClick={() =>
                          dateFilter(startDate, endDate, activeTab)
                        }
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="mt-2  col">
                    <button
                      class="btn btn-indigo   btn-block w-100"
                      type="button"
                      onClick={() => handleTransaction()}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="card mb-4">
              <div class="card-header">Transactions</div>
              <div className="card-body">
                <ul
                  className="nav nav-tabs das_tabs"
                  id="das_tabs"
                  role="tablist"
                >
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
                      onClick={() => setActiveTab("pending")}
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
                      onClick={() => setActiveTab("success")}
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
                    <CSVLink
                      data={pendData}
                      class="btn btn-indigo   btn-block m-2"
                      headers={headers}
                      filename={`pendingData-${new Date()}.csv`}
                      style={{ float: "right" }}
                    >
                      Download me
                    </CSVLink>

                    <table
                      className="table table-bordered"
                      width="100%"
                      id="myTable"
                    >
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Transaction Id(Vendor)</th>
                          <th>Date</th>
                          <th>Product</th>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Our Referrance No.</th>
                          <th>Wallet</th>
                          <th>Route</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>Select</th>
                          <th>Transaction Id(Vendor)</th>
                          <th>Date</th>
                          <th>Product</th>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Our Referrance No.</th>
                          <th>Wallet</th>
                          <th>Route</th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        {pendData.length > 0
                          ? pendData.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="checkbox"
                                    onClick={() => handleCheckTrans(item?._id)}
                                  />
                                </td>
                                <td>{item?.transId}</td>
                                <td>
                                  {moment(item?.createdAt).format("DD/MM/YYYY")}
                                </td>
                                <td>{item?.product}</td>
                                <td>{item?.customer}</td>
                                <td>{item?.amount}</td>
                                <td>{item?.status}</td>
                                <td>{item?.refNo}</td>
                                <td>{item?.wallet}</td>
                                <td>{item?.route}</td>
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

                    <button
                      class="btn btn-indigo   btn-block"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#checkList"
                    >
                      Submit
                    </button>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Spot"
                    role="tabpanel"
                    aria-labelledby="Spot-tab"
                  >
                    <CSVLink
                      data={success}
                      class="btn btn-indigo   btn-block m-2"
                      headers={headers}
                      filename={`transList-${new Date()}.csv`}
                      style={{ float: "right" }}
                    >
                      Download me
                    </CSVLink>

                    <table
                      className="table table-bordered"
                      id="myTable"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Transaction Id(Vendor)</th>
                          <th>Date</th>
                          <th>Operator Name</th>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Our Referrance No.</th>
                          <th>Wallet</th>
                          <th>Route</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>Sr.</th>
                          <th>Transaction Id(Vendor)</th>
                          <th>Date</th>
                          <th>Operator Name</th>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Our Referrance No.</th>
                          <th>Wallet</th>
                          <th>Route</th>
                          <th>Status</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        {success.length > 0
                          ? success.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item?.transId}</td>
                                <td>
                                  {moment(item?.createdAt).format("DD/MM/YYYY")}
                                </td>
                                <td>{item?.product}</td>
                                <td>{item?.customer}</td>
                                <td>{item?.amount}</td>
                                <td>{item?.refNo}</td>
                                <td>{item?.wallet}</td>
                                <td>{item?.route}</td>
                                <td>{item?.status}</td>
                              </tr>
                            ))
                          : undefined}
                      </tbody>
                    </table>
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
                onClick={() => handleCheckSelect(checkList, refId)}
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
