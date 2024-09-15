import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import AdminList from '../../components/dashboard/admin-management/admin-list'

const AdminManagementPage = () => {
  return (
    <>
      <PageHeader title="Admin Management"/>
      <Spacer/>
      <AdminList/>
    </>
  )
}

export default AdminManagementPage