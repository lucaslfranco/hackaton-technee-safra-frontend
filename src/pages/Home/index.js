import React, { useEffect, useState } from 'react';

import { api } from '../../services';

import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/mainStyles';

import {
  SummaryChart,
  Balance,
  Transfer,
  MorningCalls,
  Tabs,
} from '../../components';


import {
  Grid,
} from '@material-ui/core';

function Home(props) {

  const { classes } = props;

  const [institution, setInstitution] = useState(null);

  const [morningCalls, setMorningCalls] = useState([]);
  const [accountData, setAccountData] = useState({});
  const [balances, setBalances] = useState({});
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
    // getMorningCalls();
    // getAccountData();
    // getBalances();
    getTransactions();
    // transfer();
    // optin();
  }, [])

  // componentDidUpdate(prevProps) {
  // 	if (!prevProps.projects.length && this.props.projects.length) {
  // 		const cwid = localStorage.getItem('cwid');
  // 		const sponsoredProjects = this.props.projects.filter(proj => proj.sponsor_id === cwid);
  // 		this.setState({ sponsoredProjects })
  // 	}
  // }

  const getAccessToken = async () => {
    try {
      const { data } = await api.post('/token');
      return data;
    }
    catch (e) {
      console.log(e)
    }
  }

  const getMorningCalls = async () => {
    const token = await getAccessToken();

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

  const getAccountData = async () => {
    const token = await getAccessToken();

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

        setAccountData(accountData);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const getBalances = async () => {
    const token = await getAccessToken();

    try {
      if (token) {
        const headers = {
          authorization: `Bearer ${token}`
        };

        const { data } = await api.get('/balances/00711234511', { headers });
        console.log(data);

        const firstBalanceData = data.Data.Balance[0];
        const balance = {
          accountId: firstBalanceData.AccountId,
          amount: firstBalanceData.Amount.Amount,
          currency: firstBalanceData.Amount.Currency,
          creditDebit: firstBalanceData.CreditDebitIndicator,
          creditLine: firstBalanceData.CreditLine,
          datetime: firstBalanceData.Nickname,
          type: firstBalanceData.Nickname,
        };

        setBalances(balance);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const getTransactions = async () => {
    const token = await getAccessToken();

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

  const transfer = async () => {
    const token = await getAccessToken();

    try {
      if (token) {
        const headers = {
          authorization: `Bearer ${token}`
        };
        const body = {
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
    const token = await getAccessToken();

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

  return (
    <Grid container className={classes.rootDetails} justify="space-between">
      <Grid item xs={12}>
        <Tabs
          setInstitution={setInstitution}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        {
          props.page === 'home' &&
          <SummaryChart />
        }
        {
          props.page === 'transfer' &&
          <Transfer
            transfer={transfer}
          />
        }
        {
          props.page === 'balance' &&
          <Balance
            transactions={transactions}
            institution={institution}
          />
        }
      </Grid>
      <MorningCalls
        morningCalls={morningCalls}
      />
    </Grid >
  )
}

export default withStyles(styles)(Home);