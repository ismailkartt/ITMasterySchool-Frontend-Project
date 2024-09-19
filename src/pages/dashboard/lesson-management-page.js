import React, { useState } from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { Tab, Tabs } from "react-bootstrap";

const LessonManagementPage = () => {

    const [key, setKey] = useState('home');

  return (
    <>
      <PageHeader title="Lesson Management" />
      <Spacer />

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill={true}
      >
        <Tab eventKey="terms" title="Education Terms">
          Tab content for Home
        </Tab>
        <Tab eventKey="lessons" title="Lessons">
          Tab content for Profile
        </Tab>
        <Tab eventKey="programs" title="Lesson Programs">
          Tab content for Contact
        </Tab>
      </Tabs>
    </>
  );
};

export default LessonManagementPage;
