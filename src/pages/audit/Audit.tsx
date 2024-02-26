import React from 'react';
import Profile from '../../components/profile/Profile'
import '../App.css';
import './Audit.css';
import '../scss/custom.scss';
import { callPostApi } from '../Functions'
import money from '../../components/jar/images/money.png'
import { useState, useMemo, useCallback } from 'react';

function Audit() {
  const [audit, setAudit] = useState<any[]>([])
  const [jarLoaded, setJarLoaded] = useState(false)

  const getAudit = useCallback(async () => {
    const header = new Headers({'Authorization': `Bearer ${await callPostApi(process.env.REACT_APP_MONGO_URL, {key: process.env.REACT_APP_MONGO_KEY})}`})
    const auditCall = await fetch(`https://us-east-2.aws.data.mongodb-api.com/app/data-ocdpl/endpoint/audit`,{headers: header})
    const initialAuditLog = await auditCall.json()
    setAudit(initialAuditLog.sort((a: any, b: any) => {return a.timestamp > b.timestamp? -1 : 1}))
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
    </div>
  );
}

export default Audit;
