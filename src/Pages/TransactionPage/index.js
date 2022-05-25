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
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const TransactionPage = () => {
  const { SearchBar } = Search;
  const uType = localStorage.getItem("uType");
  const [transactionsList, setTransactionsList] = useState([]);
  const [transferList, setTransferList] = useState([]);
  const [refId, setRefId] = useState("");
  const [tid, setTid] = useState("");
  const [transId, setTransId] = useState("");
  // const uType = localStorage.getItem("uType");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  let [checkList, setCheckList] = useState([]);
  let [pendData, setPendData] = useState([]);
  const [product, setProduct] = useState([]);
  let [success, setSuccess] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [password, setPassword] = useState("");
  const [balList, setBalList] = useState([]);
  const [date, setDate] = useState("");
  const [date2, setDate2] = useState("");
  const [date3, setDate3] = useState("");
  const [checked, setChecked] = useState(false);
  const [ledgerList, setLedgerList] = useState([]);
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
    handleBalanceList();
    handleTransactionB();
    handleLedgerList();
    // document.getElementById("startDate").value =
    //   moment().format("YYYY-MM-DD");
    // document.getElementById("endDate").value =
    //   moment().format("YYYY-MM-DD");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // setInterval(() => {
  //   handleTransaction();
  //   handleBalanceList();
  // }, 60000);

  useEffect(() => {
    if (transactionsList && Object.keys(transactionsList).length > 0) {
      let data = transactionsList.filter(
        (item) =>
          item?.status?.toLowerCase() === "pending" ||
          item?.status?.toLowerCase() === "inprogress"
      );
      setPendData(data);
    }

    // let data = transactionsList.filter(
    //   (item) =>
    //     moment(item?.createdAt).format("YYYY-MM-DD") ==
    //     moment(new Date()).format("YYYY-MM-DD")
    // );
    // setSuccess(data);

    console.log(transactionsList, "lastJsonMessagerathore");
  }, [transactionsList]);

  useEffect(() => {
    if (transferList && Object.keys(transferList).length > 0) {
    }

    let data = transferList.filter(
      (item) =>
        moment(item?.createdAt).format("YYYY-MM-DD") ==
        moment(new Date()).format("YYYY-MM-DD")
    );
    setSuccess(data);

    console.log(transferList, "lastJsonMessagerathore");
  }, [transferList]);

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
  const handleTransactionB = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getTransactions().then(async (result) => {
      //console.log(result.data, 'getTransactions');
      if (Object.keys(result).length > 1) {
        try {
          LoaderHelper.loaderStatus(false);
          setTransferList(result);
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
  const handleBalanceList = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getBalanceList().then(async (result) => {
      if (result.success) {
        try {
          LoaderHelper.loaderStatus(false);
          setBalList(result.data);
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

  const handleLedgerList = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getLedgerList().then(async (result) => {
      if (result.length > 0) {
        try {
          LoaderHelper.loaderStatus(false);
          setLedgerList(result);
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

  const handleActionRejectTrans = async (
    id,
    transId,
    status,
    refId,
    password
  ) => {
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
            alertSuccessMessage();
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
  const handleBalanceAction = async (id, status, password) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getBalanceAction(id, status, password).then(
      async (result) => {
        //console.log(result.data, 'getTransactions');
        if (result) {
          try {
            LoaderHelper.loaderStatus(false);
            setTid("");
            setPassword("");
            $("#balAction").modal("hide");
            alertSuccessMessage(result.message);
            handleBalanceList();
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
  const handleSuccessAction = async (id, transId, status, password) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getSuccessAction(id, transId, status, password).then(
      async (result) => {
        //console.log(result.data, 'getTransactions');
        if (result) {
          try {
            LoaderHelper.loaderStatus(false);
            setTid("");
            setPassword("");
            $("#successAction").modal("hide");
            alertSuccessMessage(result.message);
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

  const handleSaveData = (id, transId, status) => {
    setTid(id);
    setStatus(status);
    setTransId(transId);
  };

  const handleBalSaveData = (id, status) => {
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
    let vh = new Set(checkList);
    let sstL = [];
    vh.forEach((e) => {
      sstL.push(e);
    });
    console.log("check", checkList, vh.values(), sstL, chId);
    await AuthService.getCheckSelect(sstL, refId).then(async (result) => {
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
      if (e.status.toLowerCase() == "success") {
        return (
          new Date(e.createdAt) >= new Date(startDate) &&
          new Date(e.createdAt) <= new Date(endDate).setHours(24, 0, 0, 0)
        );
      } else if (e.status.toLowerCase() == "pending") {
        console.log(type1);
        console.log(startDate, new Date(endDate), new Date(e.createdAt));
        return (
          new Date(e.createdAt) >= new Date(startDate) &&
          new Date(e.createdAt) <= new Date(endDate).setHours(24, 0, 0, 0)
        );
      }
      //console.log(e, new Date(e.WorkDescription.startDate), this.filterStartDate);
    });

    let type2;
    type2 = ledgerList.filter((e) => {
      if (type1 == "ledger") {
        console.log(type1);
        console.log(startDate, new Date(endDate), new Date(e.createdAt));
        return (
          new Date(e.createdAt) >= new Date(startDate) &&
          new Date(e.createdAt) <= new Date(endDate).setHours(24, 0, 0, 0)
        );
      }
    });

    if (type1 == "pending") {
      setPendData(type);
    } else if (type1 == "success") {
      setSuccess(type);
    } else if (type1 == "ledger") {
      setLedgerList(type2);
    }

    // type1 == "pending" ? setPendData(type) : type1 == "success" ? setSuccess(type) : type1 == "ledger" ? setLedgerList(type) : undefined;
    console.log(type, pendData, type1);
  }

  // function productFilter(product, type1) {
  //   let type;
  //   type = transactionsList.filter((e) => e?.product?.toLowerCase() == product);
  //   type1 == "pending" ? setPendData(type) : setSuccess(type);
  //   console.log(type, pendData);
  // }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <input type="checkbox" onClick={() => handleCheckTrans(row?._id)} />
      </div>
    );
  };

  const linkFollow2 = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div style={{ width: "750px" }}>
        <button
          class="btn btn-success btn-sm qwer"
          data-bs-toggle="modal"
          data-bs-target="#refList"
          onClick={() => handleSaveData(row?._id, row?.transId, 1)}
        >
          Approve
        </button>
        <button
          className="btn btn-danger btn-sm m-1"
          data-bs-toggle="modal"
          data-bs-target="#reject"
          onClick={() => handleSaveData(row?._id, row?.transId, 0)}
        >
          Reject
        </button>
        <button
          className="btn btn-primary btn-sm m-1"
          data-bs-toggle="modal"
          data-bs-target="#refList"
          onClick={() => handleSaveData(row?._id, row?.transId, 2)}
        >
          In Progress
        </button>
      </div>
    );
  };
  const linkFollow3 = (cell, row, rowIndex, formatExtraData) => {
    return row?.status?.toLowerCase() == "pending" ? (
      <div>
        <button
          class="btn btn-success btn-sm qwer"
          data-bs-toggle="modal"
          data-bs-target="#balAction"
          onClick={() => handleBalSaveData(row?._id, 1)}
        >
          Approve
        </button>
        <button
          className="btn btn-danger btn-sm mt-1"
          data-bs-toggle="modal"
          data-bs-target="#balAction"
          onClick={() => handleBalSaveData(row?._id, 0)}
        >
          Reject
        </button>
      </div>
    ) : (
      ""
    );
  };
  const linkFollow8 = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div style={{ width: "300px" }}>
        {row?.status?.toLowerCase() == "success" ? (
          <>
            <button
              class="btn btn-light btn-sm qwer"
              data-bs-toggle="modal"
              data-bs-target="#successAction"
              onClick={() => handleSaveData(row?._id, row?.transId, 3)}
            >
              Pending
            </button>
            <button
              class="btn btn-danger btn-sm qwer m-1"
              data-bs-toggle="modal"
              data-bs-target="#successAction"
              onClick={() => handleSaveData(row?._id, row?.transId, 0)}
            >
              Reject
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    );
  };

  const linkFollow4 = (cell, row, rowIndex, formatExtraData) => {
    return <div>{moment(row?.createdAt).format("MMM DD YYYY h:mm A")}</div>;
  };

  const linkFollow5 = (cell, row, rowIndex, formatExtraData) => {
    return <div>{moment(row?.createdAt).format("MMM DD YYYY h:mm A")}</div>;
  };

  const linkFollow6 = (cell, row, rowIndex, formatExtraData) => {
    return <div>{moment(row?.createdAt).format("MMM DD YYYY h:mm A")}</div>;
  };

  const linkFollow9 = (cell, row, rowIndex, formatExtraData) => {
    return <div style={{ width: "750px" }}>{row?.product}</div>;
  };

  const linkFollow10 = (cell, row, rowIndex, formatExtraData) => {
    return <div>{row?.transType == "Credit" ? row?.amount : ""}</div>;
  };

  const linkFollow11 = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        {row?.transType == "Debit" ? row?.amount : "" ? row?.amount : ""}
      </div>
    );
  };

  const linkFollow12 = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        {row?.product},{row?.customer},{row?.transId}
      </div>
    );
  };

  const linkFollow13 = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        {row?.transType == "Debit"
          ? (bal = bal - row?.amount)
          : (bal = bal + row?.amount)}
      </div>
    );
  };

  const columns = [
    // uType == 1
    //   ? { dataField: "select", text: "Select", formatter: linkFollow }
    //   : {
    //       dataField: "select",
    //       text: "Select",
    //       formatter: linkFollow,
    //       hidden: true,
    //     },
    { dataField: "transId", text: "Transaction Id(Vendor)" },
    { dataField: "date", text: "Date", formatter: linkFollow4 },
    { dataField: "product", text: "Product" },
    { dataField: "customer", text: "Customer" },
    { dataField: "amount", text: "Amount" },
    { dataField: "status", text: "Status" },
    { dataField: "refNo", text: "Our Referrance No." },
    uType == 1
      ? { dataField: "Action", text: "Action", formatter: linkFollow2 }
      : {
          dataField: "Action",
          text: "Action",
          formatter: linkFollow2,
          hidden: true,
        },
  ];

  const columnss = [
    { dataField: "transId", text: "Transaction Id(Vendor)" },
    { dataField: "date2", text: "Date", formatter: linkFollow5 },
    { dataField: "product", text: "Product" },
    { dataField: "customer", text: "Customer" },
    { dataField: "amount", text: "Amount" },
    { dataField: "status", text: "Status" },
    { dataField: "refNo", text: "Our Referrance No." },
    uType == 1
      ? { dataField: "Action", text: "Action", formatter: linkFollow8 }
      : {
          dataField: "Action",
          text: "Action",
          formatter: linkFollow8,
          hidden: true,
        },
  ];
  const columnsss = [
    { dataField: "utrNo", text: "UTR NO." },
    { dataField: "date3", text: "Date", formatter: linkFollow6 },
    { dataField: "amount", text: "Amount" },
    { dataField: "status", text: "Status" },
    uType == 1
      ? { dataField: "Action", text: "Action", formatter: linkFollow3 }
      : {
          dataField: "Action",
          text: "Action",
          formatter: linkFollow3,
          hidden: true,
        },
  ];

  var bal = 0;

  const columnssss = [
    { dataField: "date", text: "Date", formatter: linkFollow6 },
    { dataField: "refNo", text: "Our Referrance No." },
    { dataField: "Nrt", text: "Narration", formatter: linkFollow12 },
    { dataField: "credit", text: "Credit", formatter: linkFollow10 },
    { dataField: "debit", text: "Debit", formatter: linkFollow11 },
    { dataField: "utrNo", text: "UTR NO." },
    { dataField: "bal", text: "Balance", formatter: linkFollow13 },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 50,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,

    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });
  function selects() {
    setChecked(1);
  }
  function deSelect() {
    setChecked(2);
  }
  const selectRow = {
    mode: "checkbox",
    onSelect: (row, isSelect, rowIndex, e) => {
      let a = checkList;
      if (isSelect) {
        a.push(row._id);
        console.log(a, checkList);
      } else {
        a = a.filter((e) => e != row._id);
        setCheckList(a);
        console.log(a, checkList);
      }
      // console.log(row,isSelect,rowIndex,e)
    },
    onSelectAll: (isSelect, rows, e) => {
      if (isSelect) {
        let a = [];
        rows.filter((e) => {
          a.push(e._id);
        });
        console.log(a);
        setCheckList(a);
      } else {
        setCheckList([]);
      }
      console.log(checkList);
    },
  };

  const csvData = pendData.map((d) => {
    console.log(d.createdAt);
    d.createdAt = moment(d.createdAt).format("MMM DD YYYY h:mm A");
    return d;
    // return Object.keys(d) == "createdAt" ? moment(d).format("YYYY-MM-DD") : "";
  });
  console.log(csvData);
  const csvData2 = success.map((d) => {
    console.log(d.createdAt);
    d.createdAt = moment(d.createdAt).format("MMM DD YYYY h:mm A");
    return d;
    // return Object.keys(d) == "createdAt" ? moment(d).format("YYYY-MM-DD") : "";
  });
  console.log(csvData2);
  return (
    <>
      <Header />
      <div id="layoutSidenav_content">
        <main>
          <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div className="container-fluid px-4">
              <div className="page-header-content pt-0">
                <div className="row align-items-center justify-content-between"></div>
              </div>
            </div>
          </header>
          {/* Main page content */}
          <div className="container-fluid px-4 mt-n10">
            <div className="filter_bar">
              <form className="row">
                <div class="mb-3 col ">
                  {uType == 0 ? (
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

                <div class="mb-3 col "></div>
                <div class="mb-3 col ">
                  <input
                    type="date"
                    class="form-control form-control-solid"
                    data-provide="datepicker"
                    id="startDate"
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
                    id="endDate"
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
                        onClick={() => handleTransactionB()}
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
                      onClick={() => {
                        setActiveTab("pending");
                      }}
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
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="Balance-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Balance"
                      type="button"
                      role="tab"
                      aria-controls="Balance"
                      aria-selected="false"
                    >
                      Balance History
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="Ledger-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Ledger"
                      type="button"
                      role="tab"
                      aria-controls="Ledger"
                      aria-selected="false"
                      onClick={() => setActiveTab("ledger")}
                    >
                      Ledger Statement
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
                      data={csvData}
                      class="btn btn-dark   btn-block mb-3"
                      headers={headers}
                      filename={`pendingData-${new Date()}.csv`}
                      style={{ float: "right" }}
                    >
                      Download me
                    </CSVLink>
                    {/* <button
                      type="button"
                      class="btn btn-primary  btn-block w-10 "
                      onclick={() => selects()}
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      class="btn btn-light  btn-block w-10 "
                      onclick={() => deSelect()}
                    >
                      Deselect All
                    </button> */}

                    <div className="my-3">
                      <ToolkitProvider
                        hover
                        bootstrap4
                        keyField="_id"
                        columns={columns}
                        data={pendData}
                        search={{
                          afterSearch: (newResult) => console.log(newResult),
                        }}
                      >
                        {(props) => (
                          <React.Fragment>
                            <SearchBar {...props.searchProps} />

                            {/* <hr /> */}
                            <BootstrapTable
                              hover
                              bootstrap4
                              keyField="_id"
                              columns={columns}
                              data={pendData}
                              pagination={pagination}
                              filter={filterFactory()}
                              selectRow={selectRow}
                              {...props.baseProps}
                            />
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                      {uType == 1 ? (
                        <button
                          class="btn btn-primary  btn-block  "
                          data-bs-toggle="modal"
                          data-bs-target="#checkList"
                        >
                          submit
                        </button>
                      ) : undefined}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Spot"
                    role="tabpanel"
                    aria-labelledby="Spot-tab"
                  >
                    <CSVLink
                      data={csvData2}
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
                        keyField="_id"
                        columns={columnss}
                        data={success}
                        search={{
                          afterSearch: (newResult) => console.log(newResult),
                        }}
                      >
                        {(props) => (
                          <React.Fragment>
                            <SearchBar {...props.searchProps} />

                            {/* <hr /> */}
                            <BootstrapTable
                              hover
                              bootstrap4
                              keyField="_id"
                              columns={columnss}
                              data={success}
                              pagination={pagination}
                              filter={filterFactory()}
                              {...props.baseProps}
                            />
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Balance"
                    role="tabpanel"
                    aria-labelledby="Balance-tab"
                  >
                    <CSVLink
                      data={balList}
                      class="btn btn-dark   btn-block mb-3"
                      // headers={headers}
                      filename={`transList-${new Date()}.csv`}
                      style={{ float: "right" }}
                    >
                      Download me
                    </CSVLink>
                    <div class="my-3">
                      <ToolkitProvider
                        hover
                        bootstrap4
                        keyField="_id"
                        columns={columnsss}
                        data={balList}
                        search={{
                          afterSearch: (newResult) => console.log(newResult),
                        }}
                      >
                        {(props) => (
                          <React.Fragment>
                            <SearchBar {...props.searchProps} />

                            {/* <hr /> */}
                            <BootstrapTable
                              hover
                              bootstrap4
                              keyField="_id"
                              columns={columnsss}
                              data={balList}
                              pagination={pagination}
                              filter={filterFactory()}
                              {...props.baseProps}
                            />
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Ledger"
                    role="tabpanel"
                    aria-labelledby="Ledger-tab"
                  >
                    <CSVLink
                      data={balList}
                      class="btn btn-dark   btn-block mb-3"
                      // headers={headers}
                      filename={`transList-${new Date()}.csv`}
                      style={{ float: "right" }}
                    >
                      Download me
                    </CSVLink>
                    <div class="my-3">
                      <ToolkitProvider
                        hover
                        bootstrap4
                        keyField="_id"
                        columns={columnssss}
                        data={ledgerList}
                        search={{
                          afterSearch: (newResult) => console.log(newResult),
                        }}
                      >
                        {(props) => (
                          <React.Fragment>
                            <SearchBar {...props.searchProps} />

                            {/* <hr /> */}
                            <BootstrapTable
                              hover
                              bootstrap4
                              keyField="_id"
                              columns={columnssss}
                              data={ledgerList}
                              pagination={pagination}
                              filter={filterFactory()}
                              {...props.baseProps}
                            />
                          </React.Fragment>
                        )}
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
                onClick={() =>
                  handleActionRejectTrans(tid, transId, status, refId, password)
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="balAction"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Enter Password
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
                onClick={() => handleBalanceAction(tid, status, password)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="successAction"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Enter Password
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
                onClick={() =>
                  handleSuccessAction(tid, transId, status, password)
                }
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
