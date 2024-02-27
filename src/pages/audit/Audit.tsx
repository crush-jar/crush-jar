import React from 'react';
import '../App.css';
import './Audit.css';
import '../scss/custom.scss';
import { callPostApi } from '../Functions'
import { useState, useMemo, useCallback } from 'react';
import { Link } from "react-router-dom";
import CottageIcon from '@mui/icons-material/Cottage';

function Audit() {
  const [audit, setAudit] = useState<any[]>([])

  const getAudit = useCallback(async () => {
    const header = new Headers({'Authorization': `Bearer ${await callPostApi(process.env.REACT_APP_MONGO_URL, {key: process.env.REACT_APP_MONGO_KEY})}`})
    const auditCall = await fetch(`${process.env.REACT_APP_MONGO_ENDPOINT_URL}/audit`,{headers: header})
    const initialAuditLog = await auditCall.json()
    const sortedAuditLog = initialAuditLog.reverse()
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
      <div className ="home-button">
        <Link to={"/"}>
          <CottageIcon className="home-button" sx={{fontSize: '8vh'}} />
        </Link>
      </div>
      <div className="audit-header">
        History
      </div>
      {audit.map((auditTimestamp) => (<div className="audit-body">{auditTimestamp.Description}</div>))}
    </div>
  );
}

export default Audit;
