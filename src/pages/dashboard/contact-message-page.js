import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import ContactMessageList from '../../components/dashboard/contact-message/contact-message-list'


const ContactMessagePage = () => {

  return (
    <>
        <PageHeader title="Contact Messages"/>
        <Spacer/>
            <ContactMessageList/>
        <Spacer/>
    </>
  )
}

export default ContactMessagePage