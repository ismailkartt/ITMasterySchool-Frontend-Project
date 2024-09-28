import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import MeetList from '../../components/dashboard/grades-meets/meet-list'
import GradeList from '../../components/dashboard/grades-meets/grades-list'

const GradeMeetPage = () => {

  return (
    <>
        <PageHeader title="Grade & Meets"/>
        <Spacer/>
        <GradeList/>
        <Spacer/>
        <MeetList/>
        <Spacer/>
    </>
  )
}

export default GradeMeetPage