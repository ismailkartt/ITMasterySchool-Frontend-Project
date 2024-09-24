import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { swalAlert, swalConfirm } from '../../../helpers/functions/swal'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { setCurrentRecord, setListRefreshToken, setOperation } from '../../../store/slices/misc-slice'
import { deleteMeet, getMeetsByPage } from '../../../api/meet-service'


const MeetList = () => {
  
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const {listRefreshToken} = useSelector(state => state.misc); 

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  })

  const loadData = async (page) => {
    try {
      const resp = await getMeetsByPage(page, lazyState.rows);
      setList(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
  }

  const getStudents = (row) => {
    return ``;
  }

  const onPage = (event) => {
    setlazyState(event);
  }

  const handleDelete = async (id) => {
    const resp = await swalConfirm("Are you sure to delete?");
    if (!resp.isConfirmed) return;
    setLoading(true);
    try {
      await deleteMeet(id);
      dispatch(setListRefreshToken(Math.random()))
      swalAlert("Meet was deleted", "success");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => { 
    dispatch(setCurrentRecord(row));
    dispatch(setOperation("edit"));
   }

  const handleNewUser = () => {
    dispatch(setOperation("new"));
  }

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState, listRefreshToken]);
  

  const getOperationButtons = (row) => {
    if(row.built_in){
      return null;
    }
    return (
      <div>
        <Button className='btn-link' onClick={() => handleEdit(row)}>
          <FaEdit/>
        </Button>
        <Button className='btn-link' onClick={() => handleDelete(row.userId)}>
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
            <span>Meet List</span>
            <Button onClick={handleNewUser}>New Meet</Button> 
          </Card.Title>

          <DataTable
            lazy
            dataKey="id"
            totalRecords={totalRows}
            loading={loading}
            value={list}
            paginator
            rows={lazyState.rows}
            first={lazyState.first}
            onPage={onPage}
          >
          
            
            <Column field="date" header="Gender"></Column> 
            <Column field="startTime" header="Start Time"></Column>
            <Column field="stopTime" header="End Time"></Column>
            <Column field="description" header="Description"></Column> 

            <Column body={getStudents} header="Students"></Column> 
            <Column body={getOperationButtons} headerStyle={{width: "120px"}}></Column>  


          </DataTable>

        </Card.Body>
      </Card>
    </Container>
  )
}

export default MeetList