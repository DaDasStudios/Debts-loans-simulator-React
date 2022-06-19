import React, { useState } from 'react';

// * Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'


// * Components
import Loan from './components/Loan';
import Calculations from './components/Calculations';
import Simulations from './components/Simulations';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Results from './components/Results';
import Records from './components/Records'

// * Styles
import './styles/main.css'

const App = () => {
  const singleLoanInitialState = {
    loan: 1,
    interest: 5 + '%',
    fees: 1,
    timeUnity: "Meses"
  }

  const loansInitialState = {
    loans: [
      //   {
      //     id: 'item1',
      //     name: 'Brayian',
      //     age: 27,
      //     dni: 65754536,
      //     address: '4-5 N-T NewYork',
      //     phone: 31512354321,
      //     email: 'example@example.com',
      //     loan: {
      //       loan: 350000,
      //       interest: 8,
      //       fees: 6,
      //       timeUnity: 'Mese(s)',
      //       months: 6,
      //       scam: false,
      //       scamRatio: 30,
      //       feeGain: 28000,
      //       capitalSubscription: 58333.333,
      //       feePayment: 86333.333,
      //       totalGains: 168000,
      //       paidRatio: 60,
      //       annualInterest: 48,
      //       monthlyInterest: 8,
      //       interestGainsYear: 168000,
      //       interestGainsMonth: 28000,
      //       gainsYear: 518000,
      //       gainsMonth: 86333.333,
      //       capitalYear: 350000,
      //       capitalMonth: 85333.333
      //     }
      //   },
      //   {
      //     id: 'item2',
      //     name: 'Nicolas',
      //     age: 23,
      //     dni: 65754536,
      //     address: '4-5 N-T NewYork',
      //     phone: 31512354321,
      //     email: 'example@example.com',
      //     loan: {
      //       loan: 550000,
      //       interest: 7,
      //       fees: 6,
      //       timeUnity: 'Mese(s)',
      //       months: 6,
      //       scam: false,
      //       scamRatio: 18,
      //       feeGain: 38500,
      //       capitalSubscription: 91666.67,
      //       feePayment: 130166.67,
      //       totalGains: 231000,
      //       paidRatio: 42,
      //       annualInterest: 42,
      //       monthlyInterest: 7,
      //       interestGainsYear: 231000,
      //       interestGainsMonth: 38500,
      //       gainsYear: 7810000,
      //       gainsMonth: 130166.67,
      //       capitalYear: 550000,
      //       capitalMonth: 91666.67
      //     }
      //   },
      //   {
      //     id: 'item3',
      //     name: 'Lucia',
      //     age: 32,
      //     dni: 65754536,
      //     address: '4-5 N-T NewYork',
      //     phone: 31512354321,
      //     email: 'example@example.com',
      //     loan: {
      //       loan: 180000,
      //       interest: 10,
      //       fees: 3,
      //       timeUnity: 'Mese(s)',
      //       months: 3,
      //       scam: false,
      //       scamRatio: 39,
      //       feeGain: 18000,
      //       capitalSubscription: 60000,
      //       feePayment: 78000,
      //       totalGains: 54000,
      //       paidRatio: 30,
      //       annualInterest: 30,
      //       monthlyInterest: 10,
      //       interestGainsYear: 54000,
      //       interestGainsMonth: 18000,
      //       gainsYear: 234000,
      //       gainsMonth: 78000,
      //       capitalYear: 180000,
      //       capitalMonth: 60000
      //     }
      //   }
    ]
  }

  const initialResults = {
    totalGains: 0,
    totalLosses: 0,
    gainsPerMonth: 0,
    gainsPerYear: 0,
    interestGainsMonth: 0,
    interestGainsYear: 0,
    lossesPerMonth: 0,
    lossesPerYear: 0,
    interestLossesMonth: 0,
    interestLossesYear: 0,
    failedLoans: 0,
    successfulLoans: 0,
    totalMoneyReceived: 0,
    totalMoneyLost: 0
  }

  // todo: Update the records inside other components
  const [loansState, loansSetState] = useState(loansInitialState)

  // todo: Calculate the loan on the home view
  const [singleLoanState, singleLoanSetState] = useState(singleLoanInitialState)

  // todo: Calculate the final results with the stored data
  const [results, setResults] = useState(initialResults)

  // todo util: Check out each input
  const cheakOutInput = value => {
    if (value === '') {
      return 0
    }
    return value
  }

  // ? Functions to pass in the components

  const updateGlobalState = (key, value) => {
    value = cheakOutInput(value)
    singleLoanSetState({ ...singleLoanState, [key]: value })

  }

  const updatePercentageInput = (key, value) => {
    value = value.replace('%', '')
    if (singleLoanState[key].length > value.length) {
      singleLoanSetState({ ...singleLoanState, [key]: value })
    } else {
      singleLoanSetState({ ...singleLoanState, [key]: value + '%' })
    }
  }

  const blurPercetageInput = (e) => {
    let value = e.target.value
    value = value.replace('%', '')
    singleLoanSetState({ ...singleLoanState, [e.target.name]: value + '%' })
  }

  const appendUser = user => {
    // ? Push a new user in the array
    loansState.loans.push(user)
    loansSetState({ ...loansState })

    // ? Clean the last final results
    setResults(initialResults)

    // ? Calculate the final results with the existing data
    const updates = {
      totalGains: results.totalGains + (!user.loan.scam ? + user.loan.totalGains : 0),
      totalLosses: results.totalLosses + (user.loan.scam ? + user.loan.totalGains : 0),
      successfulLoans: results.successfulLoans + (!user.loan.scam ? 1 : 0),
      failedLoans: results.failedLoans + (user.loan.scam ? 1 : 0),
      totalMoneyReceived: results.totalMoneyReceived + (!user.loan.scam ? user.loan.loan + user.loan.totalGains : 0),
      totalMoneyLost: results.totalMoneyLost + (user.loan.scam ? user.loan.loan + user.loan.totalGains : 0),
      gainsPerMonth: results.gainsPerMonth + (!user.loan.scam ? user.loan.gainsMonth : 0),
      gainsPerYear: results.gainsPerYear + (!user.loan.scam ? user.loan.gainsYear : 0),
      interestGainsMonth: results.interestGainsMonth + (!user.loan.scam ? user.loan.interestGainsMonth : 0),
      interestGainsYear: results.interestGainsYear + (!user.loan.scam ? user.loan.interestGainsYear : 0),
      lossesPerMonth: results.lossesPerMonth + (user.loan.scam ? user.loan.gainsMonth : 0),
      lossesPerYear: results.lossesPerYear + (user.loan.scam ? user.loan.gainsYear : 0),
      interestLossesMonth: results.interestLossesMonth + (user.loan.scam ? user.loan.interestGainsMonth : 0),
      interestLossesYear: results.interestLossesYear + (user.loan.scam ? user.loan.interestGainsYear : 0)
    }
    setResults({ ...results, ...updates })
  }

  const refreshResults = () => {

    // ? Initializate the results from scratch
    const updates = initialResults

    // todo: Calculate the final results from scratch
    loansState.loans.forEach(user => {
      updates.totalGains = updates.totalGains + (!user.loan.scam ? user.loan.totalGains : 0)
      updates.totalLosses = updates.totalLosses + (user.loan.scam ? user.loan.totalGains : 0)
      updates.successfulLoans = updates.successfulLoans + (!user.loan.scam ? 1 : 0)
      updates.failedLoans = updates.failedLoans + (user.loan.scam ? 1 : 0)
      updates.totalMoneyReceived = updates.totalMoneyReceived + (!user.loan.scam ? user.loan.loan + user.loan.totalGains : 0)
      updates.totalMoneyLost = updates.totalMoneyLost + (user.loan.scam ? user.loan.loan + user.loan.totalGains : 0)
      updates.gainsPerMonth = updates.gainsPerMonth + (!user.loan.scam ? user.loan.gainsMonth : 0)
      updates.gainsPerYear = updates.gainsPerYear + (!user.loan.scam ? user.loan.gainsYear : 0)
      updates.interestGainsMonth = updates.interestGainsMonth + (!user.loan.scam ? user.loan.interestGainsMonth : 0)
      updates.interestGainsYear = updates.interestGainsYear + (!user.loan.scam ? user.loan.interestGainsYear : 0)
      updates.lossesPerMonth = updates.lossesPerMonth + (user.loan.scam ? user.loan.gainsMonth : 0)
      updates.lossesPerYear = updates.lossesPerYear + (user.loan.scam ? user.loan.gainsYear : 0)
      updates.interestLossesMonth = updates.interestLossesMonth + (user.loan.scam ? user.loan.interestGainsMonth : 0)
      updates.interestLossesYear = updates.interestLossesYear + (user.loan.scam ? user.loan.interestGainsYear : 0)
    })
    setResults(updates)
  }

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path='/' element={
            <div className='container my-4'>
              <div className="row g-3">
                <Loan
                  updatePercentageInput={updatePercentageInput}
                  updateGlobalState={updateGlobalState}
                  blurPercetageInput={blurPercetageInput}
                  loan={singleLoanState.loan}
                  fees={singleLoanState.fees}
                  interest={singleLoanState.interest}
                  timeUnity={singleLoanState.timeUnity}>
                </Loan>
                <Calculations
                  loan={singleLoanState.loan}
                  fees={singleLoanState.fees}
                  interest={singleLoanState.interest}>
                </Calculations>
              </div>
            </div>}>
          </Route>
          <Route path='simulations' element={
            <div>
              <div className="container my-4">
                <Simulations
                  appendUser={appendUser}
                  users={loansState}
                >
                </Simulations>
                <hr />
                <Results
                  users={loansState}
                  setUsers={loansSetState}
                  results={results}
                  setResults={setResults}
                  refresh={refreshResults}
                  initialResults={initialResults} />
              </div>
            </div>
          }></Route>
          <Route path='records' element={<Records></Records>}>
          </Route>
        </Routes>

      </Router>


    </>
  );
}



export default App;
