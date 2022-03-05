import React, {useState, useEffect} from "react";
import Header from "../../customComponent/Header";
import AuthService from "../../api/services/AuthService";
import {alertErrorMessage,alertSuccessMessage} from "../../customComponent/CustomAlertMessage";
import LoaderHelper from "../../customComponent/Loading/LoaderHelper";

const TransactionPage = () => {

    const [transactionsList, setTransactionsList] = useState([]);

  useEffect(() => {
    handleTransaction();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTransaction = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getTransactions().then(async result => {
      //console.log(result.data, 'getTransactions');
      if (result.success) {
        try {
          LoaderHelper.loaderStatus(false);
          setTransactionsList(result.data);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
          //console.log('error', `${error}`);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  };

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
                            <div className="filter_bar" >
                                

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

            
                            </div>
                            <div className="card mb-4">
                            <div class="card-header">Order Management Details</div>   
                                <div className="card-body">
                                    <table className="table table-bordered" width="100%" >
                                        <thead>
                                            <tr>
                                                <th>Transaction Id(Vendor)</th>
                                                <th>Operator Name</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Our Referrance No.</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Transaction Id(Vendor)</th>
                                                <th>Operator Name</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Our Referrance No.</th>
                                                <th>Action</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr>
                                                <td>hufy8efefuedif</td>
                                                <td>Rathore</td>
                                                <td>50</td>
                                                <td>Pendin</td>
                                                <td>5555554785522</td>
                                                <td ><button class="btn btn-success btn-sm">Approved</button></td>
                                                <td ><button class="btn btn-danger btn-sm">Rejected</button></td>
                                            </tr>
                                            <tr>
                                                <td>hufy8efefuedif</td>
                                                <td>Rathore</td>
                                                <td>50</td>
                                                <td>Pendin</td>
                                                <td>5555554785522</td>
                                                <td ><button class="btn btn-success btn-sm">Approved</button></td>
                                                <td ><button class="btn btn-danger btn-sm">Rejected</button></td>
                                            </tr>
                                            <tr>
                                                <td>hufy8efefuedif</td>
                                                <td>Rathore</td>
                                                <td>50</td>
                                                <td>Pendin</td>
                                                <td>5555554785522</td>
                                                <td ><button class="btn btn-success btn-sm">Approved</button></td>
                                                <td ><button class="btn btn-danger btn-sm">Rejected</button></td>
                                            </tr>
                                            <tr>
                                                <td>hufy8efefuedif</td>
                                                <td>Rathore</td>
                                                <td>50</td>
                                                <td>Pendin</td>
                                                <td>5555554785522</td>
                                                <td ><button class="btn btn-success btn-sm">Approved</button></td>
                                                <td ><button class="btn btn-danger btn-sm">Rejected</button></td>
                                            </tr>
                                            <tr>
                                                <td>hufy8efefuedif</td>
                                                <td>Rathore</td>
                                                <td>50</td>
                                                <td>Pendin</td>
                                                <td>5555554785522</td>
                                                <td ><button class="btn btn-success btn-sm">Approved</button></td>
                                                <td ><button class="btn btn-danger btn-sm">Rejected</button></td>
                                            </tr>
                                            <tr>
                                                <td>hufy8efefuedif</td>
                                                <td>Rathore</td>
                                                <td>50</td>
                                                <td>Pendin</td>
                                                <td>5555554785522</td>
                                                <td ><button class="btn btn-success btn-sm">Approved</button></td>
                                                <td ><button class="btn btn-danger btn-sm">Rejected</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
        </>
        
    )
}

export default TransactionPage;