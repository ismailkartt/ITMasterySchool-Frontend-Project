import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import { useSelector } from 'react-redux'
import NewAdminForm from '../../components/dashboard/admin-management/new-admin-form'
import ManagerList from '../../components/dashboard/manager-management/manager-list'

const ManagerManagement = () => {

    const { currentOperation } = useSelector((state) => state.misc);

  return (
    <>
        <PageHeader title="Manager Management"/>
        <Spacer/>
        {
            currentOperation === "new" && (
                <>
                    <NewAdminForm/>
                    <Spacer/>
                </>
            )
        }
        <ManagerList/>
        <Spacer/>
    </>
  )
}

export default ManagerManagement