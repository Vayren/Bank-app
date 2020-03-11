import React, { useEffect } from 'react';
import axios from 'axios';
import Context from './context';
import BanksList from './Components/BanksList';
import BestExTable from './Components/BestExTable';

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
  let [state, setState] = React.useState([]);
  let fields = ['buy', 'sale'];

  useEffect(() => {
    axios.get("/ua/public/currency-cash.json")
      .then(respounse => respounse.data)
      .then(mainData => setState( mainData.organizations.filter(bank => {
        if(bank.orgType === 1){
          bank.cityId = mainData.cities[bank.cityId];
          return bank;
        }return false;
      }))
      );
  }, [])


  const styles = {
    h1:{
      textAlign: "center",
      fontSize: "2.8rem",
    }
  }  

  return(
      <Context.Provider value={{StyledTableRow: StyledTableRow, StyledTableCell: StyledTableCell }}>
        <div className="wrapper">
          <h1 style={styles.h1}>List of banks</h1>
          <BanksList banks={state}/>
          <h1 style={styles.h1}>Best currency exchange rate</h1>
          {fields.map((field, index) => {
            return <BestExTable banks={state} field={field} key={index}/>
          })}
        </div>
      </Context.Provider>
  )
}

export default App;

