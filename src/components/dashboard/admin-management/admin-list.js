import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { deleteAdmin, getAdminsByPage } from "../../../api/admin-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setOperation } from "../../../store/slices/misc-slice";

const AdminList = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
});

  const loadData = async (page) => {
    try {
      const resp = await getAdminsByPage(page, lazyState.rows,);
      setUsers(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getFullName = (row) => {
    return `${row.name} ${row.surname}`;
  };

  const onPage = (event) => { 
    setlazyState(event);
   }

  const getOperationButtons = (row) => {
    if (row.built_in) {
      return null;
    }
    return (
      <div>
        <Button className="btn-link">
          <FaTimes />
        </Button>
      </div>
    );
  };

  const handleNewAdmin = () => { 
    dispatch(setOperation("new"));
   }

  useEffect(() => {
    loadData(lazyState.page);
  }, [lazyState]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Admin List</span>
            <Button onClick={handleNewAdmin}>New Admin</Button>
          </Card.Title>

          <DataTable
            lazy
            dataKey="id"
            totalRecords={totalRows}
            loading={loading}
            value={users}
            paginator
            rows={lazyState.rows}
            rowsPerPageOptions={[5, 10, 25, 50]}
            first={lazyState.first}
            onPage={onPage}
          >
            <Column body={getFullName} header="Name"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="phoneNumber" header="Phone Number"></Column>
            <Column field="ssn" header="SSN"></Column>
            <Column field="username" header="User Name"></Column>
            <Column body={getOperationButtons}></Column>
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminList;
