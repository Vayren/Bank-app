import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Context from './context';
import BanksList from './Components/BanksList';
import BestExTable from './Components/BestExTable';
import Loader from './Components/Loader.js';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


function App() {
  let [banks, setBanks] = useState([]);
  let fields = ['buy', 'sale'];

  useEffect(() => {
    axios.get("/ua/public/currency-cash.json")
      .then(respounse => respounse.data)
      .then(mainData => setBanks( mainData.organizations.filter(bank => {
        if(bank.orgType === 1){
          bank.cityId = mainData.cities[bank.cityId];
          return bank;
        }return false;
      }))
      );
  }, [])

  function makeBestTable(fields) {
    return fields.map((field, index) => {
      return <BestExTable banks={banks} field={field} key={index}/>
    })
  }

  return(
      <Context.Provider value={{StyledTableRow: StyledTableRow, StyledTableCell: StyledTableCell }}>
        <div className="wrapper">
          <h1 className="title">List of banks</h1>
          {banks.length ? <BanksList banks={banks}/> : <Loader/>}
          <h1 className="title">Best currency exchange rate</h1>
          {banks.length ? makeBestTable(fields) : <Loader/>}
        </div>
      </Context.Provider>
  )
}

export default App;

