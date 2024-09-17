import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { swalAlert, swalConfirm } from '../../../helpers/functions/swal'
import { FaTimes } from 'react-icons/fa'
import { deleteManager, getManagerByPage } from '../../../api/manager-service'
import { setOperation } from '../../../store/slices/misc-slice'

const ManagerList = () => {
  
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
  })

  const loadData = async (page) => {
    try {
      const resp = await getManagerByPage(page, lazyState.rows);
      setUsers(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
  }

  const getFullName = (row) => {
    return `${row.name} ${row.surname}`;
  }

  const onPage = (event) => {
    setlazyState(event);
  }

  const handleDelete = async (row) => {
    try {
      const result = await swalConfirm("Are you sure to delete?");
      if(result.isConfirmed){
        await deleteManager(row.userId);
        swalAlert("Manager successfully deleted", "success");
        loadData(lazyState.page);
      }
    } catch (err) {
      swalAlert("Manager could not be deleted", "error"); 
    }
  }

  const handleNewAdmin = () => {
    dispatch(setOperation("new"));
  }

  useEffect(() => {
    loadData(lazyState.page);
  }, [lazyState]);
  

  const getOperationButtons = (row) => {
    if(row.built_in){
      return null;
    }
    return (
      <div>
        <Button className='btn-link' onClick={() => handleDelete(row)}>
          <FaTimes/>
        </Button>
      </div>
    )
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className='d-flex justify-content-between'>
            <span>Manager List</span>
            <Button onClick={handleNewAdmin}>New Manager</Button>
          </Card.Title>

          <DataTable
            lazy
            dataKey="id"
            totalRecords={totalRows}
            loading={loading}
            value={users}
            paginator
            rows={lazyState.rows}
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
  )
}

export default ManagerList