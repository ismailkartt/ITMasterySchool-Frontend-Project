import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getContactMessageByPage } from "../../../api/contact-message-services";

const ContactMessageList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const loadData = async (page) => {
    setLoading(true);
    try {
      const resp = await getContactMessageByPage(page, lazyState.rows);
      console.log(resp);
      setUsers(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Contact Message List</span>
          </Card.Title>

          <DataTable
            lazy
            rowKey={(data, index) => index}
            totalRecords={totalRows}
            loading={loading}
            value={users}
            paginator
            rows={lazyState.rows}
            first={lazyState.first}
            onPage={onPage}
          >
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="date" header="Date"></Column>
            <Column field="subject" header="Subject"></Column>
            <Column
              field="message"
              header="Message"
              body={(rowData) => (
                <span
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    display: "block",
                    maxWidth: "300px",
                  }}
                >
                  {rowData.message}
                </span>
              )}
            ></Column>
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactMessageList;
