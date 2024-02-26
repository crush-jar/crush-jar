import React from 'react';
import Profile from '../../components/profile/Profile'
import '../App.css';
import './Audit.css';
import '../scss/custom.scss';
import { callPostApi } from '../Functions'
import money from '../../components/jar/images/money.png'
import { useState, useMemo, useCallback } from 'react';
import { Link } from "react-router-dom";
import { IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import HistoryIcon from '@mui/icons-material/History';

type Timestamp = {
  _id: String,
  Description: String,
  LogId: String,
  timestamp: bigint;
}

function Audit() {
  const [audit, setAudit] = useState<any[]>([])

  const getAudit = useCallback(async () => {
    const header = new Headers({'Authorization': `Bearer ${await callPostApi(process.env.REACT_APP_MONGO_URL, {key: process.env.REACT_APP_MONGO_KEY})}`})
    const auditCall = await fetch(`https://us-east-2.aws.data.mongodb-api.com/app/data-ocdpl/endpoint/audit`,{headers: header})
    const initialAuditLog = await auditCall.json()
    const sortedAuditLog = initialAuditLog.sort((a: Timestamp, b: Timestamp) => {return a.timestamp > b.timestamp ? 1 : -1}).reverse()
    console.log(sortedAuditLog)
    setAudit(sortedAuditLog)
  }, [])

  const loading = useMemo(() => {
    getAudit()
    return (audit.length !== 0) ? false : true
  }, [audit.length, getAudit])

  if (loading) return (
    <div>
      <div className="App App-header position-absolute top-50 start-50 translate-middle">
        Loading...
      </div>
    </div>
  )

  return (
    <div className="audit">
      <div className="audit-header">
        History
      </div>
      {audit.map((auditTimestamp) => (<div className="audit-body">{auditTimestamp.Description}</div>))}
      <Link to={"/"}>
        <HistoryIcon sx={{fontSize: '5vw'}} />
      </Link>
    </div>
  );
}

export default Audit;
