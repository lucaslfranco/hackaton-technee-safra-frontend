import React, { useEffect, useState } from 'react';

import { api } from '../../services';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';

import {
  Transactions,
  CreditCards,
  MorningCalls,
  SummaryChart,
  Tabs,
  Transfer,
} from '../../components';


import {
  Grid,
} from '@material-ui/core';

function Home(props) {

  const { classes } = props;

  const [institution, setInstitution] = useState(null);

  const [morningCalls, setMorningCalls] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const morningCallsMock = [
    {
      "id": "_V8f_Su9_RA",
      "channel": "safra",
      "playlist": "morningCalls",
      "data": "2020-07-14",
      "title": "Morning Call Safra - 14/07/2020",
      "description": "Veja no Morning Call desta terça-feira, 14 de julho, como o Ibovespa perdeu ontem os 100 mil pontos, após passar a maior parte do pregão acima desse nível.",
      "links": [
        {
          "href": "https://www.youtube.com/watch?v=_V8f_Su9_RA",
          "rel": "youtube",
          "title": "Link Youtube do Morning Call"
        },
        {
          "href": "https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/KkvwgXxVpb3LtpopVhGJ7VgeKbp23imgFbBrImW4W_Q/n/gr618lalrmiy/b/morningcalls/o/Morning%20Call%20Safra%20-%2014_07_2020.m4a",
          "rel": "audioFile",
          "title": "Arquivo .m4a do Morning Call"
        },
        {
          "href": "https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/A4foEVfocaZE-enp7tmLdButDRwCxamcryNOCte3P1Q/n/gr618lalrmiy/b/morningcalls/o/Morning%20Call%20Safra%20-%2014_07_2020.mp4",
          "rel": "videoFile",
          "title": "Arquivo .mp4 do Morning Call"
        }
      ]
    },
    {
      "id": "bsFdyOim2iM",
      "channel": "safra",
      "playlist": "morningCalls",
      "data": "2020-07-10",
      "title": "Morning Call Safra - 10/07/2020",
      "description": "No Morning Call desta sexta-feira, 10 de julho, comentamos sobre como o Ibovespa chegou a superar a marca dos 100 mil pontos ontem, embora não tenha conseguido sustentar os ganhos.",
      "links": [
        {
          "href": "https://www.youtube.com/watch?v=bsFdyOim2iM",
          "rel": "youtube",
          "title": "Link Youtube do Morning Call"
        },
        {
          "href": "https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/avSFUKU9GTdRswxPKZmz3ARgVDDVBc_7fy2JRJH0Z4A/n/gr618lalrmiy/b/morningcalls/o/Morning%20Call%20Safra%20-%2010_07_2020.m4a",
          "rel": "audioFile",
          "title": "Arquivo .m4a do Morning Call"
        },
        {
          "href": "https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/KiQYxZtZT0MBPce8dpnu1dTJcbBgGUSrsFsEFCMDPPM/n/gr618lalrmiy/b/morningcalls/o/Morning%20Call%20Safra%20-%2010_07_2020.mp4",
          "rel": "videoFile",
          "title": "Arquivo .mp4 do Morning Call"
        }
      ]
    },
    {
      "id": "TvGi1rTewVE",
      "channel": "safra",
      "playlist": "morningCalls",
      "data": "2020-07-09",
      "title": "Morning Call Safra - 09/07/2020",
      "description": "No Morning Call desta quinta-feira, 9 de julho, comentamos sobre o forte desempenho no dia de ontem, quando o Ibovespa se aproximou dos 100 mil pontos.",
      "links": [
        {
          "href": "https://www.youtube.com/watch?v=TvGi1rTewVE",
          "rel": "youtube",
          "title": "Link Youtube do Morning Call"
        },
        {
          "href": "https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/OYtv12R9oMRDz9PntENXFmSceGX0V4oFtKRYCFmTiyc/n/gr618lalrmiy/b/morningcalls/o/Morning%20Call%20Safra%20-%2009_07_2020.m4a",
          "rel": "audioFile",
          "title": "Arquivo .m4a do Morning Call"
        },
        {
          "href": "https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/Bq-j8Jzq-VJa473YxbCQ6HYP_JhdYcXKptgt9CSo1Mo/n/gr618lalrmiy/b/morningcalls/o/Morning%20Call%20Safra%20-%2009_07_2020.mp4",
          "rel": "videoFile",
          "title": "Arquivo .mp4 do Morning Call"
        }
      ]
    }
  ];

  useEffect(() => {
    // getAccessToken();
    getAccountsV2();
    getMorningCalls();
  }, []);

  useEffect(() => {
    if (props.page === 'home')
      getBalancesV2();
    else if (props.page === 'transactions')
      getTransactionsV2();

    // optin();
  }, [accounts])

  const getMorningCalls = async () => {
    // const token = await getAccessToken();
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const headers = {
          authorization: `Bearer ${token}`
        };

        const { data: { data } } = await api.get('/morningcalls', { headers });
        setMorningCalls(data);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const getAccountsData = async () => {
    // const token = await getAccessToken();
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const url = 'http://localhost:8080/accountData/00711234511';
        const headers = {
          authorization: `Bearer ${token}`
        };

        const { data } = await api.get(url, { headers });
        // console.log(data);
        const firstAccountData = data.Data.Account[0];

        const accountData = {
          userId: firstAccountData.Account.Identification,
          name: firstAccountData.Account.Name,
          secondaryId: firstAccountData.Account.SecondaryIdentification,
          accountId: firstAccountData.AccountId,
          currency: firstAccountData.Currency,
          nickname: firstAccountData.Nickname,
        };

        // setAccountData(accountData);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const getAccountsV2 = async () => {
    const accounts = JSON.parse(localStorage.getItem('banks'));
    setAccounts(accounts);
    console.log(accounts)
  }

  const getBalances = async () => {
    // const token = await getAccessToken();
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const headers = {
          authorization: `Bearer ${token}`
        };

        const { data } = await api.get('/balances/00711234511', { headers });
        console.log(data);
        const balances = data.Data.Balance;

        // const balance = {
        //   accountId: firstBalanceData.AccountId,
        //   amount: firstBalanceData.Amount.Amount,
        //   currency: firstBalanceData.Amount.Currency,
        //   creditDebit: firstBalanceData.CreditDebitIndicator,
        //   creditLine: firstBalanceData.CreditLine,
        //   datetime: firstBalanceData.Nickname,
        //   type: firstBalanceData.Nickname,
        // };

        setBalances(balances);
      }
    }
    catch (e) {
      console.log(e);
    }
  }


  const getBalancesV2 = async () => {
    // const token = await getAccessToken();
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');

    try {
      if (token) {
        const headers = {
          authorization: `Bearer ${token}`
        };

        const { data } = await api.get(`/balancesdb/${customerId}`, { headers });

        data.forEach(bal => {
          const bank = accounts.filter(acc => acc.bank_account === bal.account_id)[0]
          bal.bank_name = bank.bank_name;
          bal.bank_id = bank.bank_id;
        })

        setBalances(data);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const getTransactions = async () => {
    // const token = await getAccessToken();
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const headers = {
          authorization: `Bearer ${token}`
        };

        const { data: { data } } = await api.get('/transactions/00711234533', { headers });
        console.log(data);
        const transactions = data.transaction;
        setTransactions(transactions);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const getTransactionsV2 = async () => {
    // const token = await getAccessToken();
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');

    try {
      if (token) {
        const headers = {
          authorization: `Bearer ${token}`
        };

        const { data } = await api.get(`/transactionsdb/${customerId}`, { headers });
        setTransactions(data);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const transfer = async (transferData) => {
    // const token = await getAccessToken();
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const headers = {
          authorization: `Bearer ${token}`
        };
        console.log(transferData)
        const body = {
          "Type": "TEF",
          "TransactionInformation": transferData.description || '',
          "DestinyAccount": {
            "Bank": "422",
            "Agency": transferData.agency,
            "Id": transferData.account,
            "Cpf": transferData.cpf,
            "Name": transferData.fullName,
            "Goal": "Credit"
          },
          "Amount": {
            "Amount": transferData.value,
            "Currency": "BRL"
          }
        }

        const bodyMock = {
          "Type": "TEF",
          "TransactionInformation": "Mensalidade Academia",
          "DestinyAccount": {
            "Bank": "422",
            "Agency": "0071",
            "Id": "1234533",
            "Cpf": "12345678933",
            "Name": "Mark Zuckerberg da Silva",
            "Goal": "Credit"
          },
          "Amount": {
            "Amount": "250.00",
            "Currency": "BRL"
          }
        }

        const { data } = await api.post('/transfer/00711234511', body, { headers });
        console.log(data);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const optin = async () => {
    // const token = await getAccessToken();
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const url = 'http://localhost:8080/optin';
        const headers = {
          authorization: `Bearer ${token}`
        };
        const body = {
          "Name": "Eric Evans Silva",
          "Email": "eric.evans@ddd.com",
          "Phone": "+5511911111111"
        }

        const { data } = await api.post(url, body, { headers });
        console.log(data);

        // const transactions = data.transaction[0];

        // const balance = {
        // 	accountId: firstBalanceData.AccountId,
        // 	amount: firstBalanceData.Amount.Amount,
        // 	currency: firstBalanceData.Amount.Currency,
        // 	creditDebit: firstBalanceData.CreditDebitIndicator,
        // 	creditLine: firstBalanceData.CreditLine,
        // 	datetime: firstBalanceData.Nickname,
        // 	type: firstBalanceData.Nickname,
        // };

        // setTransactions(transactions);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const renderPageSection = () => {
    if (props.page === 'home')
      return (
        <SummaryChart
          accounts={accounts}
          balances={balances}
          institution={institution}
        />
      )
    else if (props.page === 'transfer')
      return (
        <Transfer
          transfer={transfer}
        />
      )
    else if (props.page === 'creditCards')
      return (
        <CreditCards
          accounts={accounts}
          institution={institution}
        />
      )
    else if (props.page === 'transactions')
      return (
        <Transactions
          accounts={accounts}
          institution={institution}
          transactions={transactions}
        />
      )
  }
  return (
    <Grid container className={classes.rootDetails} justify="space-between">
      <Grid item xs={12}>
        <Tabs
          setInstitution={setInstitution}
          institution={institution}
          accounts={accounts}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        {renderPageSection()}
      </Grid>
      <MorningCalls
        morningCalls={morningCalls}
      />
    </Grid >
  )
}

export default withStyles(styles)(Home);