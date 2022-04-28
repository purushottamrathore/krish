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
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

const TransactionPage = () => {
  const { SearchBar } = Search;
  const uType = localStorage.getItem("uType");
  const [transactionsList, setTransactionsList] = useState([]);
  const [refId, setRefId] = useState("");
  const [tid, setTid] = useState("");
  const [transId, setTransId] = useState("");
  // const uType = localStorage.getItem("uType");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let [checkList, setCheckList] = useState([]);
  let [pendData, setPendData] = useState([]);
  const [product, setProduct] = useState([]);
  let [success, setSuccess] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [password, setPassword] = useState("");

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
  
  function Interval(){
    setTimeout(()=>{
      handleTransaction();
     },15000)
}
 useEffect(()=>Interval(),[])

  useEffect(() => {
    if (transactionsList && Object.keys(transactionsList).length > 0) {
      let data = transactionsList.filter(
        (item) =>
          item?.status?.toLowerCase() === "pending" ||
          item?.status?.toLowerCase() === "inprogress"
      );
      setPendData(data);
    }
    let data = transactionsList.filter(
      (item) => 
        item?.status?.toLowerCase() === "success" ||
        item?.status?.toLowerCase() === "rejected"
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

  const handleActionTrans = async (id, transId, status, refId) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getActionTrans(id, transId, status, refId).then(
      async (result) => {
        //console.log(result.data, 'getTransactions');
        if (result) {
          try {
            LoaderHelper.loaderStatus(false);
            setRefId("");
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
      }
    );
  };

  const handleActionRejectTrans = async (id, transId, status, refId, password) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getActionTrans(id, transId, status, refId, password).then(
      async (result) => {
        //console.log(result.data, 'getTransactions');
        if (result) {
          try {
            LoaderHelper.loaderStatus(false);
            setRefId("");
            setPassword("");
            $("#reject").modal("hide");
            alertSuccessMessage()
            handleTransaction(result.msg);
          } catch (error) {
            LoaderHelper.loaderStatus(false);
            //alertErrorMessage(error);
            //console.log('error', `${error}`);
          }
        } else {
          LoaderHelper.loaderStatus(false);
          //alertErrorMessage(result.message);
        }
      }
    );
  };

  const handleSaveData = (id, transId, status) => {
    setTid(id);
    setStatus(status);
    setTransId(transId);
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



  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
        <div>
           <input
              type="checkbox"
              onClick={() =>
                handleCheckTrans(row?._id)
              }
            />

        </div>


    );
};

const linkFollow2 = (cell, row, rowIndex, formatExtraData) => {
  return (
      <div>
        <button
        class="btn btn-success btn-sm qwer"
        data-bs-toggle="modal"
        data-bs-target="#refList"
        onClick={() =>
          handleSaveData(
            row?._id,
            row?.transId,
            1
          )
        }
      >
        Approve
      </button>
      <button
          className="btn btn-danger btn-sm mt-1"
          data-bs-toggle="modal"
          data-bs-target="#reject"
          onClick={() =>
            handleSaveData(
              row?._id,
              row?.transId,
              0
            )
          }
        >
          Reject
        </button>
        <button
          className="btn btn-orange btn-sm mtl-1"
          data-bs-toggle="modal"
          data-bs-target="#refList"
          onClick={() =>
            handleSaveData(
              row?._id,
              row?.transId,
              2
            )
          }
        >
          In Progress
        </button>
         
      </div>
     


  );
};






const columns = [

{ dataField: 'select', text: 'Select', formatter: linkFollow},
{ dataField: 'transId', text: 'Transaction Id(Vendor)', sort: true, },
{ dataField: 'createdAt', text: 'Date', },
{ dataField: 'product', text: 'Product', },
{ dataField: 'customer', text: 'Customer', },
{ dataField: 'amount', text: 'Amount'},
{ dataField: 'status', text: 'Status'},
{ dataField: 'refNo', text: 'Our Referrance No.'},
{ dataField: 'wallet', text: 'Wallet'},
{ dataField: 'route', text: 'Route'},
{ dataField: 'Action', text: 'Action', formatter: linkFollow2},
]

const columnss = [

  { dataField: 'transId', text: 'Transaction Id(Vendor)',},
  { dataField: 'createdAt', text: 'Date', },
  { dataField: 'product', text: 'Product', },
  { dataField: 'customer', text: 'Customer', },
  { dataField: 'amount', text: 'Amount'},
  { dataField: 'status', text: 'Status'},
  { dataField: 'refNo', text: 'Our Referrance No.'},
  { dataField: 'wallet', text: 'Wallet'},
  { dataField: 'route', text: 'Route'},
  ]


const pagination = paginationFactory({
page: 1,
sizePerPage: 5,
lastPageText: '>>',
firstPageText: "<<",
nextPageText: ">",
prePageText: "<",
showTotal: true,
alwaysShowAllBtns: true,

onPageChange: function (page, sizePerPage) {
    console.log('page', page);
    console.log('sizePerPage', sizePerPage);
},
onSizePerPageChange: function (page, sizePerPage) {
    console.log('page', page);
    console.log('sizePerPage', sizePerPage);
}

});

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
                  <div className="col-auto mt-4"  >
                    {uType == 1 ? (
                       
                          <button
                            class="btn btn-primary   btn-block w-100"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#addAmount"
                          >
                            Add Balance
                          </button>
                        
                      ) : undefined}
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* Main page content */}
          <div className="container-xl px-4 mt-n10">
            <div className="filter_bar">
              <form className="row"> 
                <div class="mb-3 col "></div>
                <div class="mb-3 col "></div>
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
                   
                  <div className="  col">
                  <button
                        class="btn btn-primary  btn-block w-100  "
                        type="button"
                        onClick={() =>
                          dateFilter(startDate, endDate, activeTab)
                        }
                      >
                        Search
                      </button>
                    </div>
                    <div className="m  col">
                    <button
                      class="btn btn-light btn-block w-100  "
                      type="button"
                      onClick={() => handleTransaction()}
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
                      class="btn btn-dark   btn-block mb-3"
                      headers={headers}
                      filename={`pendingData-${new Date()}.csv`}
                      style={{ float: "right" }}
                    >
                      Download me
                    </CSVLink>

                    <div class="my-3">
                                <ToolkitProvider
                                    hover
                                    bootstrap4
                                    keyField='_id'
                                    columns={columns}
                                    data={pendData}
                                    search={{
                                        afterSearch: (newResult) => console.log(newResult)
                                    }}

                                >
                                    {
                                        props => (
                                            <React.Fragment>

                                                <SearchBar {...props.searchProps} />

                                                {/* <hr /> */}
                                                <BootstrapTable
                                                    hover
                                                    bootstrap4
                                                    keyField='_id'
                                                    columns={columns}
                                                    data={pendData}
                                                    pagination={pagination}
                                                    filter={filterFactory()}
                                                    {...props.baseProps}
                                                />
                                            </React.Fragment>

                                        )
                                    }

                                </ToolkitProvider>
                            </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Spot"
                    role="tabpanel"
                    aria-labelledby="Spot-tab"
                  >
                    <CSVLink
                      data={success}
                      class="btn btn-dark   btn-block mb-3"
                      headers={headers}
                      filename={`transList-${new Date()}.csv`}
                      style={{ float: "right" }}
                    >
                      Download me
                    </CSVLink>
                    <div class="my-3">
                                <ToolkitProvider
                                    hover
                                    bootstrap4
                                    keyField='_id'
                                    columns={columnss}
                                    data={transactionsList}
                                    search={{
                                        afterSearch: (newResult) => console.log(newResult)
                                    }}

                                >
                                    {
                                        props => (
                                            <React.Fragment>

                                                <SearchBar {...props.searchProps} />

                                                {/* <hr /> */}
                                                <BootstrapTable
                                                    hover
                                                    bootstrap4
                                                    keyField='_id'
                                                    columns={columnss}
                                                    data={transactionsList}
                                                    pagination={pagination}
                                                    filter={filterFactory()}
                                                    {...props.baseProps}
                                                />
                                            </React.Fragment>

                                        )
                                    }

                                </ToolkitProvider>
                            </div>
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
                onClick={() => handleActionTrans(tid, transId, status, refId)}
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
      <div
        class="modal fade"
        id="reject"
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
              <input
                type="password"
                className="form-control mt-2"
                name="pass"
                value={password}
                placeholder="Enter Password Id"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleActionRejectTrans(tid, transId, status, refId, password)}
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
